<?php
/**
 * LegendIcon
 *
 * $Id: LegendIcon.php 2249 2010-10-19 14:31:05Z madair $
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
 * Purpose: Draw a legend icon
 *****************************************************************************/

/* set up the session */
include(dirname(__FILE__).'/../../../common/php/Utilities.php');
include(dirname(__FILE__).'/Common.php');
include(dirname(__FILE__).'/Utilities.php');

if (!isset($mapName)) {
    die('mapname not set');
}

$mapFile = getSessionSavePath().$mapName.".map";
$str = file_get_contents($mapFile);
$legendIconCacheFile = "";

if ($str) {
      $configObj = $_SESSION['fusionConfig'];
      /* if the legendIconCache dir is set */
      if (isset($configObj->mapserver->legendIconCacheDir)) {
        $legendIconCacheDir = $configObj->mapserver->legendIconCacheDir;

        // check for closing '/'
        $legendIconCacheDir = str_replace( '\\', '/', trim( $legendIconCacheDir ) );
        if ( substr( $legendIconCacheDir, -1 ) != '/' )
        {
            $legendIconCacheDir .= '/';
        }

        $cacheLegendIcons = true;
        //$str = file_get_contents($_SESSION['maps'][$mapName]);
        /* create a unique location for the map icons based on
         * the content of the of map file.  If the content changes
         * then the icons should be rebuilt anyway
         */
        $legendIconCacheDir = $legendIconCacheDir.md5($str)."/";
        if (!is_dir($legendIconCacheDir)) {
          mkdir($legendIconCacheDir);
        }
        /* TODO: can we figure out what the content type is? */
        $legendIconCacheFile = $legendIconCacheDir."_".$REQUEST_VARS['layername']."_".$REQUEST_VARS['classindex'].".png";
        /* if the icon exists, return it */
        if (file_exists($legendIconCacheFile)) {
            /* TODO: can we figure out what the content type is? */
            header('Content-type: image/png');
            $etag = '"' . md5_file($legendIconCacheFile) . '"';
            header ("ETag: " . $etag );
            $cache_time = mktime(0, 0, 0, 1, 1, 2004);
            $expires = 3600 * 256;
            header("last-modified: " . gmdate("D, d M Y H:i:s",$cache_time) . " GMT");
            $inm = split(',', getenv("HTTP_IF_NONE_MATCH"));
            $send_body = true;
            foreach ($inm as $i) {
            	  if (trim($i) == $etag || trim($i) == $cache_time) {
            		    header ("HTTP/1.0 304 Not Modified");
            		    $send_body = false;
            		}
          	}
            //last modified test
            if(getenv("HTTP_IF_MODIFIED_SINCE") == gmdate("D, d M Y H:i:s",$cache_time). " GMT") {
              	header ("HTTP/1.0 304 Not Modified"); 
              	$send_body = false;
          	}
            //more headers
            header("Expires: " . gmdate("D, d M Y H:i:s",$cache_time+$expires) . " GMT");
            header("Cache-Control: max-age=$expires, must-revalidate");
            //header('Content-Length: ' . strlen($body));
            //if we're not cacheing
            if ($send_body) {
                readfile($legendIconCacheFile);
            }
            exit;
        }
    }

    $oMap = ms_newMapObj($mapFile);
    $oLayer = $oMap->getLayerByName($REQUEST_VARS['layername']);
    $oClass = $oLayer->getClass($REQUEST_VARS['classindex']);
    $width = $oMap->legend->keysizex;
    $height = $oMap->legend->keysizey;
    if ($width <=0) {
        $width = 16;
    }
    if ($height <=0) {
        $height = 16;
    }
    if ($oClass) {
      $oImg = $oClass->createLegendIcon($width, $height);
    } else {
      $oMap->setSize($width,$height);
      $oImg = $oMap->prepareImage();
    }
    /* TODO: can we figure out what the content type is? */
    header('Content-type: image/png');
    if ($cacheLegendIcons) {
        $oImg->saveImage($legendIconCacheFile);
        $etag = '"' . md5_file($legendIconCacheFile) . '"';
        header ("ETag: " . $etag );
        $cache_time = mktime(0, 0, 0, 1, 1, 2004);
        $expires = 3600 * 256;
        header("last-modified: " . gmdate("D, d M Y H:i:s",$cache_time) . " GMT");
        readfile($legendIconCacheFile);
    } else {
      $oImg->saveImage("");
    }
    $oImg->free();
}
?>
