<?php
/**
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


include ("Common.php");
if(InitializationErrorOccurred())
{
    DisplayInitializationErrorText();
    exit;
}
include('../../../common/php/Utilities.php');
include('Utilities.php');

//This flag indicates whether to pre-cache the legend icons (in the form of data URIs that will be written back as part of the JSON response)
//Browsers that do not support data URIs will not pass "true" and thus no pre-caching is performed.
$preCacheIcons = false;

//This is used by pre-caching to determine how many legend icons to pre-cache up-front (if $preCacheIcons = true)
//$maxScaleRangeDepth = 3; //The maximum number of scale ranges to go through (topmost to bottom)
$maxIconsPerScaleRange = 25; //The maximum number of icons to pre-cache per scale range. If the number of rules exceeds this value, the themed result will be compressed.
//$maxLegendHeight = 800; //The maximum screen space available to pre-cache icons
//$legendPos = 0; //Indicates how much screen space has already been allocated by pre-cached icons. Pre-caching stops after this value exceeds $maxLegendHeight
//$advanceHeight = 20; //16px with 4px padding. This is just a logical guess of how much actual space one legend icon occupies in the legend widget
//$maxGroupIndex = 5; //An initial guess of how many groups whose layer icons we can pre-cache.

// Determine if we should pre-cache legend icons
if (isset($_REQUEST['preCacheIcons']) && ($_REQUEST['preCacheIcons'] == "1" || strtolower($_REQUEST['preCacheIcons']) == "true")) {
    $preCacheIcons = true;
}

$mappingService = $siteConnection->CreateService(MgServiceType::MappingService);

$map = new MgMap($siteConnection);
$map->Open($mapName);
$layers=$map->GetLayers();

$scaleObj = new stdClass();
$scaleObj->layers = array();

for($i=0;$i<$layers->GetCount();$i++)
{
    $layer=$layers->GetItem($i);
    if (isset($_SESSION['scale_ranges']) &&
        isset($_SESSION['scale_ranges'][$layer->GetObjectId()]))
    {
        $scaleranges = $_SESSION['scale_ranges'][$layer->GetObjectId()];
        $layerObj = new stdClass();
        $layerObj->uniqueId = $layer->GetObjectId();
        
        $ldfId = $layer->GetLayerDefinition();
        foreach ($scaleranges as $sr)
        {
            $scaleVal = 42;
            if (strcmp($sr->maxScale, "infinity") == 0)
                $scaleVal = intval($sr->minScale);
            else
                $scaleVal = (intval($sr->minScale) + intval($sr->maxScale)) / 2.0;
         
            //Set compression flag
            $styleCount = count($sr->styles);
            $sr->isCompressed = ($styleCount > $maxIconsPerScaleRange);
            if ($sr->isCompressed)
            {
                //First
                $style = $sr->styles[0];
                if ($preCacheIcons == true)
                    $style->imageData = GetLegendImageInline($mappingService, $ldfId, $scaleVal, $style->geometryType, $style->categoryIndex);
                
                //Pass over ones in between
                
                //Last
                $style = $sr->styles[$styleCount - 1];
                if ($preCacheIcons == true)
                    $style->imageData = GetLegendImageInline($mappingService, $ldfId, $scaleVal, $style->geometryType, $style->categoryIndex);
            }
            else
            {
                if ($preCacheIcons == true)
                {
                    foreach ($sr->styles as $style)
                    {
                        $style->imageData = GetLegendImageInline($mappingService, $ldfId, $scaleVal, $style->geometryType, $style->categoryIndex);
                    }
                }
            }
        }
        $layerObj->scaleRanges = $scaleranges;
        array_push($scaleObj->layers, $layerObj);
    }
}

header('Content-type: application/json');

echo var2json($scaleObj);
exit;

?>
