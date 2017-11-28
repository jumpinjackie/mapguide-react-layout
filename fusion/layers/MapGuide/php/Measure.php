<?php
/**
 * Measure
 *
 * $Id: Measure.php 2847 2014-06-17 11:56:07Z jng $
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
 * Purpose: Measure a feature
 *****************************************************************************/

include ('Common.php');
if(InitializationErrorOccurred())
{
    DisplayInitializationErrorText();
    exit;
}
include ('Utilities.php');

try {
    if (!isset($_REQUEST['session']) ||
        !isset($_REQUEST['mapname']) ||
        !isset($_REQUEST['x1']) ||
        !isset($_REQUEST['y1']) ||
        !isset($_REQUEST['x2']) ||
        !isset($_REQUEST['y2'])) {
        echo "<Error>Arguments missing </Error>";
        exit;
    }
    $x1 = $_REQUEST['x1'];
    $y1 = $_REQUEST['y1'];
    $x2 = $_REQUEST['x2'];
    $y2 = $_REQUEST['y2'];
    $map = new MgMap($siteConnection);
    $map->Open($mapName);
    $srsFactory = new MgCoordinateSystemFactory();
    $srs = GetMapSRS($map);
    $srsMap = $srsFactory->Create($srs);
    $srsType = $srsMap->GetType();
    if ($srsType == MgCoordinateSystemType::Geographic) {
        $distance = $srsMap->MeasureGreatCircleDistance($x1, $y1, $x2, $y2);
    } else {
        $distance = $srsMap->MeasureEuclideanDistance($x1, $y1, $x2, $y2);
    }
    $distance = $srsMap->ConvertCoordinateSystemUnitsToMeters($distance);
    header('Content-type: application/json');
    header('X-JSON: true');
    echo "{distance:$distance}";
    exit;
} catch (MgException $e) {
    echo "last error";
    echo "ERROR: " . $e->GetExceptionMessage() . "\n";
    echo $e->GetDetails() . "\n";
    echo $e->GetStackTrace() . "\n";
}
?>
