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
require_once('layerinfo.php');
require_once('property.php');
// require_once('../Common/constants.php');
// require_once('../Common/JSON.php');

class Theme
{
    private $args = null;
    private $site = null;

    public $distNameArray = array("Individual", "Equal", "Standard Deviation", "Quantile", "Jenks (Natural Breaks)");
    public $distValueArray = array("INDIV_DIST", "EQUAL_DIST", "STDEV_DIST", "QUANT_DIST", "JENK_DIST");

    function __construct($args)
    {
        $this->args = $args;
        $this->site = new MgSiteConnection();
        $this->site->Open(new MgUserInformation($args['SESSION']));
    }

    function GetMapLayerNames()
    {
        $layerNames = array();

        $featureService = $this->site->CreateService(MgServiceType::FeatureService);

        $map = new MgMap($this->site);
        $map->Open($this->args['MAPNAME']);
        $layers = $map->GetLayers();

        for ($i = 0; $i < $layers->GetCount(); $i++)
        {
            $layer = $layers->GetItem($i);
            if((substr($layer->GetName(), 0, 1) != "_") && (substr(strtoupper($layer->GetFeatureSourceId()), 0, 7) != "SESSION"))
            {
                $resId = new MgResourceIdentifier($layer->GetFeatureSourceId());
                $layerFeatureClassName = $layer->GetFeatureClassName();
                if($layerFeatureClassName == "") 
                    continue;
                $schemaClass = explode(':', $layerFeatureClassName);

                $classDef = $featureService->GetClassDefinition($resId, $schemaClass[0], $schemaClass[1]);
                $propDef = $classDef->GetProperties()->GetItem($layer->GetFeatureGeometryName());

                if($propDef->GetPropertyType() == MgFeaturePropertyType::GeometricProperty)
                {
                    if ($propDef->GetGeometryTypes() == MgFeatureGeometricType::Surface || 
                        $propDef->GetGeometryTypes() == (MgFeatureGeometricType::Point | MgFeatureGeometricType::Surface) ||
                        $propDef->GetGeometryTypes() == (MgFeatureGeometricType::Curve | MgFeatureGeometricType::Surface) ||
                        $propDef->GetGeometryTypes() == (MgFeatureGeometricType::Solid | MgFeatureGeometricType::Surface) ||
                        $propDef->GetGeometryTypes() == (MgFeatureGeometricType::Point | MgFeatureGeometricType::Curve | MgFeatureGeometricType::Surface) ||
                        $propDef->GetGeometryTypes() == (MgFeatureGeometricType::Point | MgFeatureGeometricType::Solid | MgFeatureGeometricType::Surface) ||
                        $propDef->GetGeometryTypes() == (MgFeatureGeometricType::Curve | MgFeatureGeometricType::Solid | MgFeatureGeometricType::Surface) ||
                        $propDef->GetGeometryTypes() == (MgFeatureGeometricType::Point | MgFeatureGeometricType::Curve | MgFeatureGeometricType::Solid | MgFeatureGeometricType::Surface))
                    {
                        $layerNames[$layer->GetName()] = $layer->GetLegendLabel();
                    }
                }
            }
        }
        asort($layerNames);

        return $layerNames;
    }

