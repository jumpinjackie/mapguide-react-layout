# Browser API

The default viewer bundle exposes the following browser global APIs:

 * `MapGuide`
   * `Application` [(reference)](apidoc_npm/classes/_entries_application_.applicationviewmodel.html)
   * `Registry` [(reference)](apidoc_npm/classes/_entries_library_.registry.html)
   * `Externals`
     * `proj4` (exported [public API](http://proj4js.org/) of proj4js)
     * `React` (exported [public API](https://facebook.github.io/react/docs/react-api.html) of React)
     * `ReactDOM` (exported [public API](https://facebook.github.io/react/docs/react-dom.html) of ReactDOM)

NOTE: In a browser globals context, you're basically writing plain JavaScript, as a result any documentation references to TypeScript-specific features no longer apply:

 * Interfaces
 * Typedefs

For Task Pane content, mapguide-react-layout will also provide an [API compatibility layer](apicompat.html) which allows any AJAX/Fusion viewer application to be migrated across with little to no modifications required.

## Registering Script Commands

Starting with the 0.9 release, you can use registered script commands as a replacement for InvokeScript commands and widgets. For such references in a Web Layout or Application Definition, they will work in mapguide-react-layout if you have a registered script command of the same name.

To register script commands without using a custom viewer bundle using the npm module, you can use `MapGuide.Registry` for registering script commands. This should be done in your entry point code before creating a `MapGuide.Application` instance and `mount`-ing it at the target DOM element.

The following example registers a `ViewAsKml` script command that gets the KML of the current map view:

```
MapGuide.Registry.registerCommand("ViewAsKml", {
    icon: "invoke-script.png",
    enabled: function() { return true; },
    selected: function() { return false; },
    invoke: function(dispatch, getState, viewer, parameters) {
        var state = getState();
        var mapState = state.mapState;
        var activeMapName = state.config.activeMapName;
        if (activeMapName) {
            var map = mapState[activeMapName].runtimeMap;
            if (map) {
                var mapDefId = map.MapDefinition;
                var url = `../mapagent/mapagent.fcgi?USERNAME=Anonymous&OPERATION=GetMapKml&VERSION=1.0.0&MAPDEFINITION=${mapDefId}`;
                window.open(url);
            }
        }
    }
});

var el = document.getElementById("map");
var viewer = new MapGuide.Application();
viewer.mount(el, { ... });
```

Any Web Layout or Application Definition loaded that contains a InvokeScript command/widget with the same name of `ViewAsKml` will