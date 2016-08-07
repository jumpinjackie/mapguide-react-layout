import * as React from "react";
import { IExternalBaseLayer } from "./map-viewer";
import { RuntimeMap, MapLayer, MapGroup } from "../api/contracts/runtime-map";
import { ILegendContext, LEGEND_CONTEXT_VALIDATION_MAP } from "./context";
import { BaseLayerSwitcher } from "./base-layer-switcher";
import { isLayer } from "../utils/type-guards";
import { betweenInclusive } from "../utils/number";

const ICON_HEIGHT = 16;
const ICON_WIDTH = 16;
const UL_LIST_STYLE = { listStyle: "none", paddingLeft: 20 };
const LI_LIST_STYLE = { listStyle: "none", marginTop: 2, marginBottom: 2 };
const ROW_ITEM_ELEMENT_STYLE = { verticalAlign: "middle" };
const CHK_STYLE = { margin: 0, width: `${ICON_WIDTH - 2}px`, height: `${ICON_HEIGHT - 2}px`, padding: 1, verticalAlign: "middle" };
const EMPTY_STYLE = { display: "inline-block", margin: 0, width: `${ICON_WIDTH}px`, height: `${ICON_HEIGHT}px`, verticalAlign: "middle" };

export type MapElementChangeFunc = (objectId: string, visible: boolean) => void;

const LegendLabel = (props) => {
    return <span style={{ lineHeight: `${ICON_HEIGHT}px`, verticalAlign: "middle" }}>{props.text}</span>;
};

export interface ILegendProps {
    map: RuntimeMap;
    externalBaseLayers?: IExternalBaseLayer[];
    onBaseLayerChanged?: (name: string) => void;
    onLayerVisibilityChanged?: MapElementChangeFunc;
    onGroupVisibilityChanged?: MapElementChangeFunc;
}

function getIconUri(iconMimeType: string, iconBase64: string): string {
    return `data:${iconMimeType};base64,${iconBase64}`;
}

const EmptyNode = (props) => {
    return <div style={EMPTY_STYLE}>{'\u00a0'}</div>;
};

const RuleNode = (props) => {
    const icon = getIconUri(props.iconMimeType, props.rule.Icon);
    const label = (props.rule.LegendLabel ? props.rule.LegendLabel : "");
    return <li style={LI_LIST_STYLE}>
        <EmptyNode /> <img style={ROW_ITEM_ELEMENT_STYLE} src={icon} /> <LegendLabel text={label} />
    </li>;
};

interface ILayerNodeProps {
    layer: MapLayer;
}

