Developer Guide
===============

Using/Embedding the viewer
--------------------------

The existing HTML pages already contains the viewer bootstrapping logic. You can pass a Web Layout
or Application Definition as a query string to initialize your viewer application.

`http://servername/mapguide/react/index.html?resource=Library://Path/To/Your.WebLayout`

- OR

`http://servername/mapguide/react/index.html?resource=Library://Path/To/Your.ApplicationDefinition`

If the provided HTML pages are not suitable (you have custom requirements for embedding), then the
following HTML example illustrates how to embed the viewer

```
<!DOCTYPE html>
<html>
    <head>
        <title>Viewer example</title>
    </head>
    <body>
        <!-- The viewer will mount at this element -->
        <div id="map"></div>
        <!-- Reference the main viewer bundle -->
        <script type="text/javascript" src="dist/viewer.js"></script>
        <script type="text/javascript">
            // Get the HTML element for the mount point
            var el = document.getElementById("map");
            // Create the application
            var viewer = new MapGuide.Application();
            // Mount the application at the given element
            viewer.mount(el, {
                layout: "ajax-viewer",               //The layout to use
                agent: {
                    uri: "../mapagent/mapagent.fcgi" //The mapagent url
                },
                resourceId: "Library://Path/To/Your.WebLayout"
            });
        </script>
    </body>
</html>
```

Extension Points
----------------

The viewer provides several extension points for customizing viewer functionality and behavior:

 * Custom commands
 * Custom components
 * Custom layouts

The viewer provides a registry API to allow you to register these custom extension points. Just like the
existing AJAX/Fusion viewers. To activate these extension points, they must be referenced by the Web Layout
or Application Definition you pass to the viewer.

Adding a custom command
-----------------------

The viewer supports two types of commands:

 * Invoke URL commands
 * Integrated commands

Invoke URL commands is the traditional extension point for custom functionality that works across
all MapGuide viewers.

Invoke URL commands point to a server-side script (that contains map/selection interaction logic
that works against the MapGuide Web API), the Invoke URL script may present a UI for viewer interaction.

Most of your existing AJAX viewer Invoke URL commands should be able to work in this viewer
without any modifications.

Integrated commands are the successor to Invoke Script commands. These commands written in JavaScript and have full access to:

 * The viewer API
 * The centralized redux store
 * The redux action dispatcher (to flow state to the redux store)

The redux store is also available when evaluating whether the command should be enabled or disabled.

Adding a custom component
-------------------------

Adding a custom layout
----------------------