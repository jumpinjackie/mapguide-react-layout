import * as React from "react";
import { IExternalBaseLayer, GenericEvent } from "../api/common";
import { RuntimeMap, MapLayer, MapGroup, RuleInfo } from "../api/contracts/runtime-map";
import { LegendContext, ILegendContext } from "./context";
import { BaseLayerSwitcher } from "./base-layer-switcher";
import { isLayer } from "../utils/type-guards";
import { Icon, ImageIcon } from "./icon";
import { Icon as BpIcon } from "@blueprintjs/core";
import { scaleRangeBetween } from "../utils/number";
/*
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
*/
import { tr } from "../api/i18n";
import * as Constants from "../constants";

const UL_LIST_STYLE = (baseSize: number) => ({ listStyle: "none", paddingLeft: baseSize + 4, marginTop: 2, marginBottom: 2 });
const LI_LIST_STYLE = { listStyle: "none", marginTop: 2, marginBottom: 2 };
const ROW_ITEM_ELEMENT_STYLE = { verticalAlign: "middle" };
const CHK_STYLE = (baseSize: number) => ({ margin: 0, width: `${baseSize - 2}px`, height: `${baseSize - 2}px`, padding: 1, verticalAlign: "middle" });
const EMPTY_STYLE = (baseSize: number) => ({ display: "inline-block", margin: 0, width: `${baseSize}px`, height: `${baseSize}px`, verticalAlign: "middle" });

export type MapElementChangeFunc = (objectId: string, visible: boolean) => void;

interface ILegendLabelProps {
    text: string;
    baseSize: number;
}

const LegendLabel = (props: ILegendLabelProps) => {
    return <span style={{ lineHeight: `${props.baseSize}px`, verticalAlign: "middle" }}>{props.text}</span>;
};

/**
 * Legend component props
 *
 * @export
 * @interface ILegendProps
 */