    function GetLayerInfo()
    {
        $properties = array();
        $scaleRanges = array();

        $resourceService = $this->site->CreateService(MgServiceType::ResourceService);

        $map = new MgMap($this->site);
        $map->Open($this->args['MAPNAME']);
        $layers = $map->GetLayers();
        $layer = $layers->GetItem($this->args['LAYERNAME']);
        

        // First get a list of all of the Feature Class properties that can be used for theming.

        $featureService = $this->site->CreateService(MgServiceType::FeatureService);
        $resId = new MgResourceIdentifier($layer->GetFeatureSourceId());
        $schemaClass = explode(':', $layer->GetFeatureClassName());

        $classDef = $featureService->GetClassDefinition($resId, $schemaClass[0], $schemaClass[1]);

        for ($i = 0; $i < $classDef->GetProperties()->GetCount(); $i++)
        {
            $propertyDef = $classDef->GetProperties()->GetItem($i);

            if ($propertyDef->GetPropertyType() == MgFeaturePropertyType::DataProperty)
            {
                $dataType = $propertyDef->GetDataType();
                $distroTypes = $this->GetDistributionsForDataType($dataType);
                if (count($distroTypes) > 0)
                {
                    array_push($properties, new Property($propertyDef->GetName(), $dataType, $distroTypes));
                }
            }
        }

        // Next get a list of all of the layers scale ranges.

        $layerDefResId = $layer->GetLayerDefinition();
        $byteReader = $resourceService->GetResourceContent($layerDefResId);

        $doc = new DOMDocument();
        $doc->loadXML($byteReader->ToString());
        $nodeList = $doc->getElementsByTagName('VectorScaleRange');

        foreach ($nodeList as $node)
        {
            $range = null;

            $minNodeList = $node->getElementsByTagName('MinScale');
            if ($minNodeList->length > 0)
                $range = $minNodeList->item(0)->nodeValue;
            else
                $range = '0';

            $maxNodeList = $node->getElementsByTagName('MaxScale');
            if ($maxNodeList->length > 0)
                $range .= ' - ' . $maxNodeList->item(0)->nodeValue;
            else
                $range .= ' - Infinity';

            array_push($scaleRanges, $range);
        }

        return new LayerInfo($properties, $scaleRanges);
    }

    function GetPropertyMinMaxCount()
    {
        $map = new MgMap($this->site);
        $map->Open($this->args['MAPNAME']);
        $layers = $map->GetLayers();
        $layer = $layers->GetItem($this->args['LAYERNAME']);

        $resId = new MgResourceIdentifier($layer->GetFeatureSourceId());
        
        $filter = $layer->GetFilter();

// Note: Should be able to do this:
//
//      $minValue = 0;
//      $maxValue = 0;
//      $count = 0;
//
//      $aggregateOptions = new MgFeatureAggregateOptions();
//      $aggregateOptions->AddComputedProperty('min', 'Min(' . $this->args['PROPERTYNAME'] . ')');
//      $aggregateOptions->AddComputedProperty('max', 'Max(' . $this->args['PROPERTYNAME'] . ')');
//      $aggregateOptions->AddComputedProperty('count', 'Count(' . $this->args['PROPERTYNAME'] . ')');
//
//      $dataReader = $featureService->SelectAggregate($resId, $layer->GetFeatureClassName(), $aggregateOptions);
//
//      if ($dataReader->ReadNext())
//      {
//          $minValue = $this->GetFeaturePropertyValue($dataReader, 'min');
//          $maxValue = $this->GetFeaturePropertyValue($dataReader, 'max');
//          $count = $this->GetFeaturePropertyValue($dataReader, 'count');
//      }
//      $dataReader->Close();
//
// However due to a bug, Min/Max do not work on string types, so we have to do this:

        unset($minValue);
        unset($maxValue);
        $count = 0;

        $queryOptions = new MgFeatureQueryOptions();
        $queryOptions->AddFeatureProperty($this->args['PROPERTYNAME']);
        if($filter != '')
            $queryOptions->SetFilter($filter);

        $featureReader = $layer->SelectFeatures($queryOptions);

        while($featureReader->ReadNext())
        {
            $value = $this->GetFeaturePropertyValue($featureReader, $this->args['PROPERTYNAME']);
            if ($value != null)
            {
                if(!isset($maxValue) && !isset($minValue))
                {
                    $maxValue = $value;
                    $minValue = $value;
                }
                if($value > $maxValue)
                    $maxValue = $value;
                if($value < $minValue)
                    $minValue = $value;
            }
            $count++;
        }
        $featureReader->Close();

        if(!isset($maxValue) && !isset($minValue))
        {
            $maxValue="";
            $minValue="";
        }

        return array($minValue, $maxValue, $count);
    }

