/**
 * deArrayify.ts
 *
 * This module provides JSON sanitization of JSON responses from the mapagent
 *
 * Being a transformation of the XML form, and taking a lowest-common-denominator
 * approach to JSON conversion, the JSON responses from MapGuide are un-wieldy to
 * use from the client-side due to:
 *
 *  a) All properties being arrays
 *  b) All property values being strings
 *
 * These functions help "clean" those responses to be of the form we expect (and prefer)
 */
import * as RtMap from "../contracts/runtime-map";
import * as Query from "../contracts/query";
import * as WebLayout from "../contracts/weblayout";
import * as Fusion from "../contracts/fusion";
import * as Constants from "../../constants";
import { MgError } from "../error";
import { ActiveSelectedFeature } from "../common";

type ElementType = "string" | "boolean" | "int" | "float";

function tryGetAsProperty(el: any, name: string, type: ElementType = "string"): any {
    if (!el[name]) {
        return null;
    } else if (el[name].length === 1) {
        const val: string = el[name][0];
        switch (type) {
            case "int":
                return parseInt(val, 10);
            case "float":
                return parseFloat(val);
            case "boolean":
                return val.toLowerCase() === "true";
            default:
                return val;
        }
    }
}

function deArrayifyRules(rules: any[]): RtMap.RuleInfo[] {
    return rules.map(r => {
        const rule: RtMap.RuleInfo = {
            LegendLabel: tryGetAsProperty(r, "LegendLabel"),
            Filter: tryGetAsProperty(r, "Filter"),
            Icon: tryGetAsProperty(r, "Icon")
        };
        return rule;
    });
}

function deArrayifyFeatureStyles(fts: any[]): RtMap.FeatureStyleInfo[] {
    if (!fts) {
        return [];
    }
    return fts.map(ft => {
        const featureStyle: RtMap.FeatureStyleInfo = {
            Type: tryGetAsProperty(ft, "Type", "int"),
            Rule: deArrayifyRules(ft.Rule)
        };
        return featureStyle;
    });
}

function deArrayifyScaleRanges(scales: any[]): RtMap.ScaleRangeInfo[] {
    if (!scales) { //Happens with raster layers (this is probably a bug in CREATERUNTIMEMAP)
        const defaultRange: RtMap.ScaleRangeInfo = {
            MinScale: 0,
            MaxScale: Constants.MDF_INFINITY,
            FeatureStyle: []
        };
        return [defaultRange];
    }
    return scales.map(sc => {
        const scale: RtMap.ScaleRangeInfo = {
            MinScale: tryGetAsProperty(sc, "MinScale", "float"),
            MaxScale: tryGetAsProperty(sc, "MaxScale", "float"),
            FeatureStyle: deArrayifyFeatureStyles(sc.FeatureStyle)
        };
        return scale;
    });
}

function deArrayifyFeatureSourceInfo(fs: any[]): RtMap.FeatureSourceInfo | undefined {
    if (!fs || fs.length !== 1) {
        return undefined;
    }
    return {
        ResourceId: tryGetAsProperty(fs[0], "ResourceId"),
        ClassName: tryGetAsProperty(fs[0], "ClassName"),
        Geometry: tryGetAsProperty(fs[0], "Geometry")
    };
}

function deArrayifyLayers(layers: any[]): RtMap.MapLayer[] {
    if (!layers)
        return layers;

    return layers.map(lyr => {
        const layer: RtMap.MapLayer = {
            Type: tryGetAsProperty(lyr, "Type", "int"),
            Selectable: tryGetAsProperty(lyr, "Selectable", "boolean"),
            LayerDefinition: tryGetAsProperty(lyr, "LayerDefinition"),
            Name: tryGetAsProperty(lyr, "Name"),
            LegendLabel: tryGetAsProperty(lyr, "LegendLabel"),
            ObjectId: tryGetAsProperty(lyr, "ObjectId"),
            ParentId: tryGetAsProperty(lyr, "ParentId"),
            DisplayInLegend: tryGetAsProperty(lyr, "DisplayInLegend", "boolean"),
            ExpandInLegend: tryGetAsProperty(lyr, "ExpandInLegend", "boolean"),
            Visible: tryGetAsProperty(lyr, "Visible", "boolean"),
            ActuallyVisible: tryGetAsProperty(lyr, "ActuallyVisible", "boolean"),
            FeatureSource: deArrayifyFeatureSourceInfo(lyr.FeatureSource),
            ScaleRange: deArrayifyScaleRanges(lyr.ScaleRange)
        };
        //This is either a raster or drawing layer, in this case disregard the
        //selectability flag (and set it to false). This is to prevent false positive
        //errors trying to do tooltip/selections against raster/drawing layers
        if (!lyr.ScaleRange) {
            layer.Selectable = false;
        }
        return layer;
    });
}

