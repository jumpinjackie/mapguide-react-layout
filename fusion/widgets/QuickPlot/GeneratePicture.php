<?php
    $fusionMGpath = '../../layers/MapGuide/php/';
    include $fusionMGpath . 'Utilities.php';

    $fusionMGpath = '../../layers/MapGuide/php/';
    include $fusionMGpath . 'Common.php';
    
    $sessionID = "";
    $mapName   = "";
    $rotation  = 0.0;
    $printDpi  = 300;
    $scaleDenominator = 0;
    $captureBox;
    $normalizedCapture;
    $printSize_pixel;
    $printSize;
    $drawNorthArrow = false;
    
    try
    {
        GetParameters();
        GenerateMap($printSize_pixel);
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
?>

<?php    

    function GetParameters()
    {
        global $sessionID, $mapName, $printDpi, $rotation, $printSize, $printSize_pixel, $captureBox, $scaleDenominator, $normalizedCapture, $drawNorthArrow;
        $args = $_GET;
        if ($_SERVER["REQUEST_METHOD"] == "POST")
        {
            $args = $_POST;
        }
        
        // Not necessary to validate the parameters    	
        $sessionID   = $args["session_id"];
        $mapName     = $args["map_name"];
        $rotation    = ParseLocaleDouble($args["rotation"]);
        $printDpi    = intval($args["print_dpi"]);

        $scaleDenominator = intval($args["scale_denominator"]);

        $drawNorthArrow = array_key_exists("northarrow", $args) && 
                         (strcmp($args["northarrow"], "1") == 0 ||
                          strcmp($args["northarrow"], "true") == 0);
                    
        
        $array       = explode(",", $args["print_size"]);
        $printSize   = new Size(ParseLocaleDouble($array[0]), ParseLocaleDouble($array[1]));
        $printSize_pixel   = new Size($printSize->width / 25.4 * $printDpi, $printSize->height / 25.4 * $printDpi);
        $array       = explode(",", $args["box"]);
        $captureBox  = CreatePolygon($array);
        
        $array       = explode(",", $args["normalized_box"]);
        $normalizedCapture = CreatePolygon($array);
    }
    
    function CreatePolygon($coordinates)
    {
        $geometryFactory      = new MgGeometryFactory();
        $coordinateCollection = new MgCoordinateCollection();
        $linearRingCollection = new MgLinearRingCollection();
        
        for ($index = 0; $index < count($coordinates); ++$index)
        {
            $coordinate = $geometryFactory->CreateCoordinateXY(ParseLocaleDouble($coordinates[$index]), ParseLocaleDouble($coordinates[++$index]));
            $coordinateCollection->Add($coordinate);
        }
        
        $coordinateCollection->Add($geometryFactory->CreateCoordinateXY(ParseLocaleDouble($coordinates[0]), ParseLocaleDouble($coordinates[1])));
        
        $linearRingCollection = $geometryFactory->CreateLinearRing($coordinateCollection);
        $captureBox           = $geometryFactory->CreatePolygon($linearRingCollection, null);
        
        return $captureBox;
    }

    function GenerateMap($size)//print_size
    {
        global $sessionID, $mapName, $captureBox, $printSize, $normalizedCapture, $rotation, $scaleDenominator, $printDpi, $drawNorthArrow;
        $userInfo         = new MgUserInformation($sessionID);
        $siteConnection   = new MgSiteConnection();
        $siteConnection->Open($userInfo);
        $renderingService = $siteConnection->CreateService(MgServiceType::RenderingService);
        
        $map = new MgMap($siteConnection);
        $map->Open($mapName);
        
        $selection        = new MgSelection($map);
    
        // Calculate the generated picture size
        $envelope         = $captureBox->Envelope();
        $normalizedE      = $normalizedCapture->Envelope();
        $size1            = new Size($envelope->getWidth(), $envelope->getHeight());
        $size2            = new Size($normalizedE->getWidth(), $normalizedE->getHeight());
        $toSize           = new Size($size1->width / $size2->width * $size->width, $size1->height / $size2->height * $size->height);
        $center           = $captureBox->GetCentroid()->GetCoordinate();
  
        $map->SetDisplayDpi($printDpi);
        $colorString = $map->GetBackgroundColor();
        // The returned color string is in AARRGGBB format. But the constructor of MgColor needs a string in RRGGBBAA format
        $colorString = substr($colorString, 2, 6) . substr($colorString, 0, 2);
        $color = new MgColor($colorString);

        $mgReader = $renderingService->RenderMap($map, 
                                                 $selection, 
                                                 $center,
                                                 $scaleDenominator, 
                                                 $toSize->width, 
                                                 $toSize->height,
                                                 $color,
                                                 "PNG",
                                                 false);
        $tempImage = sys_get_temp_dir() . DIRECTORY_SEPARATOR . "mgo" . uniqid();

        $mgReader->ToFile($tempImage);
        
        $image = imagecreatefrompng($tempImage);
        unlink($tempImage);

        // Rotate the picture back to be normalized
        $normalizedImg = imagerotate($image, -$rotation, 0);
        // Free the original image
        imagedestroy($image);
        // Crop the normalized image
        $croppedImg = imagecreatetruecolor($size->width, $size->height);
        imagecopy($croppedImg, $normalizedImg, 0, 0, (imagesx($normalizedImg) - $size->width) / 2, (imagesy($normalizedImg) - $size->height) / 2, $size->width, $size->height);
        // Free the normalized image
        imagedestroy($normalizedImg);
        if ($drawNorthArrow) {
            // Draw the north arrow on the map
            DrawNorthArrow($croppedImg);
        }
        header ("Content-type: image/png"); 
        imagepng($croppedImg);
        
        //Uncomment to see what PHP-isms get spewed out that may be tripping up rendering
        //Also replace instances of "////print_r" with "//print_r" to insta-uncomment all debugging calls
        /*
        ob_start();
        imagepng($croppedImg);
        $im = base64_encode(ob_get_contents());
        ob_end_clean();
        header("Content-type: text/html", true);
        echo "<img src='data:image/png;base64,".$im."' alt='legend image'></img>";
        */
        
        imagedestroy($croppedImg);
    }
    
    function DrawNorthArrow($map)
    {
        global $printSize, $rotation;
        
        // Load the north arrow image which has a 300 dpi resolution
        $na         = imagecreatefrompng("./north_arrow.png");
        
        $transparent= imagecolortransparent($na);
        // PHP 5.5 broke image rotation (or maybe we did it completely wrong before PHP 5.5). 
        // Either way, here's how we fix it. Assign an explicit color if imagecolortransparent() returns -1
        if ($transparent < 0) {
            $transparent = imagecolorallocatealpha($na, 0, 0, 0, 127);
            $bReleaseTrans = true;
        }
        
        // Rotate the north arrow according to the capture rotation
        $rotatedNa  = imagerotate($na, -$rotation, $transparent);
        // Free the transparent color if we allocated it
        if ($bReleaseTrans)
            imagecolordeallocate($na, $transparent);
            
        // Free the north arrow image
        imagedestroy($na);
        // Get the size of north arrow image
        $naWidth    = imagesx($rotatedNa);
        $naHeight   = imagesy($rotatedNa);
        // Get the map size
        $mapWidth   = imagesx($map);
        $mapHeight  = imagesy($map);
        // Get the logical resolution of map
        $resolution = $mapWidth * 25.4 / $printSize->width;
        // On printed paper, north arrow is located at the right bottom corner with 6 MM margin
        $naRes      = 300;
        $naMargin   = 12;
        // Calculate the margin as pixels according to the resolutions
        $margin     = $resolution * $naMargin / 25.4;
        // Get the width of the north arrow on the map picture
        $drawWidth  = $naWidth * $resolution / $naRes;
        $drawHeight = $naHeight * $resolution / $naRes;
        // Draw the north arrow on the map picture
        imagecopyresized($map, $rotatedNa, $mapWidth - $drawWidth - $margin, $mapHeight - $drawHeight - $margin, 0, 0, $drawWidth, $drawHeight, $naWidth, $naHeight);
        // Free the north arrow image
        imagedestroy($rotatedNa); 
    }
    
    function ParseLocaleDouble($stringValue)
    {
        $lc = localeconv();
        $result = str_replace(".", $lc["decimal_point"], $stringValue);
        return doubleval($result);
    }
?>

<?php    
    class Size
    {
        public $width;
        public $height;
        
        public function __construct($width, $height)
        {
            $this->width  = $width;
            $this->height = $height;
        }
    }
?>