class LayerNode extends React.Component<ILayerNodeProps, any> {
    static contextTypes = LEGEND_CONTEXT_VALIDATION_MAP;
    context: ILegendContext;
    fnVisibilityChanged: (e) => void;
    fnToggleSelectability: (e) => void;
    fnToggleExpansion: (e) => void;
    constructor(props) {
        super(props);
        this.fnVisibilityChanged = this.onVisibilityChanged.bind(this);
        this.fnToggleSelectability = this.onToggleSelectability.bind(this);
        this.fnToggleExpansion = this.onToggleExpansion.bind(this);
        this.state = {
            layerVisible: props.layer.Visible
        };
    }
    private onVisibilityChanged(e) {
        this.setState({ layerVisible: e.target.checked });
        this.context.setLayerVisibility(this.props.layer.ObjectId, e.target.checked);
    }
    private onToggleSelectability(e) {
        const selectable = this.getLayerSelectability(this.props.layer.ObjectId);
        this.context.setLayerSelectability(this.props.layer.ObjectId, !selectable);
    }
    private getExpanded(): boolean {
        let expanded = this.context.getLayerExpanded(this.props.layer.ObjectId);
        if (expanded == null)
            expanded = this.props.layer.ExpandInLegend;
        return expanded;
    }
    private onToggleExpansion(e) {
        const expanded = this.getExpanded();
        this.context.setLayerExpanded(this.props.layer.ObjectId, !expanded);
    }
    private getLayerSelectability(layerId: string): boolean {
        let selectable = this.context.getLayerSelectability(layerId);
        if (selectable == null) {
            selectable = this.props.layer.Selectable;
        }
        return selectable;
    }
    render(): JSX.Element {
        const { layer } = this.props;
        const label = layer.LegendLabel ? layer.LegendLabel : "";
        const iconMimeType = this.context.getIconMimeType();
        let text = label;
        let icon = this.context.getStdIcon("legend-layer.png");
        let selectable = null;
        if (layer.Selectable === true) {
            selectable = <img style={ROW_ITEM_ELEMENT_STYLE}
                              onClick={this.fnToggleSelectability}
                              src={this.context.getStdIcon(this.getLayerSelectability(layer.ObjectId) ? "icon_select.gif" : "lc_unselect.gif")} />;
        }
        let chkbox = null;
        if (layer.Type == 1) { //Dynamic
            chkbox = <input type='checkbox' 
                            className='layer-checkbox'
                            style={CHK_STYLE}
                            value={layer.ObjectId}
                            onChange={this.fnVisibilityChanged}
                            checked={(this.state.layerVisible)} />;
        }
        if (layer.ScaleRange) {
            for (const scaleRange of layer.ScaleRange) {
                if (scaleRange.FeatureStyle) {
                    //if (this.debug)
                    //    text = label + " (" + scaleRange.MinScale + " - " + scaleRange.MaxScale + ")";
                    const fts = scaleRange.FeatureStyle[0];
                    const ruleCount = fts.Rule.length;
                    let body = null;
                    let isExpanded = this.getExpanded();
                    if (isExpanded && ruleCount > 1) {
                        icon = this.context.getStdIcon("legend-theme.png");
                        body = <ul style={UL_LIST_STYLE}>
                        {(() => {
                            const items = [];
                            //Test compression
                            var bCompressed = false;
                            if (ruleCount > 3) {
                                bCompressed = !(fts.Rule[1].Icon);
                            }
                            if (bCompressed) {
                                items.push(<RuleNode key={`layer-${layer.ObjectId}-rule-first`} iconMimeType={iconMimeType} rule={fts.Rule[0]} />);
                                items.push(<li style={LI_LIST_STYLE} key={`layer-${layer.ObjectId}-rule-compressed`}><LegendLabel text={`... (${ruleCount - 2} other theme rules)`} /></li>);
                                items.push(<RuleNode key={`layer-${layer.ObjectId}-rule-last`} iconMimeType={iconMimeType} rule={fts.Rule[ruleCount-1]} />);
                            } else {
                                for (var i = 0; i < ruleCount; i++) {
                                    const rule = fts.Rule[i];
                                    items.push(<RuleNode key={`layer-${layer.ObjectId}-rule-${i}`} iconMimeType={iconMimeType} rule={rule} />);
                                }
                            }
                            return items;
                        })()}
                        </ul>;
                    } else { //Collapsed
                        if (ruleCount > 1) {
                            icon = this.context.getStdIcon("legend-theme.png");
                        } else {
                            icon = getIconUri(iconMimeType, fts.Rule[0].Icon);
                        }
                    }

                    let expanded = null;
                    if (ruleCount > 1) {
                        expanded = <img style={ROW_ITEM_ELEMENT_STYLE} onClick={this.fnToggleExpansion} src={this.context.getStdIcon(isExpanded ? "toggle.png" : "toggle-expand.png")} />;;
                    } else {
                        expanded = <EmptyNode />;
                    }
                    return <li style={LI_LIST_STYLE} className='layer-node'>{expanded} {chkbox} {selectable} <img style={ROW_ITEM_ELEMENT_STYLE} src={icon} /> <LegendLabel text={text} /> {body}</li>;
                }
            }
        } else {
            return <li style={LI_LIST_STYLE} className='layer-node'><EmptyNode /> {chkbox} {selectable} <img style={ROW_ITEM_ELEMENT_STYLE} src={icon} /> {label}</li>;
        }
    }
}

interface IGroupNodeProps {
    group: MapGroup;
    childItems: (MapLayer|MapGroup)[];
}