function deArrayifyGroups(groups: any[]): RtMap.MapGroup[] | undefined {
    if (!groups)
        return undefined;

    return groups.map(grp => {
        const group: RtMap.MapGroup = {
            Type: tryGetAsProperty(grp, "Type", "int"),
            Name: tryGetAsProperty(grp, "Name"),
            LegendLabel: tryGetAsProperty(grp, "LegendLabel"),
            ObjectId: tryGetAsProperty(grp, "ObjectId"),
            ParentId: tryGetAsProperty(grp, "ParentId"),
            DisplayInLegend: tryGetAsProperty(grp, "DisplayInLegend", "boolean"),
            ExpandInLegend: tryGetAsProperty(grp, "ExpandInLegend", "boolean"),
            Visible: tryGetAsProperty(grp, "Visible", "boolean"),
            ActuallyVisible: tryGetAsProperty(grp, "ActuallyVisible", "boolean")
        };
        return group;
    });
}

function deArrayifyCoordinateSystem(cs: any[]): RtMap.CoordinateSystemType {
    if (!cs || cs.length !== 1) {
        throw new MgError("Malformed input. Expected CoordinateSystem element");
    }
    const res: RtMap.CoordinateSystemType = {
        Wkt: tryGetAsProperty(cs[0], "Wkt"),
        MentorCode: tryGetAsProperty(cs[0], "MentorCode"),
        EpsgCode: tryGetAsProperty(cs[0], "EpsgCode"),
        MetersPerUnit: tryGetAsProperty(cs[0], "MetersPerUnit", "float")
    };
    return res;
}

function deArrayifyCoordinate(coord: any[]): RtMap.EnvCoordinate {
    if (!coord || coord.length !== 1) {
        throw new MgError("Malformed input. Expected coordinate array");
    }
    return {
        X: tryGetAsProperty(coord[0], "X", "float"),
        Y: tryGetAsProperty(coord[0], "Y", "float")
    };
}

function deArrayifyExtents(extents: any[]): RtMap.Envelope {
    if (!extents || extents.length !== 1) {
        throw new MgError("Malformed input. Expected extent element");
    }
    const env: RtMap.Envelope = {
        LowerLeftCoordinate: deArrayifyCoordinate(extents[0].LowerLeftCoordinate),
        UpperRightCoordinate: deArrayifyCoordinate(extents[0].UpperRightCoordinate)
    };
    return env;
}

function deArrayifyFiniteDisplayScales(fds: any[]): number[] | undefined {
    if (!fds)
        return undefined;

    return fds.map(parseFloat);
}

function deArrayifyRuntimeMap(json: any): RtMap.RuntimeMap {
    const root = json;
    const rtMap: RtMap.RuntimeMap = {
        SessionId: tryGetAsProperty(root, "SessionId"),
        SiteVersion: tryGetAsProperty(root, "SiteVersion"),
        Name: tryGetAsProperty(root, "Name"),
        MapDefinition: tryGetAsProperty(root, "MapDefinition"),
        TileSetDefinition: tryGetAsProperty(root, "TileSetDefinition"),
        TileWidth: tryGetAsProperty(root, "TileWidth", "int"),
        TileHeight: tryGetAsProperty(root, "TileHeight", "int"),
        BackgroundColor: tryGetAsProperty(root, "BackgroundColor"),
        DisplayDpi: tryGetAsProperty(root, "DisplayDpi", "int"),
        IconMimeType: tryGetAsProperty(root, "IconMimeType"),
        CoordinateSystem: deArrayifyCoordinateSystem(root.CoordinateSystem),
        Extents: deArrayifyExtents(root.Extents),
        Group: deArrayifyGroups(root.Group),
        Layer: deArrayifyLayers(root.Layer),
        FiniteDisplayScale: deArrayifyFiniteDisplayScales(root.FiniteDisplayScale)
    };
    return rtMap;
}

