<?php
/**
 * Legend
 *
 * $Id: Legend.php 2847 2014-06-17 11:56:07Z jng $
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
 * Purpose: Get xml layer list for GMap and return to the client
 *****************************************************************************/

include ("Common.php");
if(InitializationErrorOccurred())
{
    DisplayInitializationErrorText();
    exit;
}

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

//Get layer collection as xml
header('content-type: text/xml');
$layers=$map->GetLayers();
echo "<legend>";
echo "<layercollection>";

//create a mapping service for the legend images
$mappingService = $siteConnection->CreateService(MgServiceType::MappingService);
//TODO: make the temp location configurable
$tempImgPath = "c:/Program Files/Apache Group/Apache2/htdocs/ms_tmp/";

for($i=0;$i<$layers->GetCount();$i++)
{
    $layer=$layers->GetItem($i);
    $layerDefinition = $layer->GetLayerDefinition();

    echo '<layer>';
    echo '<uniqueid>'.$layer->GetObjectId().'</uniqueid>';
    echo '<layername>'.htmlspecialchars($layer->GetName()).'</layername>';
    echo '<layertype>'.$layer->GetLayerType().'</layertype>';
    echo '<displayinlegend>'.BooleanToString($layer->GetDisplayInLegend()).'</displayinlegend>';
    echo '<expandinlegend>'.BooleanToString($layer->GetExpandInLegend()).'</expandinlegend>';
    echo '<rid>'.$layerDefinition->ToString().'</rid>';
    if ($layer->GetGroup()) {
        echo '<parentgroup>'.$layer->GetGroup()->GetObjectId().'</parentgroup>';
    }
    echo '<legendlabel>'.htmlspecialchars($layer->GetLegendLabel()).'</legendlabel>';
    echo '<selectable>'.BooleanToString($layer->GetSelectable()).'</selectable>';
    echo '<visible>'.BooleanToString($layer->GetVisible()).'</visible>';
    echo '<actuallyvisible>'.BooleanToString($layer->isVisible()).'</actuallyvisible>';
    buildScaleRanges($layer);
    echo '</layer>';
}
echo "</layercollection>";

//Get layer groups as xml
$groups = $map->GetLayerGroups();
echo "<groupcollection>";
for($i=0;$i<$groups->GetCount();$i++)
{
    $group=$groups->GetItem($i);
    $layerDefinition = $layer->GetLayerDefinition();
    echo '<group>';
    echo '<groupname>'.htmlspecialchars($group->GetName()).'</groupname>';
    echo '<legendlabel>'.htmlspecialchars($group->GetLegendLabel()).'</legendlabel>';
    echo '<uniqueid>'.$group->GetObjectId().'</uniqueid>';
    echo '<displayinlegend>'.BooleanToString($group->GetDisplayInLegend()).'</displayinlegend>';
    echo '<expandinlegend>'.BooleanToString($group->GetExpandInLegend()).'</expandinlegend>';
    echo '<layergrouptype>'.$group->GetLayerGroupType().'</layergrouptype>';
    $parent = $group->GetGroup();
    if ($parent){
        echo '<parentuniqueid>'.$parent->GetObjectId().'</parentuniqueid>';
    }

    echo '<visible>'.BooleanToString($group->GetVisible()).'</visible>';
    echo '<actuallyvisible>'.BooleanToString($group->isVisible()).'</actuallyvisible>';
    echo '</group>';
}
echo"</groupcollection>";

echo "</legend>";


function buildScaleRanges($layer) {
    global $resourceService;
    $resID = $layer->GetLayerDefinition();
    $layerContent = $resourceService->GetResourceContent($resID);

    $xmldoc = new DOMDocument();
    $xmldoc->loadXML(ByteReaderToString($layerContent));
    $type = 0;
    $scaleRanges = $xmldoc->getElementsByTagName('VectorScaleRange');
    if($scaleRanges->length == 0) {
        $scaleRanges = $xmldoc->getElementsByTagName('GridScaleRange');
        if($scaleRanges->length == 0) {
            $scaleRanges = $xmldoc->getElementsByTagName('DrawingLayerDefinition');
            if($scaleRanges->length == 0)
                return;
            $type = 2;
        }
        else
            $type = 1;
    }
    $typeStyles = array("PointTypeStyle", "LineTypeStyle", "AreaTypeStyle");
    $ruleNames = array("PointRule", "LineRule", "AreaRule", );
    $output = '';
    for($sc = 0; $sc < $scaleRanges->length; $sc++)
    {
        $scaleRange = $scaleRanges->item($sc);
        $minElt = $scaleRange->getElementsByTagName('MinScale');
        $maxElt = $scaleRange->getElementsByTagName('MaxScale');
        $minScale = "0";
        $maxScale = "1000000000000.0";  // as MDF's VectorScaleRange::MAX_MAP_SCALE
        if($minElt->length > 0)
            $minScale = $minElt->item(0)->nodeValue;
        if($maxElt->length > 0)
            $maxScale = $maxElt->item(0)->nodeValue;

        if($type != 0)
            break;
        $output .= '<scalerange>';
        $output .= '<minscale>'.$minScale.'</minscale>';
        $output .= '<maxscale>'.$maxScale.'</maxscale>';

        $styleIndex = 0;
        for($ts=0, $count = count($typeStyles); $ts < $count; $ts++)
        {
            $typeStyle = $scaleRange->getElementsByTagName($typeStyles[$ts]);
            $catIndex = 0;
            for($st = 0; $st < $typeStyle->length; $st++) {
                $rules = $typeStyle->item(0)->getElementsByTagName($ruleNames[$ts]);
                for($r = 0; $r < $rules->length; $r++) {
                    $rule = $rules->item($r);
                    $label = $rule->getElementsByTagName("LegendLabel");
                    $filter = $rule->getElementsByTagName("Filter");

                    $labelText = $label->length==1? $label->item(0)->nodeValue: "";
                    $filterText = $filter->length==1? $filter->item(0)->nodeValue: "";
                    $output .= '<styleitem>';
                    $output .= '<label>'.htmlspecialchars(trim($labelText)).'</label>';
                    $output .= '<filter>'.htmlspecialchars(trim($filterText)).'</filter>';
                    $output .= '<geomtype>'.($ts+1).'</geomtype>';
                    $output .= '<categoryindex>'.($catIndex++).'</categoryindex>';
                    $output .= '</styleitem>';
                }
            }
        }
        $output .= '</scalerange>';
    }
    echo $output;
}

function ByteReaderToString($byteReader)
{
    $buffer = '';
    do
    {
        $data = str_pad("\0", 50000, "\0");
        $len = $byteReader->Read($data, 50000);
        if ($len > 0)
        {
            $buffer = $buffer . substr($data, 0, $len);
        }
    } while ($len > 0);

    return $buffer;
}
?>
