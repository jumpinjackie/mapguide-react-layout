<?php

require_once 'classes/markupmanager.php';

class MarkupEditor
{
    private $args = null;
    private $site = null;

    function __construct($args)
    {
        $this->args = $args;
        $this->site = new MgSiteConnection();
        $this->site->Open(new MgUserInformation($args['SESSION']));
    }

    function GetResourceIdPrefix()
    {
        return "Session:" . $this->args["SESSION"] . "//";
    }

    function GetMarkupLayer()
    {
        return $this->args['OPENMARKUP'];
    }

    function GetMarkupName()
    {
        $resId = new MgResourceIdentifier($this->GetMarkupLayer());
        return $resId->GetName();
    }

    function GetFeatureSource()
    {
        return new MgResourceIdentifier($this->GetResourceIdPrefix() . $this->GetMarkupName() . '.FeatureSource');
    }

    function GetClassDefinition()
    {
        $featureService = $this->site->CreateService(MgServiceType::FeatureService);
        $featureSourceId = $this->GetFeatureSource();

        $classNames = new MgStringCollection();
        $classNames->Add("Markup");

        $schemas = $featureService->DescribeSchema($featureSourceId, "", $classNames);
        $schema = $schemas->GetItem(0);
        $classes = $schema->GetClasses();
        return $classes->GetItem(0);
    }

    function GetMarkupFeatures()
    {
        $features = array();

        $featureService = $this->site->CreateService(MgServiceType::FeatureService);
        $featureSourceId = $this->GetFeatureSource();

        //NOTE: Normally we'd always pass in a MgFeatureQueryOptions with an explicit property
        //list, but we're dealing with a series of FDO providers (SDF,SHP,SQLite) that are known
        //to *not* have the issue of potentially leaking out column types in the query result that
        //the underlying FDO provider doesn't know how to translate to FDO logical properties, so
        //passing null is acceptable here
        $featureReader = $featureService->SelectFeatures($featureSourceId, 'Markup', null);

        //HACK: Another leaky abstraction. SHP will always choose FeatId, so once again
        //use the class definition to determine the identity property name
        $clsDef = $featureReader->GetClassDefinition();
        $idProps = $clsDef->GetIdentityProperties();
        $keyProp = $idProps->GetItem(0);
        $idName = $keyProp->GetName();
        while ($featureReader->ReadNext())
        {
            $id = $featureReader->GetInt32($idName);
            $text = $featureReader->IsNull('Text') ? '' : trim($featureReader->GetString('Text'));
            $features[$id] = $text;
        }
        $featureReader->Close();

        return $features;
    }

    function GetTransform()
    {
        $coordSysFactory = new MgCoordinateSystemFactory();
        $featureService = $this->site->CreateService(MgServiceType::FeatureService);

        $featureSourceId = $this->GetFeatureSource();
        $wkt = null;

        //Get the WKT from spatial context, because SDF only supports one spatial context it will be the first one
        $scReader = $featureService->GetSpatialContexts($featureSourceId, true);
        if ($scReader->ReadNext())
            $wkt = $scReader->GetCoordinateSystemWkt();
        $scReader->Close();

        $map = new MgMap($this->site);
        $map->Open($this->args['MAPNAME']);

        if (null == $wkt)
            return null; //It's bunk. Assume map SRS

        if (strcmp($wkt, $map->GetMapSRS()) == 0)
            return null; //Identical. No transformation needed

        $source = $coordSysFactory->Create($map->GetMapSRS());
        if (null != $wkt)
            $target = $coordSysFactory->Create($wkt);

        return $coordSysFactory->GetTransform($source, $target);
    }

    function AddPoint()
    {
        $geometryFactory = new MgGeometryFactory();
        $agfWriter = new MgAgfReaderWriter();

        $vertices = explode(',', $this->args['GEOMETRY']);

        $coord = $geometryFactory->CreateCoordinateXY((double) $vertices[0], (double) $vertices[1]);
        $point = $geometryFactory->CreatePoint($coord);

        $trans = $this->GetTransform();
        if (null != $trans)
            $point = $point->Transform($trans);

        $byteReader = $agfWriter->Write($point);

        $propertyValues = new MgPropertyCollection();
        $propertyValues->Add(new MgStringProperty('Text', $this->args['TEXT']));
        $propertyValues->Add(new MgGeometryProperty('Geometry', $byteReader));

        $this->InsertMarkupFeature($propertyValues);
    }

    function AddLineString()
    {
        $geometryFactory = new MgGeometryFactory();
        $agfWriter = new MgAgfReaderWriter();

        $vertices = explode(',', $this->args['GEOMETRY']);
        $count = $vertices[0];

        $coords = new MgCoordinateCollection();
        for ($i = 0; $i < $count; $i++)
        {
            $coord = $geometryFactory->CreateCoordinateXY((double) $vertices[($i * 2) + 1], (double) $vertices[($i * 2) + 2]);
            $coords->Add($coord);
        }

        $lineString = $geometryFactory->CreateLineString($coords);

        $trans = $this->GetTransform();
        if (null != $trans)
            $lineString = $lineString->Transform($trans);

        $byteReader = $agfWriter->Write($lineString);

        $propertyValues = new MgPropertyCollection();
        $propertyValues->Add(new MgStringProperty('Text', $this->args['TEXT']));
        $propertyValues->Add(new MgGeometryProperty('Geometry', $byteReader));

        $this->InsertMarkupFeature($propertyValues);
    }