function deArrayifyFeatureSetClass(json: any): Query.FeatureSetClass {
    const root = json;
    if (root.length != 1) {
        throw new MgError("Malformed input. Expected Class element");
    }
    const cls = {
        "@id": tryGetAsProperty(root[0], "@id"),
        ID: root[0].ID
    };
    return cls;
}

function deArrayifyFeatureSetLayers(json: any[]): Query.FeatureSetLayer[] {
    return (json || []).map(root => {
        const layer = {
            "@id": tryGetAsProperty(root, "@id"),
            "@name": tryGetAsProperty(root, "@name"),
            Class: deArrayifyFeatureSetClass(root.Class)
        };
        return layer;
    });
}

function deArrayifyFeatureSet(json: any): Query.FeatureSet | undefined {
    const root = json;
    if (root == null || root.length != 1) {
        return undefined;
    }
    const fs = {
        Layer: deArrayifyFeatureSetLayers(root[0].Layer)
    };
    return fs;
}

function deArrayifyInlineSelectionImage(json: any): Query.SelectionImage | undefined {
    const root = json;
    if (root == null || root.length != 1) {
        return undefined;
    }
    const img = {
        MimeType: tryGetAsProperty(root[0], "MimeType"),
        Content: tryGetAsProperty(root[0], "Content")
    };
    return img;
}

function deArrayifyFeatureProperties(json: any[]): Query.FeatureProperty[] {
    return (json || []).map(root => {
        const prop = {
            Name: tryGetAsProperty(root, "Name"),
            Value: tryGetAsProperty(root, "Value")
        };
        return prop;
    });
}

function deArrayifyFeatures(json: any[]): Query.SelectedFeature[] {
    return (json || []).map(root => {
        const feat = {
            Bounds: tryGetAsProperty(root, "Bounds"),
            Property: deArrayifyFeatureProperties(root.Property)
        };
        return feat;
    });
}

function deArrayifyLayerMetadataProperties(json: any[]): Query.LayerPropertyMetadata[] {
    return (json || []).map(root => {
        const prop = {
            DisplayName: tryGetAsProperty(root, "DisplayName"),
            Name: tryGetAsProperty(root, "Name"),
            Type: tryGetAsProperty(root, "Type", "int")
        };
        return prop;
    });
}

function deArrayifyLayerMetadata(json: any): Query.LayerMetadata | undefined {
    const root = json;
    //NOTE: root could be null if the layer selected has no properties beyond id/geom
    if (root == null || root.length != 1) {
        return undefined;
    }
    const meta = {
        Property: deArrayifyLayerMetadataProperties(root[0].Property)
    };
    return meta;
}

function deArrayifySelectedLayer(json: any[]): Query.SelectedLayer[] {
    return (json || []).map(root => {
        const layer = {
            "@id": tryGetAsProperty(root, "@id"),
            "@name": tryGetAsProperty(root, "@name"),
            Feature: deArrayifyFeatures(root.Feature),
            LayerMetadata: deArrayifyLayerMetadata(root.LayerMetadata)
        };
        return layer;
    });
}

function deArrayifySelectedFeatures(json: any): Query.SelectedFeatureSet | undefined {
    const root = json;
    if (root == null || root.length != 1) {
        return undefined;
    }
    const sf = {
        SelectedLayer: deArrayifySelectedLayer(root[0].SelectedLayer)
    };
    return sf;
}

function deArrayifyFeatureInformation(json: any): Query.QueryMapFeaturesResponse {
    const root = json;
    const resp = {
        FeatureSet: deArrayifyFeatureSet(root.FeatureSet),
        Hyperlink: tryGetAsProperty(root, "Hyperlink"),
        InlineSelectionImage: deArrayifyInlineSelectionImage(root.InlineSelectionImage),
        SelectedFeatures: deArrayifySelectedFeatures(root.SelectedFeatures),
        Tooltip: tryGetAsProperty(root, "Tooltip")
    };
    return resp;
}

