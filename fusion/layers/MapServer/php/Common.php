<?php
/**
 * Common
 *
 * $Id: Common.php 2346 2011-03-25 19:04:13Z madair $
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
 * Purpose: Common include file for PHP scripts implementing a server-side 
 *          component for MapServer
 *
 * Developer's notes:
 *
 * This file should be included by all server-side scripts.  It includes some
 * default paths to install locations and manages all session-related and 
 * user-related stuff except for actually creating a session.
 * 
 * Configuration: you may edit the following section if necessary
 */

$szPHPMapScriptModule = 'php_mapscript.'.PHP_SHLIB_SUFFIX;
$szGDModule = 'php_gd2.'.PHP_SHLIB_SUFFIX;

/*
 * End of configurable items.
 *
 * The remainder of this file just sets up a common environment for server-side
 * scripts.
 */
include(dirname(__FILE__).'/Session.php');
installSessionDirectoryHandler();

/* merge request vars.  $_REQUEST includes cookies in preference to get/post,
 * which we don't like */
$REQUEST_VARS = array_merge($_GET, $_POST);
 
/* Load mapscript */
if (!extension_loaded('MapScript')) {
    dl( $szPHPMapScriptModule );
    if (!extension_loaded('MapScript')) {
        die("Failed to load $szPHPMapScriptModule.  Please check configuration settings in ".__FILE__);
    }
}

/* handle restoring a session */
if (isset($REQUEST_VARS['session'])) {
    $sessionID = $REQUEST_VARS['session'];
    initializeSession( "session", "", $sessionID );
}

if (isset($REQUEST_VARS['mapname'])) { 
    $mapName = $REQUEST_VARS['mapname'];
}

?>
