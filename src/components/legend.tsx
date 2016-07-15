import * as React from "react";
import { RuntimeMap, MapElement, MapLayer, MapGroup } from "../api/contracts/runtime-map";

export const LEGEND_CONTEXT_VALIDATION_MAP: React.ValidationMap<any> = {
    getChildren: React.PropTypes.func.isRequired
};

export interface ILegendContext {
    getChildren(objectId: string): (MapLayer | MapGroup)[];
}

export interface ILegendProps {
    map: RuntimeMap;
}

function isLayer(layer: any): layer is MapLayer {
    return layer.LayerDefinition !== undefined;
}

interface ILayerNodeProps {
    layer: MapLayer;
}

class LayerNode extends React.Component<ILayerNodeProps, any> {
    constructor(props) {
        super(props);
    }
    render(): JSX.Element {
        return <li>LAYER: {this.props.layer.LegendLabel}</li>;
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
            getChildren: this.getChildren.bind(this)
        };
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