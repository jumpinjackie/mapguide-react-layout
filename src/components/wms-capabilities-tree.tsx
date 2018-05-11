import * as React from "react";
import { tr } from "../api/i18n";
import { WmsCapabilitiesDocument, WMSPublishedLayer, WMSLayerStyle } from "../api/common";
import { Tree, ITreeNode, Tooltip } from "@blueprintjs/core";
import * as shortid from "shortid";

type WMSLayerStylePair = [WMSPublishedLayer, WMSLayerStyle[]];

function convertWmsLayerNodes(layers: WMSLayerStylePair[], locale: string | undefined): ITreeNode[] {
    return layers.map(pair => {
        const [l, styles] = pair;
        const tt = <div className="wms-layer-info-tooltip">
            <p>{tr("WMS_LAYER_NAME", locale, { name: l.Name })}</p>
            <p>{tr("WMS_LAYER_TITLE", locale, { title: l.Title })}</p>
            <p>{tr("WMS_LAYER_ABSTRACT", locale, { abstract: l.Abstract })}</p>
            <p>{tr("WMS_ADD_LAYER_PROMPT", locale)}</p>
        </div>;
        return {
            id: l.Name,
            iconName: "layer",
            label: <Tooltip content={tt}>{l.Name}</Tooltip>
        } as ITreeNode;
    });
}

export interface IWmsCapabilitiesTreeProps {
    capabilities: WmsCapabilitiesDocument;
    locale: string | undefined;
    onAddLayer: (name: string, style: WMSLayerStyle | undefined) => void;
}

export class WmsCapabilitiesTree extends React.Component<IWmsCapabilitiesTreeProps, any> {
    private _layerStyles: { [name: string]: WMSLayerStyle[] };
    constructor(props: IWmsCapabilitiesTreeProps) {
        super(props);
        this._layerStyles = {};
        this.state = {
            content: this.convertToTreeNodes(props.capabilities, props.locale)
        }
    }
    private extractWmsLayers(caps: WmsCapabilitiesDocument): WMSLayerStylePair[] {
        const layers = [] as WMSLayerStylePair[];
        const { Layer, ...rootLayer } = caps.Capability.Layer;
        if (rootLayer.Name) { //Must have name to be considered
            layers.push([ rootLayer, [] ]);
        }
        if (caps.Capability.Layer.Layer) {
            for (const layer of caps.Capability.Layer.Layer) {
                layers.push([ layer, layer.Style ]);
            }
        }
        return layers;
    }
    private convertToTreeNodes(caps: WmsCapabilitiesDocument, locale: string | undefined): ITreeNode[] {
        this._layerStyles = {};
        const layers = this.extractWmsLayers(caps);
        for (const pair of layers) {
            const [layer, styles] = pair;
            this._layerStyles[layer.Name] = [];
            if (styles.length) {
                for (const style of styles) {
                    this._layerStyles[layer.Name].push(style);
                }
            }
        }
        return [
            { id: `version_${shortid()}`, icon: "tag", label: tr("WMS_VERSION", locale, { version: caps.version }) },
            { id: `service_name_${shortid()}`, icon: "info-sign", label: tr("WMS_SERVICE_NAME", locale, { name: caps.Service.Name }) },
            { id: `service_title_${shortid()}`, icon: "info-sign", label: <Tooltip content={caps.Service.Title}>{tr("WMS_SERVICE_TITLE", locale, { title: caps.Service.Title })}</Tooltip> },
            { id: `service_abstract_${shortid()}`, icon: "info-sign", label: <Tooltip content={caps.Service.Abstract}>{tr("WMS_SERVICE_ABSTRACT", locale, { abstract: caps.Service.Abstract })}</Tooltip> },
            { 
                id: `layers_${shortid()}`, icon: "layers", label: tr("WMS_LAYERS", locale),
                childNodes: convertWmsLayerNodes(layers, locale)
            }
        ];
    }
    private handleNodeClick = (nodeData: ITreeNode, _nodePath: number[], e: React.MouseEvent<HTMLElement>) => {
        //It's a layer node
        if (nodeData.icon == "layer") {
            const { onAddLayer } = this.props;
            const name = `${nodeData.id}`;
            onAddLayer(name, this._layerStyles[name][0]);
        }
        /*
        const originallySelected = nodeData.isSelected;
        if (!e.shiftKey) {
            this.forEachNode(this.state.nodes, n => (n.isSelected = false));
        }
        nodeData.isSelected = originallySelected == null ? true : !originallySelected;
        this.setState(this.state);
        */
    };

    private handleNodeCollapse = (nodeData: ITreeNode) => {
        nodeData.isExpanded = false;
        this.setState(this.state);
    };

    private handleNodeExpand = (nodeData: ITreeNode) => {
        nodeData.isExpanded = true;
        this.setState(this.state);
    };
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
    componentDidUpdate(prevProps: IWmsCapabilitiesTreeProps) {
        const nextProps = this.props;
        this.setState({ content: this.convertToTreeNodes(nextProps.capabilities, nextProps.locale) });
    }
    render(): JSX.Element {
        return <Tree contents={this.state.content}
                     onNodeClick={this.handleNodeClick}
                     onNodeCollapse={this.handleNodeCollapse}
                     onNodeExpand={this.handleNodeExpand} />;
    }
}