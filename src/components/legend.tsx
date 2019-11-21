import * as React from "react";
import { IExternalBaseLayer, GenericEvent } from "../api/common";
import { RuntimeMap, MapLayer, MapGroup, RuleInfo } from "../api/contracts/runtime-map";
import { LegendContext } from "./context";
import { BaseLayerSwitcher } from "./base-layer-switcher";
import { isLayer } from "../utils/type-guards";
import { Icon } from "./icon";
import { scaleRangeBetween } from "../utils/number";
import {
    SPRITE_LEGEND_LAYER,
    SPRITE_ICON_SELECT,
    SPRITE_LC_UNSELECT,
    SPRITE_LEGEND_THEME,
    SPRITE_LEGEND_RASTER,
    SPRITE_LEGEND_TOGGLE,
    SPRITE_LEGEND_TOGGLE_EXPAND,
    SPRITE_FOLDER_HORIZONTAL
} from "../constants/assets";
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
    return <li className="layer-rule-node" style={LI_LIST_STYLE}>
        <EmptyNode /> <img style={ROW_ITEM_ELEMENT_STYLE} src={icon} /> <LegendLabel text={label} />
    </li>;
};

export interface ILayerNodeProps {
    layer: MapLayer;
}

export const LayerNode = (props: ILayerNodeProps) => {
    const { layer } = props;
    const legendCtx = React.useContext(LegendContext);
    const [layerVisible, setLayerVisible] = React.useState(legendCtx.getLayerVisibility(props.layer));
    const label = layer.LegendLabel ? layer.LegendLabel : "";
    const iconMimeType = legendCtx.getIconMimeType();

    const onVisibilityChanged = (e: GenericEvent) => {
        setLayerVisible(e.target.checked);
        legendCtx.setLayerVisibility(layer.ObjectId, e.target.checked);
    }
    const onToggleSelectability = (e: GenericEvent) => {
        const selectable = getLayerSelectability(layer.ObjectId);
        legendCtx.setLayerSelectability(layer.ObjectId, !selectable);
    }
    const getExpanded = () => {
        let expanded = legendCtx.getLayerExpanded(layer.ObjectId);
        if (expanded == null)
            expanded = layer.ExpandInLegend;
        return expanded;
    };
    const onToggleExpansion = (e: GenericEvent) => {
        const expanded = getExpanded();
        legendCtx.setLayerExpanded(layer.ObjectId, !expanded);
    }
    const getLayerSelectability = (layerId: string) => {
        let selectable = legendCtx.getLayerSelectability(layerId);
        if (selectable == null) {
            selectable = layer.Selectable;
        }
        return selectable;
    }

    let text = label;
    let icon = <Icon style={ROW_ITEM_ELEMENT_STYLE} spriteClass={SPRITE_LEGEND_LAYER} />;
    let selectable: JSX.Element | undefined;
    if (layer.Selectable === true) {
        selectable = <Icon style={ROW_ITEM_ELEMENT_STYLE}
            onClick={onToggleSelectability}
            spriteClass={getLayerSelectability(layer.ObjectId) ? SPRITE_ICON_SELECT : SPRITE_LC_UNSELECT} />;
    }
    let chkbox: JSX.Element | undefined;
    if (layer.Type == 1) { //Dynamic
        chkbox = <input type='checkbox'
            className='layer-checkbox'
            style={CHK_STYLE}
            value={layer.ObjectId}
            onChange={onVisibilityChanged}
            checked={(layerVisible)} />;
    }
    const tooltip = label;
    const nodeClassName = "layer-node";
    let nodeStyle: React.CSSProperties = { whiteSpace: "nowrap", overflow: "hidden", ...LI_LIST_STYLE };
    if (layer.ScaleRange) {
        for (const scaleRange of layer.ScaleRange) {
            if (scaleRange.FeatureStyle && scaleRange.FeatureStyle.length > 0) {
                const ruleElements = [];
                //if (debug)
                //    text = label + " (" + scaleRange.MinScale + " - " + scaleRange.MaxScale + ")";
                let body: JSX.Element | undefined;
                let isExpanded = getExpanded();
                let totalRuleCount = 0;
                for (const fts of scaleRange.FeatureStyle) {
                    totalRuleCount += fts.Rule.length;
                }
                if (isExpanded && totalRuleCount > 1) {
                    icon = <Icon style={ROW_ITEM_ELEMENT_STYLE} spriteClass={SPRITE_LEGEND_THEME} />;

                    for (let fi = 0; fi < scaleRange.FeatureStyle.length; fi++) {
                        const fts = scaleRange.FeatureStyle[fi];
                        const ftsRuleCount = fts.Rule.length;
                        //Test compression
                        let bCompressed = false;
                        if (ftsRuleCount > 3) {
                            bCompressed = !(fts.Rule[1].Icon);
                        }
                        if (bCompressed) {
                            ruleElements.push(<RuleNode key={`layer-${layer.ObjectId}-style-${fi}-rule-first`} iconMimeType={iconMimeType} rule={fts.Rule[0]} />);
                            ruleElements.push(<li style={LI_LIST_STYLE} key={`layer-${layer.ObjectId}-style-${fi}-rule-compressed`}><LegendLabel text={`... (${ftsRuleCount - 2} other theme rules)`} /></li>);
                            ruleElements.push(<RuleNode key={`layer-${layer.ObjectId}-style-${fi}-rule-last`} iconMimeType={iconMimeType} rule={fts.Rule[ftsRuleCount - 1]} />);
                        } else {
                            for (let i = 0; i < ftsRuleCount; i++) {
                                const rule = fts.Rule[i];
                                ruleElements.push(<RuleNode key={`layer-${layer.ObjectId}-style-${fi}-rule-${i}`} iconMimeType={iconMimeType} rule={rule} />);
                            }
                        }
                    }
                } else { //Collapsed
                    if (totalRuleCount > 1) {
                        icon = <Icon style={ROW_ITEM_ELEMENT_STYLE} spriteClass={SPRITE_LEGEND_THEME} />;
                    } else {
                        const uri = getIconUri(iconMimeType, scaleRange.FeatureStyle[0].Rule[0].Icon);
                        if (uri) {
                            icon = <Icon style={ROW_ITEM_ELEMENT_STYLE} url={uri} />;
                        }
                    }
                }

                if (ruleElements.length > 0) {
                    body = <ul style={UL_LIST_STYLE}>{ruleElements}</ul>;
                }

                let expanded: JSX.Element;
                if (totalRuleCount > 1) {
                    expanded = <Icon style={ROW_ITEM_ELEMENT_STYLE} onClick={onToggleExpansion} spriteClass={isExpanded ? SPRITE_LEGEND_TOGGLE : SPRITE_LEGEND_TOGGLE_EXPAND} />;
                } else {
                    expanded = <EmptyNode />;
                }
                return <li title={tooltip} style={nodeStyle} className={nodeClassName}>{expanded} {chkbox} {selectable} {icon} <LegendLabel text={text} /> {body}</li>;
            } else { //This is generally a raster
                icon = <Icon style={ROW_ITEM_ELEMENT_STYLE} spriteClass={SPRITE_LEGEND_RASTER} />;
            }
        }
    }
    return <li title={tooltip} style={nodeStyle} className={nodeClassName}><EmptyNode /> {chkbox} {selectable} {icon} {label}</li>;
};

