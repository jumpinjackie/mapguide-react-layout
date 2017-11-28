<?php
/**
 * Utilities
 *
 * $Id: Utilities.php 963 2007-10-16 15:37:30Z madair $
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

/*****************************************************************************
 * Purpose: Utility functions
 *****************************************************************************/

function SaveQuery($oMap, $filename) {
    if($filename == null || $filename == '') {
        return false;
    }

    $stream = @fopen($filename, "wb");
    if($stream === FALSE) {
        return false;
    }

    /* count the number of layers with results */
    for($i=0; $i<$oMap->numlayers; $i++) {
        $oLayer = $oMap->getLayer($i);
        if($oLayer->getNumResults() > 0) {
            $n++;    
        }
    }
    fwrite($stream, $n);

    /* now write the result set for each layer */
    for($i=0; $i<$oMap->numlayers; $i++) {
        $oLayer = $oMap->getLayer($i);
        $nResults = $oLayer->getNumResults();
        if( $nResults > 0) {
            fwrite($stream, $i);
            fwrite($stream, $nResults);
            //write the bounds of the result, there are none in php?
            fwrite($stream, (double)0);
            fwrite($stream, (double)0);
            fwrite($stream, (double)0);
            fwrite($stream, (double)0);
            //write each of the results
            for ($j=0; $j<$nResults; $j++) {
                $result = $oLayer->getResult($j);
                fwrite($stream, (int)$result->shapeindex);
                fwrite($stream, (int)$result->tileindex);
                fwrite($stream, (int)$result->classindex);
            }
        }
    }

    fclose($stream);
    return true; 
}

?>