    function ApplyTheme()
    {
        $resourceService = $this->site->CreateService(MgServiceType::ResourceService);
        $featureService = $this->site->CreateService(MgServiceType::FeatureService);

        $map = new MgMap($this->site);
        $map->Open($this->args['MAPNAME']);
        $layers = $map->GetLayers();
        $layer = $layers->GetItem($this->args['LAYERNAME']);

        $resId = new MgResourceIdentifier($layer->GetFeatureSourceId());
        $layerDefResId = $layer->GetLayerDefinition();
        $byteReader = $resourceService->GetResourceContent($layerDefResId);
        
        $filter = $layer->GetFilter();

        // Load the Layer Definition and Navigate to the specified <VectorScaleRange>

        $doc = new DOMDocument();
        $doc->loadXML($byteReader->ToString());
        $version = $doc->documentElement->getAttribute('version');
        $template = 'templates/arearuletemplate-'.$version.'.xml';
        $layerDefList = $doc->getElementsByTagName('VectorLayerDefinition');
        $layerDef = $layerDefList->item(0);
        $nodeList = $layerDef->getElementsByTagName('VectorScaleRange');

        $vectorScaleRangecElement = $nodeList->item($this->args['SCALERANGEINDEX']);
        $listLength = $nodeList->length;
        for($index = 0; $index < $listLength; $index++)
        {
            $layerDef->removeChild($nodeList->item(0));
        }
        $layerDef->appendChild($vectorScaleRangecElement);
        $areaTypeStyle = $vectorScaleRangecElement->getElementsByTagName('AreaTypeStyle')->item(0);
        
        // Remove any existing <AreaRule> elements.
        if($areaTypeStyle != null)
        {
            $areaRuleList = $areaTypeStyle->getElementsByTagName('AreaRule');
            $ruleCount = $areaRuleList->length;
            for($index = 0; $index < $ruleCount; $index++)
            {
                $areaTypeStyle->removeChild($areaRuleList->item(0));
            }

            $hasChild = $areaTypeStyle->hasChildNodes();
            if($hasChild)
            {
              $element = $areaTypeStyle->childNodes->item(0);
            }
        }

        $CompositeTypeStyles = $vectorScaleRangecElement->getElementsByTagName('CompositeTypeStyle');
        $isEnhancedStyle = ($CompositeTypeStyles->length != 0);
        // Remove any existing <CompositeTypeStyle> elements with Polygon <GeometryContext>.
        if($isEnhancedStyle)
        {
            $template = 'templates/arearuletemplate-'.$version.'-Enhanced.xml';
            $styleCount = $CompositeTypeStyles->length;
            for($index = 0; $index < $styleCount; $index++)
            {

                $CompositeTypeStyle = $CompositeTypeStyles->item($index);
                $GeometryContexts = $CompositeTypeStyle->getElementsByTagName('GeometryContext');
                $contextCount = $GeometryContexts->length;

                for($i = 0; $i < $contextCount; $i++)
                {
                    $GeometryContext = $GeometryContexts->item($i);
                    if($GeometryContext->nodeValue == 'Polygon')
                    {
                        $vectorScaleRangecElement->removeChild($CompositeTypeStyle);
                        $index--;
                        $styleCount--;
                        break;
                    }
                }
            }
        }

        // Now create the new <AreaRule> or <CompositeTypeStyle> elements.
        $areaRuleTemplate = file_get_contents($template);
        $aggregateOptions = new MgFeatureAggregateOptions();

        $portion = 0.0;
        $increment = ($this->args['NUMRULES'] > 1) ? $increment = 1.0 / ($this->args['NUMRULES'] - 1) : 1.0;

        if ($this->args['DISTRO'] == 'INDIV_DIST')
        {
            $values = array();
            
            $aggregateOptions->AddComputedProperty('THEME_VALUE', 'UNIQUE("' . $this->args['PROPERTYNAME'] . '")');
            if($filter != '')
                $aggregateOptions->SetFilter($filter);
            $dataReader = $layer->SelectAggregate($aggregateOptions);
            while ($dataReader->ReadNext())
            {
                $value = $this->GetFeaturePropertyValue($dataReader, 'THEME_VALUE');
                array_push($values, $value);
            }
            $dataReader->Close();
            
            if ($this->args['DATATYPE'] == MgPropertyType::String)
                sort($values, SORT_STRING);
            else
                sort($values, SORT_NUMERIC);

            for ($i = 0; $i < count($values); $i++)
            {
                $filterText = '&quot;' . $this->args['PROPERTYNAME'] . '&quot; = ';
                if ($this->args['DATATYPE'] == MgPropertyType::String)
                    $filterText .= "'" . $values[$i] . "'";
                else
                    $filterText .= $values[$i];
                    
                $areaRuleXML = sprintf($areaRuleTemplate,
                    $this->args['PROPERTYNAME'] . ': ' . $values[$i],
                    $filterText,
                    $this->InterpolateColor($portion, $this->args['FILLFROM'], $this->args['FILLTO'], $this->args['FILLTRANS']),
                    $this->InterpolateColor($portion, $this->args['LINEFROM'], $this->args['LINETO'], 0));

                $areaDoc = new DOMDocument();
                $areaDoc->loadXML($areaRuleXML);
                $areaNode = $doc->importNode($areaDoc->documentElement, true);
                if($areaTypeStyle != null)
                {
                    if($hasChild)
                    {
                      $areaTypeStyle->insertBefore($areaNode, $element);
                    }
                    else
                    {
                      $areaTypeStyle->appendChild($areaNode);
                    }
                }
                if($isEnhancedStyle)
                {
                    $compositeTypeStyle = $doc->createElement('CompositeTypeStyle');
                    $compositeTypeStyle->appendChild($areaNode);
                    $vectorScaleRangecElement->appendChild($compositeTypeStyle);
                }

                $portion += $increment;
            }
        }
        else
        {
            $values = array();

            $aggregateOptions->AddComputedProperty('THEME_VALUE',
                $this->args['DISTRO'] . '("' . $this->args['PROPERTYNAME'] . '",' . $this->args['NUMRULES'] . ',' . $this->args['MINVALUE'] . ',' . $this->args['MAXVALUE'] . ')');
            if($filter != '')
                $aggregateOptions->SetFilter($filter);

            $dataReader = $layer->SelectAggregate($aggregateOptions);
            while ($dataReader->ReadNext())
            {
                $value = $this->GetFeaturePropertyValue($dataReader, 'THEME_VALUE');
                array_push($values, $value);
            }
            $dataReader->Close();

            for ($i = 0; $i < count($values) - 1; $i++)
            {
                $filterText = '&quot;' . $this->args['PROPERTYNAME'] . '&quot; &gt;= ' . $values[$i] . ' AND &quot;' . $this->args['PROPERTYNAME'];
                if ($i == count($values) - 2)
                    $filterText .= '&quot; &lt;= ' . $values[$i + 1];
                else
                    $filterText .= '&quot; &lt; ' . $values[$i + 1];

                $areaRuleXML = sprintf($areaRuleTemplate,
                    $this->args['PROPERTYNAME'] . ': ' . $values[$i] . ' - ' . $values[$i + 1],
                    $filterText,
                    $this->InterpolateColor($portion, $this->args['FILLFROM'], $this->args['FILLTO'], $this->args['FILLTRANS']),
                    $this->InterpolateColor($portion, $this->args['LINEFROM'], $this->args['LINETO'], 0));

                $areaDoc = new DOMDocument();
                $areaDoc->loadXML($areaRuleXML);
                $areaNode = $doc->importNode($areaDoc->documentElement, true);
                if($areaTypeStyle != null)
                {
                    if($hasChild)
                    {
                      $areaTypeStyle->insertBefore($areaNode, $element);
                    }
                    else
                    {
                      $areaTypeStyle->appendChild($areaNode);
                    }
                }
                if($isEnhancedStyle)
                {
                    $compositeTypeStyle = $doc->createElement('CompositeTypeStyle');
                    $compositeTypeStyle->appendChild($areaNode);
                    $vectorScaleRangecElement->appendChild($compositeTypeStyle);
                }

                $portion += $increment;
            }

        }

        // Now save our new layer definition to the session and add it to the map.

        $layerDefinition = $doc->saveXML();
        $uniqueName = $this->MakeUniqueLayerName($map, $this->args['LAYERNAME'], $this->args['THEMENAME']);
        $legendLabel = $layer->GetLegendLabel();
        if (strlen(trim($this->args['THEMENAME'])) > 0 )
            $legendLabel .= ' (' . $this->args['THEMENAME'] . ')';

        $layerResId = new MgResourceIdentifier('Session:' . $this->args['SESSION'] . '//' . $uniqueName . '.LayerDefinition');

        $byteSource = new MgByteSource($layerDefinition, strlen($layerDefinition));
        $resourceService->SetResource($layerResId, $byteSource->GetReader(), null);

        $newLayer = new MgLayer($layerResId, $resourceService);
        $newLayer->SetName($uniqueName);
        $newLayer->SetLegendLabel($legendLabel);
        $newLayer->SetDisplayInLegend($layer->GetDisplayInLegend());
        $newLayer->SetVisible(true);
        $newLayer->SetSelectable($layer->GetLegendLabel());
        $layers->Insert($layers->IndexOf($layer), $newLayer);

        $map->Save();

        return $uniqueName;
    }