function deArrayifyWebLayoutControl<T extends WebLayout.WebLayoutControl>(json: any): T {
    const root = json;
    if (root == null || root.length != 1) {
        throw new MgError("Malformed input. Expected control element");
    }
    const control: any = {
        Visible: tryGetAsProperty(root[0], "Visible", "boolean")
    };
    return control;
}

function deArrayifyWebLayoutInfoPane(json: any): WebLayout.WebLayoutInfoPane {
    const root = json;
    if (root == null || root.length != 1) {
        throw new MgError("Malformed input. Expected InformationPane element");
    }
    const infoPane = {
        Visible: tryGetAsProperty(root[0], "Visible", "boolean"),
        Width: tryGetAsProperty(root[0], "Width", "int"),
        LegendVisible: tryGetAsProperty(root[0], "LegendVisible", "boolean"),
        PropertiesVisible: tryGetAsProperty(root[0], "PropertiesVisible", "boolean")
    };
    return infoPane;
}

function deArrayifyWebLayoutInitialView(json: any): WebLayout.MapView | undefined {
    const root = json;
    if (root == null || root.length != 1) {
        return undefined;
    }
    const view = {
        CenterX: tryGetAsProperty(root[0], "CenterX", "float"),
        CenterY: tryGetAsProperty(root[0], "CenterY", "float"),
        Scale: tryGetAsProperty(root[0], "Scale", "float")
    };
    return view;
}

function deArrayifyWebLayoutMap(json: any): WebLayout.WebLayoutMap {
    const root = json;
    if (root == null || root.length != 1) {
        throw new MgError("Malformed input. Expected Map element");
    }
    const map = {
        ResourceId: tryGetAsProperty(root[0], "ResourceId"),
        InitialView: deArrayifyWebLayoutInitialView(root[0].InitialView),
        HyperlinkTarget: tryGetAsProperty(root[0], "HyperlinkTarget"),
        HyperlinkTargetFrame: tryGetAsProperty(root[0], "HyperlinkTargetFrame")
    };
    return map;
}

function deArrayifyTaskButton(json: any): WebLayout.TaskButton {
    const root = json;
    if (root == null || root.length != 1) {
        throw new MgError("Malformed input. Expected TaskButton element");
    }
    const button = {
        Name: tryGetAsProperty(root[0], "Name"),
        Tooltip: tryGetAsProperty(root[0], "Tooltip"),
        Description: tryGetAsProperty(root[0], "Description"),
        ImageURL: tryGetAsProperty(root[0], "ImageURL"),
        DisabledImageURL: tryGetAsProperty(root[0], "DisabledImageURL")
    };
    return button;
}

function deArrayifyWebLayoutTaskBar(json: any): WebLayout.WebLayoutTaskBar {
    const root = json;
    if (root == null || root.length != 1) {
        throw new MgError("Malformed input. Expected TaskBar element");
    }
    const taskbar = {
        Visible: tryGetAsProperty(root[0], "Visible", "boolean"),
        Home: deArrayifyTaskButton(root[0].Home),
        Forward: deArrayifyTaskButton(root[0].Forward),
        Back: deArrayifyTaskButton(root[0].Back),
        Tasks: deArrayifyTaskButton(root[0].Tasks),
        MenuButton: [] as WebLayout.UIItem[]
    };
    if (root[0].MenuButton) {
        for (const mb of root[0].MenuButton) {
            taskbar.MenuButton.push(deArrayifyUIItem(mb));
        }
    }
    return taskbar;
}

function deArrayifyWebLayoutTaskPane(json: any): WebLayout.WebLayoutTaskPane {
    const root = json;
    if (root == null || root.length != 1) {
        throw new MgError("Malformed input. Expected TaskPane element");
    }
    const taskPane = {
        Visible: tryGetAsProperty(root[0], "Visible", "boolean"),
        InitialTask: tryGetAsProperty(root[0], "InitialTask"),
        Width: tryGetAsProperty(root[0], "Width", "int"),
        TaskBar: deArrayifyWebLayoutTaskBar(root[0].TaskBar)
    };
    return taskPane;
}

