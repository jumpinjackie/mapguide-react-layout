<?php
/**
 * SetLayers
 *
 * $Id: $
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
 * Utility function to load scale ranges for the layers. Initially
 * scale ranges were returned as part of in LoadMap.php. This allows
 * to reduce the size of information that is returned by LoadMap, by putting
 * elements that are unnessary to the map draw her.  
 *****************************************************************************/

/* set up the session */
include(dirname(__FILE__).'/../../../common/php/Utilities.php');
include(dirname(__FILE__).'/Common.php');
include(dirname(__FILE__).'/Utilities.php');

if (isset($_SESSION['maps']) && isset($_SESSION['maps'][$mapName])) {
    $oMap = ms_newMapObj($_SESSION['maps'][$mapName]);
}

/* if scales are not set, these become the default values */
define('MIN_SCALE', 1);
define('MAX_SCALE', 1000000000);

//$oMap = ms_newMapObj(getSessionSavePath().$mapName.".map");

if ($oMap) {
	$minScale = $oMap->web->minscale == -1 ? MIN_SCALE : $oMap->web->minscale;
	$maxScale = $oMap->web->maxscale == -1 ? MAX_SCALE : $oMap->web->maxscale;
	//layers
	for ($i=0;$i<$oMap->numlayers;$i++) {
		$layer=$oMap->getLayer($i);
		
		/* rename layes names with invalid characters */
		$layer->set("name",replaceInvalidLayerName($layer->name));
		
		switch($layer->type) {
			case MS_LAYER_POINT:
				$type = 0;
				break;
			case MS_LAYER_LINE:
				$type = 1;
				break;
			case MS_LAYER_POLYGON:
				$type = 2;
				break;
			case MS_LAYER_RASTER:
				$type = 4;
				break;
			case MS_LAYER_ANNOTATION:
				$type = 8;
				break;
			default:
				$type = 0;
		}
		
		$displayInLegend = strtolower($layer->getMetaData('displayInLegend'));
		$expandInLegend = strtolower($layer->getMetaData('expandInLegend'));
		$legendLabel = $layer->getMetaData('legendLabel');
		if ($legendLabel == '') {
			$legendLabel = $layer->name;
		}
		
		$selectable = strtolower($layer->getMetaData('selectable'));
		$editable = strtolower($layer->getMetaData('editable'));
		
		/* process the classes.  The legend expects things
		* organized by scale range so we have to first
		* find all the scale breaks, then create ranges
		* for each scale break pair, then slot the classes
		* into the scale ranges that they apply to.
		*/
		
		$aScaleRanges = array();
		//create a default scale range for the layer as a whole
		$layerMin = $layer->minscale == -1 ? $minScale : $layer->minscale;
		$layerMax = $layer->maxscale == -1 ? $maxScale : $layer->maxscale;
		
		/* check to see that the layer has a vaild scale range
		 * inside the defined map's main min max scale ranges
		 * set them to the maps scale ranges if they exceede 
		 */
		if($layer->minscale != -1 && $layerMin < $minScale)
			$layerMin = $minScale;
		
		if($layer->maxscale != -1 && $layerMax > $maxScale)
			$layerMax = $maxScale;

		//find all the unique scale breaks in this layer
		$aScaleBreaks = array($layerMin, $layerMax);
		for ($j=0; $j<$layer->numclasses; $j++) {
			$oClass = $layer->getClass($j);
			$classMin = $oClass->minscale == -1 ? $layerMin : max($oClass->minscale, $layerMin);
			$classMax = $oClass->maxscale == -1 ? $layerMax : min($oClass->maxscale, $layerMax);
			if (!in_array($classMin, $aScaleBreaks)) {
				array_push($aScaleBreaks, $classMin);
			}
			if (!in_array($classMax, $aScaleBreaks)) {
				array_push($aScaleBreaks, $classMax);
			}
		}
		//sort them
		sort($aScaleBreaks);
		
		//create scale ranges for each pair of breaks
		for ($j=0; $j<count($aScaleBreaks)-1; $j++) {
			$scaleRange = NULL;
			$scaleRange->minScale = $aScaleBreaks[$j];
			$scaleRange->maxScale = $aScaleBreaks[$j+1];
			$scaleRange->styles = array();
			array_push($aScaleRanges, $scaleRange);
		}
		
		//create classes and slot them into the scale breaks
		for ($j=0; $j<$layer->numclasses; $j++) {
			$oClass = $layer->getClass($j);
			$displayInLegend = strtolower($oClass->getMetaData('displayInLegend')) == 'false' ? false : true;
      if ($displayInLegend) {
        $title = $oClass->getMetaData('legendlabel');
        $classObj = NULL;
  			// Use formatted legend label as defined by CLASS->TITLE
  			$classObj->legendLabel = $title != '' ? $title : $oClass->name;
  			//$classObj->legendLabel = $oClass->name;
  			$classObj->filter = $oClass->getExpression();
  			$classMin = $oClass->minscale == -1 ? $layerMin : max($oClass->minscale, $layerMin);
  			$classMax = $oClass->maxscale == -1 ? $layerMax : min($oClass->maxscale, $layerMax);
  			$classObj->minScale = $classMin;
  			$classObj->maxScale = $classMax;
  			$classObj->index = $j;
  			for ($k=0; $k<count($aScaleRanges); $k++) {
  				if ($classMin < $aScaleRanges[$k]->maxScale &&
  					$classMax > $aScaleRanges[$k]->minScale) {
  					array_push($aScaleRanges[$k]->styles, $classObj);
  				}
  			}
      }
		}
		//$layerObj->scaleRanges = $aScaleRanges;
		$_SESSION['scale_ranges'][$mapName][$layer->name] = $aScaleRanges;
	}

	$scaleObj = NULL;
	$scaleObj->layers = array();

	define('ICON_SIZE', 16);
	$nIconWidth = $oMap->legend->keysizex;
	$nIconHeight = $oMap->legend->keysizey;
	if ($nIconWidth <=0)
  $nIconWidth = ICON_SIZE;
	if ($nIconWidth <=0)
  $nIconWidth = ICON_SIZE;
	$nTotalClasses=0;
	$aIcons = array();

	/*special case to force the the legend icons to be drawn using a gd driver
  This was fixed in ticket http://trac.osgeo.org/mapserver/ticket/2682 which
  will be available for mapserver version 5.2.1 and 5.4
  Note that we do not check the outputformat of the map (assuming that we are 
  using GD or AGG renderers)
	*/
	$nVersion = ms_GetVersionInt();
	if ($nVersion <= 50200) /*5.2 and before*/
  $oMap->selectOutputFormat("png24");


	for($i=0;$i<$oMap->numlayers;$i++) 
    {
        $layer = $oMap->getLayer($i);
		if (isset($_SESSION['scale_ranges']) && isset($_SESSION['scale_ranges'][$mapName]) && isset($_SESSION['scale_ranges'][$mapName][$layer->name]))
		{
			$scaleranges = $_SESSION['scale_ranges'][$mapName][$layer->name];
        $layerObj = NULL;
        $layerObj->uniqueId = $i;

        /*generate the legend icons here*/
        $nScaleRanges = count($scaleranges);
        for ($j=0; $j<$nScaleRanges; $j++)
        {
            $nStyles = count($scaleranges[$j]->styles);
            for ($k=0; $k<$nStyles; $k++)
            {
                $nClassIndex = $scaleranges[$j]->styles[$k]->index;
                $oClass = $layer->getClass($nClassIndex);
                
                if ($oClass) {
                  $oImg = $oClass->createLegendIcon($nIconWidth, $nIconHeight);
                  array_push($aIcons, $oImg);
                  $scaleranges[$j]->styles[$k]->icon_x = ($nTotalClasses*$nIconWidth);
                  $scaleranges[$j]->styles[$k]->icon_y=0;
                  $nTotalClasses++;
                }
            }
        }

        $layerObj->scaleRanges = $scaleranges;
        array_push($scaleObj->layers, $layerObj);
    }
 }  

	if ($nTotalClasses > 0) {
     //set the image path and image dir based on what fusion config file
     $configObj = $_SESSION['fusionConfig'];

     $original_imagepath = $oMap->web->imagepath;
     $original_imageurl = $oMap->web->imageurl;

     if (isset($configObj->mapserver->imagePath) && $configObj->mapserver->imagePath !="")
        $oMap->web->set("imagepath", $configObj->mapserver->imagePath);
     
     if(isset($configObj->mapserver->imageUrl) && $configObj->mapserver->imageUrl!="")
         $oMap->web->set("imageurl", $configObj->mapserver->imageUrl);

     //build and image containing all the icons and return url
     $nTmpWidth = $oMap->width;
     $nTmpHeight = $oMap->height;
    
     $oMap->set("width", $nTotalClasses*$nIconWidth);
     $oMap->set("height", $nIconHeight);
     $oImage = $oMap->prepareImage();

     $oMap->set("width", $nTmpWidth);
     $oMap->set("height", $nTmpHeight);
    
     for ($i=0; $i<$nTotalClasses;$i++)
       $oImage->pasteImage($aIcons[$i], -1, $i*$nIconWidth, 0);

     $scaleObj->icons_url = $oImage->saveWebImage();
     $scaleObj->icons_width = $nIconWidth;
     $scaleObj->icons_height = $nIconHeight;

      $oMap->web->set("imagepath", $original_imagepath);
      $oMap->web->set("imageurl", $original_imageurl);
	}
}

