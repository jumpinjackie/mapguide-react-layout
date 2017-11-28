<?php

require_once dirname(__FILE__).'/../../../layers/MapGuide/php/Constants.php';
require_once 'classes/markupschemafactory.php';

class MarkupManager
{
    const MARKUP_REGISTRY_NAME = 'MarkupRegistry';

    private $args = null;
    private $site = null;
    private $markupRegistryId = null;

    function __construct($args)
    {
        $this->args = $args;
        $this->site = new MgSiteConnection();
        $this->site->Open(new MgUserInformation($args['SESSION']));
        $this->InitMarkupRegistry();
    }

    function SetArgument($arg, $value)
    {
        $this->args[$arg] = $value;
    }

    function InitMarkupRegistry()
    {
        //NOTE: EnumerateResources does not work for session repositories. So to be able to "enumerate"
        //resources, we create a registry feature source that would store this information

        $this->markupRegistryId = new MgResourceIdentifier($this->GetResourceIdPrefix().MarkupManager::MARKUP_REGISTRY_NAME.".FeatureSource");
        $resourceService = $this->site->CreateService(MgServiceType::ResourceService);

        //Create the markup registry feature source if it doesn't already exist
        if (!$resourceService->ResourceExists($this->markupRegistryId))
        {
            $featureService = $this->site->CreateService(MgServiceType::FeatureService);

            //Markup Registry Feature Source Schema
            //
            //Default
            //  MarkupRegistry
            //    ResourceId (String, Identity, Not Null)
            //    LayerDefintion (String, Not Null)
            //    Name (String, Not Null)
            //    FdoProvider (String, Not Null)
            //    GeometryTypes (Int, Not Null)

            $markupRegSchema = new MgFeatureSchema("Default", "");
            $markupRegClass = new MgClassDefinition();
            $markupRegClass->SetName("MarkupRegistry");

            $markupRegId = new MgDataPropertyDefinition("ResourceId");
            $markupRegId->SetDataType(MgPropertyType::String);
            $markupRegId->SetLength(1024);
            $markupRegId->SetNullable(false);

            $layerDefId = new MgDataPropertyDefinition("LayerDefinition");
            $layerDefId->SetDataType(MgPropertyType::String);
            $layerDefId->SetLength(1024);
            $layerDefId->SetNullable(false);

            $markupRegName = new MgDataPropertyDefinition("Name");
            $markupRegName->SetDataType(MgPropertyType::String);
            $markupRegName->SetLength(512);
            $markupRegName->SetNullable(false);

            $fdoProvider = new MgDataPropertyDefinition("FdoProvider");
            $fdoProvider->SetDataType(MgPropertyType::String);
            $fdoProvider->SetLength(512);
            $fdoProvider->SetNullable(false);

            $geomTypes = new MgDataPropertyDefinition("GeometryTypes");
            $geomTypes->SetDataType(MgPropertyType::Int32);
            $geomTypes->SetNullable(false);

            $dataProps = $markupRegClass->GetProperties();
            $dataProps->Add($markupRegId);
            $dataProps->Add($layerDefId);
            $dataProps->Add($markupRegName);
            $dataProps->Add($fdoProvider);
            $dataProps->Add($geomTypes);

            $idProps = $markupRegClass->GetIdentityProperties();
            $idProps->Add($markupRegId);

            $classes = $markupRegSchema->GetClasses();
            $classes->Add($markupRegClass);

            $createSdf = new MgFileFeatureSourceParams("OSGeo.SDF", "Default", "", $markupRegSchema);
            $featureService->CreateFeatureSource($this->markupRegistryId, $createSdf);
        }
    }

    function GetResourceIdPrefix()
    {
        return "Session:" . $this->args["SESSION"] . "//";
    }

    function GetFeatureSource($layerDefinitionId)
    {
        $featureService = $this->site->CreateService(MgServiceType::FeatureService);
        $query = new MgFeatureQueryOptions();
        $query->SetFilter("LayerDefinition = '$layerDefinitionId'");
        //NOTE: Normally we'd always pass in a MgFeatureQueryOptions with an explicit property
        //list, but we're dealing an FDO provider (SDF) that is known to *not* have the issue of 
        //potentially leaking out column types in the query result that the underlying FDO provider 
        //doesn't know how to translate to FDO logical properties, so passing the MgFeatureQueryOptions 
        //as-is is fine here.
        $fr = $featureService->SelectFeatures($this->markupRegistryId, "Default:MarkupRegistry", $query);

        $fsId = "";
        if($fr->ReadNext())
        {
            $fsId = $fr->GetString("ResourceId");
        }
        $fr->Close();
        return $fsId;
    }

    function GetFileExtension($markupLayerResId) {
        $featureService = $this->site->CreateService(MgServiceType::FeatureService);
        $query = new MgFeatureQueryOptions();
        $query->SetFilter("LayerDefinition = '$markupLayerResId'");
        //NOTE: Normally we'd always pass in a MgFeatureQueryOptions with an explicit property
        //list, but we're dealing an FDO provider (SDF) that is known to *not* have the issue of 
        //potentially leaking out column types in the query result that the underlying FDO provider 
        //doesn't know how to translate to FDO logical properties, so passing the MgFeatureQueryOptions 
        //as-is is fine here.
        $fr = $featureService->SelectFeatures($this->markupRegistryId, "Default:MarkupRegistry", $query);

        $fdoProvider = "";
        if($fr->ReadNext())
        {
            $fdoProvider = $fr->GetString("FdoProvider");
        }
        $fr->Close();

        if (strcmp("OSGeo.SDF", $fdoProvider) == 0)
            return ".sdf";
        else if (strcmp("OSGeo.SQLite", $fdoProvider) == 0)
            return ".sqlite";
        else if (strcmp("OSGeo.SHP", $fdoProvider) == 0)
            return ".zip"; //Need to zip up the SHP file and its associates
        else
            return "";
    }

    function GetAvailableMarkup()
    {
        $markup = array();

        //Query the markup registry
        $featureService = $this->site->CreateService(MgServiceType::FeatureService);
        $query = new MgFeatureQueryOptions();
        //NOTE: Normally we'd always pass in a MgFeatureQueryOptions with an explicit property
        //list, but we're dealing an FDO provider (SDF) that is known to *not* have the issue of 
        //potentially leaking out column types in the query result that the underlying FDO provider 
        //doesn't know how to translate to FDO logical properties, so passing the MgFeatureQueryOptions 
        //as-is is fine here.
        $fr = $featureService->SelectFeatures($this->markupRegistryId, "Default:MarkupRegistry", $query);
        while($fr->ReadNext())
        {
            $resId = $fr->GetString("LayerDefinition");
            $resName = $fr->GetString("Name");
            //$provider = $fr->GetString("FdoProvider");

            $markup[$resId] = $resName; //"$resName ($provider)";
        }
        $fr->Close();

        return $markup;
    }

    function StripAlphaFromColorString($str) {
        return substr($str, 2, strlen($str) - 2);
    }

