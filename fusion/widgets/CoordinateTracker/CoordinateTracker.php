<?php
    $fusionMGpath = '../../layers/MapGuide/php/';
    include $fusionMGpath . 'Common.php';
    if (InitializationErrorOccurred())
    {
        DisplayInitializationErrorHTML();
        exit;
    }
    SetLocalizedFilesPath(GetLocalizationPath());
    if (isset($_REQUEST['locale'])) {
        $locale = $_REQUEST['locale'];
    } else {
        $locale = GetDefaultLocale();
    }
    
    $title = GetLocalizedString("COORDINATETRACKERTITLE", $locale);
?>
<html>
    <head>
        <title><?= $title ?></title>
        <link rel="stylesheet" href="CoordinateTracker.css" />
        <script type="text/javascript">
        
            var bReady = false;
            var oWidget = null;
            
            function setWidget(widget) {
                oWidget = widget;
                var listEl = document.getElementById("ProjectionsList");
                for (var code in oWidget.projections) {
                    var el = document.createElement("li");
                    var nameEl = document.createElement("strong");
                    nameEl.setAttribute("class", "epsgcode");
                    nameEl.innerHTML = code;
                    var valueEl = document.createElement("div");
                    valueEl.setAttribute("id", oWidget.getDomId(code));
                    valueEl.setAttribute("class", "coords");
                    el.appendChild(nameEl);
                    el.appendChild(valueEl);
                    listEl.appendChild(el);
                }
                oWidget.startListening();
            }
            
            function loadMe() {
                bReady = true;
            }
            
            function unloadMe() {
                if (oWidget)
                    oWidget.deactivate();
            }
        
        </script>
    </head>
    <body onload="loadMe()" onunload="unloadMe()">
        <h3><?= $title ?></h3>
        <hr/>
        <ul id="ProjectionsList">
        
        </ul>
    </body>
</html>