function deArrayifyUIItem(json: any): WebLayout.UIItem {
    const root = json;
    const func: string = tryGetAsProperty(root, "Function");
    const item: any = {
        Function: func
    };
    switch (func) {
        case "Command":
            item.Command = tryGetAsProperty(root, "Command");
            break;
        case "Flyout":
            item.Label = tryGetAsProperty(root, "Label");
            item.Tooltip = tryGetAsProperty(root, "Tooltip");
            item.Description = tryGetAsProperty(root, "Description");
            item.ImageURL = tryGetAsProperty(root, "ImageURL");
            item.DisabledImageURL = tryGetAsProperty(root, "DisabledImageURL");
            item.SubItem = [];
            for (const si of root.SubItem) {
                item.SubItem.push(deArrayifyUIItem(si));
            }
            break;
    }
    return item;
}

function deArrayifyItemContainer<T extends WebLayout.WebLayoutControl>(json: any, name: string): T {
    const root = json;
    if (root == null || root.length != 1) {
        throw new MgError("Malformed input. Expected container element");
    }
    const container: any = {};
    container[name] = [];
    for (const item of root[0][name]) {
        container[name].push(deArrayifyUIItem(item));
    }
    if (typeof (root[0].Visible) != 'undefined') {
        container.Visible = tryGetAsProperty(root[0], "Visible", "boolean");
    }
    return container;
}

function deArrayifyWebLayoutSearchResultColumnSet(json: any): WebLayout.ResultColumnSet {
    const root = json;
    if (root == null || root.length != 1) {
        throw new MgError("Malformed input. Expected ResultColumns element");
    }
    const res = {
        Column: [] as WebLayout.ResultColumn[]
    };
    for (const col of root[0].Column) {
        res.Column.push({
            Name: tryGetAsProperty(col, "Name"),
            Property: tryGetAsProperty(col, "Property")
        });
    }
    return res;
}

function deArrayifyWebLayoutInvokeURLLayerSet(json: any): WebLayout.LayerSet | undefined {
    const root = json;
    if (root == null || root.length != 1) {
        return undefined;
    }
    const layerset = {
        Layer: root[0].Layer
    };
    return layerset;
}

function deArrayifyWebLayoutParameterPairs(json: any): WebLayout.ParameterPair[] {
    const root = json;
    const pairs = [] as WebLayout.ParameterPair[]
    if (!root) {
        return pairs;
    }
    for (const kvp of root) {
        pairs.push({
            Key: tryGetAsProperty(kvp, "Key"),
            Value: tryGetAsProperty(kvp, "Value")
        });
    }
    return pairs;
}

function deArrayifyCommand(json: any): WebLayout.CommandDef {
    const root = json;
    const cmd: any = {
        "@xsi:type": tryGetAsProperty(root, "@xsi:type"),
        Name: tryGetAsProperty(root, "Name"),
        Label: tryGetAsProperty(root, "Label"),
        Tooltip: tryGetAsProperty(root, "Tooltip"),
        Description: tryGetAsProperty(root, "Description"),
        ImageURL: tryGetAsProperty(root, "ImageURL"),
        DisabledImageURL: tryGetAsProperty(root, "DisabledImageURL"),
        TargetViewer: tryGetAsProperty(root, "TargetViewer")
    };
    //Basic
    if (typeof (root.Action) != 'undefined') {
        cmd.Action = tryGetAsProperty(root, "Action");
    }
    //Targeted
    if (typeof (root.Target) != 'undefined') {
        cmd.Target = tryGetAsProperty(root, "Target");
    }
    if (typeof (root.TargetFrame) != 'undefined') {
        cmd.TargetFrame = tryGetAsProperty(root, "TargetFrame");
    }
    //Search
    if (typeof (root.Layer) != 'undefined') {
        cmd.Layer = tryGetAsProperty(root, "Layer");
        cmd.Prompt = tryGetAsProperty(root, "Prompt");
        cmd.ResultColumns = deArrayifyWebLayoutSearchResultColumnSet(root.ResultColumns);
        cmd.Filter = tryGetAsProperty(root, "Filter");
        cmd.MatchLimit = tryGetAsProperty(root, "MatchLimit", "int");
    }
    //InvokeURL | Help
    if (typeof (root.URL) != 'undefined') {
        cmd.URL = tryGetAsProperty(root, "URL");
    }
    if (typeof (root.DisableIfSelectionEmpty) != 'undefined') {
        cmd.LayerSet = deArrayifyWebLayoutInvokeURLLayerSet(root.LayerSet);
        cmd.AdditionalParameter = deArrayifyWebLayoutParameterPairs(root.AdditionalParameter);
        cmd.DisableIfSelectionEmpty = tryGetAsProperty(root, "DisableIfSelectionEmpty", "boolean");
    }
    //InvokeScript
    if (typeof (root.Script) != 'undefined') {
        cmd.Script = tryGetAsProperty(root, "Script");
    }
    return cmd;
}

