import * as React from "react";
import { tr } from "../../api/i18n";
import { ILayerInfo } from "../../api/common";
import { Button, Intent, ButtonGroup, Card, Icon, Switch, NonIdealState, Slider, Collapse, Spinner } from '@blueprintjs/core';
import { BlueprintSvgIconNames } from 'src/constants';
import { strIsNullOrEmpty } from "../../utils/string";
import { VectorStyleEditor } from '../vector-style-editor';
import { IVectorFeatureStyle } from '../../api/ol-style-helpers';

interface IManageLayerItemProps {
    layer: ILayerInfo;
    locale: string;
    currentResolution?: number;
    canMoveUp: boolean;
    canMoveDown: boolean;
    onSetOpacity: (name: string, value: number) => void;
    onSetVisibility: (name: string, visible: boolean) => void;
    onZoomToBounds: (name: string) => void;
    onRemoveLayer: (name: string) => void;
    onMoveLayerUp: (name: string) => void;
    onMoveLayerDown: (name: string) => void;
    onVectorStyleChanged: (name: string, style: IVectorFeatureStyle) => void;
}

const ManageLayerItem = (props: IManageLayerItemProps) => {
    const {
        layer,
        locale,
        canMoveUp,
        canMoveDown,
        currentResolution,
        onSetOpacity,
        onRemoveLayer,
        onMoveLayerUp,
        onMoveLayerDown,
        onZoomToBounds,
        onSetVisibility,
        onVectorStyleChanged
    } = props;
    const [wmsLegendUrl, setWmsLegendUrl] = React.useState<string | undefined>(undefined);
    const [isEditingVectorStyle, setIsEditingVectorStyle] = React.useState(false);
    const onToggleWmsLegend = (action: (res?: number) => string) => {
        if (wmsLegendUrl) {
            setWmsLegendUrl(undefined);
        } else {
            const url = action(currentResolution);
            setWmsLegendUrl(url);
        }
    };
    const isBusy = (layer.busyWorkerCount > 0);
    if (isBusy) {
        return <Card>
            <Spinner size={30} />
            <p style={{ textAlign: "center", marginTop: 5 }}>{tr("LOADING_LAYER", locale, { name: layer.name })}</p>
        </Card>;
    }
    const canZoom = layer.type != "WMS";
    let iconName: BlueprintSvgIconNames = "layer";
    if (layer.type == "WMS") {
        iconName = "media";
    }
    const extraActions = [] as JSX.Element[];
    const { extensions } = layer;
    let isWms = false;
    if (extensions) {
        switch (extensions.type) {
            case "WMS":
                {
                    isWms = true;
                    if (extensions.getLegendUrl) {
                        extraActions.push(<Button key="toggle-wms-legend" intent={Intent.SUCCESS} icon="info-sign" onClick={() => onToggleWmsLegend(extensions.getLegendUrl as any)} />)
                    }
                }
        }
    }
    if (layer.vectorStyle && layer.type != "KML") {
        extraActions.push(<Button key="edit-vector-style" title={tr("LAYER_MANAGER_TT_EDIT_STYLE", locale)} intent={Intent.PRIMARY} icon="edit" onClick={() => setIsEditingVectorStyle(!isEditingVectorStyle)} />)
    }
    const isWmsLegendOpen = !strIsNullOrEmpty(wmsLegendUrl);
    return <Card key={layer.name}>
        <Switch checked={layer.visible} onChange={() => onSetVisibility(layer.name, !layer.visible)} labelElement={<><Icon icon={iconName} /> {layer.name}</>} />
        <p>{tr("LAYER_OPACITY", locale)}</p>
        <Slider min={0} max={1.0} stepSize={0.01} value={layer.opacity} onChange={e => onSetOpacity(layer.name, e)} />
        <ButtonGroup>
            <Button disabled={!canMoveUp} title={tr("LAYER_MANAGER_TT_MOVE_UP", locale)} intent={Intent.PRIMARY} icon="caret-up" onClick={() => onMoveLayerUp(layer.name)} />
            <Button disabled={!canMoveDown} title={tr("LAYER_MANAGER_TT_MOVE_DOWN", locale)} intent={Intent.PRIMARY} icon="caret-down" onClick={() => onMoveLayerDown(layer.name)} />
            <Button disabled={!canZoom} title={tr("LAYER_MANAGER_TT_ZOOM_EXTENTS", locale)} intent={Intent.SUCCESS} icon="zoom-to-fit" onClick={() => onZoomToBounds(layer.name)} />
            <Button title={tr("LAYER_MANAGER_TT_REMOVE", locale)} intent={Intent.DANGER} icon="trash" onClick={() => onRemoveLayer(layer.name)} />
            {extraActions}
        </ButtonGroup>
        {isWms && <Collapse isOpen={isWmsLegendOpen}>
            <Card>
                <h5 className="bp3-heading"><a href="#">{tr("WMS_LEGEND", locale)}</a></h5>
                <img src={wmsLegendUrl} />
            </Card>
        </Collapse>}
        {layer.vectorStyle && <Collapse isOpen={isEditingVectorStyle}>
            <Card>
                <h5 className="bp3-heading"><a href="#">{tr("VECTOR_LAYER_STYLE", locale)}</a></h5>
                <VectorStyleEditor onChange={st => onVectorStyleChanged(layer.name, st)} locale={locale} style={layer.vectorStyle} enablePoint={true} enableLine={true} enablePolygon={true} />
            </Card>
        </Collapse>}
    </Card>;
}

