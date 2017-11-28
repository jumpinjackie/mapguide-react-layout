<?php
/**
 * Session
 *
 * $Id: Session.php 2410 2011-07-05 19:09:52Z pagameba $
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
 * Purpose: Directory-based PHP session capability
 *****************************************************************************
 *
 * This code was taken from the php_utils cvs module maintained on 
 * cvs.maptools.org/cvs/maptools/cvsroot. Version 1.1 of this file was an 
 * exact copy of 1.29 except for the comment block at the top.
 *
 * Developer's notes:
 *
 * This file has been updated to work with PHP 5.3 it includes a more robust locking
 * for cross platform.
 *
 * Include this file and call installSessionDirectoryHandler() before starting
 * a session.
 *
 * Call initializeSession() to start or restart a session.
 *
 * Session-based resources can be saved in the directory returned from
 * getSessionSavePath().
 *
 * Note the old GC cleanup does not function correctly, Honestly I don't think we should cleanup with php
 * a support script should be used on the server to cleanup old sessions. 
 *
 */

global $gszSessSavePath;
global $gszSessName;
global $gSzSessionDebug;
global $gszLockFile;
global $gszSessId;
global $bLockSession;

$gSzSessionDebug = FALSE;
$bLockSession = FALSE;

if (!function_exists('time_sleep_until')) {
   function time_sleep_until($future) {
       if ($future < time()) {
           trigger_error("Time in past", E_USER_WARNING);
           return false;
       }

       usleep(($future - microtime(1))*1000000);
       return true;
   }
}


