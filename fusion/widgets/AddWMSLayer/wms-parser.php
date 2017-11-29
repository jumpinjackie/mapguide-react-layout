<?php
// $Id: wms-parser.php,v 1.1 2007/10/28 05:41:11 pdeschamps Exp $

// CubeWerx requires at least 10M for wms capabilities
ini_set( 'memory_limit', '20M' );

/**
 *
 * inherited: +style, +crs, =latlonboundingbox, =boundingbox, +authorityurl
 *   =dimension, =attribution, =min/maxscaledenominator, =queryable, =cascaded
 *   =opaque
 * attribution: title, onlineresource->xlink:href, logourl(format,onlineresource)
 * style: name, title, legendurl(format,onlineresource->xlink:href)
 */
class CapabilitiesParser
{
    var $parser;

    var $version = NULL; // wms version
    var $root = NULL; // root element name (depends on wms version)
    var $path = ''; // current path (excluding root)

    var $layers = array();
    var $layer_level = 0;
    var $layer_props;
    var $inAttribution = false;
    var $inStyle = false;
    var $inMetadata = false;

    var $element = ''; // current element
    var $cbLayer = NULL;
    var $cbLayerParams = NULL;
    var $numLayers = 0;
    
    function CapabilitiesParser( )
    {
        $this->parser = xml_parser_create( "UTF-8" );
        xml_parser_set_option( $this->parser, XML_OPTION_CASE_FOLDING, 0 );
        xml_set_element_handler( $this->parser, array(&$this,"_startElement"), array(&$this,"_endElement") );
        xml_set_character_data_handler( $this->parser, array(&$this,"_characterData") );
        $this->layer_level = 0;
        $this->layer_props = array();
        $this->layer_props[ $this->layer_level ] = array( );
        $this->layers = array( );
    }
    
    function free_parser( )
    {
        xml_parser_free( $this->parser );
    }
    
    function inSomething()
    {
        return $this->inAttribution || $this->inStyle !== false;
    }
    
    function parse( $capabilities, $cbLayer = NULL, $cbLayerParams = NULL )
    {
        $this->cbLayer = $cbLayer;
        $this->cbLayerParams = $cbLayerParams;
        return xml_parse( $this->parser, $capabilities, TRUE );
    }
    
    function _startElement( $parser, $name, $attrs )
    {
//print '_startElement ' . $name . "\n";
        if( ! $this->root )
        {
            $this->root = $name;
            $this->version = $attrs['version'];
            $this->layer_props[ $this->layer_level ]['wms_version'] = $this->version;
        }
        else
        {
            $this->path .= '/' . $name;
        }
        $this->element = $name;
        
        switch( $name )
        {
            case 'Attribution':
                $this->inAttribution = true;
                break;
            case 'Style':
                $this->inStyle = true;
//                $this->layer_props[ $this->layer_level ]['Style'] = array( );
                break;
            case 'MetadataURL':
                $this->inMetadata = true;
                break;
            case 'OnlineResource':
                if( $this->inStyle !== false )
                {
                    $this->layer_props[ $this->layer_level ]['Style'][ $this->inStyle ] = $attrs['xlink:href'];
                    break;
                }
                if( $this->inMetadata !== false )
                {
                    $this->layer_props[ $this->layer_level ]['MetadataURL'] = $attrs['xlink:href'];
                }
                break;
            case 'Layer':
                // the previous layer is a parent layer of the new one
                if( ! isset($this->layer_props[ $this->layer_level ]['layer_id']) )
                {
                    $this->layer_props[ $this->layer_level ]['layer_id'] = $this->numLayers++;
                    if( $this->cbLayer )
                        eval( $this->cbLayer . "(\$this->layer_props[\$this->layer_level], \$this->cbLayerParams );" );
                    else
                    {
//                    print $this->layer_level . ' : ' . var_export($this->layer_props[ $this->layer_level ],true) . '<br>';
                        $this->layers[] = $this->layer_props[ $this->layer_level ];
                    }
                }
                else
                {
                    // adjust layer of $this->layer_props[ $this->layer_level ]
                    // count child layers?
                }
                $this->layer_level += 1;
                // copy layer_props for new layer level and merge new attrs
                // @todo: merge only inherited props!
                $inherited_values = array();
                $inherited_properties = array( 'Style', 'SRS', 'LatLonBoundingBox', 'BoundingBox', 'queryable', 'opaque', 'cascaded' );
                foreach( $inherited_properties as $prop )
                {
                    if( isset($this->layer_props[ $this->layer_level - 1 ][$prop]) )
                        $inherited_values[$prop] = $this->layer_props[ $this->layer_level - 1 ][$prop];
                }
                $this->layer_props[ $this->layer_level ] = array_merge( $inherited_values, $attrs );
                
//                print var_export( array($name,$attrs,$this->layer_level), true ) . '<br>';
                break;
            case 'LatLonBoundingBox';
                if( $this->layer_level > 0 )
                    $this->layer_props[ $this->layer_level][ $name ] = $attrs;
                break;
            case 'BoundingBox':
                if( $this->layer_level > 0 )
                {
                    if( ! isset($this->layer_props[ $this->layer_level][ $name ]) )
                        $this->layer_props[ $this->layer_level][ $name ] = array();
                    $SRS = $attrs['SRS'];
                    unset( $attrs['SRS'] );
                    $this->layer_props[ $this->layer_level][ $name ][$SRS] = $attrs;
                }
                break;
            default:
//                print $this->path . ':' . var_export($attrs,true) . '<br>';
                break;
        }
//        print $this->path . ': attrs = ' . var_export($attrs,true) . '<br>';
    }
    
