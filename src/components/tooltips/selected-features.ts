import olMap from "ol/Map";
import olOverlay from "ol/Overlay";
import olImageLayer from "ol/layer/Image";
import olTileLayer from "ol/layer/Tile";
import olSourceWMS from "ol/source/ImageWMS";
import olSourceTileWMS from "ol/source/TileWMS";
import GeoJSON from "ol/format/GeoJSON";
import Collection from 'ol/Collection';
import { tr } from '../../api/i18n';
import { ILayerManager, Coordinate2D, LayerProperty, Dictionary } from '../../api/common';
import { Client } from '../../api/client';
import { parseEpsgCodeFromCRS } from '../layer-manager/wfs-capabilities-panel';
import { ProjectionLike } from 'ol/proj';
import { LayerSetGroupBase } from '../../api/layer-set-group-base';
import { ISelectedFeaturePopupTemplateConfiguration } from '../../actions/defs';
import { strIsNullOrEmpty, extractPlaceholderTokens, strReplaceAll } from '../../utils/string';
import LayerBase from "ol/layer/Base";
import { WmsQueryAugmentation } from '../map-providers/base';
import { isClusteredFeature, getClusterSubFeatures } from '../../api/ol-style-helpers';
import stickybits from 'stickybits';
import type { OLFeature, OLLayer } from "../../api/ol-types";
import DOMPurify from "dompurify";

export interface IQueryWmsFeaturesCallback {
    getLocale(): string | undefined;
    /**
     * 
     * @param feat 
     * @param l 
     * @since 0.14
     */
    addClientSelectedFeature(feat: OLFeature, l: LayerBase): void;
    addFeatureToHighlight(feat: OLFeature | undefined, bAppend: boolean): void;
    getWmsRequestAugmentations(): Dictionary<WmsQueryAugmentation>;
}

/**
 * @since 0.14
 */
export type SelectionPopupContentRenderer = (feat: OLFeature, locale?: string, popupConfig?: ISelectedFeaturePopupTemplateConfiguration) => string;

/**
 * @since 0.14
 */
export interface ISelectionPopupContentOverrideProvider {
    getSelectionPopupRenderer(layerName: string): SelectionPopupContentRenderer | undefined;
}

function defaultPopupContentRenderer(feat: OLFeature, locale?: string, popupConfig?: ISelectedFeaturePopupTemplateConfiguration) {
    let html = "";
    const bClustered = isClusteredFeature(feat);

    let title = popupConfig?.title ?? tr("SEL_FEATURE_PROPERTIES", locale);
    const size = getClusterSubFeatures(feat)?.length;;
    if (bClustered && size > 1) {
        title = popupConfig?.clusteredTitle?.(size) ?? tr("SEL_CLUSTER_PROPERTIES", locale, { size });
    }
    html += "<div class='selected-popup-header'><div>" + DOMPurify.sanitize(title) + "</div><a id='feat-popup-closer' class='closer' href='#'>[x]</a><div class='clearit'></div></div>";

    const renderForMultipleSanitized = (subFeatures: OLFeature[]) => {
        let table = "<table class='selected-popup-cluster-table'>";
        const fheadings = popupConfig?.propertyMappings
            ? popupConfig.propertyMappings.filter(pm => pm.name != subFeatures[0].getGeometryName()).map(pm => pm.value)
            : Object.keys(subFeatures[0].getProperties()).filter(pn => pn != subFeatures[0].getGeometryName());
        const fprops = popupConfig?.propertyMappings
            ? popupConfig.propertyMappings.map(pm => pm.value)
            : Object.keys(subFeatures[0].getProperties()).filter(pn => pn != subFeatures[0].getGeometryName());
        table += "<thead><tr>";
        for (const heading of fheadings) {
            table += `<th>${DOMPurify.sanitize(heading)}</th>`;
        }
        table += "</tr></thead>";
        table += "<tbody>"
        for (const f of subFeatures) {
            table += "<tr>";
            for (const property of fprops) {
                const val = f.get(property);
                table += `<td>${DOMPurify.sanitize(val)}</td>`;
            }
            table += "</tr>";
        }
        table += "</tbody>";
        table += "</table>";
        return table
    };
    const renderForSingleSanitized = (feature: OLFeature): [string, number, string | undefined] => {
        let linkFragment: string | undefined;
        let table = "<table class='selected-popup-single-properties-table'>";
        table += "<tbody>";
        const f = feature.getProperties();
        let pc = 0;
        if (popupConfig?.propertyMappings) {
            for (const pm of popupConfig.propertyMappings) {
                if (pm.name == feat.getGeometryName()) {
                    continue;
                }
                table += "<tr>";
                table += "<td class='property-name-cell'>" + DOMPurify.sanitize(pm.value) + "</td>";
                table += "<td class='property-value-cell'>" + DOMPurify.sanitize(f[pm.name]) + "</td>";
                table += "</tr>";
                pc++;
            }
        } else {
            for (const key in f) {
                if (key == feat.getGeometryName()) {
                    continue;
                }
                table += "<tr>";
                table += "<td class='property-name-cell'>" + DOMPurify.sanitize(key) + "</td>";
                table += "<td class='property-value-cell'>" + DOMPurify.sanitize(f[key]) + "</td>";
                table += "</tr>";
                pc++;
            }
        }
        table += "</tbody>";
        table += "</table>";

        if (popupConfig?.linkProperty) {
            const { name, label, linkTarget } = popupConfig.linkProperty;
            let linkHref: string | undefined;
            if (typeof (name) == 'string') {
                linkHref = encodeURI(f[name]);
            } else {
                const expr = name.expression;
                let url = expr;
                const pBegin = name.placeholderBegin ?? "{";
                const pEnd = name.placeholderEnd ?? "}";
                const tokens = extractPlaceholderTokens(expr, pBegin, pEnd);
                for (const t of tokens) {
                    const al = encodeURIComponent(f[t] ?? "");
                    url = strReplaceAll(url, `${pBegin}${t}${pEnd}`, al);
                }
                linkHref = url;
            }
            if (!strIsNullOrEmpty(linkHref)) {
                linkFragment = `<div class='select-popup-single-link-wrapper'><a href="${DOMPurify.sanitize(linkHref)}" target='${DOMPurify.sanitize(linkTarget)}'>${DOMPurify.sanitize(label)}</a></div>`;
            }
        }
        return [table, pc, linkFragment];
    };
    const singlePopupContentRender = (feature: OLFeature, appendHtml: (h: string) => void) => {
        const [table, pc, linkFragment] = renderForSingleSanitized(feature);
        if (pc > 0) {
            appendHtml(`<div class='selected-popup-content-wrapper'>${table}</div>`);
        } else {
            appendHtml("<div class='selected-popup-content-none'>" + DOMPurify.sanitize(tr("SEL_FEATURE_PROPERTIES_NONE", locale)) + "</div>");
        }
        if (!strIsNullOrEmpty(linkFragment)) {
            appendHtml(linkFragment);
        }
    }

    if (bClustered) {
        const subFeatures = getClusterSubFeatures(feat);
        if (subFeatures.length == 1) {
            singlePopupContentRender(subFeatures[0], h => html += h);
        } else {
            const table = renderForMultipleSanitized(subFeatures);
            html += `<div class='selected-popup-content-wrapper'>${table}</div>`;
        }
    } else {
        singlePopupContentRender(feat, h => html += h);
    }
    return html;
}