    function GetLayerStyle($layerDef)
    {
        $basic = (strcmp($this->args["REDLINESTYLIZATION"], "BASIC") == 0);
        $style = new LayerStyle();
        $resId = new MgResourceIdentifier($layerDef);
        $resourceService = $this->site->CreateService(MgServiceType::ResourceService);
        $br = $resourceService->GetResourceContent($resId);

        $doc = new DOMDocument();
        $doc->loadXML($br->ToString());
        
        if ($basic) {
            $vsr = $doc->getElementsByTagName("VectorScaleRange")->item(0);

            $pts = $vsr->getElementsByTagName("PointTypeStyle");
            $ats = $vsr->getElementsByTagName("AreaTypeStyle");
            $lts = $vsr->getElementsByTagName("LineTypeStyle");

            if ($pts->length > 0) {
                $pr = $pts->item(0);
                $prLabel = $pr->getElementsByTagName("Label")->item(0);
                $prMark = $pr->getElementsByTagName("PointSymbolization2D")->item(0)->getElementsByTagName("Mark")->item(0);

                $style->LABEL_SIZE_UNITS = $prLabel->getElementsByTagName("Unit")->item(0)->nodeValue;
                $style->LABEL_FONT_SIZE = $prLabel->getElementsByTagName("SizeX")->item(0)->nodeValue;
                $style->LABEL_FORE_COLOR = $this->StripAlphaFromColorString($prLabel->getElementsByTagName("ForegroundColor")->item(0)->nodeValue);
                $style->LABEL_BACK_COLOR = $this->StripAlphaFromColorString($prLabel->getElementsByTagName("BackgroundColor")->item(0)->nodeValue);
                $style->LABEL_BACK_STYLE = $prLabel->getElementsByTagName("BackgroundStyle")->item(0)->nodeValue;
                $style->LABEL_BOLD = $prLabel->getElementsByTagName("Bold")->item(0)->nodeValue;
                $style->LABEL_ITALIC = $prLabel->getElementsByTagName("Italic")->item(0)->nodeValue;
                $style->LABEL_UNDERLINE = $prLabel->getElementsByTagName("Underlined")->item(0)->nodeValue;

                $style->MARKER_SIZE_UNITS = $prMark->getElementsByTagName("Unit")->item(0)->nodeValue;
                $style->MARKER_SIZE = $prMark->getElementsByTagName("SizeX")->item(0)->nodeValue;
                $style->MARKER_TYPE = $prMark->getElementsByTagName("Shape")->item(0)->nodeValue;

                $style->MARKER_COLOR = $this->StripAlphaFromColorString($prMark->getElementsByTagName("ForegroundColor")->item(0)->nodeValue);
                //$style->MARKER_COLOR = $this->StripAlphaFromColorString($prMark->item(7)->childNodes->item(2)->nodeValue);
            }
            if ($lts->length > 0) {
                $lr = $lts->item(0);
                $lrLabel = $lr->getElementsByTagName("Label")->item(0);
                $lrSym = $lr->getElementsByTagName("LineSymbolization2D")->item(0);

                $style->LABEL_SIZE_UNITS = $lrLabel->getElementsByTagName("Unit")->item(0)->nodeValue;
                $style->LABEL_FONT_SIZE = $lrLabel->getElementsByTagName("SizeX")->item(0)->nodeValue;
                $style->LABEL_FORE_COLOR = $this->StripAlphaFromColorString($lrLabel->getElementsByTagName("ForegroundColor")->item(0)->nodeValue);
                $style->LABEL_BACK_COLOR = $this->StripAlphaFromColorString($lrLabel->getElementsByTagName("BackgroundColor")->item(0)->nodeValue);
                $style->LABEL_BACK_STYLE = $lrLabel->getElementsByTagName("BackgroundStyle")->item(0)->nodeValue;

                if ($pts->length == 0) {
                    $style->LABEL_BOLD = $lrLabel->getElementsByTagName("Bold")->item(0)->nodeValue;
                    $style->LABEL_ITALIC = $lrLabel->getElementsByTagName("Italic")->item(0)->nodeValue;
                    $style->LABEL_UNDERLINE = $lrLabel->getElementsByTagName("Underlined")->item(0)->nodeValue;
                }

                $style->LINE_PATTERN = $lrSym->getElementsByTagName("LineStyle")->item(0)->nodeValue;
                $style->LINE_THICKNESS = $lrSym->getElementsByTagName("Thickness")->item(0)->nodeValue;
                $style->LINE_COLOR = $this->StripAlphaFromColorString($lrSym->getElementsByTagName("Color")->item(0)->nodeValue);
                $style->LINE_SIZE_UNITS = $lrSym->getElementsByTagName("Unit")->item(0)->nodeValue;
            }
            if ($ats->length > 0) {
                $ar = $ats->item(0);
                $arLabel = $ar->getElementsByTagName("Label")->item(0);
                $arSym = $ar->getElementsByTagName("AreaSymbolization2D")->item(0);

                $style->LABEL_SIZE_UNITS = $arLabel->getElementsByTagName("Unit")->item(0)->nodeValue;
                $style->LABEL_FONT_SIZE = $arLabel->getElementsByTagName("SizeX")->item(0)->nodeValue;
                $style->LABEL_FORE_COLOR = $this->StripAlphaFromColorString($arLabel->getElementsByTagName("ForegroundColor")->item(0)->nodeValue);
                $style->LABEL_BACK_COLOR = $this->StripAlphaFromColorString($arLabel->getElementsByTagName("BackgroundColor")->item(0)->nodeValue);
                $style->LABEL_BACK_STYLE = $arLabel->getElementsByTagName("BackgroundStyle")->item(0)->nodeValue;

                if ($pts->length == 0 && $lts->length == 0)
                {
                    $style->LABEL_BOLD = $arLabel->getElementsByTagName("Bold")->item(0)->nodeValue;
                    $style->LABEL_ITALIC = $arLabel->getElementsByTagName("Italic")->item(0)->nodeValue;
                    $style->LABEL_UNDERLINE = $arLabel->getElementsByTagName("Underlined")->item(0)->nodeValue;
                }

                $arSymFill = $arSym->getElementsByTagName("Fill")->item(0);
                $arSymStroke = $arSym->getElementsByTagName("Stroke")->item(0);

                $style->FILL_PATTERN = $arSymFill->getElementsByTagName("FillPattern")->item(0)->nodeValue;
                $style->FILL_FORE_COLOR = $this->StripAlphaFromColorString($arSymFill->getElementsByTagName("ForegroundColor")->item(0)->nodeValue);
                $style->FILL_BACK_COLOR = $this->StripAlphaFromColorString($arSymFill->getElementsByTagName("BackgroundColor")->item(0)->nodeValue);

                $style->BORDER_PATTERN = $arSymStroke->getElementsByTagName("LineStyle")->item(0)->nodeValue;
                $style->BORDER_THICKNESS = $arSymStroke->getElementsByTagName("Thickness")->item(0)->nodeValue;
                $style->BORDER_COLOR = $this->StripAlphaFromColorString($arSymStroke->getElementsByTagName("Color")->item(0)->nodeValue);
                $style->BORDER_SIZE_UNITS = $arSymStroke->getElementsByTagName("Unit")->item(0)->nodeValue;
            }
        } else {
            //Ironically, Advanced Stylization is simpler here, because as part of creating the Layer Definition we've stuffed all the relevant settings under ExtendedData for easy retrieval
            $extData = $doc->getElementsByTagName("ExtendedData1");
            if ($extData->length == 1) {
                $ext = $extData->item(0);
                $nodes = $ext->getElementsByTagName("MG_MARKER_COLOR");
                if ($nodes->length == 1)
                    $style->MARKER_COLOR = $nodes->item(0)->nodeValue;
                $nodes = $ext->getElementsByTagName("MG_MARKER_TYPE");
                if ($nodes->length == 1)
                    $style->MARKER_TYPE = $nodes->item(0)->nodeValue;
                $nodes = $ext->getElementsByTagName("MG_MARKER_UNITS");
                if ($nodes->length == 1)
                    $style->MARKER_SIZE_UNITS = $nodes->item(0)->nodeValue;
                $nodes = $ext->getElementsByTagName("MG_MARKER_SIZE");
                if ($nodes->length == 1)
                    $style->MARKER_SIZE = $nodes->item(0)->nodeValue;
                $nodes = $ext->getElementsByTagName("MG_LINE_COLOR");
                if ($nodes->length == 1)
                    $style->LINE_COLOR = $nodes->item(0)->nodeValue;
                $nodes = $ext->getElementsByTagName("MG_LINE_PATTERN");
                if ($nodes->length == 1)
                    $style->LINE_PATTERN = $nodes->item(0)->nodeValue;
                $nodes = $ext->getElementsByTagName("MG_LINE_UNITS");
                if ($nodes->length == 1)
                    $style->LINE_SIZE_UNITS = $nodes->item(0)->nodeValue;
                $nodes = $ext->getElementsByTagName("MG_LINE_THICKNESS");
                if ($nodes->length == 1)
                    $style->LINE_THICKNESS = $nodes->item(0)->nodeValue;
                $nodes = $ext->getElementsByTagName("MG_FILL_PATTERN");
                if ($nodes->length == 1)
                    $style->FILL_PATTERN = $nodes->item(0)->nodeValue;
                $nodes = $ext->getElementsByTagName("MG_FILL_FORE_TRANSPARENCY");
                if ($nodes->length == 1)
                    $style->FILL_TRANSPARENCY = $nodes->item(0)->nodeValue;
                $nodes = $ext->getElementsByTagName("MG_FILL_FORE_COLOR");
                if ($nodes->length == 1)
                    $style->FILL_FORE_COLOR = $nodes->item(0)->nodeValue;
                $nodes = $ext->getElementsByTagName("MG_FILL_BACK_COLOR");
                if ($nodes->length == 1)
                    $style->FILL_BACK_COLOR = $nodes->item(0)->nodeValue;
                $nodes = $ext->getElementsByTagName("MG_FILL_BACK_TRANSPARENCY");
                if ($nodes->length == 1)
                    $style->FILL_BACK_TRANS = $nodes->item(0)->nodeValue;
                $nodes = $ext->getElementsByTagName("MG_BORDER_PATTERN");
                if ($nodes->length == 1)
                    $style->BORDER_PATTERN = $nodes->item(0)->nodeValue;
                $nodes = $ext->getElementsByTagName("MG_BORDER_UNITS");
                if ($nodes->length == 1)
                    $style->BORDER_SIZE_UNITS = $nodes->item(0)->nodeValue;
                $nodes = $ext->getElementsByTagName("MG_BORDER_COLOR");
                if ($nodes->length == 1)
                    $style->BORDER_COLOR = $nodes->item(0)->nodeValue;
                $nodes = $ext->getElementsByTagName("MG_BORDER_THICKNESS");
                if ($nodes->length == 1)
                    $style->BORDER_THICKNESS = $nodes->item(0)->nodeValue;
                $nodes = $ext->getElementsByTagName("MG_LABEL_FONT_UNITS");
                if ($nodes->length == 1)
                    $style->LABEL_SIZE_UNITS = $nodes->item(0)->nodeValue;
                $nodes = $ext->getElementsByTagName("MG_LABEL_FONT_SIZE");
                if ($nodes->length == 1)
                    $style->LABEL_FONT_SIZE = $nodes->item(0)->nodeValue;
                $nodes = $ext->getElementsByTagName("MG_BOLD");
                if ($nodes->length == 1)
                    $style->LABEL_BOLD = $nodes->item(0)->nodeValue;
                $nodes = $ext->getElementsByTagName("MG_ITALIC");
                if ($nodes->length == 1)
                    $style->LABEL_ITALIC = $nodes->item(0)->nodeValue;
                $nodes = $ext->getElementsByTagName("MG_UNDERLINE");
                if ($nodes->length == 1)
                    $style->LABEL_UNDERLINE = $nodes->item(0)->nodeValue;
                $nodes = $ext->getElementsByTagName("MG_LABEL_FORECOLOR");
                if ($nodes->length == 1)
                    $style->LABEL_FORE_COLOR = $nodes->item(0)->nodeValue;
                $nodes = $ext->getElementsByTagName("MG_LABEL_BACKCOLOR");
                if ($nodes->length == 1)
                    $style->LABEL_BACK_COLOR = $nodes->item(0)->nodeValue;
                $nodes = $ext->getElementsByTagName("MG_LABEL_STYLE");
                if ($nodes->length == 1)
                    $style->LABEL_BACK_STYLE = $nodes->item(0)->nodeValue;
                
                //Ignore back style, we can't figure this out yet for advanced stylization
            }
        }
        return $style;
    }