class GroupNode extends React.Component<IGroupNodeProps, any> {
    fnVisibilityChanged: (e) => void;
    fnToggleExpansion: (e) => void;
    static contextTypes = LEGEND_CONTEXT_VALIDATION_MAP;
    context: ILegendContext;
    constructor(props) {
        super(props);
        this.fnVisibilityChanged = this.onVisibilityChanged.bind(this);
        this.fnToggleExpansion = this.onToggleExpansion.bind(this);
        this.state = {
            groupVisible: props.group.Visible
        };
    }
    onToggleExpansion(e) {
        const expanded = this.getExpanded();
        this.context.setGroupExpanded(this.props.group.ObjectId, !expanded);
    }
    onVisibilityChanged(e) {
        this.setState({ groupVisible: e.target.checked });
        this.context.setGroupVisibility(this.props.group.ObjectId, e.target.checked);
    }
    getExpanded(): boolean {
        let expanded = this.context.getGroupExpanded(this.props.group.ObjectId);
        if (expanded == null)
            expanded = this.props.group.ExpandInLegend;
        return expanded;
    }
    render(): JSX.Element {
        const { group } = this.props;
        const currentScale = this.context.getCurrentScale();
        const tree = this.context.getTree();
        const icon = this.context.getStdIcon("folder-horizontal.png");
        const isExpanded = this.getExpanded();
        const expanded = <img style={ROW_ITEM_ELEMENT_STYLE}
                              onClick={this.fnToggleExpansion}
                              src={this.context.getStdIcon(isExpanded ? "toggle.png" : "toggle-expand.png")} />;
        const chkbox = <input type='checkbox' className='group-checkbox' style={CHK_STYLE} value={group.ObjectId} onChange={this.fnVisibilityChanged} checked={(this.state.groupVisible)} />;
        return <li style={LI_LIST_STYLE}>
            <span>{expanded} {chkbox} <img style={ROW_ITEM_ELEMENT_STYLE} src={icon} /> <LegendLabel text={this.props.group.LegendLabel} /></span>
            {(() => {
                if (isExpanded && this.props.childItems.length > 0) {
                    return <ul style={UL_LIST_STYLE}>{this.props.childItems.map(item => {
                        if (isLayer(item)) {
                            if (isLayerVisibleAtScale(item, currentScale)) {
                                return <LayerNode key={item.ObjectId} layer={item} />;
                            }
                        } else {
                            if (isGroupVisibleAtScale(item, tree, currentScale)) {
                                const children = tree.groupChildren[item.ObjectId] || [];
                                return <GroupNode key={item.ObjectId} group={item} childItems={children} />;
                            }
                        }
                    })}</ul>;
                }
            })()}
        </li>;
    }
}

function isLayerVisibleAtScale(layer: MapLayer, scale: number): boolean {
    if (layer.ScaleRange) {
        for (const sr of layer.ScaleRange) {
            if (betweenInclusive(scale, sr.MinScale, sr.MaxScale)) {
                return true;
            }
        }
    }
    return false;
}

function isGroupVisibleAtScale(group: MapGroup, tree: any, scale: number): boolean {
    const children: (MapLayer|MapGroup)[] = tree.groupChildren[group.ObjectId] || [];
    for (const child of children) {
        if (isLayer(child)) {
            if (isLayerVisibleAtScale(child, scale)) {
                return true;
            }
        } else {
            if (isGroupVisibleAtScale(child, tree, scale)) {
                return true;
            }
        }
    }
    return false;
}

