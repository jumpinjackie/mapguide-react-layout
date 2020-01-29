# Viewer Layer Structure

The `mapguide-react-layout` viewer employs the following layer structure (from top to bottom in draw order)

> TODO: A better visual diagram here would help

 * External Layer Set
    * 0 or more external layers
 * Core Map Layer Set
    * MapGuide 
        * Active Selected Feature (if sub-selection is requested from Selection Panel)
        * Selection Overlay (if features have been selected)
        * Primary Map Overlay (Legend component toggles the layer/group visibility of this overlay)
        * 0 or more tiled layer groups (if defined in Map Definition)
    * External Base Layer
        * 1 of any of the following:
            * None
            * Your custom XYZ tileset
            * OpenStreetMap
            * Stamen
            * Bing Maps

## External Layer Set

This section represents layers that are managed by the External Layer Manager component. Layers within
this section have mutable draw order and can be re-ordered by the External Layer Manager UI or through
the layer manager API provided by the viewer.

Layers in this section will always display on top of layers in the `Core Map Layer Set`. There is no means for layers in the `Core Map Layer Set` to display on top of this section.

## Core Map Layer Set

This group represents the main focus your viewer application. Layers within this section have fixed draw order and cannot be re-ordered by any UI or viewer APIs.