    function OpenMarkup()
    {
        $resourceService = $this->site->CreateService(MgServiceType::ResourceService);

        $map = new MgMap($this->site);
        $map->Open($this->args['MAPNAME']);

        // Create the Layer Groups

        $markupGroup = null;
        $layerGroups = $map->GetLayerGroups();
        if ($layerGroups->Contains('_Markup'))
        {
            $markupGroup = $layerGroups->GetItem('_Markup');
        }
        else
        {
            $markupGroup = new MgLayerGroup('_Markup');
            $markupGroup->SetVisible(true);
            $markupGroup->SetLegendLabel('Markup');
            $markupGroup->SetDisplayInLegend(true);
            $layerGroups->Add($markupGroup);
        }

        // Add the Markup Layer

        $markupLayerResId = new MgResourceIdentifier($this->args['MARKUPLAYER']);
        $markupLayer = new MgLayer($markupLayerResId, $resourceService);
        $markupLayer->SetName('_' . $markupLayerResId->GetName());
        $markupLayer->SetLegendLabel($markupLayerResId->GetName());
        $markupLayer->SetDisplayInLegend(true);
        $markupLayer->SetSelectable(true);
        $markupLayer->SetGroup($markupGroup);
        $map->GetLayers()->Insert(0, $markupLayer);

        $map->Save();
    }

    function CloseMarkup()
    {
        $map = new MgMap($this->site);
        $map->Open($this->args['MAPNAME']);

        // Add the Markup Layer

        $markupLayerResId = new MgResourceIdentifier($this->args['OPENMARKUP']);
        $index = $map->GetLayers()->IndexOf('_' . $markupLayerResId->GetName());
        $map->GetLayers()->RemoveAt($index);

        $map->Save();
    }

    function UniqueMarkupName(&$markupName)
    {
        $availableMarkups = $this->GetAvailableMarkup();
        foreach ($availableMarkups as &$availableMarkupName)
        {
            if($availableMarkupName == $markupName)
            {
                $markupName = $markupName . '_1';
                $this->UniqueMarkupName($markupName);
                break;
            }
        }
    }
    
    static function SizeInMM($size, $units)
    {
        $dSize = floatval($size);
        if (strcmp($units, "Points") == 0) {
            return $dSize * 0.352777778;
        } else if (strcmp($units, "Inches") == 0) {
            return $dSize * 25.4;
        } else if (strcmp($units, "Centimeters") == 0) {
            return $dSize * 10;
        } else if (strcmp($units, "Meters") == 0) {
            return $dSize * 1000;
        } else {
            return $dSize;
        }
    }
    
    static function GetMarkerGeometry($markerType)
    {
        /*
        Square:     M -1.0,-1.0 L 1.0,-1.0 L 1.0,1.0 L -1.0,1.0 L -1.0,-1.0
        Circle:     M -1,0 A 1,1 0 1 1 1,0 A 1,1 0 1 1 -1,0
        Triangle:   M -1.0,-1.0 h 2.0 l -1.0,2.0 z
        Star:       M -0.618033988749895,-0.951056516295154 L 0,-0.502028539715568 L 0.618033988749895,-0.951056516295154 L 0.381966011250105,-0.273457471994639 L 1,0.175570504584946 L 0.23606797749979,0.175570504584946 L 0,0.951056516295154 L -0.23606797749979,0.175570504584946 L -1,0.175570504584946 L -0.381966011250105,-0.273457471994639 L -0.618033988749895,-0.951056516295154
        Cross:      M -0.190983005625053,-1 L 0.190983005625053,-1 L 0.190983005625053,-0.190983005625053 L 1,-0.190983005625053 L 1,0.190983005625053 L 0.190983005625053,0.190983005625053 L 0.190983005625053,1 L -0.190983005625053,1 L -0.190983005625053,0.190983005625053 L -1,0.190983005625053 L -1,-0.190983005625053 L -0.190983005625053,-0.190983005625053 L -0.190983005625053,-1
        X:          M -0.459818486524547,-1 L 0,-0.540181513475453 L 0.459818486524547,-1 L 1,-0.459818486524547 L 0.540181513475453,0 L 1,0.459818486524547 L 0.459818486524547,1 L 0,0.540181513475453 L -0.459818486524547,1 L -1,0.459818486524547 L -0.540181513475453,0 L -1,-0.459818486524547 L -0.459818486524547,-1
        Star-Old:   M -0.707106781186548,0.707106781186548 L 0.707106781186548,-0.707106781186548 M -0.707106781186548,-0.707106781186548 L 0.707106781186548,0.707106781186548 M -1,0 L 1,0 M 0,-1 L 0,1
        Cross-Old:  M -1,0 L 1,0 M 0,-1 L 0,1
        X-Old:      M -0.707106781186548,0.707106781186548 L 0.707106781186548,-0.707106781186548 M -0.707106781186548,-0.707106781186548 L 0.707106781186548,0.707106781186548        
        */
        if (strcmp($markerType, "Square") == 0) {
            return "M -1.0,-1.0 L 1.0,-1.0 L 1.0,1.0 L -1.0,1.0 L -1.0,-1.0";
        } else if (strcmp($markerType, "Circle") == 0) {
            return "M -1,0 A 1,1 0 1 1 1,0 A 1,1 0 1 1 -1,0";
        } else if (strcmp($markerType, "Triangle") == 0) {
            return "M -1.0,-1.0 h 2.0 l -1.0,2.0 z";
        } else if (strcmp($markerType, "Star") == 0) {
            return "M -0.618033988749895,-0.951056516295154 L 0,-0.502028539715568 L 0.618033988749895,-0.951056516295154 L 0.381966011250105,-0.273457471994639 L 1,0.175570504584946 L 0.23606797749979,0.175570504584946 L 0,0.951056516295154 L -0.23606797749979,0.175570504584946 L -1,0.175570504584946 L -0.381966011250105,-0.273457471994639 L -0.618033988749895,-0.951056516295154";
        } else if (strcmp($markerType, "Cross") == 0) {
            return "M -0.190983005625053,-1 L 0.190983005625053,-1 L 0.190983005625053,-0.190983005625053 L 1,-0.190983005625053 L 1,0.190983005625053 L 0.190983005625053,0.190983005625053 L 0.190983005625053,1 L -0.190983005625053,1 L -0.190983005625053,0.190983005625053 L -1,0.190983005625053 L -1,-0.190983005625053 L -0.190983005625053,-0.190983005625053 L -0.190983005625053,-1";
        } else if (strcmp($markerType, "X") == 0) {
            return "M -0.459818486524547,-1 L 0,-0.540181513475453 L 0.459818486524547,-1 L 1,-0.459818486524547 L 0.540181513475453,0 L 1,0.459818486524547 L 0.459818486524547,1 L 0,0.540181513475453 L -0.459818486524547,1 L -1,0.459818486524547 L -0.540181513475453,0 L -1,-0.459818486524547 L -0.459818486524547,-1";
        } else {
            throw new Exception("Unrecognized or unsupported marker type: $markerType");
        }
    }
    
