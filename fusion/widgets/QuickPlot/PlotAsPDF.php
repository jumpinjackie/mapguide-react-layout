<?php
    require_once("../../lib/tcpdf/config/lang/eng.php");
    require_once("../../lib/tcpdf/tcpdf.php");

    $host = $_SERVER["SERVER_NAME"];
    $protocol = (isset($_SERVER["HTTPS"]) && $_SERVER["HTTPS"] != "off") ? "https://" : "http://"; 
    $path = $_SERVER["PHP_SELF"];
    $port = $_SERVER["SERVER_PORT"];
    $generatePage = "/GeneratePicture.php?";
    $generateLegend = "/GenerateLegend.php?";
    $pathString = implode('/',explode('/', $path,-1));
    $legendPathString = "";
    $showLegend = array_key_exists("ShowLegend", $_POST) && $_POST["ShowLegend"] === "on";
    $showNorthArrow = array_key_exists("ShowNorthArrow", $_POST) && $_POST["ShowNorthArrow"] === "on";
    $showCoordinates = array_key_exists("ShowCoordinates", $_POST) && $_POST["ShowCoordinates"] === "on";
    $showScaleBar = array_key_exists("ShowScaleBar", $_POST) && $_POST["ShowScaleBar"] === "on";
    $showDisclaimer = array_key_exists("ShowDisclaimer", $_POST) && $_POST["ShowDisclaimer"] === "on";
    $legendType = array_key_exists("LegendType", $_POST) ? $_POST["LegendType"] : "original";
    if (strcmp($legendType, "original") == 0) {
        // /mapguide
        $components = explode('/', $path, -1);
        for ($i = 0; $i < count($components); $i++) {
            if (strlen($components[$i]) == 0) {
                continue;
            } else {
                $legendPathString = "/" . $components[$i];
                break;
            }
        }
        $legendPathString .= "/mapagent";
        $generateLegend = "/mapagent.fcgi?";
    } else {
        $legendPathString = $pathString;
    }
    $legendDpi = 96; //Legend is fixed at 96 dpi because (http://trac.osgeo.org/mapguide/ticket/71)
    $legendWidth = 0; //Width of legend in inches

    // POST params
    // Title
    $title = htmlspecialchars( $_POST["{field:title}"] );
    // Sub title
    $subTitle = htmlspecialchars( $_POST["{field:sub_title}"] );
    // DPI
    if( $_POST["dpi"] && trim($_POST["dpi"]) != "" ) 
    {
        $printDpi = intval($_POST["dpi"]);
    }
    else
    {
        $printDpi = 96;
    }
    // Paper size
    if( $_POST["paperSize"] && trim($_POST["paperSize"]) != "" )
    {
        $sizeArray = explode(",", $_POST["paperSize"]);
        $paperType = $sizeArray[2];
    }
    else
    {
        $paperType = "A4";
    }
    // Orientation
    if( $_POST["orientation"] && trim($_POST["orientation"]) != "" )
    {
        $orientation = $_POST["orientation"];
    }
    else
    {
        $orientation = "P";
    }
    // Margin
    if( $_POST["margin"] && trim($_POST["margin"]) != "")
    {
        //top,buttom,left,right
        $margin = explode(",", $_POST["margin"]);
    }
    else
    {
        // top,buttom,left,right,set default Margin = {0.5,0.5,0.5,0.5 inch}
        $margin = array("25.4","12.7","12.7","12.7");
    }
    // Scale
    if( $_POST["scaleDenominator"] && trim($_POST["scaleDenominator"]) != "" )
    {
        $scale = intval($_POST["scaleDenominator"]);
    }
    else 
    {
        $scale = 500;
    }
    // Print size
    if( $_POST["printSize"] && trim($_POST["printSize"]) != "" )
    {
        $printSizeArray = explode(",", $_POST["printSize"]);
        $printSize = new Size(ParseLocaleDouble($printSizeArray[0]), ParseLocaleDouble($printSizeArray[1]));
    }
    else
    {
        $printSize = new Size(0, 0);
    }
    
    if ($showLegend) {
        $legendWidth = PxToIn(250, $legendDpi);
    }
    
    // Create new PDF document, the default "PDF_UNIT" value is "mm"
    $pdf = new TCPDF($orientation, PDF_UNIT, $paperType, true, "UTF-8", false);
    $font = "dejavusans";
    // Set margins  
    $pdf->SetMargins(0, 0, 0);
    $pdf->SetHeaderMargin(0);
    $pdf->SetFooterMargin(0);
    // Prevent adding page automatically
    $pdf->SetAutoPageBreak(false); 

    // Remove default header/footer
    $pdf->setPrintHeader(false);
    $pdf->setPrintFooter(false);
    // Set default font size
    $pdf->SetFont($font, "", 16, "", true);

    // Add a page
    $pdf->AddPage();
    
    // The print size determines the size of the PDF, not the size of the map and legend images
    // we want to request back to put into this PDF.
    //
    // What that means is that we should draw the surrounding print elements first (title, scale, disclaimer),
    // then adjust the image request sizes to ensure they (and element drawn on top like coordinates) will fit
    // correctly in the remaining space.
    //
    // Title, scale and disclaimer rendering will all return Metrics objects that will give us the information
    // needed for the size adjustments
    
    // Draw Title
    $mTitle = DrawTitle();
    
    $mScale = NULL;
    if ($showScaleBar) {
        // Draw Scale
        $mScale = DrawScale();
    }

    // Draw declaration
    if ($showDisclaimer)
        $mDec = DrawDeclaration(($mScale != NULL) ? ($mScale->x + $mScale->w) : 0);
    else
        $mDec = new Metrics(0, 0, 0, 0);
    
    // Adjust width and height of the images we want to request to compensate for surrounding print elements that have been rendered
    
    // Check the size of the disclaimer and adjust height
    $idealHeight = $pdf->getPageHeight() - ($mDec->h - ($mScale != NULL ? $mScale->h : 0)) - $margin[0] - $margin[1];
    //var_dump($idealHeight);
    //var_dump($printSize);
    //die;
    if ($idealHeight < $printSize->height);
        $printSize->height = $idealHeight;
        
    $idealWidth = $pdf->getPageWidth() - $margin[2] - $margin[3];
    if ($idealWidth < $printSize->width);
        $printSize->width = $idealWidth;
    
    // Construct the querysting which can be used to generate the Map image
    $query_string = "session_id=".$_POST['sessionId']."&map_name=".$_POST['mapName']."&print_size=".$printSize->width.",".$printSize->height.
                    "&print_dpi=".$_POST['dpi']."&box=".$_POST['box']."&normalized_box=".$_POST['normalizedBox'].
                    "&scale_denominator=".$_POST['scaleDenominator']."&rotation=".$_POST['rotation']."&northarrow=".($showNorthArrow ? "1" : "0");
    
    // Construct the querystring which can be used to generate the legend
    if ($showLegend) {
        if (strcmp($legendType, "original") == 0) {
            $legend_query_string = "OPERATION=GETMAPLEGENDIMAGE&VERSION=1.0.0&FORMAT=PNG&SESSION=".$_POST["sessionId"]."&MAPNAME=".$_POST["mapName"]."&WIDTH=".InToPx($legendWidth, $legendDpi)."&HEIGHT=".InToPx($printSize->height, $legendDpi);
        } else {
            $legend_query_string = "session_id=".$_POST['sessionId']."&map_name=".$_POST['mapName']."&width=".InToPx($legendWidth, $printDpi)."&height=".InToPx($printSize->height, $printDpi);
        }
    }
    
    $filelocation = "";
    $legendfilelocation = "";

    if("80" === $port)
    {
        $filelocation = $protocol.$host.$pathString.$generatePage.$query_string;
        if ($showLegend)
            $legendfilelocation = $protocol.$host.$legendPathString.$generateLegend.$legend_query_string;
    }
    else
    {
        $filelocation = $protocol.$host.":".$port.$pathString.$generatePage.$query_string;
        if ($showLegend)
            $legendfilelocation = $protocol.$host.":".$port.$legendPathString.$generateLegend.$legend_query_string;
    }
    
    //Uncomment to see the legend and map image urls
    //var_dump($filelocation);
    //var_dump($legendfilelocation);
    //die;
    
    // Draw Map
    $pdf->Image($filelocation, ($margin[2]), $margin[0], $printSize->width, $printSize->height, "PNG", "", "", false, $printDpi, "", false, false, 1, false, false, false);
    
    // Draw legend if specified
    if ($showLegend) {
        $pdf->Image($legendfilelocation, $margin[2], $margin[0], $legendWidth, $printSize->height, "PNG", "", "", false, $printDpi, "", false, false, 1, false, false, false);
    }
    
    // Draw coordiates if specified
    $mExt = NULL;
    if ($showCoordinates) {
        // Draw Extent coordinates
        $mExt = DrawExtentCS();
    }
    
    // Close and output PDF document
    if (strlen($title) == 0)
        $pdf->Output('Map.pdf', 'I');
    else
        $pdf->Output($title.'.pdf', 'I');
