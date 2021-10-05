# Application Definition Reference

## Introduction

An Application Definition is a document that defines and drives the whole behaviour of the `mapguide-react-layout` map viewer. It defines

 * What functionality is accessible to the viewer (widgets)
 * The content of any applicable toolbars and menus (containers)
 * The maps available to be accessed by this viewer

All [viewer template](TEMPLATES.md) html files take a `resource` query string parameter that points to an Application Definition

## Application Definition Document Structure

The top-level structure of an Application Definition consists of:

 * `Title` (the title to display on the browser window/tab)
 * `MapSet`
   * `MapGroup` (an array of [MapGroup](#MapGroup) elements)
 * `WidgetSet`
   * `Container` (an array of [Container Definition](#Container) element)
   * `Widget` (an array of [Widget Definition](#Widget) elements)
 * `Extension` (optional top-level extension properties)

### MapGroup

A `MapGroup` defines a map that is accessible to the map. You must have at least one `MapGroup` defined. If you have multiple `MapGroup` elements. You can switch between the various maps via the `MapMenu` widget.

### Container

A `Container` defines the contents of any toolbar or menu that is provided by a viewer template. Each item within the container can be either:

 * A reference to a widget
 * A toolbar/menu separator
 * A flyout menu, which itself contains any of the above items

### Widget

A `Widget` defines a discrete piece of map viewer functionality. For some widgets, their mere presence in the appdef will activate said functionality in the viewer (eg. The `Navigator` widget). But for most of these widgets, they generally must be referenced by and item in one or more containers

## Other Resources

 * [ApplicationDefinition API documentation](TBD) that describes/documents the full JSON structure
 * [The default appdef.json](https://github.com/jumpinjackie/mapguide-react-layout/blob/master/viewer/appdef.json)
 * The viewer bundle includes a JSON schema (`ApplicationDefinition.schema.json`) to assist in editing appdef JSON documents