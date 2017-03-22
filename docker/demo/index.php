<?php

include(dirname(__FILE__)."/mapadmin/constants.php");
$bDataLoaded = false;

MgInitializeWebTier(dirname(__FILE__)."/webconfig.ini");

$siteConn = new MgSiteConnection();
$userInfo = new MgUserInformation("Administrator", "admin");
$siteConn->Open($userInfo);
$resSvc = $siteConn->CreateService(MgServiceType::ResourceService);
$resWl = new MgResourceIdentifier("Library://Samples/Melbourne/Layouts/Melbourne.WebLayout");
$resAppDef = new MgResourceIdentifier("Library://Samples/Melbourne/Layouts/Melbourne.ApplicationDefinition");
if (!$resSvc->ResourceExists($resWl) || !$resSvc->ResourceExists($resAppDef)) {
    //The docker container will have Melbourne.mgp pre-loaded at this path
    $bs3 = new MgByteSource(dirname(__FILE__)."/../../server/Packages/Melbourne.mgp");
    $br3 = $bs3->GetReader();
    $resSvc->ApplyResourcePackage($br3);
}
?>
<!DOCTYPE html>
<html>
    <head>
        <title>mapguide-react-layout demo</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
        <script type="text/javascript" src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        <style type="text/css">
            /* Move down content because we have a fixed navbar that is 50px tall */
            body {
                padding-top: 50px;
                padding-bottom: 20px;
            }
        </style>
    </head>
    <body>
        <nav class="navbar navbar-inverse navbar-fixed-top">
          <div class="container">
            <div class="navbar-header">
              <a class="navbar-brand" href="index.php">mapguide-react-layout demo</a>
            </div>
            <div id="navbar" class="navbar-collapse collapse">
              
            </div><!--/.navbar-collapse -->
          </div>
        </nav>
        <div class="jumbotron">
            <div class="container">
                <h1>mapguide-react-layout demo</h1>
                <p>Here you will find a demonstration of mapguide-react-layout</p>
                <p>Click on a link below to go to that particular sample</p>
            </div>
        </div>
        <div class="container">
            <div class="alert alert-info">
                <strong>NOTE</strong>
                <p>These samples use the <a href="https://github.com/jumpinjackie/mapguide-sample-melbourne/releases">Melbourne dataset</a></p>
                <p>The dataset has been pre-loaded for you</p>
            </div>
        </div>
        <div class="container">
            <div class="panel-group" id="accordion">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <strong>Viewer Templates</strong>
                    </div>
                    <div class="panel">
                        <div class="panel-body">
                            <ul class="list-group">
                                <li class="list-group-item"><a href="viewer/index.html?resource=Library://Samples/Melbourne/Layouts/Melbourne.WebLayout">AJAX Viewer</a></li>
                                <li class="list-group-item"><a href="viewer/sidebar.html?resource=Library://Samples/Melbourne/Layouts/Melbourne.WebLayout">Sidebar</a></li>
                                <li class="list-group-item"><a href="viewer/slate.html?resource=Library://Samples/Melbourne/Layouts/Melbourne.ApplicationDefinitiont">Slate</a></li>
                                <li class="list-group-item"><a href="viewer/turquoiseyellow.html?resource=Library://Samples/Melbourne/Layouts/Melbourne.ApplicationDefinition">TurquoiseYellow</a></li>
                                <li class="list-group-item"><a href="viewer/maroon.html?resource=Library://Samples/Melbourne/Layouts/Melbourne.ApplicationDefinition">Maroon</a></li>
                                <li class="list-group-item"><a href="viewer/limegold.html?resource=Library://Samples/Melbourne/Layouts/Melbourne.ApplicationDefinition">LimeGold</a></li>
                                <li class="list-group-item"><a href="viewer/aqua.html?resource=Library://Samples/Melbourne/Layouts/Melbourne.ApplicationDefinition">Aqua</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>