?>

<?php
    class Metrics
    {
        public $x;
        public $y;
        public $w;
        public $h;
        
        public function __construct($x, $y, $w, $h)
        {
            $this->x = $x;
            $this->y = $y;
            $this->w = $w;
            $this->h = $h;
        }
    }

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
    
    function ParseLocaleDouble($stringValue)
    {
        $lc = localeconv();
        $result = str_replace(".", $lc["decimal_point"], $stringValue);
        return doubleval($result);
    }

    function InToPx($in, $dpi) {
        return ($in * $dpi) / 25.4;
    }
    
    function PxToIn($px, $dpi) {
        return ($px * 25.4) / $dpi;
    }

    //This function try to get a more elegant number for the scale bar display.
    //For example, convert 5.3 to 5, 5.5 to 6, 13 to 10, 230 to 200 and 1234 to 1200.
    //Basically no number will execced 9999 in scale bar display, however we support that situation
    //the minimum number for the return value is 0
    function GetRoundNumber($number)
    {
        $number = abs($number);
        $temp = $number = round($number);
        $len = 0;
        
        while($temp > 0)
        {
            $len++;
            $temp /= 10;
            $temp = floor($temp);
        }      
        
        //10,20,30,40,50,60,70,80,90
        if( 2 === $len )
        {
            $number = $number / 10;
            $number = round($number);
            $number = $number * 10;
        }
        
        //100,200,300,400,500,600,700,800,900
        if( $len >= 3 )
        {
            $number = $number / 100;
            $number = round($number);
            $number = $number * 100;
        }
        
        //else, just 1,2,3,4,5,6,7,8,9
        return $number; 
    }
    
    function DrawScale()
    {
        global $pdf,$margin,$font,$scale;
     
        $pageHeight = $pdf->getPageHeight();
        $paddingBottom = 7; $textPadding = 5; $fontSize = 6;             
        $style = array("width" => 0.4, "cap" => "butt", "join" => "miter", "dash" => 0, "color" => array(0, 0, 0));
        
        $start_x = ParseLocaleDouble($margin[2]);
        $start_y = $pageHeight - $paddingBottom;
        
        $lineMark_h = 3;
        $textMarkPadding = 1.0;
        
        //<editor-fold defaultstate="collapsed" desc="print the scale bar with meter">
        $unit = "m";
        $imageSpan = 20;            // the 20 is a suggested scale bar length
        $realSpan = $scale * 0.02;  // $imageSpan / 1000
        
        if($realSpan >= 1000)
        {
            $unit = "km";
            $realSpan /= 1000;
            $realSpan = GetRoundNumber($realSpan);
            $imageSpan = ($realSpan * 1000000)/$scale;
        }
        else 
        {
            $realSpan = GetRoundNumber($realSpan);
            $imageSpan = ($realSpan * 1000) / $scale;
        }
        
        $end_x = $start_x + $imageSpan;
        $end_y = $start_y;       
        $meterTextMark = $realSpan." ".$unit;
        
        $pdf->SetFont($font, "", $fontSize, "", true);
        $pdf->Line($start_x, $start_y, $end_x, $end_y, $style);
        $pdf->Line($start_x, $start_y, $start_x, $start_y - $lineMark_h, $style);
        $pdf->Line($end_x, $end_y, $end_x, $end_y - $lineMark_h, $style);
        $fontSize = 7; $textHeight = 4;
        $pdf->SetFont($font, "", $fontSize, "", true);
        $pdf->Text($start_x + $textMarkPadding, $start_y - $textHeight, $meterTextMark);
  
        $textStart_x = $end_x; 
        //</editor-fold>
        
        //<editor-fold defaultstate="collapsed" desc="print the scale bar with feet">
        $unit ="ft"; $aFeetPerMeter = 3.2808; $aFeetPerMile = 5280; $aMeterPerFeet = 0.3048;
        $imageSpan = 20; // the 20 is a suggested scale bar length, in "mm"
        $realSpan = ( ($scale * $imageSpan) / 1000 ) * $aFeetPerMeter;
        
        if($realSpan > $aFeetPerMile)
        {
            $unit = "mi";
            $realSpan /= $aFeetPerMile;
            $realSpan = GetRoundNumber($realSpan);
            $imageSpan = ( $realSpan * $aFeetPerMile * $aMeterPerFeet * 1000 ) / $scale;
        }
        else 
        {
            $realSpan = GetRoundNumber($realSpan);
            $imageSpan = ( $realSpan * $aMeterPerFeet * 1000 ) / $scale;
        }
        
        $end_x = $start_x + $imageSpan;
        $end_y = $start_y;
        
        $feetTextMark = $realSpan.' '.$unit;
        
        $pdf->Line($start_x, $start_y, $end_x, $end_y, $style);
        $pdf->Line($start_x, $start_y, $start_x, $start_y + $lineMark_h, $style);
        $pdf->Line($end_x, $end_y, $end_x, $end_y + $lineMark_h, $style);
        
        $pdf->SetFont($font, "", $fontSize, "", true);
        $pdf->Text($start_x + $textMarkPadding, $start_y + 1, $feetTextMark);
        //</editor-fold>
        
        //determine where to begin to print the absolute scale and date info
        if($end_x > $textStart_x)
        {
            $textStart_x = $end_x;
        }
        
        $textStart_x += $textPadding;
        
        //write the scale
        $fontSize = 8;
        $pdf->SetFont($font, "", $fontSize, "", true);
        $scaleText = "Scale 1:".$scale;
        $pdf->Text($textStart_x, $end_y + 0.2, $scaleText);
        //write the date
        $date = date("M/d/Y");
        $pdf->Text($textStart_x + 0.3, $end_y - 3.8, $date);
        
        return new Metrics($margin[2],
                           $start_y,
                           $textStart_x,
                           ($end_y + 0.2) - $start_y);
    }

    function DrawDeclaration($offX)
    {
        global $pdf, $font, $margin, $printSize, $legendWidth;
    
        $declaration= $_POST["legalNotice"];
        
        //$declaration_w = $pdf->GetStringWidth($declaration,$font,9);
        $pdf->SetFont($font, "", 9, "", true);
        
        $bottomPadding = 2.5;
        
        //Sometimes the declaration is too short, less than 100 unit, we could set the cell width as the string length
        //so it will align to the right
        $SingleLineDeclarationWidth  = $pdf->GetStringWidth($declaration, $font, "", 9, false) + $legendWidth;
        $tolerance = 3;
        $w = $pdf->getPageWidth() - $margin[0] - $margin[1] - $offX;
        
        if( $SingleLineDeclarationWidth + $tolerance < $w )
        {
            $w = $SingleLineDeclarationWidth + $tolerance;
        }
        
        $h = 5;
        $border = 0; //no border
        $align = "L";//align left
        $tolerance = 2;
        //$x = ParseLocaleDouble($margin[2] + $legendWidth) + $printSize->width - $w + $tolerance;
        $x = ParseLocaleDouble($margin[2]) + $offX + $tolerance;
        $cellTotalHeight = $pdf->getStringHeight($w,$declaration);
        $y = $pdf->getPageHeight() - $cellTotalHeight - $bottomPadding;
        if (strlen($declaration) == 0)
            return new Metrics($x, $y, 0, 0);

        $pdf->MultiCell($w, $h, $declaration, $border, $align, false, 0, $x , $y , true);
        return new Metrics($x, $y, $w, $pdf->getStringHeight($w, $declaration));
    }
    
    function DrawExtentCS()
    {
        global $pdf, $font, $margin, $printSize, $legendWidth;
        
        if( $_POST["normalizedBox"] && trim($_POST["normalizedBox"]) != "" )
        {
            $fontSize = 9; $decimals = 6; $padding = 5; $textHeight = 5;
            
            $normalizedBox = $_POST["normalizedBox"];
            
            $extent_cs = explode(",",$normalizedBox);//2,3 ; 6,7
            $lefttop_cs = " x:".number_format($extent_cs[6], $decimals).", y:".number_format($extent_cs[7], $decimals)."   ";
            $rightbuttom_cs = " x:".number_format($extent_cs[2], $decimals).", y:".number_format($extent_cs[3], $decimals)."   ";
            $pdf->SetFont($font, "", $fontSize, "", true);

            //cell width
            $lt_cellwidth = $pdf->GetStringWidth($lefttop_cs,$font,$fontSize);
            $rb_cellwidth = $pdf->GetStringWidth($rightbuttom_cs,$font,$fontSize);
            //cell location
            $lefttop = array((ParseLocaleDouble($margin[2]) + $padding),(ParseLocaleDouble($margin[0]) + $padding));
            $rightbuttom = array((ParseLocaleDouble($margin[2]) + $printSize->width - $rb_cellwidth - $padding),(ParseLocaleDouble($margin[0]) + $printSize->height - $padding - $textHeight));

            $pdf->SetFillColor(255, 255, 255);

            $pdf->SetXY($lefttop[0] + $legendWidth, $lefttop[1], false);
            $pdf->Cell($lt_cellwidth, 0, $lefttop_cs, 1, 0, '', true, '', 0, false, 'T', 'M');

            $pdf->SetXY($rightbuttom[0], $rightbuttom[1], false);
            $pdf->Cell($rb_cellwidth, 0, $rightbuttom_cs, 1, 0, '', true, '', 0, false, 'T', 'M');
        }
    }
    
    function DrawTitle()
    {
        global $pdf, $margin, $title, $subTitle,$font;
        
        $html = '<div style="text-align:left"><span style="font-weight: bold; font-size: 18pt;">'.$title.'</span><br/><span>'.$subTitle.'</span></div>';
        
        //print title left position
        $titleWidth = $pdf->GetStringWidth($title, $font, "B", 18, false);
        $x = ($pdf->getPageWidth() - $titleWidth) / 2;
        if($x < 0.0)
        {
            $x = 0;
        }
        
        //print title top position
        $y = 5;
        if( $margin[0] > 0.0 )
        {
            $y = $margin[0] / 4;
        }
        
        // Print text using writeHTMLCell()
        $pdf->writeHTMLCell(0, 0, $x, $y, $html, 0, 1, false, true, "C", true);
        return new Metrics($x, $y, $titleWidth, $pdf->getStringHeight(0, $title));
    }
?>