export interface IGroupNodeProps {
    group: MapGroup;
    childItems: (MapLayer | MapGroup)[];
}

export const GroupNode = (props: IGroupNodeProps) => {
    const { group } = props;
    const [groupVisible, setGroupVisible] = React.useState(group.Visible);
    const legendCtx = React.useContext(LegendContext);
    const getExpanded = () => {
        let expanded = legendCtx.getGroupExpanded(group.ObjectId);
        if (expanded == null)
            expanded = group.ExpandInLegend;
        return expanded;
    };
    const onToggleExpansion = (e: GenericEvent) => {
        const expanded = getExpanded();
        legendCtx.setGroupExpanded(group.ObjectId, !expanded);
    };
    const onVisibilityChanged = (e: GenericEvent) => {
        setGroupVisible(e.target.checked);
        legendCtx.setGroupVisibility(group.ObjectId, e.target.checked);
    };
    const currentScale = legendCtx.getCurrentScale();
    const tree = legendCtx.getTree();
    const icon = <Icon style={ROW_ITEM_ELEMENT_STYLE} spriteClass={SPRITE_FOLDER_HORIZONTAL} />;
    const isExpanded = getExpanded();
    const expanded = <Icon style={ROW_ITEM_ELEMENT_STYLE}
        onClick={onToggleExpansion}
        spriteClass={isExpanded ? SPRITE_LEGEND_TOGGLE : SPRITE_LEGEND_TOGGLE_EXPAND} />;
    const chkbox = <input type='checkbox' className='group-checkbox' style={CHK_STYLE} value={group.ObjectId} onChange={onVisibilityChanged} checked={(groupVisible)} />;
    const tooltip = group.LegendLabel;
    const nodeClassName = "group-node";
    let nodeStyle: React.CSSProperties = { whiteSpace: "nowrap", overflow: "hidden", ...LI_LIST_STYLE };
    return <li title={tooltip} style={nodeStyle} className={nodeClassName}>
        <span>{expanded} {chkbox} {icon} <LegendLabel text={group.LegendLabel} /></span>
        {(() => {
            if (isExpanded && props.childItems.length > 0) {
                return <ul style={UL_LIST_STYLE}>{props.childItems.map(item => {
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
};

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
    const children: (MapLayer | MapGroup)[] = tree.groupChildren[group.ObjectId] || [];
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
    constructor(props: ILegendProps) {
        super(props);
        this.state = this.setupTree(props.map);
    }
    componentDidUpdate(prevProps: ILegendProps) {
        //Only rebuild tree on change of active map
        if (prevProps.map != this.props.map) {
            const tree: any = this.setupTree(this.props.map);
            this.setState(tree);
        }
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
            while (itemCount > 0) {
                var removeIds = [] as string[];
                for (const objId in remainingGroups) {
                    var group = remainingGroups[objId];
                    //Do we have a parent?
                    if (typeof (groupChildren[group.ParentId]) != 'undefined') {
                        if (typeof (groupChildren[group.ObjectId]) != 'undefined') {
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
                    if (typeof (groupChildren[layer.ParentId]) === 'undefined') {
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
        const rootItems: (MapLayer | MapGroup)[] = tree.root;

        const rootStyle: React.CSSProperties = {};
        if (maxHeight) {
            rootStyle.maxHeight = maxHeight;
        }

        const providerImpl = {
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
        return <LegendContext.Provider value={providerImpl}>
            <div style={rootStyle}>
                {(() => {
                    if (externalBaseLayers != null &&
                        externalBaseLayers.length > 0 &&
                        this.props.inlineBaseLayerSwitcher) {
                        return <div className="bp3-card bp3-interactive">
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
            </div>
        </LegendContext.Provider>;
    }
}