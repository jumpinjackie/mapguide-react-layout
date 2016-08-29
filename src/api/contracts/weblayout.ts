//TODO: When TypeScript 2.0 drops, some of these interfaces can be converted to discriminated unions

export interface ResourceReference {
    ResourceId: string;
}

export interface MapView {
    CenterX: number;
    CenterY: number;
    Scale: number;
}

export type TargetType = "TaskPane" | "NewWindow" | "SpecifiedFrame";

export interface WebLayoutMap extends ResourceReference {
    InitialView?: MapView;
    HyperlinkTarget: TargetType;
    HyperlinkTargetFrame?: string;
}

export interface WebLayoutControl {
    Visible: boolean;
}

export interface WebLayoutResizableControl extends WebLayoutControl {
    Width: number;
}

export type UIItemFunction = "Separator" | "Command" | "Flyout";

export interface UIItem {
    Function: UIItemFunction;
}

export interface FlyoutItem extends UIItem {
    Label: string;
    Tooltip?: string;
    Description?: string;
    ImageURL?: string;
    DisabledImageURL?: string;
    SubItem?: UIItem[];
}

export interface SeparatorItem extends UIItem {

}

export interface CommandItem extends UIItem {
    Command: string;
}

export function isCommandItem(item: UIItem): item is CommandItem {
    return item.Function === "Command";
}

export function isFlyoutItem(item: UIItem): item is FlyoutItem {
    return item.Function === "Flyout";
}

export function isSeparatorItem(item: UIItem): item is SeparatorItem {
    return item.Function === "Separator";
}

export interface WebLayoutToolbar extends WebLayoutControl {
    Button: UIItem[];
}

export interface WebLayoutContextMenu extends WebLayoutControl {
    MenuItem: UIItem[];
}

export interface TaskButton {
    Name: string;
    Tooltip: string;
    Description: string;
    ImageURL: string;
    DisabledImageURL: string;
}

export interface WebLayoutTaskBar extends WebLayoutControl { 
    Home: TaskButton;
    Forward: TaskButton;
    Back: TaskButton;
    Tasks: TaskButton;
    MenuButton: UIItem[];
}

export interface WebLayoutTaskPane extends WebLayoutResizableControl {
    InitialTask: string;
    TaskBar: WebLayoutTaskBar;
}

export interface WebLayoutStatusBar extends WebLayoutControl {

}

export interface WebLayoutZoomControl extends WebLayoutControl {

}

export interface WebLayoutInfoPane extends WebLayoutResizableControl {
    LegendVisible: boolean;
    PropertiesVisible: boolean;
}

export type TargetViewerType = "Dwf" | "Ajax" | "All";

export interface CommandDef {
    Name: string;
    Label: string;
    Tooltip?: string;
    Description?: string;
    ImageURL?: string;
    DisabledImageURL?: string;
    TargetViewer: TargetViewerType;
}

export type BasicCommandActionType =
    "Pan" |
    "PanUp" |
    "PanDown" |
    "PanRight" |
    "PanLeft" |
    "Zoom" |
    "ZoomIn" |
    "ZoomOut" |
    "ZoomRectangle" |
    "ZoomToSelection" |
    "FitToWindow" |
    "PreviousView" |
    "NextView" |
    "RestoreView" |
    "Select" |
    "SelectRadius" |
    "SelectPolygon" |
    "ClearSelection" |
    "Refresh" |
    "CopyMap" |
    "About" |
    "MapTip";

export interface BasicCommandDef extends CommandDef {
    Action: BasicCommandActionType;
}

export function isBasicCommand(cmd: any): cmd is BasicCommandDef {
    return typeof(cmd.Action) != 'undefined';
}

export interface CustomCommandDef extends CommandDef {

}

export interface TargetedCommandDef extends CustomCommandDef {
    Target: TargetType;
    TargetFrame?: string;
}

export interface ParameterPair {
    Key: string;
    Value: string;
}

export interface LayerSet {
    Layer?: string[];
}

export function isInvokeURLCommand(cmd: any): cmd is InvokeURLCommandDef {
    return typeof(cmd.URL) != 'undefined' && typeof(cmd.DisableIfSelectionEmpty) != 'undefined';
}

export interface InvokeURLCommandDef extends TargetedCommandDef {
    URL: string;
    LayerSet?: LayerSet;
    AdditionalParameter?: ParameterPair[];
    DisableIfSelectionEmpty: boolean;
}

export interface InvokeScriptCommandDef extends TargetedCommandDef {
    Script: string;
}

export interface ResultColumn {
    Name: string;
    Property: string;
}

export interface ResultColumnSet {
    Column?: ResultColumn[];
}

export interface SearchCommandDef extends TargetedCommandDef {
    Layer: string;
    Prompt: string;
    ResultColumns: ResultColumnSet;
    Filter?: string;
    MatchLimit: number;
}

export interface BufferCommandDef extends TargetedCommandDef { }

export interface SelectWithinCommandDef extends TargetedCommandDef { }

export interface PrintCommandDef extends TargetedCommandDef { 
    PrintLayout?: ResourceReference[];
}

export interface GetPrintablePageCommandDef extends TargetedCommandDef { }

export interface MeasureCommandDef extends TargetedCommandDef { }

export interface ViewOptionsCommandDef extends TargetedCommandDef { }

export interface HelpCommandDef extends TargetedCommandDef {
    URL: string;
}

export interface WebLayoutCommandSet {
    Command: CommandDef[];
}

export interface WebLayout {
    Title: string;
    Map: WebLayoutMap;
    EnablePingServer?: boolean;
    SelectionColor?: boolean;
    PointSelectionBuffer?: number;
    MapImageFormat?: string;
    SelectionImageFormat?: string;
    StartupScript?: string;
    ToolBar: WebLayoutToolbar;
    InformationPane: WebLayoutInfoPane;
    ContextMenu: WebLayoutContextMenu;
    TaskPane: WebLayoutTaskPane;
    StatusBar: WebLayoutStatusBar;
    ZoomControl: WebLayoutZoomControl;
    CommandSet: WebLayoutCommandSet;
}