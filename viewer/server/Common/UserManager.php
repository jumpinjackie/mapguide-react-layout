<?php
/**
 * UserManager
 *
 * $Id: UserManager.php 2784 2013-09-13 10:35:10Z jng $
 *
 * Copyright (c) 2007, DM Solutions Group Inc.
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

/*****************************************************************************
 * Purpose: manage user login and preferences
 *****************************************************************************/

/* used to salt passwords */
define('SALT', "U2FsdGVkX1/TY2/7nsjOUmLc/sOW4O8z+/zmyQQjy3k=");


// ====
// = MGUserManager - a class for manipulating the a user database
// = storing preferences and managing valid users.
// ====
Class MGUserManager {

    private $admin_user = '';
    private $admin_pass = '';
    private $db = null;
    private $site = null;
    private $currentUserId = null;
    private $aszInitialPrefs = array();

    function __construct($admin_user, $admin_pass, $db, $default_prefs = array()) {
        global $siteConnection;
        global $user;

        $this->admin_user = $admin_user;
        $this->admin_pass = $admin_pass;

        $this->site = $siteConnection->GetSite();
        $this->site->Open($user);

        $createTables = (file_exists($db))?false:true;
        $this->db = new SQLiteDatabase($db);

        $this->aszInitialPrefs = $default_prefs;
        if ($createTables) {
            //build db tables
            $this->db->query("CREATE TABLE users (userid INTEGER PRIMARY KEY,
                                username VARCHAR(255) NOT NULL UNIQUE,
                                password VARCHAR ( 255 ) NOT NULL,
                                disabled INTEGER,
                                resetkey VARCHAR ( 255 ) default '',
                                email VARCHAR ( 255 ))
                                ;");
            $this->db->query("CREATE TABLE prefs (prefid INTEGER PRIMARY KEY, name VARCHAR ( 255 ) NOT NULL, default_value VARCHAR ( 255 ));");
            $this->db->query("CREATE TABLE user_prefs (userid INTEGER NOT NULL, prefid INTEGER NOT NULL, value VARCHAR(255));");
            //add default preferences;
            $szPrefsSQL = '';
            foreach($this->aszInitialPrefs as $key => $value) {
                $szPrefsSQL .= 'INSERT INTO prefs (name, default_value) VALUES ("'.$key.'","'.$value.'");';
            }
            if ($szPrefsSQL != ''){
                $this->db->queryExec($szPrefsSQL);
            }
        }

    }


     // = =======================================================================
     // = AddUser will be invoked with new user credentials assuming login failed
     // = in MgCommon
     // = =======================================================================
    function AddUser ($username, $password, $email) {
        try {
            $user = new MgUserInformation(MG_ADMIN_USER, MG_ADMIN_PASSWD);
            $siteConnection = new MgSiteConnection();
            $siteConnection->Open($user);
            $site = $siteConnection->GetSite();
            $username = trim($username);
            $fullname = $username;
            $site->AddUser($username, $username, $password, $fullname);
            //set author role
            $usersToGrant = new MgStringCollection();
            $roleToUpdate = new MgStringCollection();
            $roleToUpdate->Add( MgRole::Author );
            $usersToGrant->Add( $username ) ;
            $site->GrantRoleMembershipsToUsers( $roleToUpdate, $usersToGrant );

            // Create user directory in repository:
            // Create Header
            $headerContent = $this->GetUserFolderHeader($username);
            $header_byteSource = new MgByteSource($headerContent, strlen($headerContent));
            $header_byteSource->setMimeType("text/xml");
            $header_byteReader = $header_byteSource->GetReader();

            $resourceService = $siteConnection->CreateService(MgServiceType::ResourceService);

            // Create Folder
            $id = new MgResourceIdentifier(MG_USER_DIRECTORY_ROOT.$username.'/');
            $resourceService->SetResource($id, NULL, $header_byteReader);

            $encryptedPassword = crypt($password, SALT);
            $success = $this->db->queryExec('INSERT INTO users (username, password, disabled, email) VALUES ("'.$username.'", "'.$encryptedPassword.'", 0, "'.$email.'" );');
            if ($success) {
                $userId = $this->db->lastInsertRowid();
                //setup default prefs
                foreach($this->aszInitialPrefs as $key => $value) {
                    $result = $this->db->SingleQuery('SELECT prefid FROM prefs WHERE name="'.$key.'";');
                    if ($result) {
                        $prefid = $result;
                    }
                    //TODO: improve efficiency by combining queries
                    $this->AddUserPref($userId, $prefid, $value);
                }
                return $this->GetUser($userId);
            } else {
                echo "<Error>Failed to insert user</Error>";
                return FALSE;
            }

        } catch (MgDuplicateUserException $du_e) {
            echo '<Error>Duplicate user!</Error>';
            return FALSE;
        } catch (MgException $e) {
            echo "<Error>" . $e->GetExceptionMessage() . "\n";
            echo $e->GetDetails() . "\n";
            echo $e->GetStackTrace() . "</Error>\n";
            return FALSE;
        }
    }

    function EnableUser ($userId) {
        $success = $this->db->queryExec('UPDATE users SET disabled = 1 where userid ='.$userId.';');
        if ($success) {
            return $userId;
        }else {
            //couldn't update the user
            return FALSE;
        }
    }

    function DisableUser ($userId) {
        $success = $this->db->queryExec('UPDATE users SET disabled = 1 where userid ='.$userId.';');
        if ($success) {
            return $userId;
        }else {
            //couldn't create the user - not unique
            return FALSE;
        }
    }

    function DeleteUser ($userId, $userName) {
        $user = new MgUserInformation(MG_ADMIN_USER, MG_ADMIN_PASSWD);
        $siteConnection = new MgSiteConnection();
        $siteConnection->Open($user);
        $users = new MgStringCollection();
        $users->Add($userName);
        if (!$users->GetCount()) {
            throw new Exception("User was not removed from MapGuide.");
        }
        $siteConnection->GetSite()->DeleteUsers($users);
        $success = $this->db->queryExec('DELETE FROM users WHERE userid ='.$userId.';'.
                                        'DELETE FROM user_prefs WHERE userid ='.$userId.';');
        if ($success) {
            $userId = $this->db->lastInsertRowid();
            return $userId;
        } else {
            //couldn't create the user - not unique
            return FALSE;
        }
    }

    function AddPref ($name, $defaultValue) {
        $this->db->query('INSERT INTO prefs (name, default_value) VALUES ("'.$name.'","'.$defaultValue.'");');
        return $this->db->lastInsertRowid();
    }

    function SetUserPref($userId, $pref, $value) {
        $prefId = $this->db->SingleQuery('select prefid from prefs where name = "'.$pref.'"');

        // use default value from prefs table if value is not supplied.
        if ($value == '') {
            $result = $this->db->SingleQuery('SELECT default_value FROM prefs WHERE prefid='.$prefId.';');
            if ($result) {
                 $value = $result;
            }
        }
        //determine if the pref already exists for this user
        $test = $this->db->query('SELECT userid FROM user_prefs WHERE userid='.$userId.
                                 ' AND prefid='.$prefId.';');
        if ($test->numRows()) {
            $this->db->queryExec('UPDATE user_prefs SET value="'.$value.'" WHERE userid='.
                                 $userId.' AND prefid='.$prefId.';');
        }else{
            $this->db->queryExec('INSERT INTO user_prefs (userid, prefid, value) VALUES ('.
                                 $userId.', '.$prefId.', "'.$value.'");');
            return $this->db->lastInsertRowid();
        }
    }

    function AddUserPref ($userId, $prefId, $value) {
        $this->db->queryExec('INSERT INTO user_prefs (userid, prefid, value) VALUES ('.$userId.', '.$prefId.', "'.$value.'");');
        return $this->db->lastInsertRowid();
    }

    function Login($username, $password) {
        $user = FALSE;
        $encryptedPassword = crypt($password, SALT);
        $result = $this->db->query('SELECT userid FROM users WHERE username = "'.$username.'" and password = "'.$encryptedPassword.'" and disabled = 0 and resetkey = '."''".';');
        try {
            if ($result) {
                $aRow = $result->fetch(SQLITE_ASSOC);
                $user = $this->GetUser($aRow['userid']);
            } else {
                //user was logged in by the MapGuide server if we got to here, we
                //need to kick them out.
                global $sessionID;
                $user = new MgUserInformation("Anonymous", "");
                $user->SetMgSessionId($sessionID);
            }
        } catch(MgException $e) {
            return "<Error>Login failed.</Error>";
        }
        return $user;
    }

    //
    //TODO secure these functions so only admin can get values
    //
    function GetUserPrefs($userId) {
        $result = $this->db->query('SELECT * from user_prefs, prefs WHERE userid = '.$userId.' AND user_prefs.prefid = prefs.prefid;');
        return $result->FetchAll(SQLITE_ASSOC);
    }

    function GetUsers() {
        $result = $this->db->query('SELECT * FROM users;');
        return $result->FetchAll(SQLITE_ASSOC);
    }

    function GetPrefs() {
        $result = $this->db->query('SELECT prefid, name, default_value FROM prefs;');
        return $result->FetchAll(SQLITE_ASSOC);
    }

    function GetUserFolderHeader($user){
        $szContent = sprintf('<?xml version="1.0" encoding="utf-8"?>
        <ResourceFolderHeader xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xsi:noNamespaceSchemaLocation="ResourceFolderHeader-1.0.0.xsd">
          <Security xsi:noNamespaceSchemaLocation="ResourceSecurity-1.0.0.xsd">
            <Inherited>false</Inherited>
            <Users>
              <User>
                <Name>%s</Name>
                <Permissions>r,w</Permissions>
              </User>
            </Users>
          </Security>
        </ResourceFolderHeader>',$user);
        return $szContent;
    }

    /* remove all managed users */
    function Clean() {
        $aUsers = $this->GetUsers();
        foreach ($aUsers as $user) {
            $this->DeleteUser($user['userid'], $user['username']);
        }
    }

    /* enumerate groups - this requires admin privileges */
    function GetGroups($username=NULL) {
        $aGroups = array();
        try {
            $user = new MgUserInformation(MG_ADMIN_USER, MG_ADMIN_PASSWD);
            $siteConnection = new MgSiteConnection();
            $siteConnection->Open($user);
            $site = $siteConnection->GetSite();
            if ($username) {
                $byteReader = $site->EnumerateGroups($username, '');
            } else {
                $byteReader = $site->EnumerateGroups();
            }
            $xmldoc = new DOMDocument();
            $xmldoc->loadXML(ByteReaderToString($byteReader));
            $groupNodeList = $xmldoc->getElementsByTagName('Group');
            for ($i=0; $i<$groupNodeList->length; $i++) {
                $group = $groupNodeList->item($i);
                $nameElt = $group->getElementsByTagName('Name');
                $name = $nameElt->item(0)->nodeValue;
                $descElt = $group->getElementsByTagName('Description');
                $description = $descElt->item(0)->nodeValue;
                array_push($aGroups, array('name'        => $name,
                                           'description' => $description));
            }
        } catch (MgException $e) {
            echo "ERROR: " . $e->GetExceptionMessage() . "\n";
            echo $e->GetDetails() . "\n";
            echo $e->GetStackTrace() . "\n";
        }
        return $aGroups;
    }

    function AddGroup($name, $description) {
        try {
            $user = new MgUserInformation(MG_ADMIN_USER, MG_ADMIN_PASSWD);
            $siteConnection = new MgSiteConnection();
            $siteConnection->Open($user);
            $site = $siteConnection->GetSite();
            $site->AddGroup($name, $description);
        } catch (MgException $e) {
            return FALSE;
        }
        return TRUE;
    }

    function RemoveGroup($group) {
        try {
            $user = new MgUserInformation(MG_ADMIN_USER, MG_ADMIN_PASSWD);
            $siteConnection = new MgSiteConnection();
            $siteConnection->Open($user);
            $site = $siteConnection->GetSite();
            $groups = new MgStringCollection();
            $groups->Add( $group ) ;
            $site->DeleteGroups($groups);
        } catch (MgException $e) {
            echo "ERROR: " . $e->GetExceptionMessage() . "\n";
            echo $e->GetDetails() . "\n";
            echo $e->GetStackTrace() . "\n";
            return FALSE;
        }
        return TRUE;

    }

    function AddUserToGroup($group, $username) {
        try {
            $user = new MgUserInformation(MG_ADMIN_USER, MG_ADMIN_PASSWD);
            $siteConnection = new MgSiteConnection();
            $siteConnection->Open($user);
            $site = $siteConnection->GetSite();
            $userToGrant = new MgStringCollection();
            $userToGrant->Add( $username ) ;
            $groupToUpdate = new MgStringCollection();
            $groupToUpdate->Add( $group );
            $site->GrantGroupMembershipsToUsers($groupToUpdate, $userToGrant);
        } catch (MgException $e) {
            echo "ERROR: " . $e->GetExceptionMessage() . "\n";
            echo $e->GetDetails() . "\n";
            echo $e->GetStackTrace() . "\n";
            return FALSE;
        }
        return TRUE;
    }

    function RemoveUserFromGroup($group, $username) {
        try {
            $user = new MgUserInformation(MG_ADMIN_USER, MG_ADMIN_PASSWD);
            $siteConnection = new MgSiteConnection();
            $siteConnection->Open($user);
            $site = $siteConnection->GetSite();
            $userToRemove = new MgStringCollection();
            $userToRemove->Add( $username ) ;
            $groupToUpdate = new MgStringCollection();
            $groupToUpdate->Add( $group );
            $site->RevokeGroupMembershipsFromUsers($groupToUpdate, $userToRemove);
        } catch (MgException $e) {
            return FALSE;
        }
        return TRUE;
    }


    function GetUser($id) {
        $user = FALSE;
        if (!empty($id)) {
          $result = $this->db->query("SELECT * FROM users where userid = $id;");
          if ($result) {
              $a = $result->fetch();
              $result = $this->db->query('SELECT * from user_prefs, prefs WHERE userid = '.$id.' AND user_prefs.prefid = prefs.prefid;');
              $prefs = array();
              if ($result) {
                  while ($pref = $result->fetch()) {
                      array_push($prefs, array('name'=>$pref['prefs.name'], 'value'=>$pref['user_prefs.value']));
                  }
              }
              $groups = array();
              $aGroups = $this->GetGroups($a['username']);
              for ( $i=0; $i < count($aGroups); $i++) {
                  array_push($groups, $aGroups[$i]['name']);
              }
              $user = new FusionUser($a['userid'], $a['username'], $a['email'], $prefs, $groups );
          }
        }
        return $user;
    }

    function GetUserByName($username) {
        $user = FALSE;
        $result = $this->db->query('SELECT * FROM users where username = "'.$username.'";');
        if ($result) {
            $a = $result->fetch();
            $user = $this->GetUser($a['userid']);

        }
        return $user;
    }

    function GetUserByEmail($email) {
        $user = FALSE;
        $result = $this->db->query('SELECT * FROM users where email = "'.$email.'";');
        if ($result) {
            $a = $result->fetch();
            $user = $this->GetUser($a['userid']);
        }
        return $user;
    }

    function GetUserByKey($key) {
        $user = FALSE;
        $result = $this->db->query('SELECT * FROM users where resetkey = "'.$key.'";');
        if ($result) {
            $a = $result->fetch();
            $user = $this->GetUser($a['userid']);
        }
        return $user;
    }

    function ResetPassword($id) {
        $uuid = uuid();
        $this->db->query('UPDATE users SET resetkey = "'.$uuid.'" where userid = '.$id);
        return $uuid;
    }

    function SetPassword($id, $password) {
        $encryptedPassword = crypt($password, SALT);
        $success = $this->db->queryExec('UPDATE users SET password = "'.$encryptedPassword.'", resetkey = "" where userid = '.$id);

        $user = $this->GetUser($id);
        if ($success) {
            $adminUser = new MgUserInformation(MG_ADMIN_USER, MG_ADMIN_PASSWD);
            $siteConnection = new MgSiteConnection();
            $siteConnection->Open($adminUser);
            $site = $siteConnection->GetSite();

            $site->UpdateUser( $user->userName(), "", $user->userName(), $password, "" );
        } else {
            echo "/* failed to update user password */";
        }

        return $success;
    }
}

class FusionUser {
    private $username = '';
    private $id = -1;
    private $email = '';
    private $preferences = array();

    function __construct($id, $username, $email, $preferences, $groups) {
        $this->id = $id;
        $this->username = $username;
        $this->email = $email;
        $this->preferences = $preferences;
        $this->groups = $groups;
    }

    function userName() {
        return $this->username;
    }

    function id() {
        return $this->id;
    }

    function email() {
        return $this->email;
    }

    function preferences() {
        return $this->preferences;
    }

    function toXML() {
        $result = '';
        $result .= "<User>\n";
        $result .= "<UserName>".$this->userName()."</UserName>\n";
        $result .= "<UserId>".$this->id()."</UserId>\n";        $result .= "<Email>".$this->email()."</Email>\n";
        $result .= "<Preferences>\n";
        foreach($this->preferences() as $pref) {
            $result .= "<Preference>\n";
            $result .= "<Name>".$pref['name']."</Name>\n";
            $result .= "<Value>".$pref['value']."</Value>\n";
            $result .= "</Preference>\n";
        }
        $result .= "</Preferences>\n";
        $result .= "<Groups>\n";
        foreach($this->groups as $group) {
            $result .= "<Group>$group</Group>\n";
        }
        $result .= "</Groups>\n";
        $result .= "</User>\n";
        return $result;
    }
}

function Test() {
    $manager = new MGUserManager(NULL);
    $prefId = $manager->AddPref('map', 'Sheboygan');
    $prefId2 = $manager->AddPref('color', 'Blue');
    $userId = $manager->AddUser('bob', 'foo', 'Bob', 'Loblaws');
    if (!$userId) {
        echo "<error>User could not be created</error>";
        exit;
    }
    $manager->AddUserPref($userId, $prefId, 'MyMap');
    $manager->AddUserPref($userId, $prefId2, 'Red');
    $manager->SetUserPref($userId, $prefId, 'MyMapModified');

    echo $manager->Login('bob', 'foo');

    $manager->DeleteUser($userId, 'bob');

}

function uuid()
{
   // version 4 UUID
   return sprintf(
       '%08x-%04x-%04x-%02x%02x-%012x',
       mt_rand(),
       mt_rand(0, 65535),
       bindec(substr_replace(
           sprintf('%016b', mt_rand(0, 65535)), '0100', 11, 4)
       ),
       bindec(substr_replace(sprintf('%08b', mt_rand(0, 255)), '01', 5, 2)),
       mt_rand(0, 255),
       mt_rand()
   );
}
?>
