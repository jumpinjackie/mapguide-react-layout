<?php
/**
 * CreateSession
 *
 * $Id: CreateSession.php 2827 2014-02-08 17:41:35Z jng $
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
 * Purpose: initialize a server-side session for GMap and return to the client
 *****************************************************************************/

include('Common.php');
if(InitializationErrorOccurred())
{
    //If initialization error occurred, then the error JSON has already been written
    //so just exit.
    exit;
}
include('Utilities.php');
include('../../../common/php/Utilities.php');

try {
    $site = $siteConnection->GetSite();
    $sessionId =  $site->CreateSession();
    $user->SetMgSessionId($sessionId);

    header('Content-type: application/json');
    header('X-JSON: true');
    $result = new stdClass();
    $result->sessionId = $sessionId;
    $result->userName = $username;
    $result->siteVersion = GetSiteVersion();
    $result->acceptLanguage = $_SERVER['HTTP_ACCEPT_LANGUAGE'];
    echo var2json($result);

    /* start a php session in the web tier as well, using same session id */
    session_id(str_replace('_', '-', $sessionId));
    session_start();
    $_SESSION['username'] = $username;
    loadFusionConfig();

} catch (MgException $e) {
     echo "ERROR: " . $e->GetExceptionMessage() . "n";
     echo $e->GetDetails() . "n";
     echo $e->GetStackTrace() . "n";
}
?>