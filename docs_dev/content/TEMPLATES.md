# Launching a viewer with a template

NOTE: The terms `Flexible Layout` and `Application Definition` are interchangable. Where one is mentioned, it also means the other and vice versa.

Assuming you installed the viewer as `viewer` under your MapGuide wwwroot. You can launch the viewer as follows:

`http://servername/mapguide/viewer/$ENTRY_POINT?resource=$RESOURCEID`

Where:

 * `$ENTRY_POINT` is the name of the entry point HTML file below
 * `$RESOURCEID` is the resource id of the Web Layout or Flexible Layout (eg. `Library://Samples/Sheboygan/Layouts/Sheboygan.WebLayout`)

You can also provide the following optional parameters:

 * `locale` - The language code to use for localized strings (default: `en`)

# Available Templates

The following templates are included with this viewer.

## AJAX Viewer

![](https://github.com/jumpinjackie/mapguide-react-layout/raw/master/docs_dev/content/ajax-viewer.png)

 * Entry Point: `index.html`
 * Supports Flexible Layouts: `yes`~
 * Supports Web Layouts: `yes`

## Sidebar

![](https://github.com/jumpinjackie/mapguide-react-layout/raw/master/docs_dev/content/sidebar.png)

 * Entry Point: `sidebar.html`
 * Supports Flexible Layouts: `yes`~
 * Supports Web Layouts: `yes`

## Slate

![](https://github.com/jumpinjackie/mapguide-react-layout/raw/master/docs_dev/content/slate.png)

 * Entry Point: `slate.html`
 * Supports Flexible Layouts: `yes`
 * Supports Web Layouts: `no`^

## Maroon

![](https://github.com/jumpinjackie/mapguide-react-layout/raw/master/docs_dev/content/maroon.png)

 * Entry Point: `maroon.html`
 * Supports Flexible Layouts: `yes`
 * Supports Web Layouts: `no`^

## Aqua

![](https://github.com/jumpinjackie/mapguide-react-layout/raw/master/docs_dev/content/aqua.png)

 * Entry Point: `aqua.html`
 * Supports Flexible Layouts: `yes`
 * Supports Web Layouts: `no`^

## LimeGold

![](https://github.com/jumpinjackie/mapguide-react-layout/raw/master/docs_dev/content/limegold.png)

 * Entry Point: `limegold.html`
 * Supports Flexible Layouts: `yes`
 * Supports Web Layouts: `no`^

## TurquoiseYellow

![](https://github.com/jumpinjackie/mapguide-react-layout/raw/master/docs_dev/content/turquoise-yellow.png)

 * Entry Point: `turquoiseyellow.html`
 * Supports Flexible Layouts: `yes`
 * Supports Web Layouts: `no`^

^ The viewer will still load, but most likely will not have any toolbars initialized

~ For the templates to work against Flexible Layouts, you must author your Fusion Flexible Layouts using the following named containers
 * `Toolbar` - For the primary toolbar
 * `TaskMenu`- For the Task Pane menu
 * `MapContextMenu` - For the main context menu