import * as React from "react";
import { IExternalBaseLayer } from "../api/common";
import { RuntimeMap, MapLayer, MapGroup, RuleInfo } from "../api/contracts/runtime-map";
import { ILegendContext, LEGEND_CONTEXT_VALIDATION_MAP } from "./context";
import { BaseLayerSwitcher } from "./base-layer-switcher";
import { isLayer } from "../utils/type-guards";
import { scaleRangeBetween } from "../utils/number";
import { tr } from "../api/i18n";
import * as Constants from "../constants";

const ICON_HEIGHT = 16;
const ICON_WIDTH = 16;
const UL_LIST_STYLE = { listStyle: "none", paddingLeft: 20, marginTop: 2, marginBottom: 2 };
const LI_LIST_STYLE = { listStyle: "none", marginTop: 2, marginBottom: 2 };
const ROW_ITEM_ELEMENT_STYLE = { verticalAlign: "middle" };
const CHK_STYLE = { margin: 0, width: `${ICON_WIDTH - 2}px`, height: `${ICON_HEIGHT - 2}px`, padding: 1, verticalAlign: "middle" };
const EMPTY_STYLE = { display: "inline-block", margin: 0, width: `${ICON_WIDTH}px`, height: `${ICON_HEIGHT}px`, verticalAlign: "middle" };

export type MapElementChangeFunc = (objectId: string, visible: boolean) => void;

interface ILegendLabelProps {
    text: string;
}

const LegendLabel = (props: ILegendLabelProps) => {
    return <span style={{ lineHeight: `${ICON_HEIGHT}px`, verticalAlign: "middle" }}>{props.text}</span>;
};

/**
 * Legend component props
 *
 * @export
 * @interface ILegendProps
 */
export interface ILegendProps {
    map: RuntimeMap;
    showLayers: string[] | undefined;
    showGroups: string[] | undefined;
    hideLayers: string[] | undefined;
    hideGroups: string[] | undefined;
    locale?: string | undefined;
    externalBaseLayers?: IExternalBaseLayer[] | undefined;
    onBaseLayerChanged?: (name: string) => void | undefined;
    onLayerSelectabilityChanged?: (id: string, selectable: boolean) => void | undefined;
    onGroupExpansionChanged?: (id: string, expanded: boolean) => void | undefined;
    onLayerVisibilityChanged?: MapElementChangeFunc | undefined;
    onGroupVisibilityChanged?: MapElementChangeFunc | undefined;
    currentScale: number;
    overrideSelectableLayers?: any | undefined;
    overrideExpandedItems?: any | undefined;
    maxHeight?: number;
    inlineBaseLayerSwitcher: boolean;
}

function getIconUri(iconMimeType: string, iconBase64: string | undefined): string | undefined {
    if (iconBase64) {
        return `data:${iconMimeType};base64,${iconBase64}`;
    } else {
        return undefined;
    }
}

const EmptyNode: React.StatelessComponent<any> = (props) => {
    return <div style={EMPTY_STYLE}>{Constants.NBSP}</div>;
};

interface IRuleNodeProps {
    iconMimeType: string;
    rule: RuleInfo;
}

