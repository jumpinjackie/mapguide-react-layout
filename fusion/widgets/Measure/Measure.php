<?php
/**
 * Measure
 *
 * $Id: Measure.php 2671 2013-03-22 17:17:27Z jng $
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

  $fusionMGpath = '../../layers/MapGuide/php/';
  include $fusionMGpath . 'Common.php';
  if(InitializationErrorOccurred())
  {
      DisplayInitializationErrorHTML();
      exit;
  }
  SetLocalizedFilesPath(GetLocalizationPath());
  if(isset($_REQUEST['locale'])) {
    $locale = $_REQUEST['locale'];
  } else {
    $locale = GetDefaultLocale();
  }

  $hint = GetLocalizedString('MEASUREHINT', $locale);
  $type = $_REQUEST['type'];
  switch ($type) {
      case 1:
          $title = GetLocalizedString('MEASUREDISTANCETITLE', $locale );
          $totalLength = GetLocalizedString('TOTALLENGTH', $locale );
          $totalArea = '';
          break;
      case 2:
          $title = GetLocalizedString('MEASUREAREATITLE', $locale );
          $totalLength = '';
          $totalArea = GetLocalizedString('TOTALAREA', $locale );
          break;
      case 3:
          $title = GetLocalizedString('MEASUREBOTHTITLE', $locale );
          $totalLength = GetLocalizedString('TOTALLENGTH', $locale );
          $totalArea = GetLocalizedString('TOTALAREA', $locale );
          break;
  }

  $segment = GetLocalizedString( "SEGMENT", $locale );
  $length = GetLocalizedString( "LENGTH", $locale );
  $measureStop = GetLocalizedString( "MEASURESTOP", $locale );
  $measureStart = GetLocalizedString( "MEASURESTART", $locale );
?>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"
    "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
    <meta http-equiv="Content-type" content="text/html; charset=utf-8">
    <title><?php echo $title ?></title>
    <style type="text/css" media="screen">
        @import url(Measure.css);
    </style>
    <script type="text/javascript">
    
        var _widget = null;
        var domInit = false;
        
        function OnLoad() {
            domInit = true;
        }
        
        function OnUnload() {
            _widget.deactivate();
        }
        
        function SetWidget(widget) {
            _widget = widget;
            _widget.setButtons(document.getElementById("measureStopBtn"), document.getElementById("measureStartBtn"));
        }
        
        function OnStop() {
            _widget.stopMeasurement();
        }
        
        function OnStart() {
            _widget.startMeasurement();
        }
    
    </script>
</head>
<body id="MeasurementWidgetResults" onload="OnLoad()" onunload="OnUnload()">
    <h1><?php echo $title ?></h1>
    <hr />
    <p><?php echo $hint ?></p>
    <table border="0">
        <tr>
            <td id="measureStopCnt"><input type="button" id="measureStopBtn" onclick="OnStop()" value="<?= $measureStop ?>" disabled="disabled" /></td>
            <td id="measureStartCnt"><input type="button" id="measureStartBtn" onclick="OnStart()" value="<?= $measureStart ?>" disabled="disabled" /></td>
        </tr>
    </table>
    <hr />
    <table id="MeasurementWidgetResultsTable" border="0" cellspacing="5" cellpadding="5">
<?php if ($type & 1): ?>
        <thead>
            <tr>
                <th><?php echo $segment ?></th>
                <th><?php echo $length ?></th>
            </tr>
        </thead>
        <tbody id="segmentTBody"></tbody>
<?php endif; ?>
        <tfoot>
<?php if ($type & 1): ?>
            <tr>
                <th><?php echo $totalLength ?></th>
                <td id="totalDistance"></td>
            </tr>
<?php endif; ?>
<?php if ($type & 2): ?>
            <tr>
                <th><?php echo $totalArea ?></th>
                <td id="totalArea"></td>
            </tr>
<?php endif; ?>
        </tfoot>
    </table>
</body>
</html>