/**
 * @hidden
 */
export class SelectedFeaturesTooltip {
    private map: olMap;
    private featureTooltipElement: HTMLElement;
    private featureTooltip: olOverlay;
    private enabled: boolean;
    private isMouseOverTooltip: boolean;
    private closerEl: HTMLElement | null;
    constructor(map: olMap, private parent: ISelectionPopupContentOverrideProvider) {
        this.featureTooltipElement = document.createElement("div");
        this.featureTooltipElement.addEventListener("mouseover", () => this.isMouseOverTooltip = true);
        this.featureTooltipElement.addEventListener("mouseout", () => this.isMouseOverTooltip = false);
        this.featureTooltipElement.className = 'selected-tooltip';
        this.featureTooltip = new olOverlay({
            element: this.featureTooltipElement,
            offset: [15, 0],
            positioning: "center-left"
        })
        this.map = map;
        this.map.addOverlay(this.featureTooltip);
        this.enabled = true;
        this.isMouseOverTooltip = false;
    }
    public dispose() {
        this.featureTooltip.dispose();
    }
    public get isMouseOver() { return this.isMouseOverTooltip; }
    public isEnabled(): boolean {
        return this.enabled;
    }
    public setEnabled(enabled: boolean): void {
        this.enabled = enabled;
        if (!this.enabled) {
            this.featureTooltipElement.innerHTML = "";
            this.featureTooltipElement.classList.add("tooltip-hidden");
        }
    }
    public hide() {
        this.featureTooltipElement.innerHTML = "";
        this.featureTooltipElement.classList.add("tooltip-hidden");
    }
    public async queryWmsFeatures(currentLayerSet: LayerSetGroupBase | undefined, layerMgr: ILayerManager, coord: Coordinate2D, resolution: number, bAppendMode: boolean, callback: IQueryWmsFeaturesCallback) {
        let selected = 0;
        //See what WMS layers we have
        const client = new Client("", "mapagent");
        const format = new GeoJSON();
        const wmsSources: [LayerBase, (olSourceWMS | olSourceTileWMS)][] = [];
        //The active layer set may have a WMS layer
        const currentWmsSource = currentLayerSet?.tryGetWmsSource();
        if (currentWmsSource) {
            wmsSources.push(currentWmsSource);
        }
        const layers = layerMgr.getLayers().filter(l => l.visible && l.selectable && l.type == "WMS");
        for (const layer of layers) {
            const wmsLayer = layerMgr.getLayer(layer.name);
            if (wmsLayer instanceof olImageLayer || wmsLayer instanceof olTileLayer) {
                const source = wmsLayer.getSource();
                if (source instanceof olSourceWMS || source instanceof olSourceTileWMS) {
                    wmsSources.push([wmsLayer, source]);
                }
            }
        }
        for (const pair of wmsSources) {
            const [layer, source] = pair;
            let url = source.getFeatureInfoUrl(coord, resolution, this.map.getView().getProjection(), {
                'INFO_FORMAT': "application/json"
            });
            if (url) {
                const layerName = layer.get(LayerProperty.LAYER_NAME);
                //Check if we have an augmentation for this
                const augs = callback.getWmsRequestAugmentations();
                if (augs[layerName]) {
                    url = augs[layerName](url);
                }
                const resp = await client.getText(url);
                const json = JSON.parse(resp);
                if (json.features?.length > 0) {
                    let srcProj: ProjectionLike | null = source.getProjection();
                    if (!srcProj) {
                        const epsg = parseEpsgCodeFromCRS(json.crs?.properties?.name);
                        if (epsg) {
                            srcProj =  `EPSG:${epsg}`;
                        } else { //Type narrowing hack
                            srcProj = undefined;
                        }
                    }
                    const features = format.readFeatures(resp, {
                        dataProjection: srcProj,
                        featureProjection: this.map.getView().getProjection()
                    });
                    this.featureTooltip.setPosition(coord);
                    const popupConf: ISelectedFeaturePopupTemplateConfiguration | undefined = layer.get(LayerProperty.SELECTED_POPUP_CONFIGURATION);
                    const html = this.generateFeatureHtml(layerName, features[0], callback.getLocale(), popupConf);
                    callback.addClientSelectedFeature(features[0], layer);
                    currentLayerSet?.clearWmsSelectionOverlay();
                    currentLayerSet?.addWmsSelectionOverlay(features[0]);
                    callback.addFeatureToHighlight(features[0], bAppendMode);
                    selected++;
                    this.featureTooltipElement.innerHTML = html;
                    stickybits(".selected-popup-cluster-table th");
                    this.closerEl = document.getElementById("feat-popup-closer");
                    this.setPopupCloseHandler();
                    if (html == "") {
                        this.featureTooltipElement.classList.add("tooltip-hidden");
                    } else {
                        this.featureTooltipElement.classList.remove("tooltip-hidden");
                    }
                    return true;
                }
            }
        }
        // Clear if there was no selection made
        if (selected == 0) {
            callback.addFeatureToHighlight(undefined, false);
            this.hide();
        }
        return false;
    }
    private generateFeatureHtml(layerName: string | undefined, feat: OLFeature, locale?: string, popupConfig?: ISelectedFeaturePopupTemplateConfiguration) {
        if (layerName) {
            const customRenderer = this.parent.getSelectionPopupRenderer(layerName);
            if (customRenderer) {
                return customRenderer(feat, locale, popupConfig);
            } else {
                return defaultPopupContentRenderer(feat, locale, popupConfig);
            }
        }
        return defaultPopupContentRenderer(feat, locale, popupConfig);
    }
    private setPopupCloseHandler = () => {
        if (this.closerEl) {
            this.closerEl.onclick = this.closePopup;
        }
    }
    private closePopup = (e: any) => {
        e.preventDefault();
        this.hide();
        if (this.closerEl) {
            this.closerEl.onclick = null;
        }
        return false;
    };
    public showSelectedVectorFeatures(features: Collection<OLFeature>, pixel: [number, number], featureToLayerMap: [OLFeature, OLLayer][], locale?: string) {
        const coords = this.map.getCoordinateFromPixel(pixel);
        if (features.getLength() > 0) {
            this.featureTooltip.setPosition(coords);
            const f = features.item(0);
            let popupConf: ISelectedFeaturePopupTemplateConfiguration | undefined;
            const pair = featureToLayerMap.find(([feat, _]) => feat == f);
            let layerName;
            if (pair) {
                const layer = pair[1];
                popupConf = layer.get(LayerProperty.SELECTED_POPUP_CONFIGURATION);
                layerName = layer.get(LayerProperty.LAYER_NAME);
            }
            const html = this.generateFeatureHtml(layerName, f, locale, popupConf);
            this.featureTooltipElement.innerHTML = html;
            stickybits(".selected-popup-cluster-table th");
            this.closerEl = document.getElementById("feat-popup-closer");
            this.setPopupCloseHandler();
            if (html == "") {
                this.featureTooltipElement.classList.add("tooltip-hidden");
            } else {
                this.featureTooltipElement.classList.remove("tooltip-hidden");
            }
        } else {
            this.featureTooltipElement.innerHTML = "";
            this.featureTooltipElement.classList.add("tooltip-hidden");
        }
    }
}