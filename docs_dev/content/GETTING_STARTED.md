# Getting Started

You can use `mapguide-react-layout` in 2 ways

## Using the standard viewer bundle and its viewer template

### 1. Create an Application Definition.

If you are serving a MapGuide application with this viewer, you can create an Application Definition using [MapGuide Maestro](https://github.com/jumpinjackie/mapguide-maestro).

If you are serving a non-MapGuide application with this viewer (and have no MapGuide Server installation), you can create an Application Definition JSON document instead. You can use the `ApplicationDefinition.schema.json` JSON schema provided with the viewer to assist in editing an Application Definition JSON document

### 2. Load your viewer

In your browser, open the URL to your viewer template and include a `resource` query string parameter which points to either:

 * A MapGuide WebLayout/ApplicationDefinition resource id
 * OR: A URL to an Application Definition JSON document. This can be either an absolute URL or a URL relative to the viewer HTML file.

If `resource` parameter is not specified, the viewer will try to load using `appdef.json` as the default URL. This Application Definition defines the map of the world with a OpenStreetMap/Stamen backdrop. along with a standard suite of viewer functions.

## Using your own custom viewer bundle and/or custom templates