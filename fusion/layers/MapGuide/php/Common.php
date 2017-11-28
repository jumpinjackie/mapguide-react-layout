<?php
/**
 * Common
 *
 * $Id: Common.php 2951 2016-07-27 12:53:56Z jng $
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
 * Purpose: common include file for all server side scripts, responsible for
 *          setting up the user and site connection.
 *****************************************************************************/

/*
 * If MapGuide Web Server Extensions are not installed in the default
 * location, you may need to edit these values to reflect the actual
 * installation path.  You do not need to modify any other values in
 * this file to configure Fusion.
 */

$defaultExtensionDir = dirname(__FILE__)."/../../../../";
$defaultInstallDir = realpath($defaultExtensionDir)."/../../";
$initializationErrorOccurred = false;
$initializationErrorMessage = null;
$initializationErrorStackTrace = null;
$initializationErrorDetail = null;

/**
 * Developer's notes:
 *
 * This file should be included by all server-side scripts.  It includes some
 * default paths to install locations and manages all session-related and
 * user-related stuff except for actually creating a session.
 *
 * It also creates a MgResourceService instance for use by other scripts
 * and recreates an MgMap instance from the session if a mapname is passed.
 *
 * For widgets that are installed outside of the Fusion directory structure,
 * the value of $extensionDir can be set before including this script to avoid
 * some problems.
 */

//widgets outside Fusion can set the $extensionDir before including Common.php
//TODO: I don't think this is necessary anymore (PS)
if (!isset($extensionDir)){
    $installDir = $defaultInstallDir;
    $extensionDir = $defaultExtensionDir;
}

include dirname(__FILE__)."/Constants.php";
// Initialize

try
{
    MgInitializeWebTier($extensionDir. "/webconfig.ini");

    /* If no session has been established yet, then we use the credentials passed
     * to this script to connect to the site server.  By default, we use the
     * Anonymous user.
     */
    if (!isset($_REQUEST['session'])) {
        $username = isset($_REQUEST['username']) ? $_REQUEST['username'] : 'Anonymous';
        $password = isset($_REQUEST['password']) ? $_REQUEST['password'] : '';
        $user = new MgUserInformation($username, $password);
        $user->SetClientIp(GetClientIp());
        $user->SetClientAgent(GetClientAgent());
        $siteConnection = new MgSiteConnection();
        $siteConnection->Open($user);
    } else {
        /* If a session has previously been established, we can connect using the
         * credentials that the user logged in with previously ... these are stored
         * in the MapGuide session.
         * It is possible for the user to re-authenticate using a different set of
         * credentials.  Handle this here, but keep the session the same.
         */
        $sessionID = $_REQUEST['session'];
        session_id(str_replace('_', '-', $sessionID));
        session_start();

        /* current user is re-authenticating or not? */
        if (isset($_REQUEST['username']) && isset($_REQUEST['password'])) {
            $user = new MgUserInformation($_REQUEST['username'], $_REQUEST['password']);
            $user->SetClientIp(GetClientIp());
            $user->SetClientAgent(GetClientAgent());
            $user->SetMgSessionId($sessionID);
        } else {
            $user = new MgUserInformation($sessionID);
            $user->SetClientIp(GetClientIp());
            $user->SetClientAgent(GetClientAgent());
        }

        /* open a connection to the site.  This will generate exceptions if the user
         * is set up properly - not found, invalid password etc
         */
        $siteConnection = new MgSiteConnection();
        $siteConnection->Open($user);

        /* MgUserInformation doesn't tell us who is logged in so we store it
         * in the php session for convenience
         */
        if (isset($_REQUEST['username']) && isset($_REQUEST['password'])) {
            $_SESSION['username'] = $_REQUEST['username'];
        }
        //echo "<current user: >".$_SESSION['username']. '</current>';
    }

    //common resource service to be used by all scripts
    $resourceService = $siteConnection->CreateService(MgServiceType::ResourceService);

    if (isset($_REQUEST['mapname'])) {
        $mapName = $_REQUEST['mapname'];
        $mapResourceID = new MgResourceIdentifier( 'Session:'.$sessionID.'//'.$mapName.'.MapDefinition');
        $mapStateID = new MgResourceIdentifier('Session:'.$sessionID.'//'.$mapName.'.'.MgResourceType::Map);
    }

}
catch (MgException $e)
{
    $initializationErrorMessage = $e->GetExceptionMessage();
    $initializationErrorDetail = $e->GetDetails();
    $initializationErrorStackTrace = $e->GetStackTrace();
    $initializationErrorOccurred = true;
    //echo "{success: false, message:'".$initializationErrorMessage."'}";
    //DisplayInitializationErrorHTML();
}

