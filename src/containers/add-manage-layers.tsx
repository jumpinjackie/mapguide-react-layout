import * as React from "react";
import { connect } from "react-redux";
import * as Runtime from "../api/runtime";
import { tr } from "../api/i18n";
import { Error } from "../components/error";
import {
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

export interface IAddManageLayersContainerProps {

}

export interface IAddManageLayersContainerState {
    locale: string;
}

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

export type AddManageLayersContainerProps = IAddManageLayersContainerProps & Partial<IAddManageLayersContainerState> & Partial<IAddManageLayersContainerDispatch>;

export class AddManageLayersContainer extends React.Component<AddManageLayersContainerProps, any> {
    constructor(props: AddManageLayersContainerProps) {
        super(props);
    }
    render(): JSX.Element {
        const { locale } = this.props;
        return <Tabs2 id="tabs">
            <Tab2 id="add_layer" title="Add Layer" panel={<AddLayer locale={locale} />} />
            <Tab2 id="manage_layers" title="Manage Layers" panel={<ManageLayers />} />
        </Tabs2>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddManageLayersContainer);
