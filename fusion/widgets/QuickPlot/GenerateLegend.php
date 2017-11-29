<?php
    $fusionMGpath = '../../layers/MapGuide/php/';
    include $fusionMGpath . 'Utilities.php';

    $fusionMGpath = '../../layers/MapGuide/php/';
    include $fusionMGpath . 'Common.php';

    //FIXME: 
    //
    //There are 2 major problems at the moment
    // 1. This is not localizable (we're using imagestring() to draw text). Non-english text will probably be gibberish.
    // 2. We're using imagestring() to draw text because imagettftext() requires knowing the actual font file path! And how exactly can we do that in a cross-platform manner!?
    //
    //The true fix is to make GETMAPLEGENDIMAGE not so terrible
    
    $sessionID = "";
    $mapName   = "";
    $width = 0;
    $height = 0;
    $iconWidth = 16;
    $iconHeight = 16;
    $iconFormat = "PNG"; //MgImageFormats::Png
    
    //These are intermediate data structures containing information we can rapidly lookup
    //without having to do repeated linear searches of the map's layer and group collections
    //
    //CompileVisibleLayerCount() will stash all the relevant information
    $groupVisibleLayerCount = array();
    $groupParents = array();
    $groupChildren = array();
    
    $groupIcon = imagecreatefromgif("lc_group.gif");
    $dwfIcon = imagecreatefrompng("legend-DWF.png");
    $rasterIcon = imagecreatefrompng("legend-raster.png");
    $themeIcon = imagecreatefrompng("legend-theme.png");
    
    $font = "../fonts/arial.ttf";
    $fontSizePt = 12;
    $fontIndex = 4;
    
    $xPad = 4;
    $yPad = 2;
    $xIndent = $iconWidth + $xPad;
    $offsetX = $xPad + 10;
    $offsetY = $yPad + 10;
    $textColor = NULL;
    
    try
    {
        GetParameters();
        GenerateLegend();
    }
    catch (MgException $e) {
        $msg = "last error";
        $msg .= "\nERROR: " . $e->GetExceptionMessage() . "\n";
        $msg .= $e->GetDetails() . "\n";
        $msg .= $e->GetStackTrace() . "\n";
        RenderTextToImage($msg);
    }
    catch (Exception $ex) {
        $msg = $ex->GetMessage();
        RenderTextToImage($msg);
    }
    
    imagedestroy($groupIcon);
    imagedestroy($dwfIcon);
    imagedestroy($rasterIcon);
    imagedestroy($themeIcon);
?>