function InitializationErrorOccurred()
{
    global $initializationErrorOccurred;
    return $initializationErrorOccurred;
}

function DisplayInitializationErrorHTML()
{
    global $initializationErrorMessage, $initializationErrorDetail;
    echo "<table class=\"RegText\" border=\"0\" cellspacing=\"0\" width=\"100%\">";
    echo "<tr><td class=\"Title\">Error<hr></td></tr>";
    if($initializationErrorMessage != null)
    {
        $message = $initializationErrorMessage;
        while(strpos($message, '\n'))
        {
            $message = str_replace('\n', '<br/>', $message);
        }
        echo "<tr><td>" . $message . "</td></tr>";
    }
    if ($initializationErrorDetail != null && (strlen($initializationErrorDetail) - strlen($initializationErrorMessage) > 4))
    {
        $detail = $initializationErrorDetail;
        while(strpos($detail, '\n'))
        {
            $detail = str_replace('\n', '<br/>', $detail);
        }
        echo "<tr><td>" . $detail . "</td></tr>";
    }
    echo "</table>";
}

function DisplayInitializationErrorText()
{
    global $initializationErrorMessage, $initializationErrorDetail, $initializationErrorStackTrace;
    echo "ERROR: " . $initializationErrorMessage . "\n";
    echo $initializationErrorDetail . "\n";
    echo $initializationErrorStackTrace . "\n";
}

function GetDefaultLocale()
{
    return "en"; // localizable string
}

function GetLocalizationPath()
{
    $thisFile = __FILE__;
    $pos = strrpos($thisFile, '\\');
    if ($pos == false)
        $pos = strrpos($thisFile, '/');
    return substr($thisFile, 0, $pos+1) . "../../../text/";
}

function FormatMessage($id, $locale, $params)
{
    $text = GetLocalizedString($id, $locale);
    for($i = 0; $i < count($params); $i++)
    {
        $tag = "{" . $i . "}";
        $pos1 = strpos($text, $tag);
        if($pos1 == false)
            break;
        if($pos1 > 0)
            $begin = substr($text, 0, $pos1);
        else
            $begin = "";
        $end = substr($text, $pos1 + strlen($tag));
        $text = $begin . $params[$i] . $end;
    }
    return $text;
}

function GetSurroundVirtualPath()
{
    if (isset($_SERVER["REQUEST_URI"]))
    {
        $path = $_SERVER["REQUEST_URI"];
        $baseuri = substr($path, 0, strrpos($path, '?') + 1);
    }
    else
    {
        $baseuri = $_SERVER["PHP_SELF"];
    }

    return substr($baseuri, 0, strrpos($baseuri, '/') + 1);
}

function GetRootVirtualFolder()
{
    if (isset($_SERVER["REQUEST_URI"]))
    {
        $path = $_SERVER["REQUEST_URI"];
        $baseuri = substr($path, 0, strrpos($path, '?') + 1);
    }
    else
    {
        $baseuri = $_SERVER["PHP_SELF"];
    }

    return substr($baseuri, 0, strpos($baseuri, '/', 1));
}

function GetClientOS() {
    if(!isset($_SERVER['HTTP_USER_AGENT']))
        return 0;
    $agent = $_SERVER['HTTP_USER_AGENT'];
    if(strpos($agent, "Windows") != FALSE)
        return 0;
    else if(strpos($agent, "Macintosh") != FALSE)
        return 1;
    return 2;
}

