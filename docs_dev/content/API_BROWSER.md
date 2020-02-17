# Browser API

The default viewer bundle exposes the following browser global APIs:

 * `MapGuide`
   * `Application` [(reference)](apidoc_npm/classes/_entries_application_.applicationviewmodel.html ':ignore')
   * `Registry` [(reference)](apidoc_npm/classes/_entries_library_.registry.html ':ignore')
   * `Externals`
     * `proj4` (exported [public API](http://proj4js.org/) of proj4js)
     * `React` (exported [public API](https://facebook.github.io/react/docs/react-api.html) of React)
     * `ReactDOM` (exported [public API](https://facebook.github.io/react/docs/react-dom.html) of ReactDOM)

NOTE: In a browser globals context, you're basically writing plain JavaScript, as a result any documentation references to TypeScript-specific features no longer apply:

 * Interfaces
 * Typedefs

For Task Pane content, mapguide-react-layout will also provide an [API compatibility layer](APICOMPAT.md) which allows any AJAX/Fusion viewer application to be migrated across with little to no modifications required.

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

Any Web Layout or Application Definition loaded that contains a InvokeScript command/widget with the same name of `ViewAsKml` will run this registered command when invoked.

## Querying current application state

Starting with the 0.10 release, the `MapGuide.Application` class exposes the redux `getState()` function for retrieving the current redux application state. The redux application state contains information that was previously not accessible in previous versions of the browser global API:

 * Current map layer/group structure
 * Current viewer configuration
 * Template-specific state
 * Task Pane navigation state
 * Much more

The following example shows how to check if the `Parcels` layer of the active map is currently visible or not

```
var viewer = new MapGuide.Application();
...
var state = viewer.getState();
//Get active map name
var activeMapName = state.config.activeMapName;
//Get active runtime map
var mapState = state.mapState[activeMapName];
var currentMap = mapState.runtimeMap;
//Get parcels layer
var parcels = currentMap.Layer.filter(function(layer) { return layer.Name == "Parcels"; })[0];
if (parcels) {
    var bVisible = (mapState.hideLayers.indexOf(parcels.ObjectId) < 0);
}
```

NOTE: `getState()` returns a *copy* of the current application state and not a reference to it. Whatever variable you assign the result of `getState()` does not transparently change as a result of dispatched redux actions that modify the application state through one or more application reducer functions.

## Dispatching redux actions

> NOTE: This API is experimental and may be subject to change.

Starting with the 0.10 release, the `MapGuide.Application` class exposes the redux `dispatch()` function for dispatching redux actions.

All available redux action creators are available under the `MapGuide.Actions` namespace.

Below is an example of setting the view rotation by dispatching the action returned by the [setViewRotation](apidoc_npm/modules/_actions_map_.html#setviewrotation) action creator.

```
var viewer = new MapGuide.Application();

...

var action = MapGuide.Actions.Map.setViewRotation(45);
viewer.dispatch(action);

```

> NOTE: This API is experimental as dispatching redux actions *outside* of the react component context from plain HTML/JS is a limited supported scenario. Dispatching actions may not work if any component is currently in the state of (re-)rendering. Do not try to dispatch multiple redux actions in succession, or dispatch actions outside the context of an event handler (eg. `onclick`)

## Invoking registered commands

Starting with the 0.10 release, the `MapGuide.Application` class exposes the ability access registered commands through a `getCommand()` function.

Combined with the ability to query the current application state via `getState()` you now have the means to programmatically execute commands and be able to determine if the command is able to execute under current circumstances.

To invoke a command, use the `MapGuide.Actions.Map.invokeCommand` action creator.

The following example programmatically executes the buffer command.

```
var viewer = new MapGuide.Application();
...
var bufferCmd = viewer.getCommand("Buffer");
var state = viewer.getState();
// Check if the buffer command can be executed
if (bufferCmd.enabled(state)) {
    var action = MapGuide.Actions.Map.invokeCommand(bufferCmd);
    viewer.dispatch(action);
} else {
    //Can't execute buffer command at the moment (ie. No selection made on map)
}
```