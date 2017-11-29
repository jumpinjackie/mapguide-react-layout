<?php
/**
 * ClearSelection
 *
 * $Id: ClearSelection.php 2847 2014-06-17 11:56:07Z jng $
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
 * Purpose: clear active selection from the map
 *****************************************************************************/

include "Common.php";
if(InitializationErrorOccurred())
{
    DisplayInitializationErrorText();
    exit;
}

try
{
    $resourceSrvc = $siteConnection->CreateService(MgServiceType::ResourceService);

    $map = new MgMap($siteConnection);
    $map->Open($mapName);

    $sel = new MgSelection($map);

    $sel->Save($resourceSrvc, $mapName);
}
catch(MgException $e)
{
    echo "ERROR: " . $e->GetExceptionMessage() . "\n";
    echo $e->GetDetails() . "\n";
    echo $e->GetStackTrace() . "\n";
}





?>
