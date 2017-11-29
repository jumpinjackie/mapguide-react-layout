<?php
/**
 * Utilities
 *
 * $Id: Utilities.php 2406 2011-06-23 10:15:24Z liuar $
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

/* recursively convert a variable to its json representation */
if (!function_exists('var2json')) {
  function var2json($var) {
    if (function_exists('json_encode')) {
        $result = json_encode($var);
    } else {
        $result = "";
        if (is_object($var)) {
            $result .= "{";
            $sep = "";
            foreach($var as $key => $val) {
                $result .= $sep.'"'.$key.'":'.var2json($val);
                $sep = ",";
            }
            $result .= "}";
        } else if (is_array($var)) {
            $result .= "[";
            $sep = "";
            for($i=0; $i<count($var); $i++) {
                $result .= $sep.var2json($var[$i]);
                $sep = ",";
            }
            $result .= "]";
        } else if (is_string($var)) {
            //$tmpStr = str_replace("'", "\'", $var);
            $tmpStr = str_replace('"', '\"', $var);
            $result = '"'.str_replace("\n", '\n', $tmpStr).'"';
        } else if (is_bool($var)) {
            $result = $var ? 'true' : 'false';
        } else if (is_null($var)) {
            $result = 'null';
        } else {
            $result = $var;
        }      
    }

    return utf8_encode($result);
}
}

if (!function_exists('xml2json')) {
  function xml2json($domElement) {
    $result = '';
    if ($domElement->nodeType == XML_COMMENT_NODE) {
        return '';
    }
    if ($domElement->nodeType == XML_TEXT_NODE) {
        /* text node, just return content */
        $text = trim($domElement->textContent);
        $text = addslashes($text);
        if ($text != '') {
            $result = '"'.$text.'"';
        } else {
            $text = '""';
        }
    } else {
        /* some other kind of node, needs to be processed */
        
        $aChildren = array();
        $aValues = array();
        
        /* attributes are considered child nodes with a special key name
           starting with @ */
        if ($domElement->hasAttributes()) {
            foreach($domElement->attributes as $key => $attr) {
                $len = array_push($aValues, array('"'.$attr->value.'"'));
                $aChildren['@'.$key] = $len-1;
            }
        }
        
        if ($domElement->hasChildNodes()) {
            //has children
            foreach($domElement->childNodes as $child) {
                if ($child->nodeType == XML_COMMENT_NODE) {
                    continue;
                }
                if ($child->nodeType == XML_TEXT_NODE) {
                    $text = trim($child->textContent);
                    $text = addslashes($text);
                    if ($text == '') {
                        continue;
                    }
                    array_push($aValues, array('"'.$text.'"'));
                } else {
                    $childTag = $child->tagName;
                    $json = xml2json($child);
                    if ($json == '') {
                        continue;
                    }
                    if (array_key_exists($childTag, $aChildren)) {
                        array_push($aValues[$aChildren[$childTag]], $json);
                    } else {
                        $len = array_push($aValues, array($json));
                        $aChildren[$childTag] = $len - 1;
                    }
                }
            }
        }
        
        $nChildren = count($aChildren);
        $nValues = count($aValues);
        
        if ($nChildren == 0 && $nValues == 0) {
            return '';
        }
        
        if ($nValues == 1 && $nChildren == 0) {
            $result .= $aValues[0][0];
        } else {
            $bIsObject = true;
            if ($nChildren != $nValues) {
                $bIsObject = false;
            }
            $result .= $bIsObject ? '{' : '[';
        
            $sep = '';
            $aChildren = array_flip($aChildren);
            for ($i=0; $i<$nValues; $i++) {
                $aValue = $aValues[$i];
                $result .= $sep;
            
                if (isset($aChildren[$i])) {
                    if (!$bIsObject) {
                        $result .= '{';
                    }
                    $result .= '"'.$aChildren[$i].'":';
                }
                //if (count($aValue) > 1) {
                    $result .= '[';
                    $result .= implode(',', $aValue);
                    $result .= ']';
                //} else {
                //    $result .= $aValue[0];
                //}
                if (isset($aChildren[$i]) && !$bIsObject) {
                    $result .= '}';
                }
                $sep = ',';
            }
            $result .= $bIsObject ? '}' : ']';
        }
        
    }
    return $result;
}
}

/**
 * this function determines if a path represents an absolute path and returns
 * true if it is, and false if it is not
 * @param szPath string the path to test
 * @result boolean true if the path is absolute, false otherwise
 */