function replaceInvalidLayerName($szLayerName){
    /*
    bug http://trac.osgeo.org/fusion/ticket/96 - Invalid characters in layer name (pdeschamps)

    Fusion requests the map imavge via the Mapserver CGI to toggle the layer visibility.
    The layer paramerter for the cgi uses spaces as a delimiter for the layer names this creates
    an issue for the mapserver binary to toggle layers that have these reserved URI characters.
    also removing characters that could pose potential issues with json.
    */
    $aInvalidLayerNameCharacters = array();
    $aInvalidLayerNameCharacters[0] ="&";
    $aInvalidLayerNameCharacters[1] =" ";
    $aInvalidLayerNameCharacters[2] ="#";
    $aInvalidLayerNameCharacters[3] ="\\";
    $aInvalidLayerNameCharacters[4] ="=";
    $aInvalidLayerNameCharacters[5] ="/";
    $aInvalidLayerNameCharacters[6] ="'";

    $aReplace[0] = "_";
    $aReplace[1] = "_";
    $aReplace[2] = "_";
    $aReplace[3] = "_";
    $aReplace[4] = "_";
    $aReplace[5] = "_";
    $aReplace[6] = "_";
      
    return str_replace($aInvalidLayerNameCharacters,$aReplace,$szLayerName);
}

header('Content-type: application/json');
header('X-JSON: true');

echo var2json($scaleObj);

?>
