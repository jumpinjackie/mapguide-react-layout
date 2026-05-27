import { n as MDF_INFINITY, t as MgError } from "../viewer-debug.js";
//#region src/api/builders/deArrayify.ts
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
function buildPropertyGetter() {
	return (el, name, type = "string") => {
		return tryGetAsProperty(el, name, type);
	};
}
function tryGetAsProperty(el, name, type = "string") {
	if (!el[name]) return null;
	else if (el[name].length === 1) {
		const val = el[name][0];
		switch (type) {
			case "int": return parseInt(val, 10);
			case "float": return parseFloat(val);
			case "boolean": return val.toLowerCase() === "true";
			default: return val;
		}
	}
}
function deArrayifyRules(rules) {
	const getter = buildPropertyGetter();
	return rules.map((r) => {
		return {
			LegendLabel: getter(r, "LegendLabel"),
			Filter: getter(r, "Filter"),
			Icon: getter(r, "Icon")
		};
	});
}
function deArrayifyFeatureStyles(fts) {
	if (!fts) return [];
	const getter = buildPropertyGetter();
	return fts.map((ft) => {
		return {
			Type: getter(ft, "Type", "int"),
			Rule: deArrayifyRules(ft.Rule)
		};
	});
}
function deArrayifyScaleRanges(scales) {
	if (!scales) return [{
		MinScale: 0,
		MaxScale: MDF_INFINITY,
		FeatureStyle: []
	}];
	const getter = buildPropertyGetter();
	return scales.map((sc) => {
		return {
			MinScale: getter(sc, "MinScale", "float"),
			MaxScale: getter(sc, "MaxScale", "float"),
			FeatureStyle: deArrayifyFeatureStyles(sc.FeatureStyle)
		};
	});
}
function deArrayifyFeatureSourceInfo(fs) {
	if (!fs || fs.length !== 1) return;
	const getter = buildPropertyGetter();
	return {
		ResourceId: getter(fs[0], "ResourceId"),
		ClassName: getter(fs[0], "ClassName"),
		Geometry: getter(fs[0], "Geometry")
	};
}
function deArrayifyLayers(layers) {
	if (!layers) return layers;
	const getter = buildPropertyGetter();
	return layers.map((lyr) => {
		const layer = {
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
		if (!lyr.ScaleRange) layer.Selectable = false;
		return layer;
	});
}
function deArrayifyGroups(groups) {
	if (!groups) return void 0;
	const getter = buildPropertyGetter();
	return groups.map((grp) => {
		return {
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
	});
}
function deArrayifyCoordinateSystem(cs) {
	if (!cs || cs.length !== 1) throw new MgError("Malformed input. Expected CoordinateSystem element");
	const getter = buildPropertyGetter();
	return {
		Wkt: getter(cs[0], "Wkt"),
		MentorCode: getter(cs[0], "MentorCode"),
		EpsgCode: getter(cs[0], "EpsgCode"),
		MetersPerUnit: getter(cs[0], "MetersPerUnit", "float")
	};
}
function deArrayifyCoordinate(coord) {
	if (!coord || coord.length !== 1) throw new MgError("Malformed input. Expected coordinate array");
	const getter = buildPropertyGetter();
	return {
		X: getter(coord[0], "X", "float"),
		Y: getter(coord[0], "Y", "float")
	};
}
function deArrayifyExtents(extents) {
	if (!extents || extents.length !== 1) throw new MgError("Malformed input. Expected extent element");
	return {
		LowerLeftCoordinate: deArrayifyCoordinate(extents[0].LowerLeftCoordinate),
		UpperRightCoordinate: deArrayifyCoordinate(extents[0].UpperRightCoordinate)
	};
}
function deArrayifyFiniteDisplayScales(fds) {
	if (!fds) return void 0;
	return fds.map(parseFloat);
}
function deArrayifyRuntimeMap(json) {
	const root = json;
	const getter = buildPropertyGetter();
	return {
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
		FiniteDisplayScale: deArrayifyFiniteDisplayScales(root.FiniteDisplayScale),
		TilePixelRatio: getter(root, "TilePixelRatio", "int"),
		TileSetProvider: getter(root, "TileSetProvider")
	};
}
function deArrayifyFeatureSetClass(json) {
	const root = json;
	const getter = buildPropertyGetter();
	if (root.length != 1) throw new MgError("Malformed input. Expected Class element");
	return {
		"@id": getter(root[0], "@id"),
		ID: root[0].ID
	};
}
function deArrayifyFeatureSetLayers(json) {
	const getter = buildPropertyGetter();
	return (json || []).map((root) => {
		return {
			"@id": getter(root, "@id"),
			"@name": getter(root, "@name"),
			Class: deArrayifyFeatureSetClass(root.Class)
		};
	});
}
function deArrayifyFeatureSet(json) {
	const root = json;
	if (root == null || root.length != 1) return;
	return { Layer: deArrayifyFeatureSetLayers(root[0].Layer) };
}
function deArrayifyInlineSelectionImage(json) {
	const root = json;
	if (root == null || root.length != 1) return;
	const getter = buildPropertyGetter();
	return {
		MimeType: getter(root[0], "MimeType"),
		Content: getter(root[0], "Content")
	};
}
function deArrayifyFeatureProperties(json) {
	const getter = buildPropertyGetter();
	return (json || []).map((root) => {
		return {
			Name: getter(root, "Name"),
			Value: getter(root, "Value")
		};
	});
}
function deArrayifyFeatures(json) {
	const getter = buildPropertyGetter();
	return (json || []).map((root) => {
		return {
			Bounds: getter(root, "Bounds"),
			Property: deArrayifyFeatureProperties(root.Property),
			SelectionKey: getter(root, "SelectionKey")
		};
	});
}
function deArrayifyLayerMetadataProperties(json) {
	const getter = buildPropertyGetter();
	return (json || []).map((root) => {
		return {
			DisplayName: getter(root, "DisplayName"),
			Name: getter(root, "Name"),
			Type: getter(root, "Type", "int")
		};
	});
}
function deArrayifyLayerMetadata(json) {
	const root = json;
	if (root == null || root.length != 1) return;
	return { Property: deArrayifyLayerMetadataProperties(root[0].Property) };
}
function deArrayifySelectedLayer(json) {
	const getter = buildPropertyGetter();
	return (json || []).map((root) => {
		return {
			"@id": getter(root, "@id"),
			"@name": getter(root, "@name"),
			Feature: deArrayifyFeatures(root.Feature),
			LayerMetadata: deArrayifyLayerMetadata(root.LayerMetadata)
		};
	});
}
function deArrayifySelectedFeatures(json) {
	const root = json;
	if (root == null || root.length != 1) return;
	return { SelectedLayer: deArrayifySelectedLayer(root[0].SelectedLayer) };
}
function deArrayifyFeatureInformation(json) {
	const root = json;
	const getter = buildPropertyGetter();
	return {
		FeatureSet: deArrayifyFeatureSet(root.FeatureSet),
		Hyperlink: getter(root, "Hyperlink"),
		InlineSelectionImage: deArrayifyInlineSelectionImage(root.InlineSelectionImage),
		SelectedFeatures: deArrayifySelectedFeatures(root.SelectedFeatures),
		Tooltip: getter(root, "Tooltip")
	};
}
function deArrayifyWebLayoutControl(json) {
	const root = json;
	if (root == null || root.length != 1) throw new MgError("Malformed input. Expected control element");
	return { Visible: buildPropertyGetter()(root[0], "Visible", "boolean") };
}
function deArrayifyWebLayoutInfoPane(json) {
	const root = json;
	if (root == null || root.length != 1) throw new MgError("Malformed input. Expected InformationPane element");
	const getter = buildPropertyGetter();
	return {
		Visible: getter(root[0], "Visible", "boolean"),
		Width: getter(root[0], "Width", "int"),
		LegendVisible: getter(root[0], "LegendVisible", "boolean"),
		PropertiesVisible: getter(root[0], "PropertiesVisible", "boolean")
	};
}
function deArrayifyWebLayoutInitialView(json) {
	const root = json;
	if (root == null || root.length != 1) return;
	const getter = buildPropertyGetter();
	return {
		CenterX: getter(root[0], "CenterX", "float"),
		CenterY: getter(root[0], "CenterY", "float"),
		Scale: getter(root[0], "Scale", "float")
	};
}
function deArrayifyWebLayoutMap(json) {
	const root = json;
	if (root == null || root.length != 1) throw new MgError("Malformed input. Expected Map element");
	const getter = buildPropertyGetter();
	return {
		ResourceId: getter(root[0], "ResourceId"),
		InitialView: deArrayifyWebLayoutInitialView(root[0].InitialView),
		HyperlinkTarget: getter(root[0], "HyperlinkTarget"),
		HyperlinkTargetFrame: getter(root[0], "HyperlinkTargetFrame")
	};
}
function deArrayifyTaskButton(json) {
	const root = json;
	if (root == null || root.length != 1) throw new MgError("Malformed input. Expected TaskButton element");
	const getter = buildPropertyGetter();
	return {
		Name: getter(root[0], "Name"),
		Tooltip: getter(root[0], "Tooltip"),
		Description: getter(root[0], "Description"),
		ImageURL: getter(root[0], "ImageURL"),
		DisabledImageURL: getter(root[0], "DisabledImageURL")
	};
}
function deArrayifyWebLayoutTaskBar(json) {
	const root = json;
	if (root == null || root.length != 1) throw new MgError("Malformed input. Expected TaskBar element");
	const taskbar = {
		Visible: buildPropertyGetter()(root[0], "Visible", "boolean"),
		Home: deArrayifyTaskButton(root[0].Home),
		Forward: deArrayifyTaskButton(root[0].Forward),
		Back: deArrayifyTaskButton(root[0].Back),
		Tasks: deArrayifyTaskButton(root[0].Tasks),
		MenuButton: []
	};
	if (root[0].MenuButton) for (const mb of root[0].MenuButton) taskbar.MenuButton.push(deArrayifyUIItem(mb));
	return taskbar;
}
function deArrayifyWebLayoutTaskPane(json) {
	const root = json;
	if (root == null || root.length != 1) throw new MgError("Malformed input. Expected TaskPane element");
	const getter = buildPropertyGetter();
	return {
		Visible: getter(root[0], "Visible", "boolean"),
		InitialTask: getter(root[0], "InitialTask"),
		Width: getter(root[0], "Width", "int"),
		TaskBar: deArrayifyWebLayoutTaskBar(root[0].TaskBar)
	};
}
function deArrayifyUIItem(json) {
	const root = json;
	const getter = buildPropertyGetter();
	const func = getter(root, "Function");
	const item = { Function: func };
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
			for (const si of root.SubItem) item.SubItem.push(deArrayifyUIItem(si));
			break;
	}
	return item;
}
function deArrayifyItemContainer(json, name) {
	const root = json;
	if (root == null || root.length != 1) throw new MgError("Malformed input. Expected container element");
	const getter = buildPropertyGetter();
	const container = {};
	container[name] = [];
	for (const item of root[0][name]) container[name].push(deArrayifyUIItem(item));
	if (typeof root[0].Visible != "undefined") container.Visible = getter(root[0], "Visible", "boolean");
	return container;
}
function deArrayifyWebLayoutSearchResultColumnSet(json) {
	const root = json;
	if (root == null || root.length != 1) throw new MgError("Malformed input. Expected ResultColumns element");
	const getter = buildPropertyGetter();
	const res = { Column: [] };
	for (const col of root[0].Column) res.Column.push({
		Name: getter(col, "Name"),
		Property: getter(col, "Property")
	});
	return res;
}
function deArrayifyWebLayoutInvokeURLLayerSet(json) {
	const root = json;
	if (root == null || root.length != 1) return;
	return { Layer: root[0].Layer };
}
function deArrayifyWebLayoutParameterPairs(json) {
	const root = json;
	const pairs = [];
	if (!root) return pairs;
	const getter = buildPropertyGetter();
	for (const kvp of root) pairs.push({
		Key: getter(kvp, "Key"),
		Value: getter(kvp, "Value")
	});
	return pairs;
}
function deArrayifyCommand(json) {
	const root = json;
	const getter = buildPropertyGetter();
	const cmd = {
		"@xsi:type": getter(root, "@xsi:type"),
		Name: getter(root, "Name"),
		Label: getter(root, "Label"),
		Tooltip: getter(root, "Tooltip"),
		Description: getter(root, "Description"),
		ImageURL: getter(root, "ImageURL"),
		DisabledImageURL: getter(root, "DisabledImageURL"),
		TargetViewer: getter(root, "TargetViewer")
	};
	if (typeof root.Action != "undefined") cmd.Action = getter(root, "Action");
	if (typeof root.Target != "undefined") cmd.Target = getter(root, "Target");
	if (typeof root.TargetFrame != "undefined") cmd.TargetFrame = getter(root, "TargetFrame");
	if (typeof root.Layer != "undefined") {
		cmd.Layer = getter(root, "Layer");
		cmd.Prompt = getter(root, "Prompt");
		cmd.ResultColumns = deArrayifyWebLayoutSearchResultColumnSet(root.ResultColumns);
		cmd.Filter = getter(root, "Filter");
		cmd.MatchLimit = getter(root, "MatchLimit", "int");
	}
	if (typeof root.URL != "undefined") cmd.URL = getter(root, "URL");
	if (typeof root.DisableIfSelectionEmpty != "undefined") {
		cmd.LayerSet = deArrayifyWebLayoutInvokeURLLayerSet(root.LayerSet);
		cmd.AdditionalParameter = deArrayifyWebLayoutParameterPairs(root.AdditionalParameter);
		cmd.DisableIfSelectionEmpty = getter(root, "DisableIfSelectionEmpty", "boolean");
	}
	if (typeof root.Script != "undefined") cmd.Script = getter(root, "Script");
	return cmd;
}
function deArrayifyWebLayoutCommandSet(json) {
	const root = json;
	if (root == null || root.length != 1) throw new MgError("Malformed input. Expected CommandSet element");
	const set = { Command: [] };
	if (root[0].Command) for (const cmd of root[0].Command) set.Command.push(deArrayifyCommand(cmd));
	return set;
}
function deArrayifyWebLayout(json) {
	const root = json;
	const getter = buildPropertyGetter();
	return {
		Title: getter(root, "Title"),
		Map: deArrayifyWebLayoutMap(root.Map),
		EnablePingServer: getter(root, "EnablePingServer", "boolean"),
		SelectionColor: getter(root, "SelectionColor"),
		PointSelectionBuffer: getter(root, "PointSelectionBuffer", "int"),
		MapImageFormat: getter(root, "MapImageFormat"),
		SelectionImageFormat: getter(root, "SelectionImageFormat"),
		StartupScript: getter(root, "StartupScript"),
		ToolBar: deArrayifyItemContainer(root.ToolBar, "Button"),
		InformationPane: deArrayifyWebLayoutInfoPane(root.InformationPane),
		ContextMenu: deArrayifyItemContainer(root.ContextMenu, "MenuItem"),
		TaskPane: deArrayifyWebLayoutTaskPane(root.TaskPane),
		StatusBar: deArrayifyWebLayoutControl(root.StatusBar),
		ZoomControl: deArrayifyWebLayoutControl(root.ZoomControl),
		CommandSet: deArrayifyWebLayoutCommandSet(root.CommandSet)
	};
}
function deArrayifyMapGroup(json) {
	const root = json;
	if (root == null) throw new MgError("Malformed input. Expected MapGroup element");
	const getter = buildPropertyGetter();
	const mapGroup = {
		"@id": getter(root, "@id", "string"),
		InitialView: void 0,
		Map: []
	};
	if (root.InitialView) {
		const iview = root.InitialView[0];
		mapGroup.InitialView = {
			CenterX: getter(iview, "CenterX", "float"),
			CenterY: getter(iview, "CenterY", "float"),
			Scale: getter(iview, "Scale", "float")
		};
	}
	if (root.Map) for (const m of root.Map) mapGroup.Map.push({
		Type: getter(m, "Type", "string"),
		Extension: deArrayifyExtension(m.Extension)
	});
	if (root.Extension) mapGroup.Extension = deArrayifyExtension(root.Extension);
	return mapGroup;
}
function deArrayifyMapSet(json) {
	const root = json;
	if (root == null || root.length != 1) throw new MgError("Malformed input. Expected MapSet element");
	const set = { MapGroup: [] };
	if (root[0].MapGroup) for (const map of root[0].MapGroup) set.MapGroup.push(deArrayifyMapGroup(map));
	return set;
}
function deArrayifyContainerItems(json) {
	const items = [];
	const getter = buildPropertyGetter();
	if (json && json.length) for (const i of json) switch (getter(i, "Function", "string")) {
		case "Separator":
			items.push({ Function: "Separator" });
			break;
		case "Widget":
			items.push({
				Function: "Widget",
				Widget: getter(i, "Widget", "string")
			});
			break;
		case "Flyout":
			items.push({
				Function: "Flyout",
				Label: getter(i, "Label", "string"),
				Tooltip: getter(i, "Tooltip", "string"),
				ImageUrl: getter(i, "ImageUrl", "string"),
				ImageClass: getter(i, "ImageClass", "string"),
				Item: deArrayifyContainerItems(i.Item || [])
			});
			break;
	}
	return items;
}
function deArrayifyContainer(json) {
	const containers = [];
	const getter = buildPropertyGetter();
	for (const c of json) containers.push({
		Name: getter(c, "Name", "string"),
		Type: getter(c, "Type", "string"),
		Extension: deArrayifyExtension(c.Extension),
		Item: deArrayifyContainerItems(c.Item)
	});
	return containers;
}
function deArrayifyWidgets(json) {
	const widgets = [];
	for (const w of json) if (w["@xsi:type"] == "UiWidgetType") {
		const uiw = deArrayifyUiWidget(w);
		widgets.push(uiw);
	} else widgets.push(deArrayifyWidget(w));
	return widgets;
}
function deArrayifyWidget(json) {
	const root = json;
	if (root == null) throw new MgError("Malformed input. Expected Widget element");
	const getter = buildPropertyGetter();
	return {
		WidgetType: getter(root, "@xsi:type", "string"),
		Name: getter(root, "Name", "string"),
		Type: getter(root, "Type", "string"),
		Extension: deArrayifyExtension(root.Extension)
	};
}
function deArrayifyExtension(json, arrayCheck = true) {
	const root = json;
	if (root == null) return null;
	if (arrayCheck && root.length != 1) throw new MgError("Malformed input. Expected Extension element");
	const getter = buildPropertyGetter();
	const ext = {};
	for (const key in root[0]) if (Array.isArray(root[0][key])) switch (key) {
		case "AdditionalParameter":
			{
				const params = [];
				for (const p of root[0][key]) params.push({
					Key: getter(p, "Key", "string"),
					Value: getter(p, "Value", "string")
				});
				ext[key] = params;
			}
			break;
		case "Projection":
			ext[key] = root[0][key];
			break;
		default:
			ext[key] = getter(root[0], key, "string");
			break;
	}
	else ext[key] = deArrayifyExtension(root[0][key], false);
	return ext;
}
function deArrayifyUiWidget(json) {
	const root = json;
	if (root == null) throw new MgError("Malformed input. Expected Widget element");
	const getter = buildPropertyGetter();
	return {
		WidgetType: getter(root, "@xsi:type", "string"),
		ImageUrl: getter(root, "ImageUrl", "string"),
		ImageClass: getter(root, "ImageClass", "string"),
		Label: getter(root, "Label", "string"),
		Tooltip: getter(root, "Tooltip", "string"),
		StatusText: getter(root, "StatusText", "string"),
		Disabled: getter(root, "Disabled", "boolean"),
		Name: getter(root, "Name", "string"),
		Type: getter(root, "Type", "string"),
		Extension: deArrayifyExtension(root.Extension)
	};
}
function deArrayifyMapWidget(json) {
	const root = json;
	if (root == null || root.length != 1) throw new MgError("Malformed input. Expected MapWidget element");
	const getter = buildPropertyGetter();
	return {
		WidgetType: getter(root, "@xsi:type", "string"),
		MapId: getter(root, "MapId", "string"),
		Name: getter(root, "Name", "string"),
		Type: getter(root, "Type", "string"),
		Extension: deArrayifyExtension(root.Extension)
	};
}
function deArrayifyWidgetSet(json) {
	const widgetSet = [];
	for (const ws of json) widgetSet.push({
		Container: deArrayifyContainer(ws.Container),
		MapWidget: deArrayifyMapWidget(ws.MapWidget),
		Widget: deArrayifyWidgets(ws.Widget)
	});
	return widgetSet;
}
function deArrayifyFlexibleLayout(json) {
	const root = json;
	const getter = buildPropertyGetter();
	return {
		Title: getter(root, "Title"),
		TemplateUrl: getter(root, "TemplateUrl"),
		MapSet: deArrayifyMapSet(root.MapSet),
		WidgetSet: deArrayifyWidgetSet(root.WidgetSet),
		Extension: deArrayifyExtension(root.Extension)
	};
}
function deArrayifyMapDefinitionGroups(json) {
	const groups = [];
	const getter = buildPropertyGetter();
	for (const g of json) groups.push({
		Name: getter(g, "Name"),
		ExpandInLegend: getter(g, "ExpandInLegend", "boolean"),
		ShowInLegend: getter(g, "ShowInLegend", "boolean"),
		Visible: getter(g, "Visible", "boolean"),
		LegendLabel: getter(g, "LegendLabel"),
		Group: getter(g, "Group")
	});
	return groups;
}
function deArrayifyMapDefinitionLayers(json) {
	const layers = [];
	const getter = buildPropertyGetter();
	for (const g of json) layers.push({
		Name: getter(g, "Name"),
		ResourceId: getter(g, "ResourceId"),
		ExpandInLegend: getter(g, "ExpandInLegend", "boolean"),
		ShowInLegend: getter(g, "ShowInLegend", "boolean"),
		Selectable: getter(g, "Selectable", "boolean"),
		Visible: getter(g, "Visible", "boolean"),
		LegendLabel: getter(g, "LegendLabel"),
		Group: getter(g, "Group")
	});
	return layers;
}
function deArrayifyMapDefinition(json) {
	var _root$MapLayer, _root$MapLayerGroup;
	const root = json;
	const getter = buildPropertyGetter();
	const eGetter = buildPropertyGetter();
	const resp = {
		BackgroundColor: getter(root, "BackgroundColor"),
		CoordinateSystem: getter(root, "CoordinateSystem"),
		Extents: {
			MinX: eGetter(root.Extents[0], "MinX", "float"),
			MinY: eGetter(root.Extents[0], "MinY", "float"),
			MaxX: eGetter(root.Extents[0], "MaxX", "float"),
			MaxY: eGetter(root.Extents[0], "MaxY", "float")
		},
		MapLayer: deArrayifyMapDefinitionLayers((_root$MapLayer = root.MapLayer) !== null && _root$MapLayer !== void 0 ? _root$MapLayer : []),
		MapLayerGroup: deArrayifyMapDefinitionGroups((_root$MapLayerGroup = root.MapLayerGroup) !== null && _root$MapLayerGroup !== void 0 ? _root$MapLayerGroup : [])
	};
	if (root.TileSetSource) resp.TileSetSource = { ResourceId: buildPropertyGetter()(root.TileSetSource, "ResourceId") };
	return resp;
}
function deArrayifyTileSetDefinitionLayers(json) {
	const getter = buildPropertyGetter();
	const layers = [];
	for (const l of json) layers.push({
		Name: getter(l, "Name"),
		ResourceId: getter(l, "ResourceId"),
		Selectable: getter(l, "Selectable", "boolean"),
		ShowInLegend: getter(l, "ShowInLegend", "boolean"),
		LegendLabel: getter(l, "LegendLabel"),
		ExpandInLegend: getter(l, "ExpandInLegend", "boolean")
	});
	return layers;
}
function deArrayifyTileSetDefinitionGroups(json) {
	const getter = buildPropertyGetter();
	const groups = [];
	for (const g of json) groups.push({
		Name: getter(g, "Name"),
		Visible: getter(g, "Visible", "boolean"),
		ShowInLegend: getter(g, "ShowInLegend", "boolean"),
		ExpandInLegend: getter(g, "ExpandInLegend", "boolean"),
		LegendLabel: getter(g, "LegendLabel"),
		BaseMapLayer: deArrayifyTileSetDefinitionLayers(g.BaseMapLayer)
	});
	return groups;
}
function deArrayifyTileSetDefinitionParamList(root) {
	const getter = buildPropertyGetter();
	const params = [];
	for (const p of root) params.push({
		Name: getter(p, "Name"),
		Value: getter(p, "Value")
	});
	return params;
}
function deArrayifyTileSetDefinitionParams(root) {
	return {
		TileProvider: buildPropertyGetter()(root, "TileProvider"),
		Parameter: deArrayifyTileSetDefinitionParamList(root[0].Parameter)
	};
}
function deArrayifyTileSetDefinition(json) {
	const root = json;
	const eGetter = buildPropertyGetter();
	return {
		Extents: {
			MinX: eGetter(root.Extents[0], "MinX", "float"),
			MinY: eGetter(root.Extents[0], "MinY", "float"),
			MaxX: eGetter(root.Extents[0], "MaxX", "float"),
			MaxY: eGetter(root.Extents[0], "MaxY", "float")
		},
		TileStoreParameters: deArrayifyTileSetDefinitionParams(json.TileStoreParameters),
		BaseMapLayerGroup: deArrayifyTileSetDefinitionGroups(json.BaseMapLayerGroup)
	};
}
/**
* Indicates if the de-arrayified result is a {@link WebLayout}
* 
* @since 0.14
*/
function isWebLayout(arg) {
	return arg.CommandSet != null && arg.ContextMenu != null && arg.Map != null;
}
/**
* Indicates if the de-arrayified result is an {@link ApplicationDefinition}
* 
* @since 0.14
*/
function isAppDef(arg) {
	return arg.WidgetSet != null;
}
/**
* Indicates if the de-arrayified result is a {@link MapDefinition}
* 
* @since 0.14
*/
function isMapDef(arg) {
	return arg.Extents != null && arg.BackgroundColor != null && arg.CoordinateSystem != null && arg.MapLayer != null && arg.MapLayerGroup != null;
}
/**
* Indicates if the de-arrayified result is a {@link TileSetDefinition}
* 
* @since 0.14
*/
function isTileSet(arg) {
	return arg.Extents != null && arg.TileStoreParameters != null && arg.BaseMapLayerGroup != null;
}
/**
* Indicates if the de-arrayified result is a {@link SiteVersionResponse}
* 
* @since 0.14
*/
function isSiteVersion(arg) {
	return arg.Version != null;
}
/**
* Indicates if the de-arrayified result is a {@link QueryMapFeaturesResponse}
* 
* @since 0.14
*/
function isQueryMapFeaturesResponse(arg) {
	return arg.FeatureSet != null || arg.Hyperlink != null || arg.InlineSelectionImage != null || arg.SelectedFeatures != null || arg.Tooltip != null;
}
/**
* Normalizes the given JSON object to match the content model of its original XML form
*
* @param {*} json The JSON object to normalize
* @returns {*} The normalized JSON object
*/
function deArrayify(json) {
	if (json["RuntimeMap"]) return deArrayifyRuntimeMap(json.RuntimeMap);
	if (json["FeatureInformation"]) return deArrayifyFeatureInformation(json.FeatureInformation);
	if (json["WebLayout"]) return deArrayifyWebLayout(json.WebLayout);
	if (json["ApplicationDefinition"]) return deArrayifyFlexibleLayout(json.ApplicationDefinition);
	if (json["MapDefinition"]) return deArrayifyMapDefinition(json.MapDefinition);
	if (json["TileSetDefinition"]) return deArrayifyTileSetDefinition(json.TileSetDefinition);
	if (json["SiteVersion"]) return { Version: json.SiteVersion.Version[0] };
	const keys = [];
	for (const k in json) keys.push(k);
	throw new MgError(`Unsure how to process JSON response. Root elements are: (${keys.join(", ")})`);
}
//#endregion
export { deArrayify, isAppDef, isMapDef, isQueryMapFeaturesResponse, isSiteVersion, isTileSet, isWebLayout };

//# sourceMappingURL=deArrayify-debug.js.map