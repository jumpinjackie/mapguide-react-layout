<?php
/**
 * SaveMap
 *
 * $Id: SaveMap.php 2847 2014-06-17 11:56:07Z jng $
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
 * Purpose: get map initial information
 *****************************************************************************/
include('Common.php');
if(InitializationErrorOccurred())
{
    DisplayInitializationErrorText();
    exit;
}
$format     = isset($_REQUEST['format']) ? $_REQUEST['format'] : 'PNG';
$layout     = isset($_REQUEST['layout']) ? $_REQUEST['layout'] : null;
$scale      = isset($_REQUEST['scale']) ? $_REQUEST['scale'] : null;
$imgWidth   = isset($_REQUEST['width']) ? $_REQUEST['width'] : null;
$imgHeight  = isset($_REQUEST['height']) ? $_REQUEST['height'] : null;
$pageHeight = isset($_REQUEST['pageheight']) ? $_REQUEST['pageheight'] : 11;
$pageWidth  = isset($_REQUEST['pagewidth']) ? $_REQUEST['pagewidth'] : 8.5;
$aMargins = isset($_REQUEST['margins']) ? explode(',',$_REQUEST['margins']) : array(0,0,0,0);
try
{
    $mappingService = $siteConnection->CreateService(MgServiceType::MappingService);
    $renderingService = $siteConnection->CreateService(MgServiceType::RenderingService);
    $map = new MgMap($siteConnection);
    $map->Open($mapName);

    $selection = new MgSelection($map);
    $selection->Open($resourceService, $mapName);

    //get current center as a coordinate
    $center = $map->GetViewCenter()->GetCoordinate();

    //plot with the passed scale, if provided
    $scale = isset($_REQUEST['scale']) ? $_REQUEST['scale'] : $map->GetViewScale();

    if ($format == 'DWF') {
        $oLayout = null;
        if ($layout) {
            $layoutId = new MgResourceIdentifier($layout);
            $layoutId->Validate();
            $oLayout = new MgLayout($layoutId,'Map', 'meters');
        };
        $oPlotSpec = new MgPlotSpecification($pageWidth,$pageHeight,MgPageUnitsType::Inches,
                                            $aMargins[0],
                                            $aMargins[1],
                                            $aMargins[2],
                                            $aMargins[3]
                                            );

        $dwfVersion = new MgDwfVersion('6.01','1.2');

        $oImg = $mappingService->GeneratePlot($map,
                                          $center,
                                          $scale,
                                          $oPlotSpec,
                                          $oLayout,
                                          $dwfVersion);
    } else {
        //render as an image
        if (isset($imgHeight) && isset($imgWidth)) {
            $oImg = $renderingService->RenderMap($map, $selection,
                                                 $center, $scale,
                                                 $imgWidth, $imgHeight,
                                                 new MgColor(255,255,255),
                                                 $format);
        }else{
            $oImg = $renderingService->RenderMap($map, $selection, $format);
        };
    };
}
catch (MgException $e)
{
  echo "ERROR: " . $e->GetExceptionMessage() . "\n";
  echo $e->GetDetails() . "\n";
  echo $e->GetStackTrace() . "\n";
  exit;
}

header("Cache-Control: no-store, no-cache, must-revalidate");  // HTTP/1.1
header("Expires: Mon, 26 Jul 1997 05:00:00 GMT");    // Date in the past
header( "Content-type: image/$format" );
header( "Content-disposition: attachment; filename=$mapName.$format" );

$buffer = '';
while ($oImg->Read($buffer, 4096) > 0) {
    echo $buffer;
}
?>