    function AddPolygon()
    {
        $geometryFactory = new MgGeometryFactory();
        $agfWriter = new MgAgfReaderWriter();

        $vertices = explode(',', $this->args['GEOMETRY']);
        $count = $vertices[0];

        $coords = new MgCoordinateCollection();
        for ($i = 0; $i < $count; $i++)
        {
            $coord = $geometryFactory->CreateCoordinateXY((double) $vertices[($i * 2) + 1], (double) $vertices[($i * 2) + 2]);
            $coords->Add($coord);
        }

        // Add the first vertex to make the ring close
        if($count > 2)
        {
            $coord = $geometryFactory->CreateCoordinateXY((double) $vertices[1], (double) $vertices[2]);
            $coords->Add($coord);
        }

        $linearRing = $geometryFactory->CreateLinearRing($coords);
        $polygon = $geometryFactory->CreatePolygon($linearRing, null);

        $trans = $this->GetTransform();
        if (null != $trans)
            $polygon = $polygon->Transform($trans);

        $byteReader = $agfWriter->Write($polygon);

        $propertyValues = new MgPropertyCollection();
        $propertyValues->Add(new MgStringProperty('Text', $this->args['TEXT']));
        $propertyValues->Add(new MgGeometryProperty('Geometry', $byteReader));

        $this->InsertMarkupFeature($propertyValues);
    }

    //Utility function to close all feature readers in a MgPropertyCollection
    static function CleanupReaders($propCol)
    {
        $errMsg = "";
        for ($i = 0; $i < $propCol->GetCount(); $i++)
        {
            $prop = $propCol->GetItem($i);
            if ($prop->GetPropertyType() == MgPropertyType::Feature)
            {
                $fr = $prop->GetValue();
                $fr->Close();
            }
            else if ($prop->GetPropertyType() == MgPropertyType::String)
            {
                $errMsg = $prop->GetValue();
            }
        }
        if (strlen($errMsg) > 0) {
            throw new Exception($errMsg);
        }
    }

    function InsertMarkupFeature($propertyValues)
    {
        $featureService = $this->site->CreateService(MgServiceType::FeatureService);
        $featureSourceId = $this->GetFeatureSource();

        $commands = new MgFeatureCommandCollection();
        $commands->Add(new MgInsertFeatures('Markup', $propertyValues));

        $result = $featureService->UpdateFeatures($featureSourceId, $commands, false);
        MarkupEditor::CleanupReaders($result);
    }
    
    function BuildFeatureFilter($propName)
    {
        $ids = $this->args["MARKUPFEATURE"];
        if (is_array($ids)) {
            $filters = array();
            foreach ($ids as $id) {
                array_push($filters, "$propName = $id");
            }
            return join(" OR ", $filters);
        } else {
            return "$propName = $ids";
        }
    }

    function DeleteMarkup()
    {
        $featureService = $this->site->CreateService(MgServiceType::FeatureService);
        $featureSourceId = $this->GetFeatureSource();
        //HACK: Another leaky abstraction. SHP will always choose FeatId, so once again
        //use the class definition to determine the identity property name
        $clsDef = $this->GetClassDefinition();
        $idProps = $clsDef->GetIdentityProperties();
        $keyProp = $idProps->GetItem(0);
        $idName = $keyProp->GetName();

        $commands = new MgFeatureCommandCollection();
        $commands->Add(new MgDeleteFeatures('Markup', $this->BuildFeatureFilter($idName)));

        $result = $featureService->UpdateFeatures($featureSourceId, $commands, false);
        MarkupEditor::CleanupReaders($result);
    }

    function UpdateMarkup()
    {
        $featureService = $this->site->CreateService(MgServiceType::FeatureService);
        $featureSourceId = $this->GetFeatureSource();
        //HACK: Another leaky abstraction. SHP will always choose FeatId, so once again
        //use the class definition to determine the identity property name
        $clsDef = $this->GetClassDefinition();
        $idProps = $clsDef->GetIdentityProperties();
        $keyProp = $idProps->GetItem(0);
        $idName = $keyProp->GetName();

        $propertyValues = new MgPropertyCollection();
        $propertyValues->Add(new MgStringProperty('Text', trim($this->args['UPDATETEXT'])));

        $commands = new MgFeatureCommandCollection();
        $commands->Add(new MgUpdateFeatures('Markup', $propertyValues, $this->BuildFeatureFilter($idName)));

        $result = $featureService->UpdateFeatures($featureSourceId, $commands, false);
        MarkupEditor::CleanupReaders($result);
    }

    function GetSelectionXML()
    {
        $map = new MgMap($this->site);
        $map->Open($this->args['MAPNAME']);
        $markupLayer = $map->GetLayers()->GetItem('_' . $this->GetMarkupName());

        $selection = new MgSelection($map);
        $className = $markupLayer->GetFeatureClassName();
        $ids = $this->args['MARKUPFEATURE'];
        if (is_array($ids)) {
            foreach ($ids as $id) {
                $selection->AddFeatureIdInt32($markupLayer, $className, (int) $id);
            }
        } else {
            $selection->AddFeatureIdInt32($markupLayer, $className, (int) $ids);
        }
        return $selection->ToXML();
    }
}

?>