import * as React from "react";
import { IExternalBaseLayer, isVisualBaseLayer } from "../api/common";
import { STR_EMPTY, strIsNullOrEmpty } from "../utils/string";
import { tr } from "../api/i18n";

/**
 * BaseLayersSwitcher component props
 *
 * @interface IBaseLayerSwitcherProps
 */
export interface IBaseLayerSwitcherProps {
    locale: string | undefined;
    externalBaseLayers: IExternalBaseLayer[];
    onBaseLayerChanged?: (name: string) => void;
}

/**
 * The BaseLayerSwitcher component provides a user interface for switching the active external
 * base layer of the current map.
 *
 * When any base layer has a `thumbnailImageUrl` set, the switcher renders as a thumbnail grid
 * instead of a radio-button list.
 *
 * @example
 * ```tsx
 * <BaseLayerSwitcher
 *   locale="en"
 *   externalBaseLayers={[
 *     { name: "OpenStreetMap", kind: "OSM", thumbnailImageUrl: "https://example.com/osm.png" },
 *     { name: "Satellite", kind: "BingMaps", thumbnailImageUrl: "https://example.com/sat.png" }
 *   ]}
 *   onBaseLayerChanged={(name) => console.log(name)}
 * />
 * ```
 *
 * @since 0.15
 */
export const BaseLayerSwitcher = (props: IBaseLayerSwitcherProps) => {
    const { locale, externalBaseLayers } = props;
    const visLayers = externalBaseLayers.filter(layer => layer.visible === true);
    const [selected, setSelected] = React.useState(visLayers.length == 1 ? visLayers[0].name : STR_EMPTY);
    const onBaseLayerChanged = (e: any) => {
        const value = e.currentTarget.value;
        setSelected(value);
        props.onBaseLayerChanged?.(value);
    }
    React.useEffect(() => {
        setSelected(visLayers.length == 1 ? visLayers[0].name : STR_EMPTY);
    }, [visLayers]);

    const visualLayers = externalBaseLayers.filter(ebl => isVisualBaseLayer(ebl));
    const hasThumbnails = visualLayers.some(layer => !!layer.thumbnailImageUrl);

    if (hasThumbnails) {
        const onThumbnailClick = (layerName: string) => {
            setSelected(layerName);
            props.onBaseLayerChanged?.(layerName);
        };
        const onThumbnailKeyDown = (e: React.KeyboardEvent, layerName: string) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onThumbnailClick(layerName);
            }
        };
        const noneLabel = tr("NONE", locale);
        return <div className="base-layer-switcher-thumbnail-container">
            <div
                role="button"
                tabIndex={0}
                aria-label={noneLabel}
                aria-pressed={strIsNullOrEmpty(selected)}
                className={`base-layer-switcher-thumbnail-item${strIsNullOrEmpty(selected) ? " base-layer-switcher-thumbnail-item-selected" : ""}`}
                onClick={() => onThumbnailClick(STR_EMPTY)}
                onKeyDown={(e) => onThumbnailKeyDown(e, STR_EMPTY)}
            >
                <div className="base-layer-switcher-thumbnail-none-placeholder">{noneLabel}</div>
                <div className="base-layer-switcher-thumbnail-label">{noneLabel}</div>
            </div>
            {visualLayers.map(layer => {
                const isSelected = layer.name === selected;
                return <div
                    key={`base-layer-thumb-${layer.name}`}
                    role="button"
                    tabIndex={0}
                    aria-label={layer.name}
                    aria-pressed={isSelected}
                    className={`base-layer-switcher-thumbnail-item${isSelected ? " base-layer-switcher-thumbnail-item-selected" : ""}`}
                    onClick={() => onThumbnailClick(layer.name)}
                    onKeyDown={(e) => onThumbnailKeyDown(e, layer.name)}
                >
                    {layer.thumbnailImageUrl
                        ? <img className="base-layer-switcher-thumbnail-image" src={layer.thumbnailImageUrl} alt="" />
                        : <div className="base-layer-switcher-thumbnail-none-placeholder" aria-hidden="true">{layer.name}</div>
                    }
                    <div className="base-layer-switcher-thumbnail-label" aria-hidden="true">{layer.name}</div>
                </div>;
            })}
        </div>;
    }

    return <div>
        <div className="base-layer-switcher-item-container">
            <label className="bp3-control bp3-radio">
                <input className="base-layer-switcher-option" type="radio" value={STR_EMPTY} checked={strIsNullOrEmpty(selected)} onChange={onBaseLayerChanged} />
                <span className="bp3-control-indicator" />
                {tr("NONE", locale)}
            </label>
        </div>
        {visualLayers.map(layer => {
            return <div className="base-layer-switcher-item-container" key={`base-layer-${layer.name}`}>
                <label className="bp3-control bp3-radio">
                    <input className="base-layer-switcher-option" type="radio" value={layer.name} checked={layer.name === selected} onChange={onBaseLayerChanged} />
                    <span className="bp3-control-indicator" />
                    {layer.name}
                </label>
            </div>;
        })}
    </div>;
}