    function _characterData( $parser, $data )
    {
//print '_characterData ' . $this->element . ':' . $data . "\n";
        if( $this->element != '' )
        {
            $text = trim($data);
            if( $this->layer_level == 0 )
            {
                switch( $this->element )
                {
                    case 'Title':
                    case 'Name':
                    case 'Abstract':
    //print 'abstract=' . $test . '<br/>';
                        $this->layer_props[ $this->layer_level][ $this->element ] .= $text;
                        break;
                }
            }
            if( $this->layer_level > 0 && ! $this->inSomething() )
            {
                switch( $this->element )
                {
                    case 'Title':
                    case 'Name':
                        // if not a style name!!
                        $this->layer_props[ $this->layer_level][ $this->element ] .= $text;
                        break;
                    case 'Abstract':
    //print 'abstract=' . $test . '<br/>';
                        // if not a style name!!
                        $this->layer_props[ $this->layer_level][ $this->element ] .= $text;
                        break;
                    case 'SRS':
                        if( isset($this->layer_props[ $this->layer_level][ $this->element ]) 
                        && $this->layer_props[ $this->layer_level][ $this->element ] != '' )
                        {
                            $this->layer_props[ $this->layer_level][ $this->element ] .= ' ';
                        }
                        $this->layer_props[ $this->layer_level][ $this->element ] .= $text;
                        break;
                }
            }
            else if( $this->inStyle !== false )
            {
                switch( $this->element )
                {
                    case 'Name':
                        $this->inStyle .= $text;
                        break;
                }
            }
//            print $this->path . ':<b>' . $this->element . '=' . $text . '|</b><br>';
//            print '---> ' . $this->layer_level . '/' . var_export($this->layer_props[ $this->layer_level],true) . '<br>';
            
            //$this->element = ''; // previously here instead of at start of _endElement
        }
    }
    
    function _endElement( $parser, $name )
    {
//print '_endElement ' . $name . "\n";
        $this->element = ''; // instead of at end of _characterData function
        
        $this->path = substr( $this->path, 0, -(1+strlen($name)) );
        switch( $name )
        {
            case 'Layer':
                if( ! $this->layer_props[ $this->layer_level ]['layer_id'] )
                {
                    $this->layer_props[ $this->layer_level ]['layer_id'] = $this->numLayers++;
                    if( $this->cbLayer )
                        eval( $this->cbLayer . "(\$this->layer_props[\$this->layer_level], \$this->cbLayerParams );" );
                    else
                    {
//                    print $this->layer_level . ' : ' . var_export($this->layer_props[ $this->layer_level ],true) . '<br>';
                        $this->layers[] = $this->layer_props[ $this->layer_level ];
                    }
                }
                $this->layer_level -= 1;
                array_pop( $this->layer_props );
                break;
            case 'Attribution':
                $this->inAttribution = false;
                break;
            case 'Style':
                $this->inStyle = false;
                break;
            case 'Metadata':
                $this->inMetadata = false;
                break;
            default:
                break;
        }
    }
    
} // CapabilitiesParser

?>
