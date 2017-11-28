<?php
    $fusionMGpath = '../../layers/MapGuide/php/';
    require_once $fusionMGpath . 'Common.php';
    require_once 'classes/markupeditor.php';

    $args = ($_SERVER['REQUEST_METHOD'] == "POST") ? $_POST : $_GET;
    $markupEditor = new MarkupEditor($args);
    
    header('Content-Type: text/xml');
    echo $markupEditor->GetSelectionXML();
?>