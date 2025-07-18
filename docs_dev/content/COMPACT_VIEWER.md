# The Compact Viewer

Starting with the `0.15` release, `mapguide-react-layout` offers a new optional `CompactViewer` component which is a no-frills, lightweight map viewer component that wraps the underlying `OpenLayers` library and nothing more.

It does not use redux, it is not driven by Application Definition documents to define viewer maps and features/capabilities, the viewer does not need to be pre-registered with all the commands and components it needs to work with.

The use case for the `CompactViewer` component is when you require a simple viewer that you can embed into your React-based frontend without the "batteries included" by the main viewer offering. When you just want to show some vector features over an OpenStreetMap/XYZ backdrop and don't want to deal with Application Definitions, redux stores and what "batteries" to include before your viewer is initialized, the `CompactViewer` component is ideal for this scenario.

Unlike the main viewer offering however, the `CompactViewer` component is only consumable as a React component from the `mapguide-react-layout` npm module. Unlike the main viewer, it is not delivered as a standalone app with a HTML file + production JS bundle. It is a pre-defined component you integrate with your existing React frontend code.

# Getting Started

```ts
import { CompactViewer } from 'mapguide-react-layout'
```

Then just render a `CompactViewer` with one or more layers and viewer functionality as child components.

The following examples renders an OpenStreetMap tile layer

```tsx
import { CompactViewer, XYZLayer } from 'mapguide-react-layout'
...
<CompactViewer projection="EPSG:3857" initialBBOX={[-20037508.34, -20048966.1, 20037508.34, 20048966.1]}>
    <XYZLayer name="OpenStreetMap" urls={['https://tile.openstreetmap.org/{z}/{x}/{y}.png']} attributions={['(c) OpenStreetMap contributors']} />
</CompactViewer>
```

# The useOLMap hook

```ts
import { useOLMap } from 'mapguide-react-layout'
```

The `useOLMap` hook provides access to the raw OpenLayers `Map` class. All layer and functionality provided by the `CompactViewer` is built on top of this one hook.

# A note about conventions and draw order

The `CompactViewer` tries to be as convention-driven as possible to avoid verbose/explicit configuration.

Our main convention here is: any layers or functionality added to the `CompactViewer` is always added as a child component. As long as this convention is adhered to, the `useOLMap` hook, which is the key to all of these components will always work.

Because we expect layers and extra functionality to be mounted as child components, the child components are mounted in top-down order. Where this is important is when it comes to layer components as the order you specify these layer components effectively determines the draw order of such layers on the final map.

Consider this `CompactViewer` example (props omitted for brevity)

```tsx
<CompactViewer {...}>
    <XYZLayer {...} />
    <WMSLayer {...} />
    <VectorLayer {...} />
</CompactViewer>
```

Because children are mounted top-down, these layer components (which all create their respective OL layer type and adds them to the map) will follow the same order, which means the draw order of the final map will be:

 * The XYZ layer (at the bottom)
 * The WMS layer (on top of that)
 * The Vector layer (at the topmost)

Another thing to consider is interactions that may operate off of certain layers, for example if you have a draw interaction that draws features into a vector layer, the draw interaction component has to be specifed *after/below* the `VectorLayer` that it references like so (props again omitted for brevity).

```tsx
<CompactViewer {...}>
    <XYZLayer {...} />
    <WMSLayer {...} />
    <VectorLayer name="Scratch" {...} />
    <DrawInteraction target="Scratch" {...} >
</CompactViewer>
```

If you put the `DrawInteraction` *before/above* the `VectorLayer` it is referencing it will fail to initialize as the `VectorLayer` that it references may not exist yet.

As long as you adhere to these ordering restrictions the map will "do the correct thing".

# Building your own `CompactViewer` layers or custom functionality

All the components that provide the `CompactViewer` layer support or some functionality all follow the same component pattern:

 * They wrap some existing OL class (a layer type, control or interaction). The instance is stored in a component ref (via `useRef`)
 * They use the `useOLMap` hook to provide access to the OpenLayers `Map`
 * They use the `useEffect` hook to initialize the component when it is mounted. This will generally be to:
    * Create whatever OL objects required and assign them to component refs using the `useRef` hook.
    * Register these objects with the OL map provided by `useOLMap`
    * Return a callback that de-registers these objects and dispose of them when the component unmounts

Any component that introduces a new layer type or extra functionality should follow the same pattern.

# Examples

Refer to the storybook