function deArrayifyWebLayoutCommandSet(json: any): WebLayout.WebLayoutCommandSet {
    const root = json;
    if (root == null || root.length != 1) {
        throw new MgError("Malformed input. Expected CommandSet element");
    }
    const set = {
        Command: [] as WebLayout.CommandDef[]
    };
    if (root[0].Command) {
        for (const cmd of root[0].Command) {
            set.Command.push(deArrayifyCommand(cmd));
        }
    }
    return set;
}

function deArrayifyWebLayout(json: any): WebLayout.WebLayout {
    const root = json;
    const resp = {
        Title: tryGetAsProperty(root, "Title"),
        Map: deArrayifyWebLayoutMap(root.Map),
        EnablePingServer: tryGetAsProperty(root, "EnablePingServer", "boolean"),
        SelectionColor: tryGetAsProperty(root, "SelectionColor"),
        PointSelectionBuffer: tryGetAsProperty(root, "PointSelectionBuffer", "int"),
        MapImageFormat: tryGetAsProperty(root, "MapImageFormat"),
        SelectionImageFormat: tryGetAsProperty(root, "SelectionImageFormat"),
        StartupScript: tryGetAsProperty(root, "StartupScript"),
        ToolBar: deArrayifyItemContainer<WebLayout.WebLayoutToolbar>(root.ToolBar, "Button"),
        InformationPane: deArrayifyWebLayoutInfoPane(root.InformationPane),
        ContextMenu: deArrayifyItemContainer<WebLayout.WebLayoutContextMenu>(root.ContextMenu, "MenuItem"),
        TaskPane: deArrayifyWebLayoutTaskPane(root.TaskPane),
        StatusBar: deArrayifyWebLayoutControl<WebLayout.WebLayoutStatusBar>(root.StatusBar),
        ZoomControl: deArrayifyWebLayoutControl<WebLayout.WebLayoutZoomControl>(root.ZoomControl),
        CommandSet: deArrayifyWebLayoutCommandSet(root.CommandSet)
    };
    return resp;
}

function deArrayifyMapGroup(json: any): Fusion.MapSetGroup {
    const root = json;
    if (root == null) {
        throw new MgError("Malformed input. Expected MapGroup element");
    }
    const mapGroup: Fusion.MapSetGroup = {
        "@id": tryGetAsProperty(root, "@id", "string"),
        InitialView: undefined,
        Map: [] as Fusion.MapConfiguration[]
    };
    if (root.InitialView) {
        const iview = root.InitialView;
        mapGroup.InitialView = {
            CenterX: tryGetAsProperty(iview, "CenterX", "float"),
            CenterY: tryGetAsProperty(iview, "CenterY", "float"),
            Scale: tryGetAsProperty(iview, "Scale", "float")
        };
    }
    if (root.Map) {
        for (const m of root.Map) {
            mapGroup.Map.push({
                Type: tryGetAsProperty(m, "Type", "string"),
                SingleTile: tryGetAsProperty(m, "SingleTile", "boolean"),
                Extension: deArrayifyExtension(m.Extension)
            });
        }
    }
    return mapGroup;
}

function deArrayifyMapSet(json: any): Fusion.MapSet | undefined {
    const root = json;
    if (root == null || root.length != 1) {
        throw new MgError("Malformed input. Expected MapSet element");
    }
    const set = {
        MapGroup: [] as Fusion.MapSetGroup[]
    };
    if (root[0].MapGroup) {
        for (const map of root[0].MapGroup) {
            set.MapGroup.push(deArrayifyMapGroup(map));
        }
    }
    return set;
}

