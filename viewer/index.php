<?php

$template = $_REQUEST["template"];

?>

<!DOCTYPE html>
<html>
    <head>
        <title>MapGuide React Viewer</title>
        <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
        <link rel="stylesheet" href="dist/vendor.css" type="text/css" />
        <link rel="stylesheet" href="dist/viewer.css" type="text/css" />
        <!-- Template specific css -->
        <link rel="stylesheet" href="css/<?= $template ?>.css" type="text/css" />
        <!-- NOTE: If you don't care about IE, you can remove/comment the script reference below -->
        <script type="text/javascript" src="//polyfill.io/v3/polyfill.min.js?features=Promise%2CPromise.prototype.finally%2CArray.isArray%2CArray.prototype.find%2CArray.prototype.includes%2CObject.assign%2CMath.log2%2Cfetch%2CNumber.isFinite"></script>
        <script type="text/javascript" src="dist/vendor.js" charset="utf-8"></script>
        <script type="text/javascript" src="dist/viewer.js" charset="utf-8"></script>
        <style type="text/css">
            html, body, #map { padding: 0; margin: 0; font: 10pt Verdana, sans-serif; }
            #map { position: absolute; left: 0; right: 0; top: 0; bottom: 0; }
        </style>
    </head>
    <body>
        <div id="map"></div>
        <script type="text/javascript">
            var el = document.getElementById("map");
            var viewer = new MapGuide.Application();
            viewer.mount(el, {
                layout: "<?= $template ?>",
                mapguide: {
                    agentUri: "../mapagent/mapagent.fcgi"
                }
            });
        </script>
    </body>
</html>