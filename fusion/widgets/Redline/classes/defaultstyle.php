<?php

//A layer style that represents all the pluggable %s tokens from markuplayerdefinition.xml
//A new instance for this class is initialized with the default values from DefaultStyle
class LayerStyle
{
    public $MARKER_COLOR;
    public $MARKER_TYPE;
    public $MARKER_SIZE_UNITS;
    public $MARKER_SIZE;
    public $LINE_COLOR;
    public $LINE_PATTERN;
    public $LINE_SIZE_UNITS;
    public $LINE_THICKNESS;
    public $FILL_PATTERN;
    public $FILL_TRANSPARENCY;
    public $FILL_FORE_COLOR;
    public $FILL_BACK_COLOR;
    public $FILL_BACK_TRANS;
    public $BORDER_PATTERN;
    public $BORDER_SIZE_UNITS;
    public $BORDER_COLOR;
    public $BORDER_THICKNESS;
    public $LABEL_SIZE_UNITS;
    public $LABEL_FONT_SIZE;
    public $LABEL_BOLD;
    public $LABEL_ITALIC;
    public $LABEL_UNDERLINE;
    public $LABEL_FORE_COLOR;
    public $LABEL_BACK_COLOR;
    public $LABEL_BACK_STYLE;
    
    public function __construct() {
        $this->MARKER_COLOR = DefaultStyle::MARKER_COLOR;
        $this->MARKER_TYPE = DefaultStyle::MARKER_TYPE;
        $this->MARKER_SIZE_UNITS = DefaultStyle::MARKER_SIZE_UNITS;
        $this->MARKER_SIZE = DefaultStyle::MARKER_SIZE;
        $this->LINE_COLOR = DefaultStyle::LINE_COLOR;
        $this->LINE_PATTERN = DefaultStyle::LINE_PATTERN;
        $this->LINE_SIZE_UNITS = DefaultStyle::LINE_SIZE_UNITS;
        $this->LINE_THICKNESS = DefaultStyle::LINE_THICKNESS;
        $this->FILL_PATTERN = DefaultStyle::FILL_PATTERN;
        $this->FILL_TRANSPARENCY = DefaultStyle::FILL_TRANSPARENCY;
        $this->FILL_FORE_COLOR = DefaultStyle::FILL_FORE_COLOR;
        $this->FILL_BACK_COLOR = DefaultStyle::FILL_BACK_COLOR;
        $this->FILL_BACK_TRANS = DefaultStyle::FILL_BACK_TRANS;
        $this->BORDER_PATTERN = DefaultStyle::BORDER_PATTERN;
        $this->BORDER_SIZE_UNITS = DefaultStyle::BORDER_SIZE_UNITS;
        $this->BORDER_COLOR = DefaultStyle::BORDER_COLOR;
        $this->BORDER_THICKNESS = DefaultStyle::BORDER_THICKNESS;
        $this->LABEL_SIZE_UNITS = DefaultStyle::LABEL_SIZE_UNITS;
        $this->LABEL_FONT_SIZE = DefaultStyle::LABEL_FONT_SIZE;
        $this->LABEL_BOLD = DefaultStyle::LABEL_BOLD;
        $this->LABEL_ITALIC = DefaultStyle::LABEL_ITALIC;
        $this->LABEL_UNDERLINE = DefaultStyle::LABEL_UNDERLINE;
        $this->LABEL_FORE_COLOR = DefaultStyle::LABEL_FORE_COLOR;
        $this->LABEL_BACK_COLOR = DefaultStyle::LABEL_BACK_COLOR;
        $this->LABEL_BACK_STYLE = DefaultStyle::LABEL_BACK_STYLE;
    }
}

//Default markup layer settings
class DefaultStyle
{
    const MARKER_COLOR = "FF0000";
    const MARKER_TYPE = "Square";
    const MARKER_SIZE_UNITS = "Points";
    const MARKER_SIZE = 10;
    
    const LINE_COLOR = "0000FF";
    const LINE_PATTERN = "Solid";
    const LINE_SIZE_UNITS = "Centimeters";
    const LINE_THICKNESS = 0;
    
    const FILL_PATTERN = "Solid";
    const FILL_TRANSPARENCY = 0;
    const FILL_FORE_COLOR = "00FF00";
    const FILL_BACK_COLOR = "00FF00";
    const FILL_BACK_TRANS = true;
    
    const BORDER_PATTERN = "Solid";
    const BORDER_SIZE_UNITS = "Centimeters";
    const BORDER_COLOR = "000000";
    const BORDER_THICKNESS = 0;
    
    const LABEL_SIZE_UNITS = "Points";
    const LABEL_FONT_SIZE = 10;
    
    const LABEL_BOLD = false;
    const LABEL_ITALIC = false;
    const LABEL_UNDERLINE = false;
    
    const LABEL_FORE_COLOR = "000000";
    const LABEL_BACK_COLOR = "FFFFFF";
    const LABEL_BACK_STYLE = "Ghosted";
}

?>