function deArrayifyContainerItems(json: any[]): Fusion.ContainerItem[] {
    const items = [] as Fusion.ContainerItem[];
    for (const i of json) {
        const func = tryGetAsProperty(i, "Function", "string");
        switch (func) {
            case "Separator":
                items.push({
                    Function: "Separator"
                });
                break;
            case "Widget":
                items.push({
                    Function: "Widget",
                    Widget: tryGetAsProperty(i, "Widget", "string")
                })
                break;
            case "Flyout":
                items.push({
                    Function: "Flyout",
                    Label: tryGetAsProperty(i, "Label", "string"),
                    Tooltip: tryGetAsProperty(i, "Tooltip", "string"),
                    ImageUrl: tryGetAsProperty(i, "ImageUrl", "string"),
                    ImageClass: tryGetAsProperty(i, "ImageClass", "string"),
                    Item: deArrayifyContainerItems(i.Item || [])
                })
                break;
        }
    }
    return items;
}

function deArrayifyContainer(json: any[]): Fusion.ContainerDefinition[] {
    const containers = [] as Fusion.ContainerDefinition[];
    for (const c of json) {
        containers.push({
            Name: tryGetAsProperty(c, "Name", "string"),
            Type: tryGetAsProperty(c, "Type", "string"),
            Position: tryGetAsProperty(c, "Position", "string"),
            Extension: deArrayifyExtension(c.Extension),
            Item: deArrayifyContainerItems(c.Item)
        });
    }
    return containers;
}

function deArrayifyWidgets(json: any[]): Fusion.Widget[] {
    const widgets = [] as Fusion.Widget[];
    for (const w of json) {
        if (w["@xsi:type"] == "UiWidgetType") {
            const uiw = deArrayifyUiWidget(w);
            widgets.push(uiw);
        } else {
            widgets.push(deArrayifyWidget(w));
        }
    }
    return widgets;
}

function deArrayifyWidget(json: any): Fusion.Widget {
    const root = json;
    if (root == null) {
        throw new MgError("Malformed input. Expected Widget element");
    }
    const w = {
        WidgetType: tryGetAsProperty(root, "@xsi:type", "string"),
        Name: tryGetAsProperty(root, "Name", "string"),
        Type: tryGetAsProperty(root, "Type", "string"),
        Location: tryGetAsProperty(root, "Location", "string"),
        Extension: deArrayifyExtension(root.Extension)
    };
    return w;
}

function deArrayifyExtension(json: any, arrayCheck: boolean = true): any {
    const root = json;
    if (root == null) {
        return null;
    }
    if (arrayCheck && root.length != 1) {
        throw new MgError("Malformed input. Expected Extension element");
    }
    const ext: any = {};
    for (const key in root[0]) {
        if (Array.isArray(root[0][key])) {
            //Special case handling
            switch (key) {
                case "AdditionalParameter":
                    {
                        const params = [];
                        for (const p of root[0][key]) {
                            params.push({
                                Key: tryGetAsProperty(p, "Key", "string"),
                                Value: tryGetAsProperty(p, "Value", "string")
                            });
                        }
                        ext[key] = params;
                    }
                    break;
                case "Projection":
                    {
                        ext[key] = root[0][key];
                    }
                    break;
                default:
                    ext[key] = tryGetAsProperty(root[0], key, "string");
                    break;
            }
        } else {
            ext[key] = deArrayifyExtension(root[0][key], false);
        }
    }
    return ext;
}

function deArrayifyUiWidget(json: any): Fusion.UIWidget {
    const root = json;
    if (root == null) {
        throw new MgError("Malformed input. Expected Widget element");
    }
    const w = {
        WidgetType: tryGetAsProperty(root, "@xsi:type", "string"),
        ImageUrl: tryGetAsProperty(root, "ImageUrl", "string"),
        ImageClass: tryGetAsProperty(root, "ImageClass", "string"),
        Label: tryGetAsProperty(root, "Label", "string"),
        Tooltip: tryGetAsProperty(root, "Tooltip", "string"),
        StatusText: tryGetAsProperty(root, "StatusText", "string"),
        Disabled: tryGetAsProperty(root, "Disabled", "boolean"),
        Name: tryGetAsProperty(root, "Name", "string"),
        Type: tryGetAsProperty(root, "Type", "string"),
        Location: tryGetAsProperty(root, "Location", "string"),
        Extension: deArrayifyExtension(root.Extension)
    };
    return w;
}

