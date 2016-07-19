import * as React from "react";
import { RuntimeMap, MapElement, MapLayer, MapGroup } from "../api/contracts/runtime-map";

export const LEGEND_CONTEXT_VALIDATION_MAP: React.ValidationMap<any> = {
    getStdIcon: React.PropTypes.func.isRequired,
    getIconMimeType: React.PropTypes.func.isRequired,
    getChildren: React.PropTypes.func.isRequired
};

export interface ILegendContext {
    getStdIcon(iconRelPath: string): string;
    getIconMimeType(): string;
    getChildren(objectId: string): (MapLayer | MapGroup)[];
}

export interface ILegendProps {
    map: RuntimeMap;
}

function getIconUri(iconMimeType: string, iconBase64: string): string {
    return `data:${iconMimeType};base64,${iconBase64}`;
}

function isLayer(layer: any): layer is MapLayer {
    return layer.LayerDefinition !== undefined;
}

const RuleNode = (props) => {
    const icon = getIconUri(props.iconMimeType, props.rule.Icon);
    const label = (props.rule.LegendLabel ? props.rule.LegendLabel : "");
    return <li>
        <img src={icon} /> {label}
    </li>;
};

interface ILayerNodeProps {
    layer: MapLayer;
}

class LayerNode extends React.Component<ILayerNodeProps, any> {
    static contextTypes = LEGEND_CONTEXT_VALIDATION_MAP;
    context: ILegendContext;
    fnVisibilityChanged: (e) => void;
    constructor(props) {
        super(props);
        this.fnVisibilityChanged = this.onVisibilityChanged.bind(this);
        this.state = {
            layerVisible: props.layer.Visible
        };
    }
    onVisibilityChanged(e) {
        this.setState({ layerVisible: e.target.checked });
    }
    render(): JSX.Element {
        const { layer } = this.props;
        const label = layer.LegendLabel ? layer.LegendLabel : "";
        const iconMimeType = this.context.getIconMimeType();
        let text = label;
        let icon = "legend-layer.png";

        let chkbox = null;
        if (layer.Type == 1) //Dynamic
            chkbox = <input type='checkbox' className='layer-checkbox' value={layer.ObjectId} onChange={this.fnVisibilityChanged} checked={(this.state.layerVisible)} />;

        if (layer.ScaleRange) {
            for (const scaleRange of layer.ScaleRange) {
                if (scaleRange.FeatureStyle) {
                    //if (this.debug)
                    //    text = label + " (" + scaleRange.MinScale + " - " + scaleRange.MaxScale + ")";
                    const fts = scaleRange.FeatureStyle[0];
                    const ruleCount = fts.Rule.length;
                    let body = null;
                    if (ruleCount > 1) {
                        icon = this.context.getStdIcon("lc_theme.gif");
                        body = <ul>
                        {(() => {
                            const items = [];
                            //Test compression
                            var bCompressed = false;
                            if (ruleCount > 3) {
                                bCompressed = !(fts.Rule[1].Icon);
                            }
                            if (bCompressed) {
                                items.push(<RuleNode key={`layer-${layer.ObjectId}-rule-first`} iconMimeType={iconMimeType} rule={fts.Rule[0]} />);
                                items.push(<li key={`layer-${layer.ObjectId}-rule-compressed`}>... ({ruleCount - 2} other theme rules)</li>);
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
                    } else {
                        icon = getIconUri(iconMimeType, fts.Rule[0].Icon);
                    }                    
                    return <li className='layer-node'>{chkbox}<img src={icon} /> {text} {body}</li>;
                }
            }
        } else {
            return <li className='layer-node'>{chkbox} LAYER: {label}</li>;
        }
    }
}

interface IGroupNodeProps {
    group: MapGroup;
    childItems: (MapLayer|MapGroup)[];
}

class GroupNode extends React.Component<IGroupNodeProps, any> {
    static contextTypes = LEGEND_CONTEXT_VALIDATION_MAP;
    context: ILegendContext;
    constructor(props) {
        super(props);
    }
    render(): JSX.Element {
        return <li>
            <span>GROUP: {this.props.group.LegendLabel}</span>
            {(() => {
                if (this.props.childItems.length > 0) {
                    return <ul>{this.props.childItems.map(item => {
                        if (isLayer(item)) {
                            return <LayerNode key={item.ObjectId} layer={item} />;
                        } else {
                            const children = this.context.getChildren(item.ObjectId);
                            return <GroupNode key={item.ObjectId} group={item} childItems={children} />;
                        }
                    })}</ul>;
                }
            })()}
        </li>;
    }
}

export class Legend extends React.Component<ILegendProps, any> {
    static childContextTypes = LEGEND_CONTEXT_VALIDATION_MAP;
    constructor(props: ILegendProps) {
        super(props);
        this.state = this.setupTree(props.map);
    }
    getChildContext(): ILegendContext {
        return {
            getStdIcon: this.getStdIcon.bind(this),
            getIconMimeType: this.getIconMimeType.bind(this),
            getChildren: this.getChildren.bind(this)
        };
    }
    private getStdIcon(relPath: string): string {
        return relPath;
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
            GroupMap: {}
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
            //for (var i = 0; i < Groups.length; i++) {
            for (const group of Groups) {
                if (group.ParentId) {
                    remainingGroups[group.ObjectId] = group;
                    continue;
                }
                //var el = this.createGroupElement(group);
                //groupElMap[group.ObjectId] = el;
                //this.rootEl.append(el);
                root.push(group);
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
                        //var el = this.createGroupElement(group);
                        groupChildren[group.ObjectId] = [];
                        groupChildren[group.ParentId].push(group);
                        removeIds.push(group.ObjectId);
                    }
                }
                //for (var i = 0; i < removeIds.length; i++) {
                for (const id in removeIds) {
                    delete remainingGroups[id];
                }
            
                itemCount = 0;
                for (const objId in remainingGroups) {
                    itemCount++;
                }
            }
        }
        if (Layers) {
            //for (var i = 0; i < Layers.length; i++) {
            for (const layer of Layers) {
                /*
                var els = this.createLayerElements(layer);
                for (var j = 0; j < els.length; j++) {
                    if (layer.ParentId) {
                        groupChildren[layer.ParentId].push(els[j]);
                    } else {
                        this.rootEl.append(els[j]);
                    }
                }
                */
                if (layer.ParentId) {
                    //Do we have a parent?
                    if (typeof(groupChildren[layer.ParentId]) === 'undefined') {
                        //var el = this.createGroupElement(group);
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
        return <div>
            <ul>
            {tree.root.map(item => {
                if (isLayer(item)) {
                    return <LayerNode key={item.ObjectId} layer={item} />;
                } else {
                    const children = tree.groupChildren[item.ObjectId] || [];
                    return <GroupNode key={item.ObjectId} group={item} childItems={children} />;
                }
            })}
            </ul>
        </div>;
    }
}