if (!function_exists('isAbsolutePath')) {
  function isAbsolutePath( $szPath ) {
    if ($szPath == "") { return false; }
    if ($szPath[0] == "/" || preg_match('/^(\w:)/', $szPath)) {
        return true;
    } else {
        return false;
    }
}
}

/**
 * This function translate $szDestPath (relative or absolute)
 * to a absolute path based on $szOrigPath.
 *
 * @param $szDestPath string Destination path to translate
 * @param $szOrigPath string Reference path
 */
if (!function_exists('resolvePath2')) {
  function resolvePath2 ($szDestPath, $szOrigPath) {
    // If one or other path is missing or absolute, return it.
    if ($szDestPath == "") { return $szOrigPath; }
    if ($szOrigPath == "") { return $szDestPath; }
    if ($szDestPath[0] == "/" || preg_match('/^(\w:)/', $szDestPath)) {
        //echo "absolute: $szDestPath<BR>";
        return $szDestPath;
    }

    // If windows prefix (eg: c:) get it
    $szPrefix = "";
    if ($szOrigPath[0] != "/") {
        if (preg_match('/^(\w:)(.*)/i', $szOrigPath, $aMatch)) {
            $szPrefix = $aMatch[1];
            $szOrigPath = $aMatch[2];
        } else {
            $szOrigPath = "/".$szOrigPath;
        }
    }

    // Make sure path finishing with "/"
    if ($szOrigPath[strlen($szOrigPath)-1] != "/" &&
        !is_dir($szOrigPath)) {
        $szOrigPath = dirname($szOrigPath)."/";
    }
    if ($szOrigPath[strlen($szOrigPath)-1] != "/") {
        $szOrigPath = $szOrigPath."/";
    }
    $szPath = $szOrigPath.$szDestPath;

    // Remove repetitive "/"
    $szPath = ereg_replace ("/+", "/", $szPath);

    $szPath = iterate_ereg_replace ("/\./", "/", $szPath);
    $szPath = iterate_ereg_replace ("/[^(/|\.)]+/\.\./", "/", $szPath);

    //Rest of the function
    return $szPrefix.$szPath;
}
}

/**
 * Recursive ereg_replace
 *
 * @param $szPattern string Regular expression to process
 * @param $szReplacement string Value to replace all matching result with
 * @param $szString string Haystack to process on
 *
 * @return string szString with the matching result replaced.
 */
if (!function_exists('iterate_ereg_replace')) {
  function iterate_ereg_replace ( $szPattern, $szReplacement, $szString) {
    $szResult = $szString;
    do {
        $szString = $szResult;
        $szResult = ereg_replace ($szPattern, $szReplacement, $szString);
    } while ($szResult != $szString);

    return $szResult;
}
}


if (!function_exists('arguments')) {
  function arguments($argv) {
    $_ARG = array();
    foreach ($argv as $arg) {
        if (ereg('--[a-zA-Z0-9]*=.*',$arg)) {
            $str = split("=",$arg); $arg = '';
            $key = ereg_replace("--",'',$str[0]);
            for ( $i = 1; $i < count($str); $i++ ) {
                $arg .= $str[$i];
            }
                        $_ARG[$key] = $arg;
        } elseif(ereg('-[a-zA-Z0-9]',$arg)) {
            $arg = ereg_replace("-",'',$arg);
            $_ARG[$arg] = 'true';
        }
    }
    return $_ARG;
}
}

if (!function_exists('loadFusionConfig')) {
  function loadFusionConfig() {
      //error_log("loadFusionConfig");
    /* json decode only in PHP 5.2 and later */
    if (function_exists('json_decode')) {
        $configFile = realpath(dirname(__FILE__)."/../../config.json");
        if (file_exists($configFile)) {
          $configStr = file_get_contents($configFile);
            /* replace single quotes with double quotes */
            //$configStr = str_replace("'", '"', $configStr);
            /* get rid of new lines, it just complicates things */
            $configStr = str_replace("\n", '', $configStr);
            /* get rid of embedded comments */
            $configStr = preg_replace("/\/\*.*\*\//U", "", $configStr);
            /* the regex after this one can't handle http: as a value, so mangle it. */
            //$configStr = preg_replace("/http:/U", "http_", $configStr);
            /* quote unquoted attribute names */
            //$configStr = preg_replace("/[^\"]{1}(\w*):/U", "\"$1\":", $configStr);
            /* decode the whole thing */
            //echo $configStr;
            $_SESSION['fusionConfig'] = json_decode($configStr, false);
        } else {
          echo "config file not found";
        }
    }
}
}

?>
