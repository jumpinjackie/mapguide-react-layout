Launching a viewer with a template
==================================

Assuming you installed the viewer as `viewer` under your MapGuide wwwroot. You can launch the viewer as follows:

`http://servername/mapguide/viewer/$ENTRY_POINT?resource=$RESOURCEID`

Where:

 * `$ENTRY_POINT` is the name of the entry point HTML file below
 * `$RESOURCEID` is the resource id of the Web Layout or Application Definition (eg. `Library://Samples/Sheboygan/Layouts/Sheboygan.WebLayout`) 

You can also provide the following optional parameters:

 * `locale` - The language code to use for localized strings (default: `en`)

Refer to the table below for information about each template

| Template        | Supports Web Layouts | Supports Application Definitions | Entry Point          |
|-----------------|----------------------|----------------------------------|----------------------|
| AJAX Viewer     | Yes                  | No^                              | index.html           |
| Sidebar         | Yes                  | No^                              | sidebar.html         |
| Aqua            | No^                  | Yes                              | aqua.html            |
| Slate           | No^                  | Yes                              | slate.html           |
| LimeGold        | No^                  | Yes                              | limegold.html        |
| Maroon          | No^                  | Yes                              | maroon.html          |
| TurquoiseYellow | No^                  | Yes                              | turquoiseyellow.html |

^ The viewer will still load, but most likely will not have any toolbars initialized