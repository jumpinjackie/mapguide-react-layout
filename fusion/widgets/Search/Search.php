<?php
/**
 * Search
 *
 * $Id: Search.php 2957 2016-09-19 15:49:19Z jng $
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

    // Start output buffering
    ob_start();

    $fusionMGpath = '../../layers/MapGuide/php/';
    include $fusionMGpath . 'Common.php';
    if(InitializationErrorOccurred())
    {
        DisplayInitializationErrorHTML();
        exit;
    }

    //$logHandle = fopen("debug.log","at");

    class SearchError extends Exception
    {
        public function __construct($message, $title) {
            parent::__construct($message, 0);
            $this->title = $title;
        }
        public $title;
    }

    $locale = GetDefaultLocale();
    $userInput = "";
    $target = "";
    $popup = 0;
    $layerName = "";
    $mapName = "";
    $sessionId = "";
    $filter = "";
    $resNames = array();
    $resProps = array();
    $matchLimit = "";
    $features = NULL;
    $pointZoom = 500.0;

    GetRequestParameters();
    SetLocalizedFilesPath(GetLocalizationPath());
    $searchError = GetLocalizedString("SEARCHERROR", $locale);

    try
    {
        $featureSrvc = $siteConnection->CreateService(MgServiceType::FeatureService);

        //Create a temporary map runtime object, locate the layer
        $map = new MgMap($siteConnection);
        $map->Open($mapName);
        $layers = $map->GetLayers();
        $layer = null;
        //fwrite($logHandle,"found layers:".$layers->GetCount()."\n");
        for($i = 0; $i < $layers->GetCount(); $i++)
        {
            $layer = $layers->GetItem($i);
            //fwrite($logHandle,"found layer:".$layer->GetName()."\n");
            if($layer->GetName() == $layerName)
                break;
        }

        if($layer == null)
        {
            trigger_error(FormatMessage("SEARCHLAYERNOTFOUND", $locale, array($layerName)));
        }
        
        $userInput = str_replace("'", "''", $userInput);

        //unescape strings
        //
        if(ini_get("magic_quotes_sybase") == "1")
        {
            $matchLabel = str_replace("''", "'", $matchLabel);
            $filter = str_replace("''", "'", $filter);
        }
        else if(get_magic_quotes_gpc() == "1")
        {
            //Unescape single quotes
            $filter = str_replace("\\'", "'", $filter);
            //Unescape double quotes
            $filter = str_replace('\\"', '"', $filter);

            //remove additional backslash
            $filter = str_replace("\\", "", $filter);
        }

        //fwrite($logHandle,"filter before:".$filter."\n");

        //substitute the input tag with the actual user input to make up the filter
        $filter = str_replace('$USER_VARIABLE', $userInput, $filter);
        //fwrite($logHandle,"filter after:".$filter."\n");

        //parse the match label string, which defines what columns to be displayed
        $displayAll = (count($resProps) == 0);

        //query the features
        $clsDef = $layer->GetClassDefinition();
        $opts = BuildFeatureQueryOptions($clsDef);
        $opts->SetFilter($filter);
        $featureClassName = $layer->GetFeatureClassName();
        $srcId = new MgResourceIdentifier($layer->GetFeatureSourceId());
        $features = $featureSrvc->SelectFeatures($srcId, $featureClassName, $opts);
        $hasResult = $features->ReadNext();

        if($hasResult)
        {
          //fwrite($logHandle,"has result\n");
            $colCount = $displayAll? $features->GetPropertyCount(): count($resProps);

            //output the beginning of the document (head section and beginning of body section)
            $templ = file_get_contents("./Search.templ");
            $templ = Localize($templ, $locale, GetClientOS());
            print sprintf($templ, $colCount, $target, $popup, $mapName);

            $classDef = $features->GetClassDefinition();
            $clsProps = $classDef->GetProperties();
            $geomName = $classDef->GetDefaultGeometryPropertyName();
            $bHasPoint = false;
            $xform = NULL; // layer -> map transform
            $agfRw = new MgAgfReaderWriter();
            if ($geomName != NULL && $geomName != "") {
                $gidx = $clsProps->IndexOf($geomName);
                if ($gidx >= 0) {
                    $geomProp = $clsProps->GetItem($gidx);
                    if ($geomProp->GetGeometryTypes() & MgFeatureGeometricType::Point == MgFeatureGeometricType::Point) {
                        $bHasPoint = true;
                        // Set layer -> map transform if required
                        $scReader = $featureSrvc->GetSpatialContexts($srcId, false);
                        while ($scReader->ReadNext()) {
                            if ($scReader->GetName() == $geomProp->GetSpatialContextAssociation()) {
                                $csFactory = new MgCoordinateSystemFactory();
                                try {
                                    $mapCs = $csFactory->Create($map->GetMapSRS());
                                    $layerCs = $csFactory->Create($scReader->GetCoordinateSystemWkt());
                                    $xform = $csFactory->GetTransform($layerCs, $mapCs);
                                } catch (MgException $ex) {
                                    
                                }
                            }
                        }
                        $scReader->Close();
                    }
                }
            }
            
            $idProps = $classDef->GetIdentityProperties();
            $idPropNames = array();
            for($j = 0; $j < $idProps->GetCount(); $j++)
            {
                $idProp = $idProps->GetItem($j);
                array_push($idPropNames, $idProp->GetName());
            }

            //table headings
            echo "<tr class=\"SearchHeading\">";
            if($displayAll)
            {
                for($i = 0; $i < $colCount; $i++)
                {
                    $resProps[$i] = $features->GetPropertyName($i);
                    echo "<td class=\"SearchHeading\">&nbsp;" . $resProps[$i] . "</td>";
                }
            }
            else
            {
                for($i = 0; $i < $colCount; $i++)
                    echo "<td class=\"SearchHeading\">&nbsp;" . $resNames[$i] . "</td>";
            }
            echo "</tr>";

            //output the results
            $row = 0;
            do
            {
                echo "<tr>";
                for($i = 0; $i < $colCount; $i++)
                {
                    $propName = $resProps[$i];
                    $propType = $features->GetPropertyType($resProps[$i]);
                    $val = "";
                    if (!$features->IsNull($propName))
                    {
                        switch($propType)
                        {
                            case MgPropertyType::Boolean:
                                $val = $features->GetBoolean($propName)? "true": "false";
                                break;
                            case MgPropertyType::Single:
                                $val = $features->GetSingle($propName);
                                break;
                            case MgPropertyType::Double:
                                $val = $features->GetDouble($propName);
                                break;
                            case MgPropertyType::Int16:
                                $val = $features->GetInt16($propName);
                                break;
                            case MgPropertyType::Int32:
                                $val = $features->GetInt32($propName);
                                break;
                            case MgPropertyType::Int64:
                                $val = $features->GetInt64($propName);
                                break;
                            case MgPropertyType::String:
                                $val = $features->GetString($propName);
                                break;
                            case MgPropertyType::DateTime:
                                $val = $features->GetDateTime($propName)->ToString();
                                break;
                        }
                    }

                    // Generate XML to selection this feature
                    //
                    $sel = new MgSelection($map);
                    $idProps = new MgPropertyCollection();
                    foreach ($idPropNames as $id)
                    {
                        $idPropType = $features->GetPropertyType($id);
                        switch($idPropType)
                        {
                            case MgPropertyType::Int16:
                                $idProps->Add(new MgInt16Property($id, $features->GetInt16($id)));
                                break;
                            case MgPropertyType::Int32:
                                $idProps->Add(new MgInt32Property($id, $features->GetInt32($id)));
                                break;
                            case MgPropertyType::String:
                                $idProps->Add(new MgStringProperty($id, $features->GetString($id)));
                                break;
                            case MgPropertyType::Int64:
                                $idProps->Add(new MgInt64Property($id, $features->GetInt64($id)));
                                break;
                            case MgPropertyType::Double:
                                $idProps->Add(new MgDoubleProperty($id, $features->GetDouble($id)));
                                break;
                            case MgPropertyType::Single:
                                $idProps->Add(new MgSingleProperty($id, $features->GetSingle($id)));
                                break;
                            case MgPropertyType::DateTime:
                                $idProps->Add(new MgDateTimeProperty($id, $features->GetDateTime($id)));
                                break;
                            default:
                                throw new SearchError(FormatMessage("SEARCHTYYPENOTSUP", $locale, array($idPropType)), $searchError);
                        }
                    }
                    $sel->AddFeatureIds($layer, $featureClassName, $idProps);
                    $selText = EscapeForHtml($sel->ToXml(), true);

                    //For points, we want to wire up a different cell click handler
                    if ($bHasPoint) {
                        try {
                            $agf = $features->GetGeometry($geomName);
                            $geom = $agfRw->Read($agf, $xform);
                            if ($geom->GetGeometryType() == MgGeometryType::Point) {
                                $coord = $geom->GetCoordinate();
                                $x = $coord->GetX();
                                $y = $coord->GetY();
                            }
                            echo sprintf("<td class=\"%s\" id=\"%d:%d\" onmousemove=\"SelectRow(%d)\" onclick=\"PointCellClicked('%s', %g, %g, %g)\">&nbsp;%s</td>\n", !($row%2)? "Search" : "Search2", $row, $i, $row, $selText, $x, $y, $pointZoom, $val);
                        } catch (MgException $ex) {
                            echo sprintf("<td class=\"%s\" id=\"%d:%d\" onmousemove=\"SelectRow(%d)\" onclick=\"CellClicked('%s')\">&nbsp;%s</td>\n", !($row%2)? "Search" : "Search2", $row, $i, $row, $selText, $val);
                        }
                    } else {
                        echo sprintf("<td class=\"%s\" id=\"%d:%d\" onmousemove=\"SelectRow(%d)\" onclick=\"CellClicked('%s')\">&nbsp;%s</td>\n", !($row%2)? "Search" : "Search2", $row, $i, $row, $selText, $val);
                    }
                }
                echo "</tr>";
                if (++ $row == $matchLimit)
                    break;
            } while($features->ReadNext());
        }
        else
        {
            throw new SearchError(GetLocalizedString("SEARCHNOMATCHES", $locale), GetLocalizedString("SEARCHREPORT", $locale));
        }
        $features->Close();
    }
    catch(MgException $ae)
    {
        if($features)
        {
            // Close the feature reader
            $features->Close();
        }
        OnError($searchError, $ae->GetDetails());
    }
    catch(SearchError $e)
    {
        if($features)
        {
            // Close the feature reader
            $features->Close();
        }
        OnError($e->title, $e->getMessage());
    }

    //terminate the html document
    echo "</table></body></html>";

    // Set content length header
    header("Content-Length:".ob_get_length());

    // Flush output buffer
    ob_end_flush();

function OnError($title, $msg)
{
    global $target, $popup, $mapName, $locale;
    $ok = GetLocalizedString("BUTTONOK", $locale);
    $cancel = GetLocalizedString("BUTTONCANCEL", $locale);

    $templ = file_get_contents("./ErrorPage.templ");
    print sprintf($templ, $popup, $mapName, $title, $msg, $ok, $cancel);
}

function GetParameters($params)
{
    global $userInput, $target, $layerName, $popup, $locale;
    global $mapName, $sessionId, $filter, $resNames, $resProps, $matchLimit;
    global $pointZoom;

    if(isset($params['locale']))
        $locale = $params['locale'];
    $userInput = $params['userinput'];
    $target = $params['target'];
    $popup = $params['popup'];
    $layerName = $params['layer'];
    $mapName = $params['mapname'];
    $sessionId = $params['session'];
    $filter = $params['filter'];
    $matchLimit = $params['limit'];
    $colCount = $params['cols'];
    if($colCount > 0)
    {
        for($i = 0; $i < $colCount; $i++)
        {
            array_push($resNames, $params['CN' . $i]);
            array_push($resProps, $params['CP' . $i]);
        }
    }
    if (isset($params['pointZoom'])) {
        $pointZoom = $params['pointZoom'];
    }
}

function GetRequestParameters()
{
    if($_SERVER['REQUEST_METHOD'] == "POST")
        GetParameters($_POST);
    else
        GetParameters($_GET);
}

?>