export interface ILegendProps {
    baseIconSize?: number;
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

function getIconUri(iconMimeType: string | undefined, iconBase64: string | undefined): string | undefined {
    if (iconMimeType && iconBase64) {
        return `data:${iconMimeType};base64,${iconBase64}`;
    } else {
        return undefined;
    }
}

interface IEmptyNodeProps {
    baseSize: number;
}

const EmptyNode: React.StatelessComponent<IEmptyNodeProps> = (props: IEmptyNodeProps) => {
    return <div style={EMPTY_STYLE(props.baseSize)}>{Constants.NBSP}</div>;
};

interface IRuleNodeProps {
    iconMimeType: string | undefined;
    rule: RuleInfo;
    baseSize: number;
}

const RuleNode = (props: IRuleNodeProps) => {
    const icon = getIconUri(props.iconMimeType, props.rule.Icon);
    const label = (props.rule.LegendLabel ? props.rule.LegendLabel : "");
    return <li className="layer-rule-node" style={LI_LIST_STYLE}>
        <EmptyNode baseSize={props.baseSize} /> <img style={ROW_ITEM_ELEMENT_STYLE} src={icon} /> <LegendLabel baseSize={props.baseSize} text={label} />
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
    let icon = <Icon baseSize={legendCtx.getBaseIconSize()} style={ROW_ITEM_ELEMENT_STYLE}>
        {bs => <BpIcon icon="layer" iconSize={bs} />}
    </Icon> //spriteClass={SPRITE_LEGEND_LAYER} />;
    let selectable: JSX.Element | undefined;
    if (layer.Selectable === true) {
        //NOTE: As we've intercepted the BP icons package, we've re-appropriated the "disable" icon for
        //disabling selection
        selectable = <Icon baseSize={legendCtx.getBaseIconSize()} style={ROW_ITEM_ELEMENT_STYLE} onClick={onToggleSelectability}>
            {bs => <BpIcon icon={getLayerSelectability(layer.ObjectId) ? "select" : "disable"} iconSize={bs} />}
        </Icon>;
        //spriteClass={getLayerSelectability(layer.ObjectId) ? SPRITE_ICON_SELECT : SPRITE_LC_UNSELECT} />;
    }
    let chkbox: JSX.Element | undefined;
    if (layer.Type == 1) { //Dynamic
        chkbox = <input type='checkbox'
            className='layer-checkbox'
            style={CHK_STYLE(legendCtx.getBaseIconSize())}
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
                    icon = <Icon baseSize={legendCtx.getBaseIconSize()} style={ROW_ITEM_ELEMENT_STYLE}>
                        {bs => <BpIcon icon="multi-select" iconSize={bs} />}
                    </Icon>; //spriteClass={SPRITE_LEGEND_THEME} />;

                    for (let fi = 0; fi < scaleRange.FeatureStyle.length; fi++) {
                        const fts = scaleRange.FeatureStyle[fi];
                        const ftsRuleCount = fts.Rule.length;
                        //Test compression
                        let bCompressed = false;
                        if (ftsRuleCount > 3) {
                            bCompressed = !(fts.Rule[1].Icon);
                        }
                        if (bCompressed) {
                            ruleElements.push(<RuleNode baseSize={legendCtx.getBaseIconSize()} key={`layer-${layer.ObjectId}-style-${fi}-rule-first`} iconMimeType={iconMimeType} rule={fts.Rule[0]} />);
                            ruleElements.push(<li style={LI_LIST_STYLE} key={`layer-${layer.ObjectId}-style-${fi}-rule-compressed`}><LegendLabel baseSize={legendCtx.getBaseIconSize()} text={`... (${ftsRuleCount - 2} other theme rules)`} /></li>);
                            ruleElements.push(<RuleNode baseSize={legendCtx.getBaseIconSize()} key={`layer-${layer.ObjectId}-style-${fi}-rule-last`} iconMimeType={iconMimeType} rule={fts.Rule[ftsRuleCount - 1]} />);
                        } else {
                            for (let i = 0; i < ftsRuleCount; i++) {
                                const rule = fts.Rule[i];
                                ruleElements.push(<RuleNode baseSize={legendCtx.getBaseIconSize()} key={`layer-${layer.ObjectId}-style-${fi}-rule-${i}`} iconMimeType={iconMimeType} rule={rule} />);
                            }
                        }
                    }
                } else { //Collapsed
                    if (totalRuleCount > 1) {
                        icon = <Icon style={ROW_ITEM_ELEMENT_STYLE} baseSize={legendCtx.getBaseIconSize()}>
                            {bs => <BpIcon icon="multi-select" iconSize={bs} />}
                        </Icon>; //spriteClass={SPRITE_LEGEND_THEME} />;
                    } else {
                        const uri = getIconUri(iconMimeType, scaleRange.FeatureStyle[0].Rule[0].Icon);
                        if (uri) {
                            icon = <ImageIcon style={ROW_ITEM_ELEMENT_STYLE} url={uri} />;
                        }
                    }
                }

                if (ruleElements.length > 0) {
                    body = <ul style={UL_LIST_STYLE(legendCtx.getBaseIconSize())}>{ruleElements}</ul>;
                }

                let expanded: JSX.Element;
                if (totalRuleCount > 1) {
                    expanded = <Icon baseSize={legendCtx.getBaseIconSize()} style={ROW_ITEM_ELEMENT_STYLE} onClick={onToggleExpansion}>
                        {bs => <BpIcon icon={isExpanded ? "chevron-down" : "chevron-right"} iconSize={bs} />}
                    </Icon>;// spriteClass={isExpanded ? SPRITE_LEGEND_TOGGLE : SPRITE_LEGEND_TOGGLE_EXPAND} />;
                } else {
                    expanded = <EmptyNode baseSize={legendCtx.getBaseIconSize()} />;
                }
                return <li title={tooltip} style={nodeStyle} className={nodeClassName}>{expanded} {chkbox} {selectable} {icon} <LegendLabel baseSize={legendCtx.getBaseIconSize()} text={text} /> {body}</li>;
            } else { //This is generally a raster
                icon = <Icon baseSize={legendCtx.getBaseIconSize()} style={ROW_ITEM_ELEMENT_STYLE}>
                    {bs => <BpIcon icon="media" iconSize={bs} />}
                </Icon>; // spriteClass={SPRITE_LEGEND_RASTER} />;
            }
        }
    }
    return <li title={tooltip} style={nodeStyle} className={nodeClassName}><EmptyNode baseSize={legendCtx.getBaseIconSize()} /> {chkbox} {selectable} {icon} {label}</li>;
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
    const icon = <Icon baseSize={legendCtx.getBaseIconSize()} style={ROW_ITEM_ELEMENT_STYLE}>
        {bs => <BpIcon icon="folder-close" iconSize={bs} />}
    </Icon>; //spriteClass={SPRITE_FOLDER_HORIZONTAL} />;
    const isExpanded = getExpanded();
    const expanded = <Icon baseSize={legendCtx.getBaseIconSize()} style={ROW_ITEM_ELEMENT_STYLE} onClick={onToggleExpansion}>
        {bs => <BpIcon icon={isExpanded ? "chevron-down" : "chevron-right"} iconSize={bs} />}
    </Icon>; //spriteClass={isExpanded ? SPRITE_LEGEND_TOGGLE : SPRITE_LEGEND_TOGGLE_EXPAND} />;
    const chkbox = <input type='checkbox' className='group-checkbox' style={CHK_STYLE(legendCtx.getBaseIconSize())} value={group.ObjectId} onChange={onVisibilityChanged} checked={(groupVisible)} />;
    const tooltip = group.LegendLabel;
    const nodeClassName = "group-node";
    let nodeStyle: React.CSSProperties = { whiteSpace: "nowrap", overflow: "hidden", ...LI_LIST_STYLE };
    return <li title={tooltip} style={nodeStyle} className={nodeClassName}>
        <span>{expanded} {chkbox} {icon} <LegendLabel baseSize={legendCtx.getBaseIconSize()} text={group.LegendLabel} /></span>
        {(() => {
            if (isExpanded && props.childItems.length > 0) {
                return <ul style={UL_LIST_STYLE(legendCtx.getBaseIconSize())}>{props.childItems.map(item => {
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

function setupTree(map: RuntimeMap) {
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

const DEFAULT_ICON_SIZE = 16;

/**
 * The Legend component provides a component to view the layer structure, its styles and thematics and
 * the ability to toggle the group/layer visibility of the current map
 * @param props 
 */
export const Legend = (props: ILegendProps) => {
    const [state, setState] = React.useState(setupTree(props.map));
    const { tree } = state;
    const { currentScale, externalBaseLayers, onBaseLayerChanged, maxHeight } = props;
    const rootItems: (MapLayer | MapGroup)[] = tree.root;
    React.useEffect(() => {
        const tree: any = setupTree(props.map);
        setState(tree);
    }, [props.map]);
    const getLayerSelectability = (layerId: string): boolean => {
        const items: any = props.overrideSelectableLayers || {};
        return items[layerId];
    };
    const setLayerSelectability = (layerId: string, selectable: boolean): void => {
        props.onLayerSelectabilityChanged?.(layerId, selectable);
    };
    const getGroupExpanded = (groupId: string): boolean => {
        const items: any = props.overrideExpandedItems || {};
        return items[groupId];
    };
    const setGroupExpanded = (groupId: string, expanded: boolean): void => {
        props.onGroupExpansionChanged?.(groupId, expanded);
    };
    const getLayerExpanded = (layerId: string): boolean => {
        const items: any = props.overrideExpandedItems || {};
        return items[layerId];
    };
    const setLayerExpanded = (layerId: string, expanded: boolean): void => {
        props.onGroupExpansionChanged?.(layerId, expanded);
    };
    const getGroupVisibility = (group: MapGroup): boolean => {
        const { showGroups, hideGroups } = props;
        let visible = group.Visible;
        if (showGroups && showGroups.indexOf(group.ObjectId) >= 0) {
            visible = true;
        } else if (hideGroups && hideGroups.indexOf(group.ObjectId) >= 0) {
            visible = false;
        }
        return visible;
    };
    const getLayerVisibility = (layer: MapLayer): boolean => {
        const { showLayers, hideLayers } = props;
        let visible = layer.Visible;
        if (showLayers && showLayers.indexOf(layer.ObjectId) >= 0) {
            visible = true;
        } else if (hideLayers && hideLayers.indexOf(layer.ObjectId) >= 0) {
            visible = false;
        }
        return visible;
    };
    const setGroupVisibility = (groupId: string, visible: boolean) => {
        props.onGroupVisibilityChanged?.(groupId, visible);
    };
    const setLayerVisibility = (layerId: string, visible: boolean) => {
        props.onLayerVisibilityChanged?.(layerId, visible);
    };
    const getIconMimeType = (): string | undefined => {
        return props.map.IconMimeType;
    };
    const getChildren = (objectId: string): (MapLayer | MapGroup)[] => {
        return state.tree.groupChildren[objectId] || [];
    };
    const rootStyle: React.CSSProperties = {};
    if (maxHeight) {
        rootStyle.maxHeight = maxHeight;
    }
    const providerImpl: ILegendContext = {
        getBaseIconSize: () => props.baseIconSize ?? DEFAULT_ICON_SIZE,
        getIconMimeType: getIconMimeType,
        getChildren: getChildren,
        getCurrentScale: () => props.currentScale,
        getTree: () => state.tree,
        getGroupVisibility: getGroupVisibility,
        getLayerVisibility: getLayerVisibility,
        setGroupVisibility: setGroupVisibility,
        setLayerVisibility: setLayerVisibility,
        getLayerSelectability: getLayerSelectability,
        setLayerSelectability: setLayerSelectability,
        getGroupExpanded: getGroupExpanded,
        setGroupExpanded: setGroupExpanded,
        getLayerExpanded: getLayerExpanded,
        setLayerExpanded: setLayerExpanded
    };
    return <LegendContext.Provider value={providerImpl}>
        <div style={rootStyle}>
            {(() => {
                if (externalBaseLayers != null &&
                    externalBaseLayers.length > 0 &&
                    props.inlineBaseLayerSwitcher) {
                    return <div className="bp3-card bp3-interactive">
                        <h5>{tr("EXTERNAL_BASE_LAYERS", props.locale)}</h5>
                        <BaseLayerSwitcher locale={props.locale} externalBaseLayers={externalBaseLayers} onBaseLayerChanged={onBaseLayerChanged} />
                    </div>;
                }
            })()}
            <ul style={UL_LIST_STYLE(props.baseIconSize ?? DEFAULT_ICON_SIZE)}>
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