/**
 * @hidden
 */
export interface IManageLayersProps {
    layers: ILayerInfo[];
    locale: string;
    currentResolution?: number;
    onSetOpacity: (name: string, value: number) => void;
    onSetVisibility: (name: string, visible: boolean) => void;
    onZoomToBounds: (name: string) => void;
    onRemoveLayer: (name: string) => void;
    onMoveLayerUp: (name: string) => void;
    onMoveLayerDown: (name: string) => void;
    onVectorStyleChanged: (name: string, style: IVectorFeatureStyle) => void;
}

/**
 * @hidden
 */
export const ManageLayers = (props: IManageLayersProps) => {
    const {
        locale,
        currentResolution,
        onSetOpacity,
        onRemoveLayer,
        onMoveLayerUp,
        onMoveLayerDown,
        onZoomToBounds,
        onSetVisibility,
        onVectorStyleChanged
    } = props;
    const [layers, setLayers] = React.useState(props.layers);
    const [wmsLegendUrl, setWmsLegendUrl] = React.useState<string | undefined>(undefined);
    React.useEffect(() => {
        setLayers(props.layers);
    }, [props.layers]);
    if (layers.length) {
        return <div>
            {layers.map((lyr, i) => {
                const cannotMoveUp = (i == 0 || layers.length <= 1);
                const cannotMoveDown = (i >= layers.length - 1 || layers.length <= 1);
                return <ManageLayerItem 
                    key={`manage-layer-${i}`}
                    layer={lyr}
                    locale={locale}
                    canMoveUp={!cannotMoveUp}
                    canMoveDown={!cannotMoveDown}
                    currentResolution={currentResolution}
                    onSetOpacity={onSetOpacity}
                    onRemoveLayer={onRemoveLayer}
                    onMoveLayerUp={onMoveLayerUp}
                    onMoveLayerDown={onMoveLayerDown}
                    onZoomToBounds={onZoomToBounds}
                    onSetVisibility={onSetVisibility}
                    onVectorStyleChanged={onVectorStyleChanged} />;
            })}
        </div>;
    } else {
        return <NonIdealState
            icon="layers"
            title={tr("NO_EXTERNAL_LAYERS", locale)}
            description={tr("NO_EXTERNAL_LAYERS_DESC", locale, { tabName: tr("ADD_LAYER", locale) })} />
    }
}