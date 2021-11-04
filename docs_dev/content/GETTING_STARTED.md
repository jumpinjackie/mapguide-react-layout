# Getting Started

You can use `mapguide-react-layout` in 2 ways

## Using the standard viewer bundle and its viewer template

### 1. Installation

For most users, the standard viewer bundle provides most of the functionality you are after. Installation is simply downloading the `viewer.zip` and extracting the contents to a directory that will be served out as static content by a HTTP web server.

If using this with a MapGuide Server, you should extract `viewer.zip` into a subdirectory of MapGuide's `www` root. Assuming default installation path and settings, this is generally:

 * On Windows: `C:\Program Files\OSGeo\MapGuide\Web\www`
 * On Linux: `/usr/local/mapguideopensource-x.y.z/webserverextensions/www`

Extract `viewer.zip` into either of the above directories and you should have the contents extracted to

 * On Windows: `C:\Program Files\OSGeo\MapGuide\Web\www\viewer`
 * On Linux: `/usr/local/mapguideopensource-x.y.z/webserverextensions/www/viewer`

### 2. Create an Application Definition.

If you are serving a MapGuide application with this viewer, you can create an Application Definition using [MapGuide Maestro](https://github.com/jumpinjackie/mapguide-maestro).

If you are serving a non-MapGuide application with this viewer (and have no MapGuide Server installation), you can create an Application Definition JSON document instead. You can use the `ApplicationDefinition.schema.json` JSON schema provided with the viewer to assist in editing an Application Definition JSON document

You can refer to the following [default appdef](https://github.com/jumpinjackie/mapguide-react-layout/blob/master/viewer/appdef.json) as a starting point for creating your own appdef JSON document.

#### 2.1. Optional MapGuide Maestro Setup

An Application Definition works for both `mapguide-react-layout` and the bundled `fusion`-based viewer. By default, attempting to preview an Application Definition in MapGuide Maestro will launch the `fusion` viewer to preview your Application Definition.

You can unlock the ability to preview the Application Definition with `mapguide-react-layout` by specifying the public base URL for this viewer in the MapGuide Maestro options

![](https://github.com/jumpinjackie/mapguide-react-layout/raw/master/docs_dev/content/mrl_base_url.png)

Once done, you can preview using any of the templates provided by `mapguide-react-layout`

![](https://github.com/jumpinjackie/mapguide-react-layout/raw/master/docs_dev/content/mrl_template_preview.png)

> NOTE: The `Preview` toolbar button will always use the `fusion`-based viewer to preview

### 3. Load your viewer

In your browser, open the URL to your [viewer template](TEMPLATES.md) and include a `resource` query string parameter which points to either:

 * A MapGuide WebLayout/ApplicationDefinition resource id
 * OR: A URL to an Application Definition JSON document. This can be either an absolute URL or a URL relative to the viewer HTML file.

If `resource` parameter is not specified, the viewer will try to load [the default appdef.json](https://github.com/jumpinjackie/mapguide-react-layout/blob/master/viewer/appdef.json). This Application Definition defines the map of the world with a OpenStreetMap/Stamen backdrop. along with a standard suite of viewer functions.

## Using your own custom viewer bundle and/or custom templates

Refer to the [example repo](https://github.com/jumpinjackie/mapguide-react-layout-example) for information on how to create your own custom viewer bundle