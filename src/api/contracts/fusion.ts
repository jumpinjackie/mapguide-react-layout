import { ResourceBase } from "./common";

export type IExtension = any;

/**
 * Defines a map viewer application
 */
export interface ApplicationDefinition extends ResourceBase {
    /**
     * The title of the application. Will be shown as the browser window/tab title.
     */
    Title?: string;
    /**
     * The template URL. Not used by the viewer.
     */
    TemplateUrl?: string;
    /**
     * The set of maps accessible to this viewer
     */
    MapSet?: MapSet;
    /**
     * The set of widgets/commands accessible this viewer
     */
    WidgetSet: WidgetSet[];
    /**
     * Top-level extension properties
     */
    Extension?: IExtension;
}

/**
 * Defines a set of maps accessible to the viewer
 */
export interface MapSet {
    /**
     * The list of map groups
     */
    MapGroup: MapSetGroup[];
}

/**
 * Defines a single map for a viewer
 */
export interface MapSetGroup {
    /**
     * The id of this map
     */
    "@id": string;
    /**
     * The initial view of this map
     */
    InitialView?: MapInitialView;
    /**
     * The list of map layers that comprise this map
     */
    Map: MapConfiguration[];
}

/**
 * The initial view of a map
 */
export interface MapInitialView {
    /**
     * The center X coordinate
     */
    CenterX: number;
    /**
     * The center Y coordinate
     */
    CenterY: number;
    /**
     * The view scale
     */
    Scale: number;
}

/**
 * Defines a layer of a map
 */
export interface MapConfiguration {
    /**
     * The type of the layer
     */
    Type: string;
    /**
     * Layer-specifc options
     */
    Extension?: IExtension;
}

/**
 * Defines the set of functionality available for this viewer
 */
export interface WidgetSet {
    /**
     * The set of menu/toolbar container definitions.
     */
    Container: ContainerDefinition[];
    /**
     * Map widget settings
     */
    MapWidget?: MapWidget;
    /**
     * The set of widgets/commands available for this viewer
     */
    Widget: Widget[];
}

/**
 * Defines a top-level menu or toolbar and the widgets the individual items within reference to
 */
export interface ContainerDefinition {
    /**
     * The name of this container. Based on the given viewer template, it will init its toolbars and/or menus based on the container
     * definition of the same name
     */
    Name: string;
    /**
     * The type of container
     */
    Type: "ContextMenu" | "Toolbar" | "Splitterbar";
    /**
     * Container-specific extension properties
     */
    Extension: IExtension | null;
    /**
     * The items within this container
     */
    Item: ContainerItem[];
}

/**
 * Defines a toolbar/menu item separator
 */
export interface SeparatorItem {
    Function: "Separator";
}

/**
 * Defines a flyout menu item
 */
export interface FlyoutItem {
    Function: "Flyout";
    /**
     * The label of this flyout menu
     */
    Label: string;
    /**
     * The tooltip for this item
     */
    Tooltip: string | undefined;
    /**
     * The image icon
     */
    ImageUrl: string | undefined;
    /**
     * If the image icon specified is a sprite, the CSS class name for the icon sprite reference
     */
    ImageClass: string | undefined;
    /**
     * The items within this flyout menu
     */
    Item: ContainerItem[];
}

/**
 * Defines a toolbar/menu item that references a widget
 */
export interface WidgetItem {
    Function: "Widget";
    Widget: string;
}

/**
 * All valid container item types
 */
export type ContainerItem = FlyoutItem | WidgetItem | SeparatorItem;

/**
 * Map widget settings
 */
export interface MapWidget extends Widget {
    MapId: string;
}

/**
 * Base widget definition
 */
export interface Widget {
    /**
     * The widget class
     */
    WidgetType: string | undefined;
    /**
     * The name of the widget
     */
    Name: string;
    /**
     * The type of the widget
     */
    Type: string;
    /**
     * Widget-specific properties
     */
    Extension: IExtension | undefined;
}

/**
 * A widget that is expected to be referenced by a toolbar or menu item
 */
export interface UIWidget extends Widget {
    /**
     * The icon for this widget
     */
    ImageUrl: string;
    /**
     * If the image icon specified is a sprite, the CSS class name for the icon sprite reference 
     */
    ImageClass: string;
    /**
     * The label of this flyout menu
     */
    Label: string;
    /**
     * The tooltip for this item
     */
    Tooltip: string;
    /**
     * The text to show in the status bar (if applicable)
     */
    StatusText: string | null;
    /**
     * Indicates if this widget is disabled
     */
    Disabled: boolean;
}