    private function InterpolateColor($portion, $startColor, $endColor, $percentTransparent)
    {
        $result = sprintf("%02x", 255 * (100 - $percentTransparent) / 100);

        if ($startColor == $endColor)
            return $result . $startColor;

        $red = $this->CalculateRGB($portion, substr($startColor, 0, 2), substr($endColor, 0, 2));
        $result = (strlen(dechex($red)) == 1) ? $result . "0" . dechex($red) : $result . dechex($red);
        $green = $this->CalculateRGB($portion, substr($startColor, 2, 2), substr($endColor, 2, 2));
        $result = (strlen(dechex($green)) == 1) ? $result . "0" . dechex($green) : $result . dechex($green);
        $blue = $this->CalculateRGB($portion, substr($startColor, 4, 2), substr($endColor, 4, 2));
        $result = (strlen(dechex($blue)) == 1) ? $result . "0" . dechex($blue) : $result . dechex($blue);

        return $result;
    }

    private function CalculateRGB($portion, $startRGB, $endRGB)
    {
        return (hexdec($startRGB) + ($portion * (hexdec($endRGB) - hexdec($startRGB))));
    }

    private function GetFeaturePropertyValue($featureReader, $name)
    {
        $value = '';
        $propertyType = $featureReader->GetPropertyType($name);
        switch($propertyType)
        {
            case MgPropertyType::Boolean :
                $value = $featureReader->GetBoolean($name);
                break;

            case MgPropertyType::Byte :
                $value = $featureReader->GetByte($name);
                break;

            case MgPropertyType::Single :
                $value = $featureReader->GetSingle($name);
                break;

            case MgPropertyType::Double :
                $value = $featureReader->GetDouble($name);
                break;

            case MgPropertyType::Int16 :
                $value = $featureReader->GetInt16($name);
                break;

            case MgPropertyType::Int32 :
                $value = $featureReader->GetInt32($name);
                break;

            case MgPropertyType::Int64 :
                $value = $featureReader->GetInt64($name);
                break;

            case MgPropertyType::String :
                $value = $featureReader->GetString($name);
                break;

            case MgPropertyType::DateTime :
            case MgPropertyType::Null :
            case MgPropertyType::Blob :
            case MgPropertyType::Clob :
            case MgPropertyType::Feature :
            case MgPropertyType::Geometry :
            case MgPropertyType::Raster :
                $value = '[unsupported data type]';
                break;
        }
        return $value;
    }

    private function GetDistributionsForDataType($type)
    {
        $distros = array();

        switch($type)
        {
            case MgPropertyType::String:
                array_push($distros, 0);
                break;

            case MgPropertyType::Byte :
            case MgPropertyType::Int16 :
            case MgPropertyType::Int32 :
            case MgPropertyType::Int64 :
                array_push($distros, 0, 1, 2, 3, 4);
                break;

            case MgPropertyType::Single :
            case MgPropertyType::Double :
                array_push($distros, 1, 2, 3, 4);
                break;

            case MgPropertyType::Boolean:
            case MgPropertyType::DateTime:
            case MgPropertyType::Blob:
            case MgPropertyType::Clob:
            case MgPropertyType::Byte:
            case MgPropertyType::Feature:
            case MgPropertyType::Geometry:
            case MgPropertyType::Null:
                break;
        }
        return $distros;
    }

    private function MakeUniqueLayerName($map, $layerName, $themeName)
    {
        $desiredName = "_" . $layerName . $themeName;
        $uniqueName = $desiredName;
        $index = 1;

        while ($map->GetLayers()->Contains($uniqueName))
        {
            $uniqueName = $desiredName . $index;
            $index++;
        }
        return $uniqueName;
    }
}
?>