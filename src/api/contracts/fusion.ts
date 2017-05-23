export type IExtension = any;

export interface ApplicationDefinition {
    Title: string | undefined;
    TemplateUrl: string | undefined;
    MapSet: MapSet | undefined;
    WidgetSet: WidgetSet[];
    Extension: IExtension | undefined;
}

export interface MapSet {
    MapGroup: MapGroup[];
}

export interface MapGroup {
    "@id": string;
    InitialView: MapInitialView | undefined;
    Map: MapConfiguration[];
}

export interface MapInitialView {
    CenterX: number;
    CenterY: number;
    Scale: number;
}

export interface MapConfiguration {
    Type: string;
    SingleTile: boolean | undefined;
    Extension: IExtension | undefined;
}

export interface WidgetSet {
    Container: ContainerDefinition[];
    MapWidget: MapWidget;
    Widget: Widget[];
}

export interface ContainerDefinition {
    Name: string;
    Type: string;
    Position: string;
    Extension: IExtension | null;
    Item: ContainerItem[];
}

export interface SeparatorItem {
    Function: "Separator";
}

export interface FlyoutItem {
    Function: "Flyout";
    Label: string;
    Tooltip: string | undefined;
    ImageUrl: string | undefined;
    ImageClass: string | undefined;
    Item: ContainerItem[];
}

export interface WidgetItem {
    Function: "Widget";
    Widget: string;
}

export type ContainerItem = FlyoutItem | WidgetItem | SeparatorItem;

export interface MapWidget extends Widget {
    MapId: string;
}

export interface Widget {
    WidgetType: string | undefined;
    Name: string;
    Type: string;
    Location: string | undefined;
    Extension: IExtension | undefined;
}

export interface UIWidget extends Widget {
    ImageUrl: string;
    ImageClass: string;
    Label: string;
    Tooltip: string;
    StatusText: string | null;
    Disabled: boolean;
}