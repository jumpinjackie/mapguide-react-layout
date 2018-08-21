import * as React from "react";
import { connect } from "react-redux";
import * as Runtime from "../api/runtime";
import { tr } from "../api/i18n";
import { Error } from "../components/error";
import {
    ILayerInfo,
    ReduxDispatch,
    IApplicationState,
    GenericEvent,
    GenericEventHandler,
    WmsCapabilitiesDocument,
    WMSLayerStyle
} from "../api/common";
import { Client } from "../api/client";
import { WmsCapabilitiesTree } from "../components/wms-capabilities-tree";
import { Tab2, Tabs2 } from "@blueprintjs/core";
import { ManageLayers } from "../components/layer-manager/manage-layers";
import { AddLayer } from "../components/layer-manager/add-layer";

interface ILayerManagerProps {
    locale: string | undefined;
}

class LayerManager extends React.Component<ILayerManagerProps, any> {
    constructor(props: ILayerManagerProps) {
        super(props);
        this.state = {
            layers: []
        }
    }
    componentDidMount() {
        const viewer = Runtime.getViewer();
        if (viewer) {
            const layers = viewer.getLayerManager().getLayers();
            this.setState({ layers: layers });
        }
    }
    private removeHandler = (name: string) => {
        const { locale } = this.props;
        const viewer = Runtime.getViewer();
        if (viewer) {
            const removed = viewer.getLayerManager().removeLayer(name);
            if (removed) {
                viewer.toastSuccess("icon-success", tr("REMOVED_LAYER", locale, { name: name }));
                const layers = viewer.getLayerManager().getLayers();
                this.setState({ layers: layers });
            }
        }
    }
    private upHandler = (name: string) => {
        const viewer = Runtime.getViewer();
        if (viewer) {
            if (viewer.getLayerManager().moveUp(name) >= 0) {
                const layers = viewer.getLayerManager().getLayers();
                this.setState({ layers: layers });
            }
        }
    }
    private downHandler = (name: string) => {
        const viewer = Runtime.getViewer();
        if (viewer) {
            if (viewer.getLayerManager().moveDown(name) >= 0) {
                const layers = viewer.getLayerManager().getLayers();
                this.setState({ layers: layers });
            }
        }
    }
    render(): JSX.Element {
        const { locale } = this.props;
        const { layers } = this.state;
        return <ManageLayers layers={layers} onMoveLayerDown={this.downHandler} onMoveLayerUp={this.upHandler} onRemoveLayer={this.removeHandler} />;
    }
}

/**
 * 
 * @since 0.11
 * @export
 * @interface IAddManageLayersContainerProps
 */
export interface IAddManageLayersContainerProps {

}

/**
 * 
 * @since 0.11
 * @export
 * @interface IAddManageLayersContainerState
 */
export interface IAddManageLayersContainerState {
    locale: string;
}

/**
 * 
 * @since 0.11
 * @export
 * @interface IAddManageLayersContainerDispatch
 */
export interface IAddManageLayersContainerDispatch {

}

function mapStateToProps(state: Readonly<IApplicationState>): Partial<IAddManageLayersContainerState> {
    return {
        locale: state.config.locale
    };
}

function mapDispatchToProps(dispatch: ReduxDispatch): Partial<IAddManageLayersContainerDispatch> {
    return {};
}

/**
 * @since 0.11
 */
export type AddManageLayersContainerProps = IAddManageLayersContainerProps & Partial<IAddManageLayersContainerState> & Partial<IAddManageLayersContainerDispatch>;

/**
 * A component for adding custom external layers to the map
 * @since 0.11
 * @export
 * @class AddManageLayersContainer
 * @extends {React.Component<AddManageLayersContainerProps, any>}
 */
export class AddManageLayersContainer extends React.Component<AddManageLayersContainerProps, any> {
    constructor(props: AddManageLayersContainerProps) {
        super(props);
    }
    render(): JSX.Element {
        const { locale } = this.props;
        return <Tabs2 id="tabs" renderActiveTabPanelOnly={true}>
            <Tab2 id="add_layer" title={<span><span className="pt-icon-standard pt-icon-add" /> {tr("ADD_LAYER", locale)}</span>} panel={<AddLayer locale={locale} />} />
            <Tab2 id="manage_layers" title={<span><span className="pt-icon-standard pt-icon-layers" /> {tr("MANAGE_LAYERS", locale)}</span>} panel={<LayerManager locale={locale} />} />
        </Tabs2>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps as any /* HACK: I dunno how to type thunked actions for 4.0 */)(AddManageLayersContainer);