    static function GetMarkerSize($markerSize, $markerUnits)
    {
        //Halve the resulting size to get approximate same size as it would look under basic stylization
        return MarkupManager::GetLineThickness($markerSize, $markerUnits) / 2.0;
    }
    
    static function GetLinePatternGeometry($pattern)
    {
        return MarkupManager::GetBorderPatternGeometry($pattern);
    }
    
    static function GetLineThickness($thickness, $units)
    {
        if (strcmp($units, "Points") == 0) {
            return floatval($thickness) * 0.352777778;
        } else if (strcmp($units, "Inches") == 0) {
            return floatval($thickness) * 25.4;
        } else if (strcmp($units, "Millimeters") == 0) {
            return floatval($thickness);
        } else if (strcmp($units, "Centimeters") == 0) {
            return floatval($thickness) * 10;
        } else if (strcmp($units, "Meters") == 0) {
            return floatval($thickness) * 1000;
        } else {
            throw new Exception("Unsupported or unrecognized unit: $units");
        }
    }
    
    static function GetFillPatternTemplate($pattern)
    {
        if (strcmp($pattern, "Solid") == 0) {
            return file_get_contents(dirname(__FILE__)."/../templates/area_solid.templ");
        } else if (strcmp($pattern, "Net") == 0) {
            return file_get_contents(dirname(__FILE__)."/../templates/area_net.templ");
        } else if (strcmp($pattern, "Line") == 0) {
            return file_get_contents(dirname(__FILE__)."/../templates/area_line.templ");
        } else if (strcmp($pattern, "Line_45") == 0) {
            return file_get_contents(dirname(__FILE__)."/../templates/area_line_45.templ");
        } else if (strcmp($pattern, "Line_90") == 0) {
            return file_get_contents(dirname(__FILE__)."/../templates/area_line_90.templ");
        } else if (strcmp($pattern, "Line_135") == 0) {
            return file_get_contents(dirname(__FILE__)."/../templates/area_line_135.templ");
        } else if (strcmp($pattern, "Square") == 0) {
            return file_get_contents(dirname(__FILE__)."/../templates/area_square.templ");
        } else if (strcmp($pattern, "Box") == 0) {
            return file_get_contents(dirname(__FILE__)."/../templates/area_box.templ");
        } else if (strcmp($pattern, "Cross") == 0) {
            return file_get_contents(dirname(__FILE__)."/../templates/area_cross.templ");
        } else if (strcmp($pattern, "Dash") == 0) {
            return file_get_contents(dirname(__FILE__)."/../templates/area_dash.templ");
        } else if (strcmp($pattern, "Dolmit") == 0) {
            return file_get_contents(dirname(__FILE__)."/../templates/area_dolmit.templ");
        } else if (strcmp($pattern, "Hex") == 0) {
            return file_get_contents(dirname(__FILE__)."/../templates/area_hex.templ");
        } else if (strcmp($pattern, "Sacncr") == 0) {
            return file_get_contents(dirname(__FILE__)."/../templates/area_sacncr.templ");
        } else if (strcmp($pattern, "Steel") == 0) {
            return file_get_contents(dirname(__FILE__)."/../templates/area_steel.templ");
        } else {
            throw new Exception("Unsupported or unrecognized fill pattern: $pattern");
        }
    }
    
    static function GetBorderPatternGeometry($pattern)
    {
        if (strcmp($pattern, "Solid") == 0) {
            return file_get_contents(dirname(__FILE__)."/../templates/line_solid.templ");
        } else if (strcmp($pattern, "Dash") == 0) {
            return file_get_contents(dirname(__FILE__)."/../templates/line_dash.templ");
        } else if (strcmp($pattern, "Dot") == 0) {
            return file_get_contents(dirname(__FILE__)."/../templates/line_dot.templ");
        } else if (strcmp($pattern, "DashDot") == 0) {
            return file_get_contents(dirname(__FILE__)."/../templates/line_dashdot.templ");
        } else if (strcmp($pattern, "DashDotDot") == 0) {
            return file_get_contents(dirname(__FILE__)."/../templates/line_dashdotdot.templ");
        } else if (strcmp($pattern, "Rail") == 0) {
            return file_get_contents(dirname(__FILE__)."/../templates/line_rail.templ");
        } else if (strcmp($pattern, "BORDER") == 0) {
            return file_get_contents(dirname(__FILE__)."/../templates/line_border.templ");
        } else if (strcmp($pattern, "DIVIDE") == 0) {
            return file_get_contents(dirname(__FILE__)."/../templates/line_divide.templ");
        } else if (strcmp($pattern, "FENCELINE1") == 0) {
            return file_get_contents(dirname(__FILE__)."/../templates/line_fenceline1.templ");
        } else {
            throw new Exception("Unsupported or unrecognized border pattern: $pattern");
        }
    }