<?php    

    function IsThemed($scaleRange, &$gt) {
        $typeStyles = array("PointTypeStyle", "LineTypeStyle", "AreaTypeStyle");
        $ruleNames = array("PointRule", "LineRule", "AreaRule");
        $totalRules = 0;
        $geomTypes = array();
        //CompositeStyle is mutually exclusive to the others so check if this exists and take
        //a separate code path if that's the case
        $styleNodes = $scaleRange->getElementsByTagName("CompositeTypeStyle");
        if ($styleNodes->length > 0) {
            for ($i = 0; $i < $styleNodes->length; $i++) {
                $showInLegend = $styleNodes->item($i)->getElementsByTagName("ShowInLegend");
                if($showInLegend->length > 0) {
                    if($showInLegend->item(0)->nodeValue == "false") {
                        continue;   // This typestyle does not need to be shown in the legend
                    }
                }
                $ruleNodes = $styleNodes->item($i)->getElementsByTagName("CompositeRule");
                $totalRules += $ruleNodes->length;
                if ($ruleNodes->length > 0)
                    $gt = ($i + 1);
            }
            return $totalRules > 1;
        } else {
            for ($i = 0; $i < count($typeStyles); $i++) {
                $styleNodes = $scaleRange->getElementsByTagName($typeStyles[$i]);
                for ($j = 0; $j < $styleNodes->length; $j++) {
                    $showInLegend = $styleNodes->item($j)->getElementsByTagName("ShowInLegend");
                    if($showInLegend->length > 0) {
                        if($showInLegend->item(0)->nodeValue == "false") {
                            continue;   // This typestyle does not need to be shown in the legend
                        }
                    }
                    $ruleNodes = $styleNodes->item($j)->getElementsByTagName($ruleNames[$i]);
                    $totalRules += $ruleNodes->length;
                    if ($ruleNodes->length > 0)
                        array_push($geomTypes, ($i + 1));
                }
            }
            //A themed layer has # rules > # style types, implying at least one or more style types
            //has > 1 rule attached
            if (count($geomTypes) == 1) { //Single type, need to set the geom type
                $gt = $geomTypes[0];
            }
            return $totalRules > 1;
        }
    }
    
    // HasVisibleLayers
    //
    // Returns true if the group has one or more visible or the group has no visible layers but one or more
    // of its child groups has one or more visible layers.
    function HasVisibleLayers($groupName)
    {
        global $groupVisibleLayerCount, $groupChildren;
        $total = 0;
        
        if (array_key_exists($groupName, $groupVisibleLayerCount)) {
            if ($groupVisibleLayerCount[$groupName] > 0) {
                return true;
            }
        }
        
        if (array_key_exists($groupName, $groupChildren)) {
            foreach ($groupChildren[$groupName] as $childGroupName) {
                if (HasVisibleLayers($childGroupName)) {
                    return true;
                }
            }
        }
        return false;
    }
    
    // CompileVisibleLayerCount
    //
    // Sets up the various temporary data structures for establishing visible layer count and group relationships
    function CompileVisibleLayerCount($map)
    {
        global $groupVisibleLayerCount, $groupParents, $groupChildren;
        $layers = $map->GetLayers();
        $groups = $map->GetLayerGroups();
        for ($i = 0; $i < $layers->GetCount(); $i++) {
            $layer = $layers->GetItem($i);
            if (!$layer->IsVisible()) //Not visible
                continue;
                
            $parentGroup = $layer->GetGroup();
            if ($parentGroup == NULL) //No parent
                continue;

            $groupName = $parentGroup->GetName();
            if (!array_key_exists($groupName, $groupVisibleLayerCount)) {
                $groupVisibleLayerCount[$groupName] = 0;
            }
            $groupVisibleLayerCount[$groupName]++;
        }
        for ($i = 0; $i < $groups->GetCount(); $i++) {
            $group = $groups->GetItem($i);
            $parentGroup = $group->GetGroup();
            if ($parentGroup != NULL) {
                $groupName = $group->GetName();
                $parentGroupName = $parentGroup->GetName();
                $groupParents[$groupName] = $parentGroupName;
                if (!array_key_exists($parentGroupName, $groupChildren)) {
                    $groupChildren[$parentGroupName] = array();
                }
                array_push($groupChildren, $groupName);
            }
        }
    }

    function GenerateLegend()
    {
        global $sessionID, $mapName, $width, $height, $offsetX, $offsetY, $xPad, $yPad, $iconWidth, $iconHeight, $xIndent, $groupIcon, $fontIndex, $textColor;
        
        $userInfo         = new MgUserInformation($sessionID);
        $siteConnection   = new MgSiteConnection();
        $siteConnection->Open($userInfo);
        $resourceService  = $siteConnection->CreateService(MgServiceType::ResourceService);
        $mappingService = $siteConnection->CreateService(MgServiceType::MappingService);
        
        $map = new MgMap($siteConnection);
        $map->Open($mapName);
        $scale = $map->GetViewScale();
        
        CompileVisibleLayerCount($map);
        
        $image = imagecreatetruecolor($width, $height);
        
        $white = imagecolorallocate($image, 255, 255, 255);
        $textColor = imagecolorallocate($image, 0, 0, 0);
        
        imagefilledrectangle($image, 0, 0, $width, $height, $white);
        
        //Uncomment regions marked with BEGIN DEBUG / END DEBUG and comment out regions marked with
        //BEGIN COMMENT OUT IF DEBUGGING / END COMMENT OUT IF DEBUGGING to see what PHP-isms get spewed out 
        //that may be tripping up rendering
        //
        //Also replace instances of "////print_r" with "//print_r" to insta-uncomment all debugging calls
        
        //==BEGIN DEBUG==
        //header("Content-type: text/html", true);
        //==END DEBUG==
        ProcessGroupsForLegend($mappingService, $resourceService, $map, $scale, NULL, $image);
        
        //==BEGIN COMMENT OUT IF DEBUGGING==
        header("Content-type: image/png");
        imagepng($image);
        //==END COMMENT OUT IF DEBUGGING==
        
        //==BEGIN DEBUG==
        /*
        ob_start();
        imagepng($image);
        $im = base64_encode(ob_get_contents());
        ob_end_clean();
        echo "<img src='data:image/png;base64,".$im."' alt='legend image'></img>";
        */
        //==END DEBUG==
        
        imagecolordeallocate($image, $white);
        imagecolordeallocate($image, $textColor);
        imagedestroy($image);
    }
    
    function ProcessGroupsForLegend($mappingService, $resourceService, $map, $scale, $parentGroup, $image) {
        global $iconWidth, $iconHeight, $height, $fontIndex, $iconFormat, $offsetX, $offsetY, $font, $fontSizePt, $xPad, $yPad, $xIndent, $themeIcon, $groupIcon, $dwfIcon, $rasterIcon, $textColor;
        $groups = $map->GetLayerGroups();
        ProcessLayersForLegend($mappingService, $resourceService, $map, $scale, $parentGroup, $image);
        for ($i = 0; $i < $groups->GetCount(); $i++) {
            $group = $groups->GetItem($i);
            $parentGroupOfGroup = $group->GetGroup();
            //One has a parent and the other one doesn't
            if (($parentGroupOfGroup != NULL && $parentGroup == NULL) ||
                ($parentGroupOfGroup == NULL && $parentGroup != NULL)) {
                continue;
            }
            //Parents aren't same
            if (($parentGroupOfGroup != NULL && $parentGroup != NULL) &&
                ($parentGroupOfGroup->GetObjectId() != $parentGroup->GetObjectId())) {
                continue;
            }
            if (!$group->GetDisplayInLegend())
                continue;
            
            //There are no actual visible layers to render icons for.
            if (!HasVisibleLayers($group->GetName()))
                continue;

            //print_r("GROUP: ".$group->GetLegendLabel()." (".$group->GetName().") - ".$group->GetObjectId()."<br/>");
            //Draw the image
            imagecopy($image, $groupIcon, $offsetX, $offsetY, 0, 0, $iconWidth, $iconHeight);
            imagestring($image, $fontIndex, ($offsetX + $xPad + 16), $offsetY, $group->GetLegendLabel(), $textColor);
            $offsetX += $xIndent;
            $offsetY += $iconHeight;
            $offsetY += $yPad;
            if ($offsetY > $height)
                break;
            ProcessGroupsForLegend($mappingService, $resourceService, $map, $scale, $group, $image);
            $offsetX -= $xIndent;
        }
    }

    function ProcessLayersForLegend($mappingService, $resourceService, $map, $scale, $group, $image) {
        global $iconWidth, $iconHeight, $height, $fontIndex, $iconFormat, $offsetX, $offsetY, $font, $fontSizePt, $xPad, $yPad, $xIndent, $themeIcon, $groupIcon, $dwfIcon, $rasterIcon, $textColor;
    
        $layers = $map->GetLayers();
        for ($i = 0; $i < $layers->GetCount(); $i++) {
            $layer = $layers->GetItem($i);
            if (!$layer->IsVisible() || !$layer->GetDisplayInLegend()) {
                //print_r("[SKIP]: Skipping layer (".$layer->GetLegendLabel().") - not visible or not set to display in legend <br/>");
                continue;
            }

            if ($offsetY > $height) {
                //print_r("********** STOP! Past image bounds ****************<br/>");
                break;
            }

            $parentGroup = $layer->GetGroup();
            $bRequiredInLegend = false;
            
            $grpId = "";
            $parentId = "";
            if ($group != NULL)
                $grpId = $group->GetObjectId();
            if ($parentGroup != NULL)
                $parentId = $parentGroup->GetObjectId();
            
            if ($group == NULL && $parentGroup == NULL)
                $bRequiredInLegend = true;
            else if ($parentGroup != NULL && $group != NULL && $group->GetObjectId() == $parentGroup->GetObjectId())
                $bRequiredInLegend = true;
            
            if (!$bRequiredInLegend) {
                //print_r("[SKIP]: Skipping layer (".$layer->GetLegendLabel().", group: $grpId, layer's parent: $parentId) - not required in legend <br/>");
                continue;
            }
            
            $ldfId = $layer->GetLayerDefinition();
            $layerContent = $resourceService->GetResourceContent($ldfId);
            $xmldoc = new DOMDocument();
            $xmldoc->loadXML(ByteReaderToString($layerContent));
            $scaleRanges = $xmldoc->getElementsByTagName('VectorScaleRange');
            if ($scaleRanges->length == 0) {
                $scaleRanges = $xmldoc->getElementsByTagName('GridScaleRange');
                if ($scaleRanges->length > 0) {
                    //Draw the image
                    imagecopy($image, $rasterIcon, $offsetX, $offsetY, 0, 0, $iconWidth, $iconHeight);
                    
                    //Draw the label
                    //imagettftext($image, $fontSizePt, 0, ($offsetX + $xPad + $iconWidth), $offsetY, $textColor, $font, $layer->GetLegendLabel());
                    imagestring($image, $fontIndex, ($offsetX + $xPad + $iconWidth), $offsetY, $layer->GetLegendLabel(), $textColor);
                    
                    $offsetY += $yPad;
                    $offsetY += $iconHeight;
                    
                    return;
                } else {
                    $scaleRanges = $xmldoc->getElementsByTagName('DrawingLayerDefinition');
                    if ($scaleRanges->length > 0) {
                        //Draw the image
                        imagecopy($image, $dwfIcon, $offsetX, $offsetY, 0, 0, $iconWidth, $iconHeight);
                        
                        //Draw the label
                        //imagettftext($image, $fontSizePt, 0, ($offsetX + $xPad + $iconWidth), $offsetY, $textColor, $font, $layer->GetLegendLabel());
                        imagestring($image, $fontIndex, ($offsetX + $xPad + $iconWidth), $offsetY, $layer->GetLegendLabel(), $textColor);
                        
                        $offsetY += $yPad;
                        $offsetY += $iconHeight;
                        
                        return;
                    }
                }
            }
            //print_r("Processing layer (".$layer->GetLegendLabel()."). Scale range count: ".$scaleRanges->length."<br/>");
            for ($sc = 0; $sc < $scaleRanges->length; $sc++)
            {
                $scaleRangeObj = NULL;
                $scaleRangeObj->styles = array();
                $scaleRange = $scaleRanges->item($sc);
                $minElt = $scaleRange->getElementsByTagName('MinScale');
                $maxElt = $scaleRange->getElementsByTagName('MaxScale');
                $minScale = "0";
                $maxScale = 'infinity';  // as MDF's VectorScaleRange::MAX_MAP_SCALE
                if ($minElt->length > 0)
                    $minScale = $minElt->item(0)->nodeValue;
                if ($maxElt->length > 0)
                    $maxScale = $maxElt->item(0)->nodeValue;
                
                //Style is within our scale
                if (($minScale == "0" && $maxScale == "infinity") ||
                    ($scale >= floatval($minScale) && $scale <= floatval($maxScale)) ||
                    ($maxScale == "infinity" && $scale >= floatval($minScale))) {
                    
                    $styleIndex = 0;
                    
                    if (!IsThemed($scaleRange, $gt)) {
                        //print_r($layer->GetLegendLabel()." - ".$ldfId->ToString()." - Un-themed layer (geomType: $gt)<br/>");
                        $icon = $mappingService->GenerateLegendImage($ldfId, $scale, $iconWidth, $iconHeight, $iconFormat, $gt, 0);
                        $sink = new MgByteSink($icon);
                        $tempImage = sys_get_temp_dir() . DIRECTORY_SEPARATOR . "mgo_icon" . uniqid();
                        $sink->ToFile($tempImage);
                        
                        $iconImg = imagecreatefrompng($tempImage);
                        
                        //Draw the image
                        imagecopy($image, $iconImg, $offsetX, $offsetY, 0, 0, $iconWidth, $iconHeight);
                        imagedestroy($iconImg);
                        unlink($tempImage);
                        
                        //Draw the label
                        //imagettftext($image, $fontSizePt, 0, ($offsetX + $xPad + $iconWidth), $offsetY, $textColor, $font, $layer->GetLegendLabel());
                        imagestring($image, $fontIndex, ($offsetX + $xPad + $iconWidth), $offsetY, $layer->GetLegendLabel(), $textColor);
                        
                        $offsetY += $yPad;
                        $offsetY += $iconHeight;
                    } else {
                        if ($scaleRange->getElementsByTagName("CompositeTypeStyle")->length > 0) {
                            $typeStyles = array(4 => "CompositeTypeStyle");
                            $ruleNames = array(4 => "CompositeRule");
                        } else {
                            $typeStyles = array(1 => "PointTypeStyle", 2 => "LineTypeStyle", 3 => "AreaTypeStyle");
                            $ruleNames = array(1 => "PointRule", 2 => "LineRule", 3 => "AreaRule");
                        }
                    
                        //print_r($layer->GetLegendLabel()." - ".$ldfId->ToString()." - Themed layer ()<br/>");
                        //Draw the theme icon
                        imagecopy($image, $themeIcon, $offsetX, $offsetY, 0, 0, $iconWidth, $iconHeight);
                    
                        //Draw the themed layer label
                        //imagettftext($image, $fontSizePt, 0, ($offsetX + $xPad + $iconWidth), $offsetY, $textColor, $font, $layer->GetLegendLabel());
                        imagestring($image, $fontIndex, ($offsetX + $xPad + $iconWidth), $offsetY, $layer->GetLegendLabel(), $textColor);
                        $offsetX += $xIndent;
                        $offsetY += $yPad;
                        $offsetY += $iconHeight;
                        
                        //for($ts=0, $count = count($typeStyles); $ts < $count; $ts++)
                        foreach ($typeStyles as $ts => $styleName)
                        {
                            //print_r(" - Checking $styleName ($ts)<br/>");
                            $typeStyle = $scaleRange->getElementsByTagName($styleName);
                            $catIndex = 0;
                            //print_r(" -- Found ".$typeStyle->length." elements<br/>");
                            for($st = 0; $st < $typeStyle->length; $st++) {

                                $styleObj = NULL;
                                // We will check if this typestyle is going to be shown in the legend
                                $showInLegend = $typeStyle->item($st)->getElementsByTagName("ShowInLegend");
                                if($showInLegend->length > 0) {
                                    if($showInLegend->item(0)->nodeValue == "false") {
                                        //print_r("Skipping $styleName in (".$layer->GetLegendLabel().") because ShowInLegend is: ".$showInLegend->item(0)->nodeValue."<br/>");
                                        continue;   // This typestyle does not need to be shown in the legend
                                    }
                                }
                                $rules = $typeStyle->item($st)->getElementsByTagName($ruleNames[$ts]);
                                
                                for($r = 0; $r < $rules->length; $r++) {
                                    $rule = $rules->item($r);
                                    $label = $rule->getElementsByTagName("LegendLabel");
                                    $labelText = $label->length==1? $label->item(0)->nodeValue: "";
                                    
                                    $icon = $mappingService->GenerateLegendImage($ldfId, $scale, $iconWidth, $iconHeight, $iconFormat, $ts, $catIndex++);
                                    $sink = new MgByteSink($icon);
                                    $tempImage = sys_get_temp_dir() . DIRECTORY_SEPARATOR . "mgo_icon" . uniqid();
                                    $sink->ToFile($tempImage);
                                    
                                    $iconImg = imagecreatefrompng($tempImage);
                                    
                                    //Draw the image
                                    imagecopy($image, $iconImg, $offsetX, $offsetY, 0, 0, $iconWidth, $iconHeight);
                                    imagedestroy($iconImg);
                                    unlink($tempImage);
                                    
                                    //Draw the label
                                    //imagettftext($image, $fontSizePt, 0, ($offsetX + $xPad + $iconWidth), $offsetY, $textColor, $font, $layer->GetLegendLabel());
                                    imagestring($image, $fontIndex, ($offsetX + $xPad + $iconWidth), $offsetY, $labelText, $textColor);
                                    
                                    $offsetY += $yPad;
                                    $offsetY += $iconHeight;
                                    
                                    if ($offsetY > $height)
                                        break;
                                }
                            }
                        }
                        $offsetX -= $xIndent;
                    }
                } else {
                    //print_r("[SKIP]: Layer (".$layer->GetLegendLabel()."). Current scale ($scale) does not fit scale range [$minScale to $maxScale]<br/>");
                }
            }
        }
    }

    function GetParameters()
    {
        global $sessionID, $mapName, $width, $height;
        $args = $_GET;
        if ($_SERVER["REQUEST_METHOD"] == "POST")
        {
            $args = $_POST;
        }
        
        // Not necessary to validate the parameters    	
        $sessionID   = $args["session_id"];
        $mapName     = $args["map_name"];
        $width       = $args["width"];
        $height      = $args["height"];
    }
    
?>