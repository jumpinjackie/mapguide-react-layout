import * as React from "react";
import { ILayerInfo, GenericEvent, GenericEventHandler } from "../../api/common";
import { safePropAccess } from '../../utils/safe-prop';
import { ITreeNode } from '@blueprintjs/core/lib/esm/components/tree/treeNode';
import { Tree } from '@blueprintjs/core/lib/esm/components/tree/tree';

/**
 * @hidden
 */
export interface IManageLayersProps {
    layers: ILayerInfo[];
    onRemoveLayer: (name: string) => void;
    onMoveLayerUp: (name: string) => void;
    onMoveLayerDown: (name: string) => void;
}

/**
 * @hidden
 */
export class ManageLayers extends React.Component<IManageLayersProps, any> {
    constructor(props: IManageLayersProps) {
        super(props);
        this.state = {
            selectedNode: null,
            nodes: props.layers.map(li => ({ id: li.name, label: li.name, secondaryLabel: li.type, icon: "layer" }))
        };
    }
    componentDidUpdate(prevProps: IManageLayersProps) {
        const nextProps = this.props;
        const nodes = nextProps.layers.map(li => ({ id: li.name, label: li.name, secondaryLabel: li.type, icon: "layer" }));
        this.setState({ nodes: nodes });
    }
    private onMoveLayerDown = (e: GenericEvent) => {
        const { selectedNode } = this.state;
        if (selectedNode) {
            safePropAccess(this.props, "onMoveLayerDown", func => func(selectedNode.id));
        }
    }
    private onMoveLayerUp = (e: GenericEvent) => {
        const { selectedNode } = this.state;
        if (selectedNode) {
            safePropAccess(this.props, "onMoveLayerUp", func => func(selectedNode.id));
        }
    }
    private onRemoveLayer = (e: GenericEvent) => {
        const { selectedNode } = this.state;
        if (selectedNode) {
            safePropAccess(this.props, "onRemoveLayer", func => func(selectedNode.id));
            this.setState({ selectedNode: null });
        }
    }
    private forEachNode(nodes: ITreeNode[], callback: (node: ITreeNode) => void) {
        if (nodes == null) {
            return;
        }
        for (const node of nodes) {
            callback(node);
            if (node.childNodes) {
                this.forEachNode(node.childNodes, callback);
            }
        }
    }
    private handleNodeClick = (nodeData: ITreeNode, _nodePath: number[], e: React.MouseEvent<HTMLElement>) => {
        const originallySelected = nodeData.isSelected;
        if (!e.shiftKey) {
            this.forEachNode(this.state.nodes, n => (n.isSelected = false));
        }
        nodeData.isSelected = originallySelected == null ? true : !originallySelected;
        this.setState({ ...this.state, ...{ selectedNode: (nodeData.isSelected ? nodeData : null) } });
    };
    render(): JSX.Element {
        const { selectedNode, nodes } = this.state;
        return <div>
            <hr />
            <div className="pt-button-group pt-fill">
                <button type="button" className="pt-button pt-intent-danger delete" onClick={this.onRemoveLayer} disabled={selectedNode == null || selectedNode.id.indexOf("mapguide") == 0}>Remove</button>
                <button type="button" className="pt-button pt-intent-primary caret-up" onClick={this.onMoveLayerUp} disabled={selectedNode == null || selectedNode.id.indexOf("mapguide") == 0 || selectedNode == nodes[0]}></button>
                <button type="button" className="pt-button pt-intent-primary caret-down" onClick={this.onMoveLayerDown} disabled={selectedNode == null || selectedNode.id.indexOf("mapguide") == 0 || selectedNode == nodes[nodes.length - 1]}></button>
            </div>
            <Tree contents={nodes} onNodeClick={this.handleNodeClick} />
        </div>;
    }
}