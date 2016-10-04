export type IExtension = any;

export interface ApplicationDefinition {
    Title: string | null | undefined;
    TemplateUrl: string | null | undefined;
    MapSet: MapSet | null | undefined;
    WidgetSet: WidgetSet[];
    Extension: IExtension | null | undefined;
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
    SingleTile: boolean | null | undefined;
    Extension: IExtension | null | undefined;
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
    Tooltip: string | null | undefined;
    ImageUrl: string | null | undefined;
    ImageClass: string | null | undefined;
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
    Name: string;
    Type: string;
    Location: string | null | undefined;
    Extension: IExtension | null | undefined;
}

export interface UIWidget extends Widget {
    ImageUrl: string;
    ImageClass: string;
    Label: string;
    Tooltip: string;
    StatusText: string | null;
    Disabled: boolean;
}