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

function buildPropertyGetter<T>() {
    return (el: any, name: keyof T, type: ElementType = "string") => {
        return tryGetAsProperty<T>(el, name, type);
    }
}

function tryGetAsProperty<T>(el: any, name: keyof T, type: ElementType = "string"): any {
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
    const getter = buildPropertyGetter<RtMap.RuleInfo>();
    return rules.map(r => {
        const rule: RtMap.RuleInfo = {
            LegendLabel: getter(r, "LegendLabel"),
            Filter: getter(r, "Filter"),
            Icon: getter(r, "Icon")
        };
        return rule;
    });
}

function deArrayifyFeatureStyles(fts: any[]): RtMap.FeatureStyleInfo[] {
    if (!fts) {
        return [];
    }
    const getter = buildPropertyGetter<RtMap.FeatureStyleInfo>();
    return fts.map(ft => {
        const featureStyle: RtMap.FeatureStyleInfo = {
            Type: getter(ft, "Type", "int"),
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
    
    const getter = buildPropertyGetter<RtMap.ScaleRangeInfo>();
    return scales.map(sc => {
        const scale: RtMap.ScaleRangeInfo = {
            MinScale: getter(sc, "MinScale", "float"),
            MaxScale: getter(sc, "MaxScale", "float"),
            FeatureStyle: deArrayifyFeatureStyles(sc.FeatureStyle)
        };
        return scale;
    });
}

function deArrayifyFeatureSourceInfo(fs: any[]): RtMap.FeatureSourceInfo | undefined {
    if (!fs || fs.length !== 1) {
        return undefined;
    }
    const getter = buildPropertyGetter<RtMap.FeatureSourceInfo>();
    return {
        ResourceId: getter(fs[0], "ResourceId"),
        ClassName: getter(fs[0], "ClassName"),
        Geometry: getter(fs[0], "Geometry")
    };
}

function deArrayifyLayers(layers: any[]): RtMap.MapLayer[] {
    if (!layers)
        return layers;

    const getter = buildPropertyGetter<RtMap.MapLayer>();
    return layers.map(lyr => {
        const layer: RtMap.MapLayer = {
            Type: getter(lyr, "Type", "int"),
            Selectable: getter(lyr, "Selectable", "boolean"),
            LayerDefinition: getter(lyr, "LayerDefinition"),
            Name: getter(lyr, "Name"),
            LegendLabel: getter(lyr, "LegendLabel"),
            ObjectId: getter(lyr, "ObjectId"),
            ParentId: getter(lyr, "ParentId"),
            DisplayInLegend: getter(lyr, "DisplayInLegend", "boolean"),
            ExpandInLegend: getter(lyr, "ExpandInLegend", "boolean"),
            Visible: getter(lyr, "Visible", "boolean"),
            ActuallyVisible: getter(lyr, "ActuallyVisible", "boolean"),
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

    const getter = buildPropertyGetter<RtMap.MapGroup>();
    return groups.map(grp => {
        const group: RtMap.MapGroup = {
            Type: getter(grp, "Type", "int"),
            Name: getter(grp, "Name"),
            LegendLabel: getter(grp, "LegendLabel"),
            ObjectId: getter(grp, "ObjectId"),
            ParentId: getter(grp, "ParentId"),
            DisplayInLegend: getter(grp, "DisplayInLegend", "boolean"),
            ExpandInLegend: getter(grp, "ExpandInLegend", "boolean"),
            Visible: getter(grp, "Visible", "boolean"),
            ActuallyVisible: getter(grp, "ActuallyVisible", "boolean")
        };
        return group;
    });
}

function deArrayifyCoordinateSystem(cs: any[]): RtMap.CoordinateSystemType {
    if (!cs || cs.length !== 1) {
        throw new MgError("Malformed input. Expected CoordinateSystem element");
    }
    const getter = buildPropertyGetter<RtMap.CoordinateSystemType>();
    const res: RtMap.CoordinateSystemType = {
        Wkt: getter(cs[0], "Wkt"),
        MentorCode: getter(cs[0], "MentorCode"),
        EpsgCode: getter(cs[0], "EpsgCode"),
        MetersPerUnit: getter(cs[0], "MetersPerUnit", "float")
    };
    return res;
}

function deArrayifyCoordinate(coord: any[]): RtMap.EnvCoordinate {
    if (!coord || coord.length !== 1) {
        throw new MgError("Malformed input. Expected coordinate array");
    }
    const getter = buildPropertyGetter<RtMap.EnvCoordinate>();
    return {
        X: getter(coord[0], "X", "float"),
        Y: getter(coord[0], "Y", "float")
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
    const getter = buildPropertyGetter<RtMap.RuntimeMap>();
    const rtMap: RtMap.RuntimeMap = {
        SessionId: getter(root, "SessionId"),
        SiteVersion: getter(root, "SiteVersion"),
        Name: getter(root, "Name"),
        MapDefinition: getter(root, "MapDefinition"),
        TileSetDefinition: getter(root, "TileSetDefinition"),
        TileWidth: getter(root, "TileWidth", "int"),
        TileHeight: getter(root, "TileHeight", "int"),
        BackgroundColor: getter(root, "BackgroundColor"),
        DisplayDpi: getter(root, "DisplayDpi", "int"),
        IconMimeType: getter(root, "IconMimeType"),
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
    const getter = buildPropertyGetter<Query.FeatureSetClass>();
    if (root.length != 1) {
        throw new MgError("Malformed input. Expected Class element");
    }
    const cls = {
        "@id": getter(root[0], "@id"),
        ID: root[0].ID
    };
    return cls;
}

function deArrayifyFeatureSetLayers(json: any[]): Query.FeatureSetLayer[] {
    const getter = buildPropertyGetter<Query.FeatureSetLayer>();
    return (json || []).map(root => {
        const layer = {
            "@id": getter(root, "@id"),
            "@name": getter(root, "@name"),
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
    const getter = buildPropertyGetter<Query.SelectionImage>();
    const img = {
        MimeType: getter(root[0], "MimeType"),
        Content: getter(root[0], "Content")
    };
    return img;
}

function deArrayifyFeatureProperties(json: any[]): Query.FeatureProperty[] {
    const getter = buildPropertyGetter<Query.FeatureProperty>();
    return (json || []).map(root => {
        const prop = {
            Name: getter(root, "Name"),
            Value: getter(root, "Value")
        };
        return prop;
    });
}

function deArrayifyFeatures(json: any[]): Query.SelectedFeature[] {
    const getter = buildPropertyGetter<Query.SelectedFeature>();
    return (json || []).map(root => {
        const feat = {
            Bounds: getter(root, "Bounds"),
            Property: deArrayifyFeatureProperties(root.Property),
            SelectionKey: getter(root, "SelectionKey")
        };
        return feat;
    });
}

function deArrayifyLayerMetadataProperties(json: any[]): Query.LayerPropertyMetadata[] {
    const getter = buildPropertyGetter<Query.LayerPropertyMetadata>();
    return (json || []).map(root => {
        const prop = {
            DisplayName: getter(root, "DisplayName"),
            Name: getter(root, "Name"),
            Type: getter(root, "Type", "int")
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
    const getter = buildPropertyGetter<Query.SelectedLayer>();
    return (json || []).map(root => {
        const layer = {
            "@id": getter(root, "@id"),
            "@name": getter(root, "@name"),
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
    const getter = buildPropertyGetter<Query.QueryMapFeaturesResponse>();
    const resp = {
        FeatureSet: deArrayifyFeatureSet(root.FeatureSet),
        Hyperlink: getter(root, "Hyperlink"),
        InlineSelectionImage: deArrayifyInlineSelectionImage(root.InlineSelectionImage),
        SelectedFeatures: deArrayifySelectedFeatures(root.SelectedFeatures),
        Tooltip: getter(root, "Tooltip")
    };
    return resp;
}

function deArrayifyWebLayoutControl<T extends WebLayout.WebLayoutControl>(json: any): T {
    const root = json;
    if (root == null || root.length != 1) {
        throw new MgError("Malformed input. Expected control element");
    }
    const getter = buildPropertyGetter<T>();
    const control: any = {
        Visible: getter(root[0], "Visible", "boolean")
    };
    return control;
}

function deArrayifyWebLayoutInfoPane(json: any): WebLayout.WebLayoutInfoPane {
    const root = json;
    if (root == null || root.length != 1) {
        throw new MgError("Malformed input. Expected InformationPane element");
    }
    const getter = buildPropertyGetter<WebLayout.WebLayoutInfoPane>();
    const infoPane = {
        Visible: getter(root[0], "Visible", "boolean"),
        Width: getter(root[0], "Width", "int"),
        LegendVisible: getter(root[0], "LegendVisible", "boolean"),
        PropertiesVisible: getter(root[0], "PropertiesVisible", "boolean")
    };
    return infoPane;
}

function deArrayifyWebLayoutInitialView(json: any): WebLayout.MapView | undefined {
    const root = json;
    if (root == null || root.length != 1) {
        return undefined;
    }
    const getter = buildPropertyGetter<WebLayout.MapView>();
    const view = {
        CenterX: getter(root[0], "CenterX", "float"),
        CenterY: getter(root[0], "CenterY", "float"),
        Scale: getter(root[0], "Scale", "float")
    };
    return view;
}

function deArrayifyWebLayoutMap(json: any): WebLayout.WebLayoutMap {
    const root = json;
    if (root == null || root.length != 1) {
        throw new MgError("Malformed input. Expected Map element");
    }
    const getter = buildPropertyGetter<WebLayout.WebLayoutMap>();
    const map = {
        ResourceId: getter(root[0], "ResourceId"),
        InitialView: deArrayifyWebLayoutInitialView(root[0].InitialView),
        HyperlinkTarget: getter(root[0], "HyperlinkTarget"),
        HyperlinkTargetFrame: getter(root[0], "HyperlinkTargetFrame")
    };
    return map;
}

function deArrayifyTaskButton(json: any): WebLayout.TaskButton {
    const root = json;
    if (root == null || root.length != 1) {
        throw new MgError("Malformed input. Expected TaskButton element");
    }
    const getter = buildPropertyGetter<WebLayout.TaskButton>();
    const button = {
        Name: getter(root[0], "Name"),
        Tooltip: getter(root[0], "Tooltip"),
        Description: getter(root[0], "Description"),
        ImageURL: getter(root[0], "ImageURL"),
        DisabledImageURL: getter(root[0], "DisabledImageURL")
    };
    return button;
}

function deArrayifyWebLayoutTaskBar(json: any): WebLayout.WebLayoutTaskBar {
    const root = json;
    if (root == null || root.length != 1) {
        throw new MgError("Malformed input. Expected TaskBar element");
    }
    const getter = buildPropertyGetter<WebLayout.WebLayoutTaskBar>();
    const taskbar = {
        Visible: getter(root[0], "Visible", "boolean"),
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
    const getter = buildPropertyGetter<WebLayout.WebLayoutTaskPane>();
    const taskPane = {
        Visible: getter(root[0], "Visible", "boolean"),
        InitialTask: getter(root[0], "InitialTask"),
        Width: getter(root[0], "Width", "int"),
        TaskBar: deArrayifyWebLayoutTaskBar(root[0].TaskBar)
    };
    return taskPane;
}

function deArrayifyUIItem(json: any): WebLayout.UIItem {
    const root = json;
    const getter = buildPropertyGetter<WebLayout.UIItem & WebLayout.CommandUIItem & WebLayout.FlyoutUIItem>();
    const func: string = getter(root, "Function");
    //Wouldn't it be nice if we could incrementally build up a union type that then becomes a specific
    //type once certain properties are set?
    //
    //Well, that's currently not possible. So we have to resort to "any"
    const item: any = {
        Function: func
    };
    switch (func) {
        case "Command":
            item.Command = getter(root, "Command");
            break;
        case "Flyout":
            item.Label = getter(root, "Label");
            item.Tooltip = getter(root, "Tooltip");
            item.Description = getter(root, "Description");
            item.ImageURL = getter(root, "ImageURL");
            item.DisabledImageURL = getter(root, "DisabledImageURL");
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
    const getter = buildPropertyGetter<T>();
    const container: any = {};
    container[name] = [];
    for (const item of root[0][name]) {
        container[name].push(deArrayifyUIItem(item));
    }
    if (typeof (root[0].Visible) != 'undefined') {
        container.Visible = getter(root[0], "Visible", "boolean");
    }
    return container;
}

function deArrayifyWebLayoutSearchResultColumnSet(json: any): WebLayout.ResultColumnSet {
    const root = json;
    if (root == null || root.length != 1) {
        throw new MgError("Malformed input. Expected ResultColumns element");
    }
    const getter = buildPropertyGetter<WebLayout.ResultColumn>();
    const res = {
        Column: [] as WebLayout.ResultColumn[]
    };
    for (const col of root[0].Column) {
        res.Column.push({
            Name: getter(col, "Name"),
            Property: getter(col, "Property")
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
    const getter = buildPropertyGetter<WebLayout.ParameterPair>();
    for (const kvp of root) {
        pairs.push({
            Key: getter(kvp, "Key"),
            Value: getter(kvp, "Value")
        });
    }
    return pairs;
}

function deArrayifyCommand(json: any): WebLayout.CommandDef {
    const root = json;
    const getter = buildPropertyGetter<WebLayout.CommandDef & WebLayout.BasicCommandDef & WebLayout.InvokeScriptCommandDef & WebLayout.InvokeURLCommandDef & WebLayout.SearchCommandDef>();
    const cmd: any = {
        "@xsi:type": getter(root, "@xsi:type"),
        Name: getter(root, "Name"),
        Label: getter(root, "Label"),
        Tooltip: getter(root, "Tooltip"),
        Description: getter(root, "Description"),
        ImageURL: getter(root, "ImageURL"),
        DisabledImageURL: getter(root, "DisabledImageURL"),
        TargetViewer: getter(root, "TargetViewer")
    };
    //Basic
    if (typeof (root.Action) != 'undefined') {
        cmd.Action = getter(root, "Action");
    }
    //Targeted
    if (typeof (root.Target) != 'undefined') {
        cmd.Target = getter(root, "Target");
    }
    if (typeof (root.TargetFrame) != 'undefined') {
        cmd.TargetFrame = getter(root, "TargetFrame");
    }
    //Search
    if (typeof (root.Layer) != 'undefined') {
        cmd.Layer = getter(root, "Layer");
        cmd.Prompt = getter(root, "Prompt");
        cmd.ResultColumns = deArrayifyWebLayoutSearchResultColumnSet(root.ResultColumns);
        cmd.Filter = getter(root, "Filter");
        cmd.MatchLimit = getter(root, "MatchLimit", "int");
    }
    //InvokeURL | Help
    if (typeof (root.URL) != 'undefined') {
        cmd.URL = getter(root, "URL");
    }
    if (typeof (root.DisableIfSelectionEmpty) != 'undefined') {
        cmd.LayerSet = deArrayifyWebLayoutInvokeURLLayerSet(root.LayerSet);
        cmd.AdditionalParameter = deArrayifyWebLayoutParameterPairs(root.AdditionalParameter);
        cmd.DisableIfSelectionEmpty = getter(root, "DisableIfSelectionEmpty", "boolean");
    }
    //InvokeScript
    if (typeof (root.Script) != 'undefined') {
        cmd.Script = getter(root, "Script");
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
    const getter = buildPropertyGetter<WebLayout.WebLayout>();
    const resp = {
        Title: getter(root, "Title"),
        Map: deArrayifyWebLayoutMap(root.Map),
        EnablePingServer: getter(root, "EnablePingServer", "boolean"),
        SelectionColor: getter(root, "SelectionColor"),
        PointSelectionBuffer: getter(root, "PointSelectionBuffer", "int"),
        MapImageFormat: getter(root, "MapImageFormat"),
        SelectionImageFormat: getter(root, "SelectionImageFormat"),
        StartupScript: getter(root, "StartupScript"),
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
    const getter = buildPropertyGetter<Fusion.MapSetGroup & Fusion.MapInitialView & Fusion.MapConfiguration>();
    const mapGroup: Fusion.MapSetGroup = {
        "@id": getter(root, "@id", "string"),
        InitialView: undefined,
        Map: [] as Fusion.MapConfiguration[]
    };
    if (root.InitialView) {
        const iview = root.InitialView[0];
        mapGroup.InitialView = {
            CenterX: getter(iview, "CenterX", "float"),
            CenterY: getter(iview, "CenterY", "float"),
            Scale: getter(iview, "Scale", "float")
        };
    }
    if (root.Map) {
        for (const m of root.Map) {
            mapGroup.Map.push({
                Type: getter(m, "Type", "string"),
                SingleTile: getter(m, "SingleTile", "boolean"),
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
    const getter = buildPropertyGetter<Fusion.ContainerItem & Fusion.FlyoutItem & Fusion.WidgetItem>();
    if (json && json.length) {
        for (const i of json) {
            const func = getter(i, "Function", "string");
            switch (func) {
                case "Separator":
                    items.push({
                        Function: "Separator"
                    });
                    break;
                case "Widget":
                    items.push({
                        Function: "Widget",
                        Widget: getter(i, "Widget", "string")
                    })
                    break;
                case "Flyout":
                    items.push({
                        Function: "Flyout",
                        Label: getter(i, "Label", "string"),
                        Tooltip: getter(i, "Tooltip", "string"),
                        ImageUrl: getter(i, "ImageUrl", "string"),
                        ImageClass: getter(i, "ImageClass", "string"),
                        Item: deArrayifyContainerItems(i.Item || [])
                    })
                    break;
            }
        }
    }
    return items;
}

function deArrayifyContainer(json: any[]): Fusion.ContainerDefinition[] {
    const containers = [] as Fusion.ContainerDefinition[];
    const getter = buildPropertyGetter<Fusion.ContainerDefinition>();
    for (const c of json) {
        containers.push({
            Name: getter(c, "Name", "string"),
            Type: getter(c, "Type", "string"),
            Position: getter(c, "Position", "string"),
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
    const getter = buildPropertyGetter<Fusion.Widget & { "@xsi:type": string }>();
    const w = {
        WidgetType: getter(root, "@xsi:type", "string"),
        Name: getter(root, "Name", "string"),
        Type: getter(root, "Type", "string"),
        Location: getter(root, "Location", "string"),
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
    const getter = buildPropertyGetter<{ Key: string, Value: string, [key: string]: string}>();
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
                                Key: getter(p, "Key", "string"),
                                Value: getter(p, "Value", "string")
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
                    ext[key] = getter(root[0], key, "string");
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
    const getter = buildPropertyGetter<Fusion.UIWidget & { "@xsi:type": string }>();
    const w = {
        WidgetType: getter(root, "@xsi:type", "string"),
        ImageUrl: getter(root, "ImageUrl", "string"),
        ImageClass: getter(root, "ImageClass", "string"),
        Label: getter(root, "Label", "string"),
        Tooltip: getter(root, "Tooltip", "string"),
        StatusText: getter(root, "StatusText", "string"),
        Disabled: getter(root, "Disabled", "boolean"),
        Name: getter(root, "Name", "string"),
        Type: getter(root, "Type", "string"),
        Location: getter(root, "Location", "string"),
        Extension: deArrayifyExtension(root.Extension)
    };
    return w;
}

function deArrayifyMapWidget(json: any): Fusion.MapWidget {
    const root = json;
    if (root == null || root.length != 1) {
        throw new MgError("Malformed input. Expected MapWidget element");
    }
    const getter = buildPropertyGetter<Fusion.MapWidget & { "@xsi:type": string }>();
    const mw = {
        WidgetType: getter(root, "@xsi:type", "string"),
        MapId: getter(root, "MapId", "string"),
        Name: getter(root, "Name", "string"),
        Type: getter(root, "Type", "string"),
        Location: getter(root, "Location", "string"),
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
    const getter = buildPropertyGetter<Fusion.ApplicationDefinition>();
    const resp = {
        Title: getter(root, "Title"),
        TemplateUrl: getter(root, "TemplateUrl"),
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

/**
 * Can only be used for a v4.0.0 or higher QUERYMAPFEATURES request
 * @param selection Current selection set
 * @param feat The active selected feature
 */
export function getActiveSelectedFeatureXml(selection: Query.FeatureSet, feat: ActiveSelectedFeature): string | undefined {
    for (const layer of selection.Layer) {
        const layerId = layer["@id"];
        if (layerId == feat.layerId) {
            const key = feat.selectionKey;
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