if (!function_exists("_open")) {
  /**
   * _open Called by PHP session manager when a session is opened.
   * We just set the save path and session name into global variable.
   *
   * @param szSavePath String containing the absolute path where to
   *        save session info.
   * @param szSessionName String contqaining the session name.
   */
    function _open($szSavePath, $szSessionName){
        
        debug_msg(" _open: ".$_SERVER['PHP_SELF']);
        $GLOBALS['gszSessSavePath'] = $szSavePath;
        $GLOBALS['gszSessName'] = $szSessionName;
        $GLOBALS['gszSessId'] = session_id();
        $GLOBALS['gszLockFile'] = $GLOBALS['gszSessSavePath']."/sess_".$GLOBALS["gszSessId"]."/lock";
        
        // Check to see if the session locked already.
        _checkLock();

        // Create the session folder if it doesn't already exists.
        $szSessionDir = $GLOBALS['gszSessSavePath']."/sess_".$GLOBALS['gszSessId'];
        clearstatcache();
        if (!file_exists($szSessionDir)){
            mkdir($szSessionDir);
        }

        // If the session is locked wait.
        if ($GLOBALS['bLockSession']) {
            $start_time = microtime(true);
            $end_time = $start_time + microtime(true) + (ini_get("max_execution_time") -2); // end time is 2 seconds less then the max_execution_time
            while ($start_time < $end_time  ){ 
                debug_msg("BLOCKING");
                if (!_isLocked()){
                    // Free now set the lock.
                    _setLock();
                    break;
                }
                time_sleep_until(microtime(true)+0.01); // sleep for 10ms
                $start_time = microtime(true);
            }
        }
        else
        {
        // session is already free set a lock
        _setLock();
        }
        return(true);
    }
    /**
    * __isLocked() called to check if the session locked returns a boolean
    *
    */
    function _isLocked(){
        clearstatcache();
        if(file_exists($GLOBALS['gszLockFile'])){
            debug_msg("LOCKED");
            return true;
        }
        else
        {
            debug_msg("UNLOCKED");
            return false;
        }
    }

    /**
    * _setLock() creates a lockfile and sets the global 'bLockSession' to true
    */
    function _setLock(){
        debug_msg(" _setLock: ".$_SERVER['PHP_SELF']);
        $GLOBALS['bLockSession'] = true;
        clearstatcache();
        if(!file_exists($GLOBALS['gszLockFile'])){
            $fh = fopen( $GLOBALS['gszLockFile'], "w+" );
            if ($fh !== false){
                fwrite( $fh, "1" );
                fclose($fh);
            }
        }
    }
    /**
    * _checkLock() used on init to see if another process already has a lock on this session.
    */
    function _checkLock(){
        if(_isLocked()){
            $GLOBALS['bLockSession'] = true;
        }
        else
        {
            $GLOBALS['bLockSession'] = false;
        }
    }

    /**
    * _freeLock() deletes the locfile and sets the global 'bLockSession' to false
    */
    function _freeLock(){
        debug_msg(" _freeLock: ".$_SERVER['PHP_SELF']);
        debug_msg("FREE LOCK");
        if(file_exists($GLOBALS['gszLockFile'])){
            unlink($GLOBALS['gszLockFile']);
        }
        $GLOBALS['bLockSession'] = false;
    }

  /**
   * _close Called by PHP session manager when a session is closed,
   * not destroyed. In this case we do nothing.
   */
  function _close(){
      debug_msg(" _close: ".$_SERVER['PHP_SELF']);
      if ($GLOBALS['bLockSession']){
          if ( _isLocked()  ){
              _freeLock();
          }
      }
      return(true);
  }

  /**
   * _read Called by PHP session manager when the session file
   * is read. In this case we just return the file content of
   * session_file file.
   */
  function _read($szId){
      _setLock();
     debug_msg(" _read: ".$_SERVER['PHP_SELF']);
    $GLOBALS["gszSessId"] = $szId;

    $szSessionDir = $GLOBALS['gszSessSavePath']."/sess_".$szId;
    $szSessionFile = $szSessionDir."/session_file";

    clearstatcache();
    if (!file_exists($szSessionDir)){
        mkdir($szSessionDir);
    }

    if ($fp = @fopen($szSessionFile, "r")){
        $szSessionData = fread($fp, filesize($szSessionFile));
        fclose( $fp );
        debug_msg($szSessionData);
        return($szSessionData);
    }
    else
    {
        return(""); // Must return "" here.
    }
}

  /**
   * _write Called by PHP session manager when session should be
   * saved.
   *
   * @param szId String containing the unique identifier of current
   *             session.
   * @param szSessionData String containig the session file content
   *                      to be saved.
   */
  function _write($szId, $szSessionData){
      _setLock();
      debug_msg(" _write: ".$_SERVER['PHP_SELF']);
      $result = false;

      $szSessionFile = $GLOBALS['gszSessSavePath']."/sess_".$szId."/session_file";

      if ($fp = @fopen($szSessionFile, "w")) {
          $result = fwrite($fp, $szSessionData);
          fclose($fp);
          return($result);
      }
      else
      {
        return false;
      }
      
  }

  /**
   * _destroy Called by PHP session manager when it should be explicitly
   * destroyed now.
   */
    function _destroy($szId){
        debug_msg(" _destroy: ".$_SERVER['PHP_SELF']);
        if ( @is_file( $GLOBALS['gszLockFile'] )){
            @unlink( $GLOBALS['gszLockFile'] );
        }
        return true;
    }

  /**
   * _gc Called by PHP session manager when a session is started or
   * register (not all the time) depending og session.gc_probability
   */
  function _gc($nMaxLifeTime){
      debug_msg(" _gc: ".$_SERVER['PHP_SELF']);

      if ($GLOBALS['gszGarbageColectionCallBackFunction'] != ""){
          if (function_exists($GLOBALS['gszGarbageColectionCallBackFunction']))
              eval($GLOBALS['gszGarbageColectionCallBackFunction']);
      }

      $bReturn = true;

      if (!$hDir = @opendir($GLOBALS['gszSessSavePath'])){
          return false;
      }

      while($szFile = readdir($hDir)){
          if (!strstr($szFile,'sess_'))
              continue;

          if (strpos($szFile,'sess_') != 0)
              continue;

          $szSessionDir = $GLOBALS['gszSessSavePath']."/".$szFile;
          $szSessionFile = $szSessionDir."/session_file";

          if (!($mtime = @filemtime($szSessionFile))){
              $bReturn=false;
              continue;
          }

          if (time() > $mtime + $nMaxLifeTime){
              $bReturn = (deleteDirectory($szSessionDir)) ? $bReturn : false;
          }
          closedir($hDir);
          return $bReturn;
      }
  }


  function deleteDirectory($szFile){
      debug_msg("deleteDirectory: called from:".$_SERVER['PHP_SELF']);
      if (is_dir($szFile)){
          debug_msg("DELETE:".$szFile);
          $handle = opendir($szFile);
          while($szFileName = readdir($handle)){
              if ($szFileName != "." && $szFileName != ".."){
                  deleteDirectory($szFile."/".$szFileName);
              }
          }
          closedir($handle);
          rmdir($szFile);
      }
      else
      {
          unlink($szFile);
      }
  }

  function installSessionDirectoryHandler($szGCCallBack=""){
      debug_msg(" installSessionDirectoryHandler: ".$_SERVER['PHP_SELF']);
      if (!isset($GLOBALS['gszSessionDirectoryHandlerInstalled'])) {
          $GLOBALS['gszGarbageColectionCallBackFunction'] = $szGCCallBack;          
          // Set handler functions
          session_set_save_handler("_open",
                                  "_close",
                                  "_read",
                                  "_write",
                                  "_destroy",
                                  "_gc");
          $GLOBALS['gszSessionDirectoryHandlerInstalled'] = true;
      }
  }

function initializeSession( $szSessName="sid", $szSessSavePath="", $szSessionID="" ){
    debug_msg(" initializeSession: ".$_SERVER['PHP_SELF']);
    if($szSessName != ""){
        debug_msg("session.name".$szSessName);
        ini_set("session.name", $szSessName);
    }
    
    if($szSessSavePath != ""){
        debug_msg("session.save_path".$szSessSavePath);
        ini_set("session.save_path", $szSessSavePath);
    }

    clearstatcache();
    // Check if save path is writable
    if (!(file_exists(session_save_path()) &&
        is_writable(session_save_path()))){
            die("FATAL ERROR: Session save path (".session_save_path().") doesn't exist or is not writable");
    }

    $szTmpID = "";

    // check both get and post variables
    debug_msg("Checking GPC for session ...");
    if ( isset($GLOBALS['_COOKIE'][ini_get('session.name')]) ) {
        $szTmpID = $GLOBALS['_COOKIE'][ini_get('session.name')];
        debug_msg("_COOKIE:".$GLOBALS['_COOKIE'][ini_get('session.name')]);
    } elseif (isset($GLOBALS['_GET'][ini_get('session.name')])) {
        $szTmpID = $GLOBALS['_GET'][ini_get('session.name')];
        debug_msg("_GET:".$GLOBALS['_GET'][ini_get('session.name')]);
    } elseif (isset($GLOBALS['_POST'][ini_get('session.name')])) {
        $szTmpID = $GLOBALS['_POST'][ini_get('session.name')];
        debug_msg("_POST:".$GLOBALS['_POST'][ini_get('session.name')]);
    }
    debug_msg("szTmpID:".$szTmpID);

    // create new if necessary
    if ( strlen( $szTmpID ) <= 0 ){

        // create new and set IP flag
        if ( strlen( $szSessionID ) > 0 ){
            $szTmpID = $szSessionID;
        }
        else            
        {
            $szTmpID = uniqid("");
        }
        $bNewSession = true;
    }
    else
    {
        $bNewSession = false;
    }

    // initialize flag variable
    $bSessionOK = true;

    if (!$bNewSession){
        debug_msg("EXISTING Session");
    }
    else
    {
        debug_msg("NEW Session");
    }

    session_name($szSessName);
    $sessionID = session_id();
    if(empty($sessionID)){
        session_id( $szTmpID );
        session_start();
    }
    debug_msg($_SERVER['PHP_SELF']);

    register_shutdown_function( "session_write_close" );

    return $bSessionOK;
}

  function getSessionSavePath(){
      $szReturn  = ini_get("session.save_path")."/sess_".session_id()."/";
      $szReturn = str_replace( "\\", "/", $szReturn );
      return $szReturn;
  }

  function debug_msg( $szMsg ){
        global $gSzSessionDebug;
        if($gSzSessionDebug){
            
            list($usec, $sec) = explode(" ",microtime()); 
            $ts = sprintf( "%s.%4d", date( "H:s", $sec), round( 10000 * $usec )); 
            error_log($ts. " - ".$szMsg);
        }
  }


}
?>
