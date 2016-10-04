export type IExtension = any;

export interface IApplicationDefinition {
    Title: string | null | undefined;
    TemplateUrl: string | null | undefined;
    MapSet: IMapSet | null | undefined;
    WidgetSet: IWidgetSet[];
    Extension: IExtension | null | undefined;
}

export interface IMapSet {
    MapGroup: IMapGroup[];
}

export interface IMapGroup {
    "@id": string;
    InitialView: IMapInitialView | undefined;
    Map: IMapConfiguration[];
}

export interface IMapInitialView {
    CenterX: number;
    CenterY: number;
    Scale: number;
}

export interface IMapConfiguration {
    Type: string;
    SingleTile: string | null | undefined;
    Extension: IExtension | null | undefined;
}

export interface IWidgetSet {
    Container: IContainerDefinition[];
    MapWidget: IMapWidget;
    Widget: IWidget[];
}

export interface IContainerDefinition {
    "@type": string;
    Name: string;
    Type: string;
    Position: string;
    Extension: IExtension | null;
    Item: IContainerItem[];
}

export interface ISeparatorItem {
    Function: "Separator";
}

export interface IFlyoutItem {
    Function: "Flyout";
    Label: string;
    Tooltip: string | null | undefined;
    ImageUrl: string | null | undefined;
    ImageClass: string | null | undefined;
    Item: IContainerItem[];
}

export interface IWidgetItem {
    Function: "Widget";
    Widget: string;
}

export type IContainerItem = IFlyoutItem | IWidgetItem | ISeparatorItem;

export interface IMapWidget extends IWidget {
    MapId: string;
}

export interface IWidget {
    Name: string;
    Type: string;
    Location: string | null | undefined;
    Extension: IExtension | null | undefined;
}

export interface IUIWidget extends IWidget {
    ImageUrl: string;
    ImageClass: string;
    Label: string;
    Tooltip: string;
    StatusText: string | null;
    Disabled: boolean;
}