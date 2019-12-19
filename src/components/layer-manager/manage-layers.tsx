import * as React from "react";
import { tr } from "../../api/i18n";
import { ILayerInfo, GenericEvent } from "../../api/common";
import { ITreeNode, Tree, Button, Intent, ButtonGroup, Card, Icon, Switch, NonIdealState, Slider } from '@blueprintjs/core';
import { BlueprintSvgIconNames } from 'src/constants';

/**
 * @hidden
 */
export interface IManageLayersProps {
    layers: ILayerInfo[];
    locale: string;
    onSetOpacity: (name: string, value: number) => void;
    onSetVisibility: (name: string, visible: boolean) => void;
    onZoomToBounds: (name: string) => void;
    onRemoveLayer: (name: string) => void;
    onMoveLayerUp: (name: string) => void;
    onMoveLayerDown: (name: string) => void;
}

/**
 * @hidden
 */
export const ManageLayers = (props: IManageLayersProps) => {
    const {
        locale,
        onSetOpacity,
        onRemoveLayer,
        onMoveLayerUp,
        onMoveLayerDown,
        onZoomToBounds,
        onSetVisibility
    } = props;
    const [layers, setLayers] = React.useState(props.layers);
    React.useEffect(() => {
        setLayers(props.layers);
    }, [props.layers]);
    if (layers.length) {
        return <div>
            {layers.map(lyr => {
                const canZoom = lyr.type != "WMS";
                let iconName: BlueprintSvgIconNames = "layer";
                if (lyr.type == "WMS") {
                    iconName = "media";
                }
                return <Card key={lyr.name}>
                    <Switch checked={lyr.visible} onChange={e => onSetVisibility(lyr.name, !lyr.visible)} labelElement={<><Icon icon={iconName} /> {lyr.name}</>} />
                    <p>Opacity</p>
                    <Slider min={0} max={1.0} stepSize={0.01} value={lyr.opacity} onChange={e => onSetOpacity(lyr.name, e)} />
                    <ButtonGroup>
                        <Button intent={Intent.PRIMARY} icon="caret-up" onClick={(e: any) => onMoveLayerUp(lyr.name)} disabled={layers.length <= 1} />
                        <Button intent={Intent.PRIMARY} icon="caret-down" onClick={(e: any) => onMoveLayerDown(lyr.name)} disabled={layers.length <= 1} />
                        <Button intent={Intent.SUCCESS} icon="zoom-to-fit" onClick={(e: any) => onZoomToBounds(lyr.name)} disabled={!canZoom} />
                        <Button intent={Intent.DANGER} icon="trash" onClick={(e: any) => onRemoveLayer(lyr.name)} />
                    </ButtonGroup>
                </Card>;
            })}
        </div>;
    } else {
        return <NonIdealState
            icon="layers"
            title={tr("NO_EXTERNAL_LAYERS", locale)}
            description={tr("NO_EXTERNAL_LAYERS_DESC", locale, { tabName: tr("ADD_LAYER", locale) })} />
    }
}