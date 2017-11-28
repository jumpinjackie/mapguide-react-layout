<?php
/**
 * Save
 *
 * $Id: save.php 1421 2008-06-25 10:59:01Z aboudreault $
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
 * Purpose: Trigger a file download.
 *****************************************************************************/

$name = $_POST['name'];
$type = $_POST['type'];
$content = $_POST['content'];

if (!isset($name)) {
    die('name not set');
}

if (!isset($type)) {
    die('type not set');
}

if (!isset($content)) {
    die('fileContent not set');
}

$name = preg_replace("/[^a-zA-Z0-9s.]/", "_", urldecode($name));
header("Content-type: $type");
header("Content-Disposition: attachment; filename=$name");

echo urldecode($content);

?>