function deArrayifyMapWidget(json: any): Fusion.MapWidget {
    const root = json;
    if (root == null || root.length != 1) {
        throw new MgError("Malformed input. Expected MapWidget element");
    }
    const mw = {
        WidgetType: tryGetAsProperty(root, "@xsi:type", "string"),
        MapId: tryGetAsProperty(root, "MapId", "string"),
        Name: tryGetAsProperty(root, "Name", "string"),
        Type: tryGetAsProperty(root, "Type", "string"),
        Location: tryGetAsProperty(root, "Location", "string"),
        Extension: deArrayifyExtension(root.Extension)
    };
    return mw;
}

function deArrayifyWidgetSet(json: any): Fusion.WidgetSet[] {
    const widgetSet = [] as Fusion.WidgetSet[];
    for (const ws of json) {
        widgetSet.push({
            Container: deArrayifyContainer(ws.Container),
            MapWidget: deArrayifyMapWidget(ws.MapWidget),
            Widget: deArrayifyWidgets(ws.Widget)
        })
    }
    return widgetSet;
}

function deArrayifyFlexibleLayout(json: any): Fusion.ApplicationDefinition {
    const root = json;
    const resp = {
        Title: tryGetAsProperty(root, "Title"),
        TemplateUrl: tryGetAsProperty(root, "TemplateUrl"),
        MapSet: deArrayifyMapSet(root.MapSet),
        WidgetSet: deArrayifyWidgetSet(root.WidgetSet),
        Extension: deArrayifyExtension(root.Extension)
    };
    return resp;
}

/**
 * Normalizes the given JSON object to match the content model of its original XML form
 *
 * @export
 * @param {*} json The JSON object to normalize
 * @returns {*} The normalized JSON object
 */
export function deArrayify(json: any): any {
    if (json["RuntimeMap"]) {
        return deArrayifyRuntimeMap(json.RuntimeMap);
    }
    if (json["FeatureInformation"]) {
        return deArrayifyFeatureInformation(json.FeatureInformation);
    }
    if (json["WebLayout"]) {
        return deArrayifyWebLayout(json.WebLayout);
    }
    if (json["ApplicationDefinition"]) {
        return deArrayifyFlexibleLayout(json.ApplicationDefinition);
    }
    const keys = [] as string[];
    for (const k in json) {
        keys.push(k);
    }
    throw new MgError(`Unsure how to process JSON response. Root elements are: (${keys.join(", ")})`);
}

/**
 * Builds an XML selection string from the given selection set.
 *
 * @export
 * @param {(Query.FeatureSet | undefined)} selection The selection set
 * @param {string[]} [layerIds] If specified, the selection XML will only include selections from the specified layers
 * @returns {string} The selection XML string
 */
export function buildSelectionXml(selection: Query.FeatureSet | undefined, layerIds?: string[]): string {
    let xml = '<?xml version="1.0" encoding="utf-8"?>';
    xml += '<FeatureSet xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="FeatureSet-1.0.0.xsd">';
    if (selection) {
        for (const layer of selection.Layer) {
            const layerId = layer["@id"];
            if (layerIds != null && layerIds.indexOf(layerId) < 0) {
                continue;
            }
            xml += `<Layer id="${layerId}">`;
            const cls = layer.Class;
            xml += `<Class id="${cls["@id"]}">`;
            for (const id of cls.ID) {
                xml += `<ID>${id}</ID>`;
            }
            xml += '</Class>';
            xml += '</Layer>';
        }
    }
    xml += '</FeatureSet>';
    return xml;
}

export function getActiveSelectedFeatureXml(selection: Query.FeatureSet, feat: ActiveSelectedFeature): string | undefined {
    for (const layer of selection.Layer) {
        const layerId = layer["@id"];
        if (layerId == feat.layerId) {
            const key = layer.Class.ID[feat.featureIndex];
            let xml = '<?xml version="1.0" encoding="utf-8"?>';
            xml += '<FeatureSet xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="FeatureSet-1.0.0.xsd">';
            xml += `<Layer id="${layerId}">`;
            xml += `<Class id="${layer.Class["@id"]}">`;
            xml += `<ID>${key}</ID>`;
            xml += '</Class>';
            xml += '</Layer>';
            xml += '</FeatureSet>';
            return xml;
        }
    }
}