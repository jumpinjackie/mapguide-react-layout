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
import * as Contracts from "../contracts";
import { MgError } from "../error";

type ElementType = "string" | "boolean" | "int" | "float";

function tryGetAsProperty(el, name, type: ElementType = "string"): any {
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

function deArrayifyRules(rules: any[]): Contracts.RtMap.RuleInfo[] {
    return rules.map(r => {
        const rule: Contracts.RtMap.RuleInfo = {
            LegendLabel: tryGetAsProperty(r, "LegendLabel"),
            Filter: tryGetAsProperty(r, "Filter"),
            Icon: tryGetAsProperty(r, "Icon")
        };
        return rule;
    });
}

function deArrayifyFeatureStyles(fts: any[]): Contracts.RtMap.FeatureStyleInfo[] {
    return fts.map(ft => {
        const featureStyle: Contracts.RtMap.FeatureStyleInfo = {
            Type: tryGetAsProperty(ft, "Type", "int"),
            Rule: deArrayifyRules(ft.Rule)
        };
        return featureStyle;
    });
}

function deArrayifyScaleRanges(scales: any[]): Contracts.RtMap.ScaleRangeInfo[] {
    return scales.map(sc => {
        const scale: Contracts.RtMap.ScaleRangeInfo = {
            MinScale: tryGetAsProperty(sc, "MinScale", "float"),
            MaxScale: tryGetAsProperty(sc, "MaxScale", "float"),
            FeatureStyle: deArrayifyFeatureStyles(sc.FeatureStyle)
        };
        return scale;
    });
}

function deArrayifyFeatureSourceInfo(fs: any[]): Contracts.RtMap.FeatureSourceInfo {
    if (!fs || fs.length !== 1) {
        return null;
    }
    return {
        ResourceId: tryGetAsProperty(fs[0], "ResourceId"),
        ClassName: tryGetAsProperty(fs[0], "ClassName"),
        Geometry: tryGetAsProperty(fs[0], "Geometry")
    };
}

function deArrayifyLayers(layers: any[]): Contracts.RtMap.MapLayer[] {
    if (!layers)
        return layers;

    return layers.map(lyr => {
        const layer: Contracts.RtMap.MapLayer = {
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
        return layer;
    });
}

function deArrayifyGroups(groups: any[]): Contracts.RtMap.MapGroup[] {
    if (!groups)
        return null;

    return groups.map(grp => {
        const group: Contracts.RtMap.MapGroup = {
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

function deArrayifyCoordinateSystem(cs: any[]): Contracts.RtMap.CoordinateSystemType {
    if (!cs || cs.length !== 1) {
        return null;
    }
    const res: Contracts.RtMap.CoordinateSystemType = {
        Wkt: tryGetAsProperty(cs[0], "Wkt"),
        MentorCode: tryGetAsProperty(cs[0], "MentorCode"),
        EpsgCode: tryGetAsProperty(cs[0], "EpsgCode"),
        MetersPerUnit: tryGetAsProperty(cs[0], "MetersPerUnit", "float")
    };
    return res;
}

function deArrayifyCoordinate(coord: any[]): Contracts.RtMap.Coordinate {
    if (!coord || coord.length !== 1) {
        return null;
    }
    return {
        X: tryGetAsProperty(coord[0], "X", "float"),
        Y: tryGetAsProperty(coord[0], "Y", "float")
    };
}

function deArrayifyExtents(extents: any[]): Contracts.RtMap.Envelope {
    if (!extents || extents.length !== 1) {
        return null;
    }
    const env: Contracts.RtMap.Envelope = {
        LowerLeftCoordinate: deArrayifyCoordinate(extents[0].LowerLeftCoordinate),
        UpperRightCoordinate: deArrayifyCoordinate(extents[0].UpperRightCoordinate)
    };
    return env;
}

function deArrayifyFiniteDisplayScales(fds: any[]): number[] {
    if (!fds)
        return null;

    return fds.map(parseFloat);
}

function deArrayifyRuntimeMap(json: any): Contracts.RtMap.RuntimeMap {
    const root = json;
    const rtMap: Contracts.RtMap.RuntimeMap = {
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

function deArrayifyFeatureSetClass(json: any): Contracts.Query.FeatureSetClass {
    const root = json;
    if (root.length != 1) {
        return null;
    }
    const cls = {
        "@id": tryGetAsProperty(root[0], "@id"),
        ID: root[0].ID
    };
    return cls;
}

function deArrayifyFeatureSetLayers(json: any[]): Contracts.Query.FeatureSetLayer[] {
    return (json || []).map(root => {
        const layer = {
            "@id": tryGetAsProperty(root, "@id"),
            "@name": tryGetAsProperty(root, "@name"),
            Class: deArrayifyFeatureSetClass(root.Class)
        };
        return layer;
    });
}

function deArrayifyFeatureSet(json: any): Contracts.Query.FeatureSet {
    const root = json;
    if (root.length != 1) {
        return null;
    }
    const fs = {
        Layer: deArrayifyFeatureSetLayers(root[0].Layer)
    };
    return fs;
}

function deArrayifyInlineSelectionImage(json: any): Contracts.Query.SelectionImage {
    const root = json;
    if (root.length != 1) {
        return null;
    }
    const img = {
        MimeType: tryGetAsProperty(root[0], "MimeType"),
        Content: tryGetAsProperty(root[0], "Content")
    };
    return img;
}

function deArrayifyFeatureProperties(json: any[]): Contracts.Query.FeatureProperty[] {
    return (json || []).map(root => {
        const prop = {
            Name: tryGetAsProperty(root, "Name"),
            Value: tryGetAsProperty(root, "Value")
        };
        return prop;
    });
}

function deArrayifyFeatures(json: any[]): Contracts.Query.SelectedFeature[] {
    return (json || []).map(root => {
        const feat = {
            Bounds: tryGetAsProperty(root, "Bounds"),
            Property: deArrayifyFeatureProperties(root.Property)
        };
        return feat;
    });
}

function deArrayifyLayerMetadataProperties(json: any[]): Contracts.Query.LayerPropertyMetadata[] {
    return (json || []).map(root => {
        const prop = {
            DisplayName: tryGetAsProperty(root, "DisplayName"),
            Name: tryGetAsProperty(root, "Name"),
            Type: tryGetAsProperty(root, "Type", "int")
        };
        return prop;
    });
}

function deArrayifyLayerMetadata(json: any): Contracts.Query.LayerMetadata {
    const root = json;
    if (root.length != 1) {
        return null;
    }
    const meta = {
        Property: deArrayifyLayerMetadataProperties(root[0].Property)
    };
    return meta;
}

function deArrayifySelectedLayer(json: any[]): Contracts.Query.SelectedLayer[] {
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

function deArrayifySelectedFeatures(json: any): Contracts.Query.SelectedFeatureSet {
    const root = json;
    if (root == null || root.length != 1) {
        return null;
    }
    const sf = {
        SelectedLayer: deArrayifySelectedLayer(root[0].SelectedLayer)
    };
    return sf;
}

function deArrayifyFeatureInformation(json: any): Contracts.Query.QueryMapFeaturesResponse {
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

export function deArrayify(json: any): any {
    if (json["RuntimeMap"]) {
        return deArrayifyRuntimeMap(json.RuntimeMap);
    }
    if (json["FeatureInformation"]) {
        return deArrayifyFeatureInformation(json.FeatureInformation);
    }
    const keys = [];
    for (const k in json) {
        keys.push(k);
    }
    throw new MgError(`Unsure how to process JSON response. Root elements are: (${keys.join(", ")})`);
}

export function buildSelectionXml(selection: Contracts.Query.FeatureSet): string {
    let xml = '<?xml version="1.0" encoding="utf-8"?>';
    xml += '<FeatureSet xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="FeatureSet-1.0.0.xsd">';
    for (const layer of selection.Layer) {
        xml += `<Layer id="${layer["@id"]}">`;
        const cls = layer.Class;
        xml += `<Class id="${cls["@id"]}">`;
        for (const id of cls.ID) {
            xml += `<ID>${id}</ID>`;
        }
        xml += '</Class>';
        xml += '</Layer>';
    }
    xml += '</FeatureSet>';
    return xml;
}