function EscapeForHtml($str)
{
    $org = array("'", "\"", "\n", "<", ">");
    $repl = array("&#39;", "&quot;", " ", "&lt;", "&gt;" );
    return str_replace($org, $repl, $str);
}

function GetDecimalFromLocalizedString($numberString, $locale)
{
    if($locale != null && $numberString != null)
    {
        // Remove thousand separators
        $thousandSeparator = GetLocalizedString("THOUSANDSEPARATOR", $locale);
        if($thousandSeparator != null && strlen($thousandSeparator) > 0)
        {
            $numberString = str_replace($thousandSeparator, "", $numberString);
        }

        // Replace localized decimal separators with "."
        $decimalSeparator = GetLocalizedString("DECIMALSEPARATOR", $locale);
        if($decimalSeparator != null && strlen($decimalSeparator) > 0 && $decimalSeparator != ".")
        {
            $numberString = str_replace($decimalSeparator, ".", $numberString);
        }
    }
    return $numberString;
}

function GetClientIp()
{
    $clientIp = '';
    if (array_key_exists('HTTP_CLIENT_IP', $_SERVER)
        && strcasecmp($_SERVER['HTTP_CLIENT_IP'], 'unknown') != 0)
    {
        $clientIp = $_SERVER['HTTP_CLIENT_IP'];
    }
    else if (array_key_exists('HTTP_X_FORWARDED_FOR', $_SERVER)
        && strcasecmp($_SERVER['HTTP_X_FORWARDED_FOR'], 'unknown') != 0)
    {
        $clientIp = $_SERVER['HTTP_X_FORWARDED_FOR'];
    }
    else if (array_key_exists('REMOTE_ADDR', $_SERVER))
    {
        $clientIp = $_SERVER['REMOTE_ADDR'];
    }
    return $clientIp;
}

function GetClientAgent()
{
    return "Fusion Viewer";
}

// Builds a MgFeatureQueryOptions with an explicit property list based
// on the given class definition
//
// This is to ensure that a "select * from featureclass" query from relational
// providers will have its column list bounded to what is recognized in the
// class definition. Some providers are known to produce "select * from table"
// queries that "leak" out column types that the provider does not know how to
// process. Using an explicit property list from its class definition will
// allow us to avoid such issues
function BuildFeatureQueryOptions($classDef)
{
    $query = new MgFeatureQueryOptions();
    $geomPropName = $classDef->GetDefaultGeometryPropertyName(); 
    $propertyList = $classDef->GetProperties(); 

    for ($i = 0; $i < $propertyList->GetCount(); $i++) 
    {
        $propertyDef = $propertyList->GetItem($i); 
        $property = $propertyList->GetItem($i)->GetName(); 

        if (($property != $geomPropName) && ($propertyDef->GetPropertyType() == MgFeaturePropertyType::DataProperty)) 
        { 
            $propertyType = $propertyList->GetItem($i)->GetDataType(); 
            switch ($propertyType) { 
                case MgPropertyType::Boolean: 
                    $query->AddFeatureProperty($property); 
                    break; 
                case MgPropertyType::Byte: 
                    $query->AddFeatureProperty($property); 
                    break; 
                case MgPropertyType::DateTime: 
                    $query->AddFeatureProperty($property); 
                    break; 
                case MgPropertyType::Single: 
                    $query->AddFeatureProperty($property); 
                    break; 
                case MgPropertyType::Double: 
                    $query->AddFeatureProperty($property); 
                    break; 
                case MgPropertyType::Int16: 
                    $query->AddFeatureProperty($property); 
                    break; 
                case MgPropertyType::Int32: 
                    $query->AddFeatureProperty($property); 
                    break; 
                case MgPropertyType::Int64: 
                    $query->AddFeatureProperty($property); 
                    break; 
                case MgPropertyType::String: 
                    $query->AddFeatureProperty($property); 
                    break; 
            }
        } else if ($property == $geomPropName){ 
            $query->AddFeatureProperty($property); 
        } 
    }
    return $query;
}

?>