    function CreateMarkupLayerDefinitionContent($featureSourceId, $className)
    {
        $basic = (strcmp($this->args["REDLINESTYLIZATION"], "BASIC") == 0);
        // Create the Markup Layer Definition. Create or update, this code is the same.

        $hexFgTransparency = sprintf("%02x", 255 * (100 - $this->args['FILLTRANSPARENCY']) / 100); // Convert % to an alpha value
        $hexBgTransparency = $this->args['FILLBACKTRANS'] ? "FF" : "00";							 // All or nothing
        $bold = array_key_exists('LABELBOLD', $this->args) ? "true" : "false";
        $italic = array_key_exists('LABELITALIC', $this->args) ? "true" : "false";
        $underline = array_key_exists('LABELUNDERLINE', $this->args) ? "true" : "false";
        if ($basic) {
            $markupLayerDefinition = file_get_contents("templates/markuplayerdefinition.xml");
            $markupLayerDefinition = sprintf($markupLayerDefinition,
                $featureSourceId,						            //<ResourceId> - Feature Source
                $className,                                         //<FeatureName> - Class Name
                $this->args['LABELSIZEUNITS'],						//<Unit> - Mark Label
                $this->args['LABELFONTSIZE'],						//<SizeX> - Mark Label Size
                $this->args['LABELFONTSIZE'],						//<SizeY> - Mark Label Size
                'FF' . $this->args['LABELFORECOLOR'],				//<ForegroundColor> - Mark Label
                'FF' . $this->args['LABELBACKCOLOR'],				//<BackgroundColor> - Mark Label
                $this->args['LABELBACKSTYLE'],						//<BackgroundStyle> - Mark Label
                $bold,												//<Bold> - Mark Label
                $italic,											//<Bold> - Mark Label
                $underline,											//<Underlined> - Mark Label
                $this->args['MARKERSIZEUNITS'],						//<Unit> - Mark
                $this->args['MARKERSIZE'],							//<SizeX> - Mark
                $this->args['MARKERSIZE'],							//<SizeY> - Mark
                $this->args['MARKERTYPE'],							//<Shape> - Mark
                'FF' . $this->args['MARKERCOLOR'],					//<ForegroundColor> - Mark
                'FF' . $this->args['MARKERCOLOR'],					//<Color> - Mark
                $this->args['LABELSIZEUNITS'],						//<Unit> - Line Label
                $this->args['LABELFONTSIZE'],						//<SizeX> - Line Label Size
                $this->args['LABELFONTSIZE'],						//<SizeY> - Line Label Size
                'FF' . $this->args['LABELFORECOLOR'],				//<ForegroundColor> - Line Label
                'FF' . $this->args['LABELBACKCOLOR'],				//<BackgroundColor> - Line Label
                $this->args['LABELBACKSTYLE'],						//<BackgroundStyle> - Line Label
                $bold,												//<Bold> - Line Label
                $italic,											//<Bold> - Line Label
                $underline,											//<Underlined> - Line Label
                $this->args['LINEPATTERN'],							//<LineStyle> - Line
                $this->args['LINETHICKNESS'],						//<Thickness> - Line
                'FF' . $this->args['LINECOLOR'],					//<Color> - Line
                $this->args['LINESIZEUNITS'],						//<Unit> - Line
                $this->args['LABELSIZEUNITS'],						//<Unit> - Polygon Label
                $this->args['LABELFONTSIZE'],						//<SizeX> - Polygon Label Size
                $this->args['LABELFONTSIZE'],						//<SizeY> - Polygon Label Size
                'FF' . $this->args['LABELFORECOLOR'],				//<ForegroundColor> - Polygon Label
                'FF' . $this->args['LABELBACKCOLOR'],				//<BackgroundColor> - Polygon Label
                $this->args['LABELBACKSTYLE'],						//<BackgroundStyle> - Polygon Label
                $bold,												//<Bold> - Polygon Label
                $italic,											//<Bold> - Polygon Label
                $underline,											//<Underlined> - Polygon Label
                $this->args['FILLPATTERN'], 						//<FillPattern> - Fill
                $hexFgTransparency . $this->args['FILLFORECOLOR'], 	//<ForegroundColor> - Fill
                $hexBgTransparency . $this->args['FILLBACKCOLOR'], 	//<BackgroundColor> - Fill
                $this->args['BORDERPATTERN'],						//<LineStyle> - Fill
                $this->args['BORDERTHICKNESS'], 					//<Thickness> - Fill
                'FF' . $this->args['BORDERCOLOR'], 					//<Color> - Fill
                $this->args['BORDERSIZEUNITS']); 					//<Unit> - Fill
        } else {
            //Unlike other sprintf() based templates, we're using named placeholders for Advanced Stylization templates because there is 
            //just way too many parameters to specify using a sprintf() approach with a high chance of parameter count mismatches as well.
            $markupLayerDefinition = file_get_contents("templates/markuplayerdefinition_advanced.xml");
            
            $fontHeight = MarkupManager::SizeInMM($this->args['LABELFONTSIZE'], $this->args['LABELSIZEUNITS']);
            $labelForeColor = 'FF' . $this->args['LABELFORECOLOR'];
            $labelBackColor = 'FF' . $this->args['LABELBACKCOLOR'];
            
            //Substitute inner templates first, so their placeholders tokens are also brought in
            $markupLayerDefinition = str_replace("#{FILL_PATTERN_TEMPLATE}", MarkupManager::GetFillPatternTemplate($this->args['FILLPATTERN']), $markupLayerDefinition);
            $markupLayerDefinition = str_replace("#{BORDER_PATTERN_TEMPLATE}", MarkupManager::GetBorderPatternGeometry($this->args['BORDERPATTERN']), $markupLayerDefinition);
            
            //For non-opaque labels we need to empty the frame fill color
            if (strcmp($this->args["LABELBACKSTYLE"], "Opaque") == 0) {
                $markupLayerDefinition = str_replace("#{FRAME_FILL_COLOR}", "0xffffffff", $markupLayerDefinition);
            } else {
                $markupLayerDefinition = str_replace("#{FRAME_FILL_COLOR}", "", $markupLayerDefinition);
                if (strcmp($this->args["LABELBACKSTYLE"], "Transparent") == 0) {
                    $labelBackColor = "";
                }
            }
            
            //I don't think this is correct wrt to the UI, but this is to replicate the behaviour that we currently have under basic stylization
            //If fill is solid and background color is fully transparent, comment that portion out of the composite type style as it will interfere
            //with the area foreground symbol
            if (strcmp($hexBgTransparency, "FF") == 0 && strcmp($this->args['FILLPATTERN'], "Solid") == 0) {
                $markupLayerDefinition = str_replace("#{START_BACKGROUND_FILL}", "<!--", $markupLayerDefinition);
                $markupLayerDefinition = str_replace("#{END_BACKGROUND_FILL}", "-->", $markupLayerDefinition);
            } else {
                $markupLayerDefinition = str_replace("#{START_BACKGROUND_FILL}", "", $markupLayerDefinition);
                $markupLayerDefinition = str_replace("#{END_BACKGROUND_FILL}", "", $markupLayerDefinition);
            }
            
            //Then do a find/replace of all known tokens
            $markupLayerDefinition = str_replace("#{RESOURCE_ID}", $featureSourceId, $markupLayerDefinition);
            $markupLayerDefinition = str_replace("#{FEATURE_CLASS}", $className, $markupLayerDefinition);
            $markupLayerDefinition = str_replace("#{FONT_HEIGHT}", $fontHeight, $markupLayerDefinition);
            $markupLayerDefinition = str_replace("#{LABEL_FORE_COLOR}", $labelForeColor, $markupLayerDefinition);
            $markupLayerDefinition = str_replace("#{LABEL_BACK_COLOR}", $labelBackColor, $markupLayerDefinition);
            $markupLayerDefinition = str_replace("#{BOLD}", $bold, $markupLayerDefinition);
            $markupLayerDefinition = str_replace("#{ITALIC}", $italic, $markupLayerDefinition);
            $markupLayerDefinition = str_replace("#{UNDERLINE}", $underline, $markupLayerDefinition);
            $markupLayerDefinition = str_replace("#{MARKER_GEOMETRY}", MarkupManager::GetMarkerGeometry($this->args['MARKERTYPE']), $markupLayerDefinition);
            $markupLayerDefinition = str_replace("#{MARKER_SIZE_X}", MarkupManager::GetMarkerSize($this->args["MARKERSIZE"], $this->args["MARKERSIZEUNITS"]), $markupLayerDefinition);
            $markupLayerDefinition = str_replace("#{MARKER_SIZE_Y}", MarkupManager::GetMarkerSize($this->args["MARKERSIZE"], $this->args["MARKERSIZEUNITS"]), $markupLayerDefinition);
            $markupLayerDefinition = str_replace("#{MARKER_COLOR}", 'FF' . $this->args['MARKERCOLOR'], $markupLayerDefinition);
            $markupLayerDefinition = str_replace("#{LINE_PATTERN_GEOMETRY}", MarkupManager::GetLinePatternGeometry($this->args['LINEPATTERN']), $markupLayerDefinition);
            $markupLayerDefinition = str_replace("#{LINE_THICKNESS}", MarkupManager::GetLineThickness($this->args['LINETHICKNESS'], $this->args['LINESIZEUNITS']), $markupLayerDefinition);
            $markupLayerDefinition = str_replace("#{LINE_COLOR}", 'FF' . $this->args['LINECOLOR'], $markupLayerDefinition);
            $markupLayerDefinition = str_replace("#{FILL_BACK_COLOR}", $hexBgTransparency . $this->args['FILLBACKCOLOR'], $markupLayerDefinition);
            $markupLayerDefinition = str_replace("#{FILL_FORE_COLOR}", $hexFgTransparency . $this->args['FILLFORECOLOR'], $markupLayerDefinition);
            $markupLayerDefinition = str_replace("#{BORDER_THICKNESS}", MarkupManager::SizeInMM($this->args['BORDERTHICKNESS'], $this->args['BORDERSIZEUNITS']), $markupLayerDefinition);
            $markupLayerDefinition = str_replace("#{BORDER_COLOR}", 'FF' . $this->args['BORDERCOLOR'], $markupLayerDefinition);
            
            //Fill in the UI values under ExtendedData, so we can read from this element if we need to go back to Edit Style UI
            $markupLayerDefinition = str_replace("#{MG_RESOURCE_ID}", $featureSourceId, $markupLayerDefinition);
            $markupLayerDefinition = str_replace("#{MG_FEATURE_CLASS}", $className, $markupLayerDefinition);
            $markupLayerDefinition = str_replace("#{MG_FILL_PATTERN}", $this->args["FILLPATTERN"], $markupLayerDefinition);
            $markupLayerDefinition = str_replace("#{MG_BORDER_PATTERN}", $this->args["BORDERPATTERN"], $markupLayerDefinition);
            $markupLayerDefinition = str_replace("#{MG_LINE_PATTERN}", $this->args["LINEPATTERN"], $markupLayerDefinition);
            $markupLayerDefinition = str_replace("#{MG_LABEL_FONT_SIZE}", $this->args["LABELFONTSIZE"], $markupLayerDefinition);
            $markupLayerDefinition = str_replace("#{MG_LABEL_FONT_UNITS}", $this->args["LABELSIZEUNITS"], $markupLayerDefinition);
            $markupLayerDefinition = str_replace("#{MG_LABEL_FORECOLOR}", $this->args["LABELFORECOLOR"], $markupLayerDefinition);
            $markupLayerDefinition = str_replace("#{MG_LABEL_BACKCOLOR}", $this->args["LABELBACKCOLOR"], $markupLayerDefinition);
            $markupLayerDefinition = str_replace("#{MG_BOLD}", $bold, $markupLayerDefinition);
            $markupLayerDefinition = str_replace("#{MG_ITALIC}", $italic, $markupLayerDefinition);
            $markupLayerDefinition = str_replace("#{MG_UNDERLINE}", $underline, $markupLayerDefinition);
            $markupLayerDefinition = str_replace("#{MG_MARKER_TYPE}", $this->args["MARKERTYPE"], $markupLayerDefinition);
            $markupLayerDefinition = str_replace("#{MG_MARKER_SIZE}", $this->args["MARKERSIZE"], $markupLayerDefinition);
            $markupLayerDefinition = str_replace("#{MG_MARKER_UNITS}", $this->args["MARKERSIZEUNITS"], $markupLayerDefinition);
            $markupLayerDefinition = str_replace("#{MG_MARKER_COLOR}", $this->args["MARKERCOLOR"], $markupLayerDefinition);
            $markupLayerDefinition = str_replace("#{MG_LINE_THICKNESS}", $this->args["LINETHICKNESS"], $markupLayerDefinition);
            $markupLayerDefinition = str_replace("#{MG_LINE_UNITS}", $this->args["LINESIZEUNITS"], $markupLayerDefinition);
            $markupLayerDefinition = str_replace("#{MG_LINE_COLOR}", $this->args["LINECOLOR"], $markupLayerDefinition);
            $markupLayerDefinition = str_replace("#{MG_FILL_BACK_COLOR}", $this->args["FILLBACKCOLOR"], $markupLayerDefinition);
            $markupLayerDefinition = str_replace("#{MG_FILL_FORE_COLOR}", $this->args["FILLFORECOLOR"], $markupLayerDefinition);
            $markupLayerDefinition = str_replace("#{MG_FILL_FORE_TRANSPARENCY}", $hexFgTransparency, $markupLayerDefinition);
            $markupLayerDefinition = str_replace("#{MG_FILL_BACK_TRANSPARENCY}", $hexBgTransparency, $markupLayerDefinition);
            $markupLayerDefinition = str_replace("#{MG_BORDER_THICKNESS}", $this->args["BORDERTHICKNESS"], $markupLayerDefinition);
            $markupLayerDefinition = str_replace("#{MG_BORDER_UNITS}", $this->args["BORDERSIZEUNITS"], $markupLayerDefinition);
            $markupLayerDefinition = str_replace("#{MG_BORDER_COLOR}", $this->args["BORDERCOLOR"], $markupLayerDefinition);
            $markupLayerDefinition = str_replace("#{MG_LABEL_STYLE}", $this->args["LABELBACKSTYLE"], $markupLayerDefinition);
            
            //print_r($markupLayerDefinition);
        }
        return $markupLayerDefinition;
    }

