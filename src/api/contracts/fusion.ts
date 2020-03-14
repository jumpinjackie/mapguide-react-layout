import { ResourceBase } from "./common";

export type IExtension = any;

export interface ApplicationDefinition extends ResourceBase {
    Title?: string;
    TemplateUrl?: string;
    MapSet?: MapSet;
    WidgetSet: WidgetSet[];
    Extension?: IExtension;
}

export interface MapSet {
    MapGroup: MapSetGroup[];
}

export interface MapSetGroup {
    "@id": string;
    InitialView?: MapInitialView;
    Map: MapConfiguration[];
}

export interface MapInitialView {
    CenterX: number;
    CenterY: number;
    Scale: number;
}

export interface MapConfiguration {
    Type: string;
    SingleTile?: boolean;
    Extension?: IExtension;
}

export interface WidgetSet {
    Container: ContainerDefinition[];
    MapWidget?: MapWidget;
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