import * as React from "react";
import { useSelector } from "react-redux";
import * as Runtime from "../api/runtime";
import { tr } from "../api/i18n";
import {
    IApplicationState,
    ILayerInfo
} from "../api/common";
import { ManageLayers } from "../components/layer-manager/manage-layers";
import { AddLayer } from "../components/layer-manager/add-layer";
import { Tabs, Tab, Icon } from '@blueprintjs/core';

interface ILayerManagerProps {
    locale: string | undefined;
}

const LayerManager = (props: ILayerManagerProps) => {
    const { locale } = props;
    const [layers, setLayers] = React.useState<ILayerInfo[]>([]);
    React.useEffect(() => {
        const viewer = Runtime.getViewer();
        if (viewer) {
            const layers = viewer.getLayerManager().getLayers();
            setLayers(layers);
        }
    }, []);
    const removeHandler = (name: string) => {
        const viewer = Runtime.getViewer();
        if (viewer) {
            const removed = viewer.getLayerManager().removeLayer(name);
            if (removed) {
                viewer.toastSuccess("icon-success", tr("REMOVED_LAYER", locale, { name: name }));
                const layers = viewer.getLayerManager().getLayers();
                setLayers(layers);
            }
        }
    };
    const upHandler = (name: string) => {
        const viewer = Runtime.getViewer();
        if (viewer) {
            if (viewer.getLayerManager().moveUp(name) >= 0) {
                const layers = viewer.getLayerManager().getLayers();
                setLayers(layers);
            }
        }
    };
    const downHandler = (name: string) => {
        const viewer = Runtime.getViewer();
        if (viewer) {
            if (viewer.getLayerManager().moveDown(name) >= 0) {
                const layers = viewer.getLayerManager().getLayers();
                setLayers(layers);
            }
        }
    };
    return <ManageLayers layers={layers} onMoveLayerDown={downHandler} onMoveLayerUp={upHandler} onRemoveLayer={removeHandler} />;
}


/**
 * 
 * @since 0.11
 * @export
 * @interface IAddManageLayersContainerProps
 */
export interface IAddManageLayersContainerProps {

}

const AddManageLayersContainer = (props: IAddManageLayersContainerProps) => {
    const locale = useSelector<IApplicationState, string>(st => st.config.locale);
    return <Tabs id="tabs" renderActiveTabPanelOnly={true}>
        <Tab id="add_layer" title={<span><Icon icon="new-layer" iconSize={Icon.SIZE_STANDARD} /> {tr("ADD_LAYER", locale)}</span>} panel={<AddLayer locale={locale} />} />
        <Tab id="manage_layers" title={<span><Icon icon="layers" iconSize={Icon.SIZE_STANDARD} /> {tr("MANAGE_LAYERS", locale)}</span>} panel={<LayerManager locale={locale} />} />
    </Tabs>;
};

export default AddManageLayersContainer;