    function CreateMarkup()
    {
        $resourceService = $this->site->CreateService(MgServiceType::ResourceService);
        $featureService = $this->site->CreateService(MgServiceType::FeatureService);

        $map = new MgMap($this->site);
        $map->Open($this->args['MAPNAME']);

        $featureSourceId = "";
        $bUpdate = array_key_exists("EDITMARKUPLAYER", $this->args) && array_key_exists("MARKUPLAYERNAME", $this->args) && array_key_exists("EDITFEATURESOURCE", $this->args);

        // Create the Markup Feature Source if not updating
        if (!$bUpdate)
        {
            $markupName = $this->args["MARKUPNAME"];
            $this->UniqueMarkupName($markupName);
            $markupFsId = new MgResourceIdentifier($this->GetResourceIdPrefix() . $markupName . '.FeatureSource');
            //MARKUPGEOMTYPE is any constant from MgFeatureGeometricType
            if (array_key_exists("MARKUPGEOMTYPE", $this->args)) {
                $markupSchema = MarkupSchemaFactory::CreateMarkupSchema(intval($this->args["MARKUPGEOMTYPE"]));
            } else {
                $markupSchema = MarkupSchemaFactory::CreateMarkupSchema(-1);
            }
            $fsParams = new MgFileFeatureSourceParams($this->args["MARKUPFDOPROVIDER"], 'Default', $map->GetMapSRS(), $markupSchema);
            $featureService->CreateFeatureSource($markupFsId, $fsParams);
            //HACK: There must be some defect in MgFeatureService::CreateFeatureSource() for SHP
            //files or the FDO provider, because even if we plug in a coord sys WKT when we create
            //it, we get a blank prj file.
            //
            //As a workaround, create the required prj file using the map's SRS if we encounter an empty prj file
            //
            //That's what we were already doing when we called MgFeatureService::CreateFeatureSource(), but it
            //or the provider didn't like it.
            if ($fsParams->GetProviderName() == "OSGeo.SHP")
            {
                $dataList = $resourceService->EnumerateResourceData($markupFsId);
                $doc = new DOMDocument();
                $doc->loadXML($dataList->ToString());
                $dataItems = $doc->getElementsByTagName("Name");
                //Copy out all data files to a temp location
                for ($i = 0; $i < $dataItems->length; $i++) {
                    $dataName = $dataItems->item($i)->nodeValue;
                    $dataNorm = strtolower($dataName);
                    if ( substr( $dataNorm, strlen( $dataNorm ) - strlen( "prj" ) ) == "prj" ) {
                        $byteReader = $resourceService->GetResourceData($markupFsId, $dataName);
                        //Sink to temp file
                        $tmpSink = new MgByteSink($byteReader);
                        $fileName = tempnam(sys_get_temp_dir(), $dataName);
                        $tmpSink->ToFile($fileName);
                        $content = file_get_contents($fileName);
                        if (strlen($content) == 0) {
                            $content = $map->GetMapSRS();
                            file_put_contents($fileName, $content);
                            //Put new prj file back into SHP Feature Source
                            $prjBs = new MgByteSource($fileName);
                            $prjBr = $prjBs->GetReader();
                            $resourceService->SetResourceData($markupFsId, $dataName, MgResourceDataType::File, $prjBr);
                        }
                        @unlink($fileName);
                        break;
                    }
                }
            }
            $featureSourceId = $markupFsId->ToString();
        }
        else
        {
            $featureSourceId = $this->args["EDITFEATURESOURCE"];
        }

        //HACK: SQLite leaky abstraction (hard-coded schema name), SHP probably has some leaks of its own, so we can't assume MarkupSchema:Markup
        //as the class name interrogate our schema to figure it out
        $fsId = new MgResourceIdentifier($featureSourceId);
        $schemas = $featureService->DescribeSchema($fsId, "", null);
        $schema = $schemas->GetItem(0);
        $classes = $schema->GetClasses();
        $cls = $classes->GetItem(0);
        $className = $schema->GetName().":".$cls->GetName();

        $markupLayerDefinition = $this->CreateMarkupLayerDefinitionContent($featureSourceId, $className);
        $byteSource = new MgByteSource($markupLayerDefinition, strlen($markupLayerDefinition));
        //Save to new resource or overwrite existing
        $layerDefId = new MgResourceIdentifier($bUpdate ? $this->args["EDITMARKUPLAYER"] : ($this->GetResourceIdPrefix() . $markupName . '.LayerDefinition'));
        $resourceService->SetResource($layerDefId, $byteSource->GetReader(), null);

        $cmds = new MgFeatureCommandCollection();
        //Register markup with markup registry if not updating
        if (!$bUpdate)
        {
            $props = new MgPropertyCollection();
            $props->Add(new MgStringProperty("ResourceId", $markupFsId->ToString()));
            $props->Add(new MgStringProperty("LayerDefinition", $layerDefId->ToString()));
            $props->Add(new MgStringProperty("Name", $layerDefId->GetName()));
            $props->Add(new MgStringProperty("FdoProvider", $this->args["MARKUPFDOPROVIDER"]));
            $props->Add(new MgInt32Property("GeometryTypes", intval($this->args["MARKUPGEOMTYPE"])));
            $insertCmd = new MgInsertFeatures("Default:MarkupRegistry", $props);

            $cmds->Add($insertCmd);
        }

        if ($cmds->GetCount() > 0) {
            $res = $featureService->UpdateFeatures($this->markupRegistryId, $cmds, false);
            MarkupManager::CleanupReaders($res);
        }

        return $layerDefId->ToString();
    }

    //Utility function to close all feature readers in a MgPropertyCollection
    static function CleanupReaders($propCol)
    {
        for ($i = 0; $i < $propCol->GetCount(); $i++)
        {
            $prop = $propCol->GetItem($i);
            if ($prop->GetPropertyType() == MgPropertyType::Feature)
            {
                $fr = $prop->GetValue();
                $fr->Close();
            }
        }
    }

    function DeleteMarkup()
    {
        $resourceService = $this->site->CreateService(MgServiceType::ResourceService);
        $featureService = $this->site->CreateService(MgServiceType::FeatureService);

        $markupLayerResId = new MgResourceIdentifier($this->args['MARKUPLAYER']);
        $markupFsId = new MgResourceIdentifier($this->GetResourceIdPrefix() . $markupLayerResId->GetName() . '.FeatureSource');

        $resourceService->DeleteResource($markupLayerResId);
        $resourceService->DeleteResource($markupFsId);

        //Delete from markup registry
        $delete = new MgDeleteFeatures("Default:MarkupRegistry", "ResourceId = '" . $markupFsId->ToString() . "' AND LayerDefinition = '" . $markupLayerResId->ToString() . "'");
        $cmds = new MgFeatureCommandCollection();
        $cmds->Add($delete);

        $res = $featureService->UpdateFeatures($this->markupRegistryId, $cmds, false);
    }

