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

require_once('property.php');
require_once('feature.php');

class FeatureInfo
{
    private $args = null;
    private $site = null;

    function __construct($args)
    {
        $this->args = $args;
        $this->site = new MgSiteConnection();
        $this->site->Open(new MgUserInformation($args['SESSION']));
    }

    function GetMapLayerNames()
    {
        $layerNames = array();

        $resourceService = $this->site->CreateService(MgServiceType::ResourceService);

        $map = new MgMap($this->site);
        $map->Open($this->args['MAPNAME']);
        $layers = $map->GetLayers();

        for ($i = 0; $i < $layers->GetCount(); $i++)
        {
            $layer = $layers->GetItem($i);

            //TODO: Exclude Raster and Drawing Layers???

            if((substr($layer->GetName(), 0, 1) != "_") && (substr(strtoupper($layer->GetFeatureSourceId()), 0, 7) != "SESSION") && ($layer->IsVisible()) && $layer->GetSelectable())
            {
                $layerNames[$layer->GetName()] = $layer->GetLegendLabel();
            }
        }
        asort($layerNames);

        return $layerNames;
    }

    function SelectFeatures() {
      
    }
    
    
}
?>