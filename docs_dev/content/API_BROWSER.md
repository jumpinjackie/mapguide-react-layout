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