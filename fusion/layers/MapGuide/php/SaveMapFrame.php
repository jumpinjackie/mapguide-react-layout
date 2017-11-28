<?php
/**
 * SaveMapFrame
 *
 * $Id: SaveMapFrame.php 1953 2009-10-26 16:17:47Z chrisclaydon $
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
 * Purpose:
 *****************************************************************************/
?><!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">

<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <script type="text/javascript" charset="utf-8">
    function Save(){
        setTimeout(function(){
            window.frames['theImage'].document.execCommand('SaveAs', true, "<?php echo $_REQUEST['mapname'].'.'.$_REQUEST['format']?>");
        },2500);
    };
    </script>
</head>
<body onload='Save()'>
<H4>Preparing Image for download...</H4>
<?php
include('Common.php');
if(InitializationErrorOccurred())
{
    DisplayInitializationErrorHTML();
    exit;
}
$szLayout="";
if (isset($_REQUEST['layout']) &&  $_REQUEST['layout'] != "") {
  $szLayout = "&layout=".$_REQUEST['layout'];
}
$szScale="";
if (isset($_REQUEST['scale']) &&  $_REQUEST['scale'] != "") {
  $szScale = "&scale=".$_REQUEST['scale'];
}
$szPageHeight="";
if (isset($_REQUEST['pageheight']) &&  $_REQUEST['pageheight'] != "") {
  $szPageHeight = "&pageheight=".$_REQUEST['pageheight'];
}
$szPageWidth="";
if (isset($_REQUEST['pagewidth']) &&  $_REQUEST['pagewidth'] != "") {
  $szPageWidth = "&pagewidth=".$_REQUEST['pagewidth'];
}
$szPageMargins="";
if (isset($_REQUEST['margins']) &&  $_REQUEST['margins'] != "") {
  $szPageMargins = "&margins=".$_REQUEST['margins'];
}

echo "<iframe style='visibility: hidden;' id='theImage' src='SaveMap.php?format=".trim($_REQUEST['format'])."&mapname=".$_REQUEST['mapname']."&session=".$_REQUEST['session']. $szLayout . $szScale . $szPageHeight . $szPageWidth . $szPageMargins . "'></iframe>";
?>
</body>
</html>
