Components in mapguide-react-layout
===================================

Components are the building blocks of features unique to mapguide-react-layout. They are analogous to widgets in the Fusion viewer.

Component Registry
------------------

The component registry defines the master list of components that are available to access from the viewer. If you use the standard production viewer bundle, this list is fixed.

If you use the npm module, you can incorporate new custom components into the component registry.

Accessing Components
--------------------

Components can be accessed through existing `InvokeURL` commands. Instead of using URLs, you would provide a custom `component://` URI instead.

Component URIs are structured as follows:

`component://[component name][?query]`

For components that accept parameters, you would pass them through the query string of the Component URI.

Component URIs in an `InvokeURL` command behave just like normal URLs invoked by an `InvokeURL` command except you cannot invoke a component URI into a specific frame, only in a Task Pane or a New Window (which mapguide-react-layout will re-interpret as opening in a modal dialog)

Available Components
--------------------

The following components are available in mapguide-react-layout

| Component          | Description                                                                                                                                                                                                                                                                                              | URI                                                                   |
|--------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------|
| Coordinate Tracker | Fusion's CoordinateTracker widget ported to mapguide-react-layout.  NOTE: Any existing CoordinateTracker widget reference in a Fusion Application  Definition is already supported. Setting up a new InvokeURL widget with this  component URI is not necessary. This is listed here for reference only. | `component://CoordinateTracker[?projection=proj1[&projection=proj2]]` |
| Share Link to View | A component that presents a shareable URL to the current map view                                                                                                                                                                                                                                        | `component://ShareLinkToView`                                         |
| Add/Manage Layers  | A component that allows one to add custom external layers to the current map                                                                                                                                                                                                                             | `component://AddManageLayers`                                         |