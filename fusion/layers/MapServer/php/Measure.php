<?php
/*****************************************************************************
 *
 * $Id: Measure.php 2150 2010-04-22 16:21:53Z chrisclaydon $
 *
 * Purpose: Measure a line segment and return the distance
 *
 * Project: Fusion MapServer
 *
 * Author: DM Solutions Group Inc
 * Copyright (c) 2007 DM Solutions Group Inc.
 *****************************************************************************
 * This code shall not be copied or used without the expressed written consent
 * of DM Solutions Group Inc.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 *****************************************************************************/

/* set up the session */
include ("Common.php");
include ("Utilities.php");
include('../../../common/php/Utilities.php');

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
    if (isset($_SESSION['maps']) && isset($_SESSION['maps'][$mapName])) {
        $oMap = ms_newMapObj($_SESSION['maps'][$mapName]);
    }
    if ($oMap->units == MS_DD)
      /*this already returns a meter*/
      $distance = distHaversine($x1,$y1, $x2,$y2);
    else
    {
        $distance = sqrt (pow(($x2 - $x1),2) + pow(($y2 - $y1),2));
        /*convert to meter*/
        $distance = GetMetersPerUnit($oMap->units)*$distance;
    }

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



/************************************************************************/
/*         Calculate distance in meters fro 2 lat/long coordinates.     */
/*      Comes from http://www.movable-type.co.uk/scripts/latlong.html   */
/************************************************************************/
function distHaversine($lon1, $lat1, $lon2, $lat2)
{
  $R = 6371000; // earth's mean radius in m
  $dLat = ($lat2-$lat1)*(M_PI/180);//toRad();
  $dLon = ($lon2-$lon1)*(M_PI/180);//.toRad();
  $lat1 = $lat1*(M_PI/180);
  $lat2 = $lat2*(M_PI/180);

  $a = sin($dLat/2) * sin($dLat/2) +
          cos($lat1) * cos($lat2) *
          sin($dLon/2) * sin($dLon/2);
  $c = 2 * atan2(sqrt($a), sqrt(1-$a));
  $d = $R * $c;
  return $d;
}

function GetMetersPerUnit($unit)       //, $center_y)
{
  if ($unit == MS_INCHES)
    return 0.0254;
  else if ($unit == MS_FEET)
    return 0.3048;
  else if ($unit == MS_MILES)
    return 1609.344;
  else if ($unit == MS_METERS)
    return 1;
  else if ($unit == MS_KILOMETERS)
      return 1000;
  else if ($unit == MS_DD)
    return (111118.7516);

    else if ($unit == MS_PIXELS)
      return 1;
}

?>
