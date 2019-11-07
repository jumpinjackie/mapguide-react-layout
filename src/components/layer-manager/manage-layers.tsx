import * as React from "react";
import { ILayerInfo, GenericEvent } from "../../api/common";
import { safePropAccess } from '../../utils/safe-prop';
import { ITreeNode, Tree, Button, Intent, ButtonGroup } from '@blueprintjs/core';

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
        if (prevProps.layers != nextProps.layers) {
            const nodes = nextProps.layers.map(li => ({ id: li.name, label: li.name, secondaryLabel: li.type, icon: "layer" }));
            this.setState({ nodes: nodes });
        }
    }
    private onMoveLayerDown = () => {
        const { selectedNode } = this.state;
        if (selectedNode) {
            safePropAccess(this.props, "onMoveLayerDown", func => func(selectedNode.id));
        }
    }
    private onMoveLayerUp = () => {
        const { selectedNode } = this.state;
        if (selectedNode) {
            safePropAccess(this.props, "onMoveLayerUp", func => func(selectedNode.id));
        }
    }
    private onRemoveLayer = () => {
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
            <ButtonGroup fill>
                <Button intent={Intent.DANGER} icon="delete" onClick={this.onRemoveLayer} disabled={selectedNode == null || selectedNode.id.indexOf("mapguide") == 0}>Remove</Button>
                <Button intent={Intent.PRIMARY} icon="caret-up" onClick={this.onMoveLayerUp} disabled={selectedNode == null || selectedNode.id.indexOf("mapguide") == 0 || selectedNode == nodes[0]}></Button>
                <Button intent={Intent.PRIMARY} icon="caret-down" onClick={this.onMoveLayerDown} disabled={selectedNode == null || selectedNode.id.indexOf("mapguide") == 0 || selectedNode == nodes[nodes.length - 1]}></Button>
            </ButtonGroup>
            <Tree contents={nodes} onNodeClick={this.handleNodeClick} />
        </div>;
    }
}