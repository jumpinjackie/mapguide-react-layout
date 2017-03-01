/**
 * externs.d.ts
 *
 * This file contains type definitions for external libraries where:
 *
 *  a. No such typings exist
 *  b. The typings are for a version of a library that is out of date
 *  c. The typings are poor quality or unusable
 */

// Stamped by webpack
declare const __DEV__: boolean;

declare module "ismobilejs" {
    var isMobile: any;
    export = isMobile;
}

declare module "proj4";

declare module "react-draggable" {
    import * as React from "react";

    type DraggableEventHandler = (e: Event, data: DraggableData) => void | boolean;
    type DraggableData = {
        node: HTMLElement,
        // lastX + deltaX === x
        x: number, y: number,
        deltaX: number, deltaY: number,
        lastX: number, lastY: number
    };

    interface IDraggableCoreProps {
        allowAnyClick?: boolean,
        cancel?: string,
        disabled?: boolean,
        enableUserSelectHack?: boolean,
        offsetParent?: HTMLElement,
        grid?: [number, number],
        handle?: string,
        onStart?: DraggableEventHandler,
        onDrag?: DraggableEventHandler,
        onStop?: DraggableEventHandler,
        onMouseDown?: (e: MouseEvent) => void
    }

    module Draggable {
        export class DraggableCore extends React.Component<IDraggableCoreProps, any> { }
    }
    interface IDraggableProps {
        // If set to `true`, will allow dragging on non left-button clicks.
        allowAnyClick?: boolean,

        // Determines which axis the draggable can move. This only affects
        // flushing to the DOM. Callbacks will still include all values.
        // Accepted values:
        // - `both` allows movement horizontally and vertically (default).
        // - `x` limits movement to horizontal axis.
        // - `y` limits movement to vertical axis.
        // - 'none' stops all movement.
        axis?: "both" | "x" | "y",

        // Specifies movement boundaries. Accepted values:
        // - `parent` restricts movement within the node's offsetParent
        //    (nearest node with position relative or absolute), or
        // - An object with `left, top, right, and bottom` properties.
        //   These indicate how far in each direction the draggable
        //   can be moved.
        bounds?: { left: number, top: number, right: number, bottom: number } | string,

        // Specifies a selector to be used to prevent drag initialization.
        // Example: '.body'
        cancel?: string,

        // Class names for draggable UI.
        // Default to 'react-draggable', 'react-draggable-dragging', and 'react-draggable-dragged'
        defaultClassName?: string,
        defaultClassNameDragging?: string,
        defaultClassNameDragged?: string,

        // Specifies the `x` and `y` that the dragged item should start at.
        // This is generally not necessary to use (you can use absolute or relative
        // positioning of the child directly), but can be helpful for uniformity in
        // your callbacks and with css transforms.
        defaultPosition?: { x: number, y: number },

        // If true, will not call any drag handlers.
        disabled?: boolean,

        // Specifies the x and y that dragging should snap to.
        grid?: [number, number],

        // Specifies a selector to be used as the handle that initiates drag.
        // Example: '.handle'
        handle?: string,

        // If desired, you can provide your own offsetParent for drag calculations.
        // By default, we use the Draggable's offsetParent. This can be useful for elements
        // with odd display types or floats.
        offsetParent?: HTMLElement,

        // Called whenever the user mouses down. Called regardless of handle or
        // disabled status.
        onMouseDown?: (e: MouseEvent) => void,

        // Called when dragging starts. If `false` is returned any handler,
        // the action will cancel.
        onStart?: DraggableEventHandler,

        // Called while dragging.
        onDrag?: DraggableEventHandler,

        // Called when dragging stops.
        onStop?: DraggableEventHandler,

        // Much like React form elements, if this property is present, the item
        // becomes 'controlled' and is not responsive to user input. Use `position`
        // if you need to have direct control of the element.
        position?: { x: number, y: number }
    }

    class Draggable extends React.Component<IDraggableProps, any> { }

    export = Draggable;
}

declare module "testdouble" {
    interface TestDoubleFunctionSetup {
        thenReturn(result: any): void;
    }
    interface TestDoubleAPI {
        function<TFunc>(name?: string): TFunc;
        function(name?: string): Function;
        verify(funcCallResult: any): void;
        when(funcCallResult: any): TestDoubleFunctionSetup;
    }
    var td: TestDoubleAPI;
    export = td;
}

// Monkey patching Array.filter to support type narrowing
// https://github.com/Microsoft/TypeScript/issues/7657
interface Array<T> {
    filter<U extends T>(pred: (a: T) => a is U): U[];
}

// Event boilerplate
type GenericEvent = any;

type GenericEventHandler = (e: GenericEvent) => void;

// Types for various development options.

// A hack for the Redux DevTools Chrome extension.
interface Window {
    devToolsExtension?: () => void;
}

// webpack-hot-loader sets some extra attributes on node's `module`if that
// module has been hot-loaded in the browser.
interface NodeModule {
    hot: { accept: Function };
}
