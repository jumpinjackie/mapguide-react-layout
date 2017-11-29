<?php

include(dirname(__FILE__)."/mapadmin/constants.php");
$bDataLoaded = false;

MgInitializeWebTier(dirname(__FILE__)."/webconfig.ini");

$siteConn = new MgSiteConnection();
$userInfo = new MgUserInformation("Administrator", "admin");
$siteConn->Open($userInfo);
$resSvc = $siteConn->CreateService(MgServiceType::ResourceService);
$resWl = new MgResourceIdentifier("Library://Samples/Sheboygan/Layouts/AdvancedStylization.WebLayout");
$resAppDef = new MgResourceIdentifier("Library://Samples/Sheboygan/FlexibleLayouts/SlateCommercial.ApplicationDefinition");
if (!$resSvc->ResourceExists($resWl) || !$resSvc->ResourceExists($resAppDef)) {
    //The docker container will have Melbourne.mgp pre-loaded at this path
    $bs3 = new MgByteSource(dirname(__FILE__)."/../../server/Packages/webgis.mgp");
    $br3 = $bs3->GetReader();
    $resSvc->ApplyResourcePackage($br3);
}
?>
<!DOCTYPE html>
<html>
    <head>
        <title>WGS</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/mapguide/viewer/indexPage.css" />
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
              <a class="navbar-brand" href="index.php">НОВЫЙ ПИРАТ</a>
            </div>
            <div id="navbar" class="navbar-collapse collapse">
              
            </div><!--/.navbar-collapse -->
          </div>
        </nav>
        <div class="jumbotron">
            <div class="container">
                <h1 class="jumbotron__article">У.К.Р.О.П. - demo</h1>
                <p class="jumbotron__sub-article">Универсальная Картографическая Российская Облачная Платформа</p>
                <p class="jumbotron__comment">Мощный, но простой инструмент картографирования, предоставляющий организациям возможность манипулирования геоданными.</p>
            </div>
        </div>
        <div class="container">
            <div class="alert alert-info">
                <strong>Заметка</strong>
                <p>С У.К.Р.О.П. вы можете создавать карты и приложения, проводить аналитический анализ данных, настраивать совместную работу с ними и выполнять операции администрирования.</p>
                <p>Современная высокотехнологичная функциональность позволяет удобно и просто работать с картографическими решениями, доступ к которым можно открыть любым сотрудникам вашей организации.</p>
            </div>
        </div>
        <div class="container">
            <div class="panel-group" id="accordion">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <strong>Продукты</strong>
                    </div>
                    <div class="panel">
                        <div class="panel-body">
                            <ul class="list-group">
                                <!-- <li class="list-group-item"><a href="viewer/index.html?resource=Library://Samples/Sheboygan/Layouts/AdvancedStylization.WebLayout">AJAX Viewer</a></li> -->
                                <li class="list-group-item"><a href="viewer/admin.html">Административная панель</a></li>
                                <li class="list-group-item"><a href="viewer/sidebar.html?resource=Library://Samples/Sheboygan/Layouts/AdvancedStylization.WebLayout">Клиентское приложение</a></li>
                                <!-- <li class="list-group-item"><a href="viewer/slate.html?resource=Library://Samples/Sheboygan/FlexibleLayouts/SlateCommercial.ApplicationDefinition">Slate</a></li>
                                <li class="list-group-item"><a href="viewer/turquoiseyellow.html?resource=Library://Samples/Sheboygan/FlexibleLayouts/SlateCommercial.ApplicationDefinition">TurquoiseYellow</a></li> -->
                                <!-- <li class="list-group-item"><a href="viewer/maroon.html?resource=Library://Samples/Sheboygan/FlexibleLayouts/SlateCommercial.ApplicationDefinition">Maroon</a></li>
                                <li class="list-group-item"><a href="viewer/limegold.html?resource=Library://Samples/Sheboygan/FlexibleLayouts/SlateCommercial.ApplicationDefinition">LimeGold</a></li>
                                <li class="list-group-item"><a href="viewer/aqua.html?resource=Library://Samples/Sheboygan/FlexibleLayouts/SlateCommercial.ApplicationDefinition">Aqua</a></li> -->
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>
