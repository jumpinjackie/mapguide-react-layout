<?php
/**
 * LayerInfo
 *
 * $Id: LayerInfo.php 2847 2014-06-17 11:56:07Z jng $
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
 * Purpose: get info about a layer and its underlying data source
 *****************************************************************************/

include ("Common.php");
if(InitializationErrorOccurred())
{
    DisplayInitializationErrorText();
    exit;
}
include ("Utilities.php");

$featureService = $siteConnection->CreateService(MgServiceType::FeatureService);

// Converts a boolean to "yes" or "no"
// --from MG Web Tier API Reference
function BooleanToString($boolean)
{
    if (is_bool($boolean))
        return ($boolean ? "true" : "false");
    else
        return "ERROR in BooleanToString.";
}

//Get a runtime map from a map definition
$map = new MgMap($siteConnection);
$map->Open($mapName);

//Get the layer
$layerCollection=$map->GetLayers();
try {
    $layer = $layerCollection->GetItem($_REQUEST['layer']);
    if ($layer == null) {
        echo '<Error>Layer '.$_REQUEST['layer'].' Not Found</Error>';
        exit;
    }


    if (isset($_REQUEST['selectable'])) {
        if (strcasecmp($_REQUEST['selectable'], 'true') == 0) {
            $layer->SetSelectable(true);
        } else {
            $layer->SetSelectable(false);
        }
        $map->Save();
    }

    //property mappings from the session
    if (isset($_SESSION['property_mappings'])) {
        $mappings = $_SESSION['property_mappings'][$layer->GetObjectId()];
    }

    $dataSourceId = new MgResourceIdentifier($layer->GetFeatureSourceId());
    //echo $dataSourceId->ToString();exit;
    $agf = new MgAgfReaderWriter();

    /*****************************************************************************
     TODO: check GetCapabilities of the feature provider to ensure that it has
           the appropriate capability to insert and update
     *****************************************************************************/

    /*****************************************************************************
     TODO: check user permissions to edit the resource
     *****************************************************************************/

    /*****************************************************************************
     get the layer's geometric type(s)
     *****************************************************************************/

    /*****************************************************************************
     get the layer's attributes and types
     *****************************************************************************/

    $attributes = GetFeatureSourceAttributes($map, $layer->GetLayerDefinition(), $featureService);

    /*****************************************************************************
     determine whether a shadow feature source has been created for the layer
     *****************************************************************************/
    // convert the feature resource for the selected layer to the shadow version
    $shadowResourceId = CreateSessionResourceId($dataSourceId, '-shadow');

    $hasShadow = 'false';
    if (DataSourceExists($resourceService, $shadowResourceId)) {
         $hasShadow = 'true';
    }

    //get class definition from the featureSource
    $classDefinition = GetFeatureClassDefinition($featureService, $layer, $dataSourceId);

    //MgPropertyDefinition classProps
    $classProps = $classDefinition->GetProperties();
    $featureGeometryName = $layer->GetFeatureGeometryName();
    $aLayerTypes = array();
    $aProperties = array();
    for ($i=0; $i< $classProps->GetCount(); $i++)
    {
        $prop = $classProps->GetItem($i);
        if ($prop->GetPropertyType() == MgFeaturePropertyType::GeometricProperty) {
            $featureClass = $prop->GetGeometryTypes();
            if ($featureClass & MgFeatureGeometricType::Surface) {
                array_push($aLayerTypes, 'surface');
            } else if ($featureClass & MgFeatureGeometricType::Curve) {
                array_push($aLayerTypes, 'curve');
            } else if ($featureClass & MgFeatureGeometricType::Solid) {
                array_push($aLayerTypes, 'solid'); //could use surface here for editing purposes?
            } else if ($featureClass & MgFeatureGeometricType::Point){
                array_push($aLayerTypes, 'point');
            }
            break;
        }
    }

    //Get layer collection as xml
    header('content-type: text/xml');
    echo "<LayerInfo>\n";
    for ( $i=0; $i < count($aLayerTypes); $i++ )
    {
        echo "<LayerType>".$aLayerTypes[$i]."</LayerType>\n";
    }
    echo "<!--is editable?-->";
    if (IsLayerEditable($resourceService, $layer)) {
        echo "<Editable>true</Editable>\n";
    } else {
        echo "<Editable>false</Editable>\n";
    }
    echo "<Shadowed>$hasShadow</Shadowed>\n";
    echo "<Attributes>\n";
    foreach($attributes as $attribute) {
        if (!is_array($attribute)) {
            continue;
        }
        echo "<Attribute>\n";
        echo "<Name>".$attribute['name']."</Name>";
        echo "<Description>".$attribute['description']."</Description>";
        echo "<Datatype>".$attribute['datatype']."</Datatype>";
        echo "<Readonly>".$attribute['readonly']."</Readonly>";
        echo "<Length>".$attribute['length']."</Length>";
        echo "<Default>".$attribute['default']."</Default>";
        echo "<Precision>".$attribute['precision']."</Precision>";
        echo "<Scale>".$attribute['scale']."</Scale>";
        echo "<Nullable>".$attribute['nullable']."</Nullable>";

        echo "</Attribute>\n";
    }
    echo "</Attributes>\n";
    echo "</LayerInfo>";
    exit;

} catch (MgException $e) {
    echo "ERROR: " . $e->GetExceptionMessage() . "\n";
    echo $e->GetDetails() . "\n";
    echo $e->GetStackTrace() . "\n";
    exit;
}
?>
