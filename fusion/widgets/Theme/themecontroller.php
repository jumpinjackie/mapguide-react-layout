<?php

//
//  Copyright (C) 2004-2006  Autodesk, Inc.
//
//  This library is free software; you can redistribute it and/or
//  modify it under the terms of version 2.1 of the GNU Lesser
//  General Public License as published by the Free Software Foundation.
//
//  This library is distributed in the hope that it will be useful,
//  but WITHOUT ANY WARRANTY; without even the implied warranty of
//  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
//  Lesser General Public License for more details.
//
//  You should have received a copy of the GNU Lesser General Public
//  License along with this library; if not, write to the Free Software
//  Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
//
    $fusionMGpath = '../../layers/MapGuide/php/';
    require_once $fusionMGpath . 'Common.php';
    if(InitializationErrorOccurred())
    {
        DisplayInitializationErrorHTML();
        exit;
    }
    require_once $fusionMGpath . 'Utilities.php';
    require_once $fusionMGpath . 'JSON.php';
    require_once 'classes/theme.php';
    try {
        $args = ($_SERVER['REQUEST_METHOD'] == "POST") ? $_POST : $_GET;

        // MgInitializeWebTier($configFilePath);

        $theme = new Theme($args);
        $json = new Services_JSON();
        $responseType = '';
        $response = '';

        if (array_key_exists('COMMAND', $args))
        {
            $cmd = $args['COMMAND'];
            switch ($cmd) {
                case "GETLAYERINFO":
                    $reponseType = 'text/plain';
                    $response = $json->encode($theme->GetLayerInfo());
                    break;
                case "GETPROPERTYMINMAXCOUNT":
                    $reponseType = 'text/plain';
                    $response = $json->encode($theme->GetPropertyMinMaxCount());
                    break;
                case "APPLYTHEME":
                    $reponseType = 'text/plain';
                    $response = $json->encode($theme->ApplyTheme());
    //                $reponseType = 'text/xml';
    //                $response = $theme->ApplyTheme();
                    break;
            }
        }

        header('Content-Type: ' . $responseType);
        echo $response;
        exit;
      }
      catch (MgException $mge)
      {
          $errorMsg = $mge->GetExceptionMessage();
          $errorDetail = $mge->GetDetails();
      }
      catch (Exception $e)
      {
          $errorMsg = $e->GetMessage();
      }
?>
<table class="RegText" border="0" cellspacing="0" width="100%%">
    <tr><td class="Title">Error<hr></td></tr>
    <tr><td><?= $errorMsg ?></td></tr>
    <tr><td><?= $errorDetail ?></td></tr>
</table>