    function DownloadMarkupAsKml($kmz = false)
    {
        $kmlService = $this->site->CreateService(MgServiceType::KmlService);
        $resourceService = $this->site->CreateService(MgServiceType::ResourceService);

        $map = new MgMap($this->site);
        $map->Open($this->args['MAPNAME']);
        $markupLayerResId = new MgResourceIdentifier($this->args['MARKUPLAYER']);
        $downloadName = $markupLayerResId->GetName().".".($kmz ? "kmz" : "kml");

        //Find layer under _Markup with this layer def id
        $layerGroups = $map->GetLayerGroups();
        if (!$layerGroups->Contains("_Markup")) {
            throw new Exception(GetLocalizedString("REDLINENOOPENLAYERS", $locale));
        }
        $layers = $map->GetLayers();
        $markupLayer = null;
        for ($i = 0; $i < $layers->GetCount(); $i++) {
            $layer = $layers->GetItem($i);
            $ldfId = $layer->GetLayerDefinition();
            if (strcmp($ldfId->ToString(), $markupLayerResId->ToString()) == 0) {
                $markupLayer = $layer;
                break;
            }
        }
        if ($markupLayer == null)
            throw new Exception(GetLocalizedString("REDLINEOPENLAYERNOTFOUND", $locale));

        //View extent crunching time
        $geomFact = new MgGeometryFactory();
        $csFactory = new MgCoordinateSystemFactory();
        $metersPerUnit = 1.0;
        $transform = null;
        if ($map->GetMapSRS() != null)
        {
            $mapCs = $csFactory->Create($map->GetMapSRS());
            $metersPerUnit = $mapCs->ConvertCoordinateSystemUnitsToMeters(1.0);
            $llCs = $csFactory->CreateFromCode("LL84");
            $transform = $csFactory->GetTransform($mapCs, $llCs);
        }
        $mapScale = $map->GetViewScale();
        $devW = $map->GetDisplayWidth();
        $devH = $map->GetDisplayHeight();
        $mapDpi = $map->GetDisplayDpi();
        $metersPerPixel = 0.0254 / $mapDpi;
        $mcsW = $mapScale * $devW * $metersPerPixel / $metersPerUnit;
        $mcsH = $mapScale * $devH * $metersPerPixel / $metersPerUnit;

        $center = $map->GetViewCenter();
        $coord = $center->GetCoordinate();
        $coord0 = $geomFact->CreateCoordinateXY($coord->GetX() - 0.5 * $mcsW, $coord->GetY() - 0.5 * $mcsH);
        $coord1 = $geomFact->CreateCoordinateXY($coord->GetX() + 0.5 * $mcsW, $coord->GetY() + 0.5 * $mcsH);
        $bbox = new MgEnvelope($coord0, $coord1);
        
        //The bbox has to be in LL84
        if ($transform != NULL)
        {
            $bbox = $bbox->Transform($transform);
        }

        //Call the service API
        $br = $kmlService->GetFeaturesKml($markupLayer, $bbox, $devW, $devH, $mapDpi, 0, ($kmz ? "KMZ" : "KML"));
        $len = $br->GetLength();

        $outputBuffer = '';
        $buffer = '';
        while ($br->Read($buffer, 50000) != 0)
        {
            $outputBuffer .= $buffer;
        }

        header("Content-Type: application/octet-stream");
        header("Content-Disposition: attachment; filename=$downloadName");
        header("Content-Length: " . strlen($outputBuffer));
        echo $outputBuffer;
    }

    function DownloadMarkup()
    {
        $resourceService = $this->site->CreateService(MgServiceType::ResourceService);
        $featureService = $this->site->CreateService(MgServiceType::FeatureService);

        $markupLayerResId = new MgResourceIdentifier($this->args['MARKUPLAYER']);
        $markupFsId = new MgResourceIdentifier($this->GetResourceIdPrefix() . $markupLayerResId->GetName() . '.FeatureSource');

        $extension = $this->GetFileExtension($markupLayerResId->ToString());
        if (strcmp($extension, ".zip") == 0) {
            $dataList = $resourceService->EnumerateResourceData($markupFsId);
            $doc = new DOMDocument();
            $doc->loadXML($dataList->ToString());
            $dataItems = $doc->getElementsByTagName("Name");
            $tmpFiles = array();
            //Copy out all data files to a temp location
            for ($i = 0; $i < $dataItems->length; $i++) {
                $dataName = $dataItems->item($i)->nodeValue;
                $byteReader = $resourceService->GetResourceData($markupFsId, $dataName);
                //Sink to temp file
                $tmpSink = new MgByteSink($byteReader);
                $fileName = tempnam(sys_get_temp_dir(), $dataName);
                $tmpSink->ToFile($fileName);
                $tmpFiles[$dataName] = $fileName;
            }
            //Zip them up.
            $zipName = $markupLayerResId->GetName().$extension;
            $zipPath = tempnam(sys_get_temp_dir(), $zipName);
            $zip = new ZipArchive();
            $zip->open($zipPath, ZIPARCHIVE::CREATE);
            foreach ($tmpFiles as $dataName => $filePath) {
                $dataNorm = strtolower($dataName);
                //HACK: There must be some defect in MgFeatureService::CreateFeatureSource() for SHP
                //files or the FDO provider, because even if we plug in a coord sys WKT when we create
                //it, we get a blank prj file (both Windows/Linux). Re-uploading this same zip file back into 
                //the widget causes problems in Linux (markup features not rendered) because of the blank prj.
                //
                //So that's the problem. Here's the workaround: If we find a blank prj file as we're assembling
                //the zip file for download, pump our current Map's WKT into the prj file before packaging it up
                //
                //That's what we were already doing when we called MgFeatureService::CreateFeatureSource(), but it
                //or the provider didn't like it.
                if ( substr( $dataNorm, strlen( $dataNorm ) - strlen( "prj" ) ) == "prj" ) {
                    $content = file_get_contents($filePath);
                    if (strlen($content) == 0) {
                        $map = new MgMap($this->site);
                        $map->Open($this->args['MAPNAME']);
                        $content = $map->GetMapSRS();
                        file_put_contents($filePath, $content);
                    }
                }
                $zip->addFile($filePath, $dataName);
            }
            $zip->close();

            //Serve it up for download
            $bs = new MgByteSource($zipPath);
            $br = $bs->GetReader();

            $len = $br->GetLength();

            $outputBuffer = '';
            $buffer = '';
            while ($br->Read($buffer, 50000) != 0)
            {
                $outputBuffer .= $buffer;
            }

            header("Content-Type: application/octet-stream");
            header("Content-Disposition: attachment; filename=$zipName");
            header("Content-Length: " . strlen($outputBuffer));
            echo $outputBuffer;
            //Let's be nice and clean up after ourselves
            unlink($zipPath);
            foreach ($tmpFiles as $dataName => $filePath) {
                unlink($filePath);
            }
        } else { //Single file, make things easier!
            $dataName = $markupLayerResId->GetName().$extension;
            $byteReader = $resourceService->GetResourceData($markupFsId, $dataName);
            $len = $byteReader->GetLength();

            $outputBuffer = '';
            $buffer = '';
            while ($byteReader->Read($buffer, 50000) != 0)
            {
                $outputBuffer .= $buffer;
            }

            header("Content-Type: " . $byteReader->GetMimeType());
            header("Content-Disposition: attachment; filename=$dataName");
            header("Content-Length: " . strlen($outputBuffer));
            echo $outputBuffer;
        }
    }

    function GetProviderFromExtension($ext)
    {
        $extNorm = strtolower($ext);
        if ( substr( $extNorm, strlen( $extNorm ) - strlen( "sdf" ) ) == "sdf" ) {
            return "OSGeo.SDF";
        } else if ( substr( $extNorm, strlen( $extNorm ) - strlen( "sqlite" ) ) == "sqlite" ) {
            return "OSGeo.SQLite";
        } else if ( substr( $extNorm, strlen( $extNorm ) - strlen( "db" ) ) == "db" ) {
            return "OSGeo.SQLite";
        } else if ( substr( $extNorm, strlen( $extNorm ) - strlen( "zip" ) ) == "zip" ) { //SHP file uploads will be zipped
            return "OSGeo.SHP";
        } else {
            return null;
        }
    }