export class Legend extends React.Component<ILegendProps, any> {
    static childContextTypes = LEGEND_CONTEXT_VALIDATION_MAP;
    constructor(props: ILegendProps) {
        super(props);
        this.state = this.setupTree(props.map);
    }
    componentWillReceiveProps(props) {
        this.setState(this.setupTree(props.map));
    }
    getChildContext(): ILegendContext {
        return {
            getStdIcon: this.getStdIcon.bind(this),
            getIconMimeType: this.getIconMimeType.bind(this),
            getChildren: this.getChildren.bind(this),
            getCurrentScale: () => this.state.currentScale,
            getTree: () => this.state.tree,
            setGroupVisibility: this.setGroupVisibility.bind(this),
            setLayerVisibility: this.setLayerVisibility.bind(this),
            getLayerSelectability: this.getLayerSelectability.bind(this),
            setLayerSelectability: this.setLayerSelectability.bind(this),
            getGroupExpanded: this.getGroupExpanded.bind(this),
            setGroupExpanded: this.setGroupExpanded.bind(this),
            getLayerExpanded: this.getLayerExpanded.bind(this),
            setLayerExpanded: this.setLayerExpanded.bind(this)
        };
    }
    public getSelectedLayers(): string[] {
        const layers = [];
        for (const layerId in this.state.LayerMap) {
            const layer = this.state.LayerMap[layerId];
            if (layer.Selectable === true) {
                if (this.state.OverrideSelectableLayers[layerId] === false) {
                    continue;
                }
                layers.push(layer.ObjectId);
            }
        }
        return layers;
    }
    private getLayerSelectability(layerId: string): boolean {
        const items: any = this.state.OverrideSelectableLayers;
        return items[layerId];
    }
    private setLayerSelectability(layerId: string, selectable: boolean): void {
        const items: any = this.state.OverrideSelectableLayers;
        items[layerId] = selectable;
        this.setState({ OverrideSelectableLayers: items });
    }
    private getGroupExpanded(layerId: string): boolean {
        const items: any = this.state.OverrideExpandedItems;
        return items[layerId];
    }
    private setGroupExpanded(layerId: string, expanded: boolean): void {
        const items: any = this.state.OverrideExpandedItems;
        items[layerId] = expanded;
        this.setState({ OverrideExpandedItems: items });
    }
    private getLayerExpanded(layerId: string): boolean {
        const items: any = this.state.OverrideExpandedItems;
        return items[layerId];
    }
    private setLayerExpanded(layerId: string, expanded: boolean): void {
        const items: any = this.state.OverrideExpandedItems;
        items[layerId] = expanded;
        this.setState({ OverrideExpandedItems: items });
    }
    private setGroupVisibility(groupId: string, visible: boolean) {
        if (this.props.onGroupVisibilityChanged != null) {
            this.props.onGroupVisibilityChanged(groupId, visible);
        }
    }
    private setLayerVisibility(layerId: string, visible: boolean) {
        if (this.props.onLayerVisibilityChanged != null) {
            this.props.onLayerVisibilityChanged(layerId, visible);
        }
    }
    private getStdIcon(relPath: string): string {
        return `stdicons/${relPath}`;
    }
    private getIconMimeType(): string {
        return this.props.map.IconMimeType;
    }
    private getChildren(objectId: string): (MapLayer | MapGroup)[] {
        return this.state.tree.groupChildren[objectId] || [];
    }
    private setupTree(map) {
        const state: any = {
            Layers: map.Layer,
            Groups: map.Group,
            LayerMap: {},
            GroupMap: {},
            OverrideSelectableLayers: {},
            OverrideExpandedItems: {}
        };
        for (const layer of map.Layer) {
            state.LayerMap[layer.ObjectId] = layer;
        }
        for (const group of map.Group) {
            state.GroupMap[group.ObjectId] = group;
        }
        const { Layers, Groups, LayerMap, GroupMap } = state;
        const tree: any = {
            root: [],
            groupChildren: {}
        };
        const { root, groupChildren } = tree;
        if (Groups) {
            var remainingGroups = {};
            //1st pass, un-parented groups
            for (const group of Groups) {
                if (group.ParentId) {
                    remainingGroups[group.ObjectId] = group;
                    continue;
                }
                root.push(group);
                groupChildren[group.ObjectId] = [];
            }
            //2nd pass, parented groups
            var itemCount = 0;
            for (const objId in remainingGroups) {
                itemCount++;
            }
            //Whittle down
            while(itemCount > 0) {
                var removeIds = [];
                for (const objId in remainingGroups) {
                    var group = remainingGroups[objId];
                    //Do we have a parent?
                    if (typeof(groupChildren[group.ParentId]) != 'undefined') {
                        if (typeof(groupChildren[group.ObjectId]) != 'undefined') {
                            groupChildren[group.ObjectId] = [];
                        }
                        groupChildren[group.ParentId].push(group);
                        removeIds.push(group.ObjectId);
                    }
                }
                for (const id of removeIds) {
                    delete remainingGroups[id];
                }
            
                itemCount = 0;
                for (const objId in remainingGroups) {
                    itemCount++;
                }
            }
        }
        if (Layers) {
            for (const layer of Layers) {
                if (layer.ParentId) {
                    //Do we have a parent?
                    if (typeof(groupChildren[layer.ParentId]) === 'undefined') {
                        groupChildren[layer.ParentId] = [];
                    }
                    groupChildren[layer.ParentId].push(layer);
                } else {
                    root.push(layer);
                }
            }
        }
        state.tree = tree;
        return state;
    }
    render(): JSX.Element {
        const { tree, currentScale } = this.state;
        const { externalBaseLayers, onBaseLayerChanged } = this.props;
        return <div style={{ fontFamily: "Verdana, Sans-serif", fontSize: "10pt" }}>
            {(() => {
                if (externalBaseLayers != null &&
                    externalBaseLayers.length > 0) {
                    return <div>
                        <strong>External Base Layers</strong>
                        <BaseLayerSwitcher externalBaseLayers={externalBaseLayers} onBaseLayerChanged={onBaseLayerChanged} />
                    </div>;
                }
            })()}
            <ul style={UL_LIST_STYLE}>
            {tree.root.map(item => {
                if (isLayer(item) && isLayerVisibleAtScale(item, currentScale)) {
                    return <LayerNode key={item.ObjectId} layer={item} />;
                } else {
                    if (isGroupVisibleAtScale(item, tree, currentScale)) {
                        const children = tree.groupChildren[item.ObjectId] || [];
                        return <GroupNode key={item.ObjectId} group={item} childItems={children} />;
                    }
                }
            })}
            </ul>
        </div>;
    }
}