const RuleNode = (props: IRuleNodeProps) => {
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
    fnVisibilityChanged: GenericEventHandler;
    fnToggleSelectability: GenericEventHandler;
    fnToggleExpansion: GenericEventHandler;
    constructor(props: ILayerNodeProps) {
        super(props);
        this.fnVisibilityChanged = this.onVisibilityChanged.bind(this);
        this.fnToggleSelectability = this.onToggleSelectability.bind(this);
        this.fnToggleExpansion = this.onToggleExpansion.bind(this);
        this.state = {
            layerVisible: props.layer.Visible
        };
    }
    private onVisibilityChanged(e: GenericEvent) {
        this.setState({ layerVisible: e.target.checked });
        this.context.setLayerVisibility(this.props.layer.ObjectId, e.target.checked);
    }
    private onToggleSelectability(e: GenericEvent) {
        const selectable = this.getLayerSelectability(this.props.layer.ObjectId);
        this.context.setLayerSelectability(this.props.layer.ObjectId, !selectable);
    }
    private getExpanded(): boolean {
        let expanded = this.context.getLayerExpanded(this.props.layer.ObjectId);
        if (expanded == null)
            expanded = this.props.layer.ExpandInLegend;
        return expanded;
    }
    private onToggleExpansion(e: GenericEvent) {
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
    componentDidMount() {
        this.setState({
            layerVisible: this.context.getLayerVisibility(this.props.layer)
        });
    }
    componentWillReceiveProps(nextProps: ILayerNodeProps) {
        this.setState({
            layerVisible: this.context.getLayerVisibility(nextProps.layer)
        });
    }
    render(): JSX.Element {
        const { layer } = this.props;
        const label = layer.LegendLabel ? layer.LegendLabel : "";
        const iconMimeType = this.context.getIconMimeType();
        let text = label;
        let icon: string | undefined = this.context.getStdIcon("legend-layer.png");
        let selectable: JSX.Element | undefined;
        if (layer.Selectable === true) {
            selectable = <img style={ROW_ITEM_ELEMENT_STYLE}
                              onClick={this.fnToggleSelectability}
                              src={this.context.getStdIcon(this.getLayerSelectability(layer.ObjectId) ? "icon_select.gif" : "lc_unselect.gif")} />;
        }
        let chkbox: JSX.Element | undefined;
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
                if (scaleRange.FeatureStyle && scaleRange.FeatureStyle.length > 0) {
                    //if (this.debug)
                    //    text = label + " (" + scaleRange.MinScale + " - " + scaleRange.MaxScale + ")";
                    const fts = scaleRange.FeatureStyle[0];
                    const ruleCount = fts.Rule.length;
                    let body: JSX.Element | undefined;
                    let isExpanded = this.getExpanded();
                    if (isExpanded && ruleCount > 1) {
                        icon = this.context.getStdIcon("legend-theme.png");
                        body = <ul style={UL_LIST_STYLE}>
                        {(() => {
                            const items = [] as JSX.Element[];
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

                    let expanded: JSX.Element;
                    if (ruleCount > 1) {
                        expanded = <img style={ROW_ITEM_ELEMENT_STYLE} onClick={this.fnToggleExpansion} src={this.context.getStdIcon(isExpanded ? "toggle.png" : "toggle-expand.png")} />;;
                    } else {
                        expanded = <EmptyNode />;
                    }
                    return <li style={LI_LIST_STYLE} className='layer-node'>{expanded} {chkbox} {selectable} <img style={ROW_ITEM_ELEMENT_STYLE} src={icon} /> <LegendLabel text={text} /> {body}</li>;
                } else { //This is generally a raster
                    icon = this.context.getStdIcon("legend-raster.png");
                }
            }
        }
        return <li style={LI_LIST_STYLE} className='layer-node'><EmptyNode /> {chkbox} {selectable} <img style={ROW_ITEM_ELEMENT_STYLE} src={icon} /> {label}</li>;
    }
}

interface IGroupNodeProps {
    group: MapGroup;
    childItems: (MapLayer|MapGroup)[];
}

class GroupNode extends React.Component<IGroupNodeProps, any> {
    fnVisibilityChanged: GenericEventHandler;
    fnToggleExpansion: GenericEventHandler;
    static contextTypes = LEGEND_CONTEXT_VALIDATION_MAP;
    context: ILegendContext;
    constructor(props: IGroupNodeProps) {
        super(props);
        this.fnVisibilityChanged = this.onVisibilityChanged.bind(this);
        this.fnToggleExpansion = this.onToggleExpansion.bind(this);
        this.state = {
            groupVisible: props.group.Visible
        };
    }
    private onToggleExpansion(e: GenericEvent) {
        const expanded = this.getExpanded();
        this.context.setGroupExpanded(this.props.group.ObjectId, !expanded);
    }
    private onVisibilityChanged(e: GenericEvent) {
        this.setState({ groupVisible: e.target.checked });
        this.context.setGroupVisibility(this.props.group.ObjectId, e.target.checked);
    }
    private getExpanded(): boolean {
        let expanded = this.context.getGroupExpanded(this.props.group.ObjectId);
        if (expanded == null)
            expanded = this.props.group.ExpandInLegend;
        return expanded;
    }
    componentDidMount() {
        this.setState({
            groupVisible: this.context.getGroupVisibility(this.props.group)
        });
    }
    componentWillReceiveProps(nextProps: IGroupNodeProps) {
        this.setState({
            groupVisible: this.context.getGroupVisibility(nextProps.group)
        });
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
                        if (item.DisplayInLegend === true) {
                            if (isLayer(item)) {
                                if (isLayerVisibleAtScale(item, currentScale)) {
                                    //console.debug(`isLayerVisibleAtScale(${item.Name}, ${currentScale}) = true`);
                                    return <LayerNode key={item.ObjectId} layer={item} />;
                                }
                            } else {
                                if (isGroupVisibleAtScale(item, tree, currentScale)) {
                                    //console.debug(`isGroupVisibleAtScale(${item.Name}, ${currentScale}) = true`);
                                    const children = tree.groupChildren[item.ObjectId] || [];
                                    return <GroupNode key={item.ObjectId} group={item} childItems={children} />;
                                }
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
            if (scaleRangeBetween(scale, sr.MinScale, sr.MaxScale)) {
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

/**
 * The Legend component provides a component to view the layer structure, its styles and thematics and
 * the ability to toggle the group/layer visibility of the current map
 *
 * @export
 * @class Legend
 * @extends {React.Component<ILegendProps, any>}
 */
export class Legend extends React.Component<ILegendProps, any> {
    static childContextTypes = LEGEND_CONTEXT_VALIDATION_MAP;
    constructor(props: ILegendProps) {
        super(props);
        this.state = this.setupTree(props.map);
    }
    componentWillReceiveProps(props: ILegendProps) {
        const tree: any = this.setupTree(props.map);
        this.setState(tree);
    }
    getChildContext(): ILegendContext {
        return {
            getStdIcon: this.getStdIcon.bind(this),
            getIconMimeType: this.getIconMimeType.bind(this),
            getChildren: this.getChildren.bind(this),
            getCurrentScale: () => this.props.currentScale,
            getTree: () => this.state.tree,
            getGroupVisibility: this.getGroupVisibility.bind(this),
            getLayerVisibility: this.getLayerVisibility.bind(this),
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
    public getSelectableLayers(): string[] {
        const layers = [] as string[];
        for (const layerId in this.state.LayerMap) {
            const layer: MapLayer = this.state.LayerMap[layerId];
            if (layer.Selectable === true) {
                if (this.props.overrideSelectableLayers[layerId] === false) {
                    continue;
                }
                layers.push(layer.Name);
            }
        }
        return layers;
    }
    private getLayerSelectability(layerId: string): boolean {
        const items: any = this.props.overrideSelectableLayers || {};
        return items[layerId];
    }
    private setLayerSelectability(layerId: string, selectable: boolean): void {
        if (this.props.onLayerSelectabilityChanged != null) {
            this.props.onLayerSelectabilityChanged(layerId, selectable);
        }
    }
    private getGroupExpanded(groupId: string): boolean {
        const items: any = this.props.overrideExpandedItems || {};
        return items[groupId];
    }
    private setGroupExpanded(groupId: string, expanded: boolean): void {
        if (this.props.onGroupExpansionChanged != null) {
            this.props.onGroupExpansionChanged(groupId, expanded);
        }
    }
    private getLayerExpanded(layerId: string): boolean {
        const items: any = this.props.overrideExpandedItems || {};
        return items[layerId];
    }
    private setLayerExpanded(layerId: string, expanded: boolean): void {
        if (this.props.onGroupExpansionChanged != null) {
            this.props.onGroupExpansionChanged(layerId, expanded);
        }
    }
    private getGroupVisibility(group: MapGroup): boolean {
        const { showGroups, hideGroups } = this.props;
        let visible = group.Visible;
        if (showGroups && showGroups.indexOf(group.ObjectId) >= 0) {
            visible = true;
        } else if (hideGroups && hideGroups.indexOf(group.ObjectId) >= 0) {
            visible = false;
        }
        return visible;
    }
    private getLayerVisibility(layer: MapLayer): boolean {
        const { showLayers, hideLayers } = this.props;
        let visible = layer.Visible;
        if (showLayers && showLayers.indexOf(layer.ObjectId) >= 0) {
            visible = true;
        } else if (hideLayers && hideLayers.indexOf(layer.ObjectId) >= 0) {
            visible = false;
        }
        return visible;
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
    private getIconMimeType(): string | undefined {
        return this.props.map.IconMimeType;
    }
    private getChildren(objectId: string): (MapLayer | MapGroup)[] {
        return this.state.tree.groupChildren[objectId] || [];
    }
    private setupTree(map: RuntimeMap) {
        const state: any = {
            Layers: map.Layer,
            Groups: map.Group,
            LayerMap: {},
            GroupMap: {}
        };
        if (map.Layer) {
            for (const layer of map.Layer) {
                state.LayerMap[layer.ObjectId] = layer;
            }
        }
        if (map.Group) {
            for (const group of map.Group) {
                state.GroupMap[group.ObjectId] = group;
            }
        }
        const { Layers, Groups, LayerMap, GroupMap } = state;
        const tree: any = {
            root: [],
            groupChildren: {}
        };
        const { root, groupChildren } = tree;
        if (Groups) {
            const remainingGroups: any = {};
            //1st pass, un-parented groups
            for (const group of Groups) {
                groupChildren[group.ObjectId] = [];
                if (group.ParentId) {
                    remainingGroups[group.ObjectId] = group;
                    continue;
                }
                root.push(group);
            }
            //2nd pass, parented groups
            var itemCount = 0;
            for (const objId in remainingGroups) {
                itemCount++;
            }
            //Whittle down
            while(itemCount > 0) {
                var removeIds = [] as string[];
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
        const { tree } = this.state;
        const { currentScale, externalBaseLayers, onBaseLayerChanged, maxHeight } = this.props;
        const rootItems: (MapLayer|MapGroup)[] = tree.root;

        const rootStyle: React.CSSProperties = {
            overflow: "auto"
        }
        if (maxHeight) {
            rootStyle.maxHeight = maxHeight;
        }

        return <div style={rootStyle}>
            {(() => {
                if (externalBaseLayers != null &&
                    externalBaseLayers.length > 0 &&
                    this.props.inlineBaseLayerSwitcher) {
                    return <div className="pt-card pt-interactive">
                        <h5>{tr("EXTERNAL_BASE_LAYERS", this.props.locale)}</h5>
                        <BaseLayerSwitcher locale={this.props.locale} externalBaseLayers={externalBaseLayers} onBaseLayerChanged={onBaseLayerChanged} />
                    </div>;
                }
            })()}
            <ul style={UL_LIST_STYLE}>
            {rootItems.map(item => {
                if (item.DisplayInLegend === true) {
                    if (isLayer(item)) {
                        if (isLayerVisibleAtScale(item, currentScale)) {
                            //console.debug(`isLayerVisibleAtScale(${item.Name}, ${currentScale}) = true`);
                            return <LayerNode key={item.ObjectId} layer={item} />;
                        }
                    } else {
                        if (isGroupVisibleAtScale(item, tree, currentScale)) {
                            //console.debug(`isGroupVisibleAtScale(${item.Name}, ${currentScale}) = true`);
                            const children = tree.groupChildren[item.ObjectId] || [];
                            return <GroupNode key={item.ObjectId} group={item} childItems={children} />;
                        }
                    }
                }
            })}
            </ul>
        </div>;
    }
}