    function UploadMarkup()
    {
        $locale = "en";
        if (array_key_exists("LOCALE", $this->args))
            $locale = $this->args["LOCALE"];
        $uploadFileParts = pathinfo($_FILES["UPLOADFILE"]["name"]);
        $fdoProvider = $this->GetProviderFromExtension($uploadFileParts["extension"]);
        if ($fdoProvider == null) {
            throw new Exception(GetLocalizedString("REDLINEUPLOADUNKNOWNPROVIDER", $locale));
        }

        $resourceService = $this->site->CreateService(MgServiceType::ResourceService);
        $featureService = $this->site->CreateService(MgServiceType::FeatureService);
        $bs = new MgByteSource($_FILES["UPLOADFILE"]["tmp_name"]);
        $br = $bs->GetReader();

        //Use file name to drive all parameters
        $baseName = $uploadFileParts["filename"];
        $this->UniqueMarkupName($baseName); //Guard against potential duplicates
        $ext = $uploadFileParts["extension"];

        $markupLayerResId = new MgResourceIdentifier($this->GetResourceIdPrefix() . $baseName . ".LayerDefinition");
        $markupFsId = new MgResourceIdentifier($this->GetResourceIdPrefix() . $baseName . '.FeatureSource');

        //Set up feature source document
        $dataName = $baseName . "." . $ext;
        $fileParam = "File";
        $shpFileParts = array();
        if (strcmp($fdoProvider, "OSGeo.SHP") == 0) {
            $dataName = null;
            $fileParam = "DefaultFileLocation";
            $zip = new ZipArchive();
            if ($zip->open($_FILES["UPLOADFILE"]["tmp_name"]) === TRUE) {
                for ($i = 0; $i < $zip->numFiles; $i++) {
                    $stat = $zip->statIndex($i);
                    $filePath = tempnam(sys_get_temp_dir(), "upload");
                    //Dump to temp file
                    file_put_contents($filePath, $zip->getFromIndex($i));
                    //Stash for later upload and cleanup
                    $entry = $stat["name"];
                    $shpFileParts[$entry] = $filePath;
                    if (substr( $entry, strlen( $entry ) - strlen( ".shp" ) ) == ".shp")
                        $dataName = $entry;
                }
                //Abort if we can't find a .shp file. This is not a valid zip file
                if ($dataName == null)
                    throw new Exception(GetLocalizedString("REDLINEUPLOADSHPZIPERROR", $locale));
            } else {
                throw new Exception(GetLocalizedString("REDLINEUPLOADSHPZIPERROR", $locale));
            }
        }
        $extraXml = "";
        if (strcmp($fdoProvider, "OSGeo.SDF") == 0) { //Need to set ReadOnly = false for SDF
            $extraXml = "<Parameter><Name>ReadOnly</Name><Value>FALSE</Value></Parameter>";
        }
        else if (strcmp($fdoProvider, "OSGeo.SQLite") == 0) { //Need to set UseFdoMetadata = true for SQLite
            $extraXml = "<Parameter><Name>UseFdoMetadata</Name><Value>TRUE</Value></Parameter>";
        }
        $fsXml = sprintf(file_get_contents("templates/markupfeaturesource.xml"), $fdoProvider, $fileParam, $dataName, $extraXml);
        $bs2 = new MgByteSource($fsXml, strlen($fsXml));
        $resourceService->SetResource($markupFsId, $bs2->GetReader(), null);
        if (count($shpFileParts) > 0) {
            foreach ($shpFileParts as $name => $path) {
                $bs3 = new MgByteSource($path);
                $resourceService->SetResourceData($markupFsId, $name, "File", $bs3->GetReader());
                //Cleanup
                unlink($path);
            }
        } else { //Not a SHP file
            $resourceService->SetResourceData($markupFsId, $dataName, "File", $bs->GetReader());
        }

        //Query the geometry types
        $schemas = $featureService->DescribeSchema($markupFsId, "", null);
        $schema = $schemas->GetItem(0);
        $classes = $schema->GetClasses();
        $klass = $classes->GetItem(0);
        $geomProp = $klass->GetDefaultGeometryPropertyName();
        $clsProps = $klass->GetProperties();
        $className = $schema->GetName().":".$klass->GetName();
        $geomTypes = -1;
        if ($clsProps->IndexOf($geomProp) >= 0) {
            $geom = $clsProps->GetItem($geomProp);
            $geomTypes = $geom->GetGeometryTypes();
            //Since we're here. Validate the schema requirements. If this was created by this widget previously
            //it will be valid
            $idProps = $klass->GetIdentityProperties();
            if ($idProps->GetCount() != 1) {
                throw new Exception(GetLocalizedString("REDLINEUPLOADINVALIDSCHEMA", $locale));
            } else {
                //Must be auto-generated (implying numerical as well)
                $keyProp = $idProps->GetItem(0);
                if (!$keyProp->IsAutoGenerated()) {
                    throw new Exception(GetLocalizedString("REDLINEUPLOADINVALIDSCHEMA", $locale));
                }
            }
            if ($clsProps->IndexOf("Text") < 0) {
                throw new Exception(GetLocalizedString("REDLINEUPLOADINVALIDSCHEMA", $locale));
            }
        } else {
            throw new Exception(GetLocalizedString("REDLINEUPLOADINVALIDSCHEMA", $locale));
        }

        //Set up default style args
        $this->args["MARKUPNAME"] = $baseName;

        $this->args["MARKERCOLOR"] = DefaultStyle::MARKER_COLOR;
        $this->args["MARKERTYPE"] = DefaultStyle::MARKER_TYPE;
        $this->args["MARKERSIZEUNITS"] = DefaultStyle::MARKER_SIZE_UNITS;
        $this->args["MARKERSIZE"] = DefaultStyle::MARKER_SIZE;
        $this->args["LINECOLOR"] = DefaultStyle::LINE_COLOR;
        $this->args["LINEPATTERN"] = DefaultStyle::LINE_PATTERN;
        $this->args["LINESIZEUNITS"] = DefaultStyle::LINE_SIZE_UNITS;
        $this->args["LINETHICKNESS"] = DefaultStyle::LINE_THICKNESS;
        $this->args["FILLPATTERN"] = DefaultStyle::FILL_PATTERN;
        $this->args["FILLTRANSPARENCY"] = DefaultStyle::FILL_TRANSPARENCY;
        $this->args["FILLFORECOLOR"] = DefaultStyle::FILL_FORE_COLOR;
        $this->args["FILLBACKCOLOR"] = DefaultStyle::FILL_BACK_COLOR;
        $this->args["FILLBACKTRANS"] = DefaultStyle::FILL_BACK_TRANS;
        $this->args["BORDERPATTERN"] = DefaultStyle::BORDER_PATTERN;
        $this->args["BORDERSIZEUNITS"] = DefaultStyle::BORDER_SIZE_UNITS;
        $this->args["BORDERCOLOR"] = DefaultStyle::BORDER_COLOR;
        $this->args["BORDERTHICKNESS"] = DefaultStyle::BORDER_THICKNESS;
        $this->args["LABELSIZEUNITS"] = DefaultStyle::LABEL_SIZE_UNITS;
        $this->args["LABELFONTSIZE"] = DefaultStyle::LABEL_FONT_SIZE;

        //Omission is considered false, which is the default. If you ever change
        //the default style values, uncomment the matching "true" values
        //$this->args["LABELBOLD"] = DefaultStyle::LABEL_BOLD;
        //$this->args["LABELITALIC"] = DefaultStyle::LABEL_ITALIC;
        //$this->args["LABELUNDERLINE"] = DefaultStyle::LABEL_UNDERLINE;

        $this->args["LABELFORECOLOR"] = DefaultStyle::LABEL_FORE_COLOR;
        $this->args["LABELBACKCOLOR"] = DefaultStyle::LABEL_BACK_COLOR;
        $this->args["LABELBACKSTYLE"] = DefaultStyle::LABEL_BACK_STYLE;

        $markupLayerDefinition = $this->CreateMarkupLayerDefinitionContent($markupFsId->ToString(), $className);

        $layerBs = new MgByteSource($markupLayerDefinition, strlen($markupLayerDefinition));
        //Save to new resource or overwrite existing
        $resourceService->SetResource($markupLayerResId, $layerBs->GetReader(), null);

        //Add to markup registry
        $cmds = new MgFeatureCommandCollection();
        $props = new MgPropertyCollection();
        $props->Add(new MgStringProperty("ResourceId", $markupFsId->ToString()));
        $props->Add(new MgStringProperty("LayerDefinition", $markupLayerResId->ToString()));
        $props->Add(new MgStringProperty("Name", $markupLayerResId->GetName()));
        $props->Add(new MgStringProperty("FdoProvider", $fdoProvider));
        $props->Add(new MgInt32Property("GeometryTypes", $geomTypes));
        $insertCmd = new MgInsertFeatures("Default:MarkupRegistry", $props);

        $cmds->Add($insertCmd);
        $res = $featureService->UpdateFeatures($this->markupRegistryId, $cmds, false);
        MarkupManager::CleanupReaders($res);

        //Add to map
        $this->args["MARKUPLAYER"] = $markupLayerResId->ToString();
        $this->OpenMarkup();
    }

    function GetOpenMarkup()
    {
        $openMarkup = array();

        $map = new MgMap($this->site);
        $map->Open($this->args['MAPNAME']);

        $layerGroups = $map->GetLayerGroups();
        if ($layerGroups->Contains('_Markup'))
        {
            $layers = $map->GetLayers();

            for ($i = 0; $i < $layers->GetCount(); $i++)
            {
                $layer = $layers->GetItem($i);
                if (($layer->GetGroup() != null) and ($layer->GetGroup()->GetName() == '_Markup'))
                {
                    $openMarkup[$this->GetResourceIdPrefix() . $layer->GetLegendLabel() . '.LayerDefinition'] = $layer->GetLegendLabel();
                }
            }
            asort($openMarkup);
        }
        return $openMarkup;
    }
}

?>