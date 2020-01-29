import olMap from "ol/Map";
import olOverlay from "ol/Overlay";
import olImageLayer from "ol/layer/Image";
import olTileLayer from "ol/layer/Tile";
import olSourceWMS from "ol/source/ImageWMS";
import olSourceTileWMS from "ol/source/TileWMS";
import GeoJSON from "ol/format/GeoJSON";
import OverlayPositioning from 'ol/OverlayPositioning';
import Collection from 'ol/Collection';
import Feature from 'ol/Feature';
import { tr } from '../../api/i18n';
import { ILayerManager, Coordinate2D } from '../../api/common';
import { Client } from '../../api/client';

export class SelectedFeaturesTooltip {
    private map: olMap;
    private featureTooltipElement: HTMLElement;
    private featureTooltip: olOverlay;
    private enabled: boolean;
    private isMouseOverTooltip: boolean;
    private closerEl: HTMLElement | null;
    constructor(map: olMap) {
        this.featureTooltipElement = document.createElement("div");
        this.featureTooltipElement.addEventListener("mouseover", () => this.isMouseOverTooltip = true);
        this.featureTooltipElement.addEventListener("mouseout", () => this.isMouseOverTooltip = false);
        this.featureTooltipElement.className = 'selected-tooltip';
        this.featureTooltip = new olOverlay({
            element: this.featureTooltipElement,
            offset: [15, 0],
            positioning: OverlayPositioning.CENTER_LEFT // "center-left" /* ol.OverlayPositioning.CENTER_LEFT */
        })
        this.map = map;
        this.map.addOverlay(this.featureTooltip);
        this.enabled = true;
        this.isMouseOverTooltip = false;
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
    public async queryWmsFeatures(layerMgr: ILayerManager, coord: Coordinate2D, resolution: number, locale?: string) {
        //See what WMS layers we have
        const client = new Client("", "mapagent");
        const format = new GeoJSON();
        const layers = layerMgr.getLayers().filter(l => l.visible && l.selectable && l.extensions?.type == "WMS");
        for (const layer of layers) {
            const wmsLayer = layerMgr.getLayer(layer.name);
            if (wmsLayer instanceof olImageLayer || wmsLayer instanceof olTileLayer) {
                const source = wmsLayer.getSource();
                if (source instanceof olSourceWMS || source instanceof olSourceTileWMS) {
                    const url = source.getFeatureInfoUrl(coord, resolution, this.map.getView().getProjection(), {
                        'INFO_FORMAT': "application/json"
                    });
                    const resp = await client.getText(url);
                    const features = format.readFeatures(resp);
                    this.featureTooltip.setPosition(coord);
                    const html = this.generateFeatureHtml(features[0], locale);
                    this.featureTooltipElement.innerHTML = html;
                    this.closerEl = document.getElementById("feat-popup-closer");
                    this.setPopupCloseHandler();
                    if (html == "") {
                        this.featureTooltipElement.classList.add("tooltip-hidden");
                    } else {
                        this.featureTooltipElement.classList.remove("tooltip-hidden");
                    }
                    return;
                }
            }
        }
    }
    private generateFeatureHtml(feat: Feature, locale?: string) {
        let html = "";
        html += "<div style='min-width: 190px'><div style='float: left; font-weight: bold; font-size: 1.3em'>" + tr("SEL_FEATURE_PROPERTIES", locale) + "</div><a id='feat-popup-closer' href='#' style='float: right'>[x]</a><div class='clear: both'></div></div>";
        var table = "<table style='margin-top: 25px'>";
        const f = feat.getProperties();
        let pc = 0;
        for (const key in f) {
            if (key == feat.getGeometryName()) {
                continue;
            }
            table += "<tr>";
            table += "<td><strong>" + key + "</strong></td>";
            table += "<td>" + f[key] + "</td>";
            table += "</tr>";
            pc++;
        }
        table += "</table>";
        if (pc > 0) {
            html += table;
        } else {
            html += "<p>" + tr("SEL_FEATURE_PROPERTIES_NONE", locale) + "</p>";
        }
        return html;
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
    public showSelectedVectorFeatures(features: Collection<Feature>, pixel: [number, number], locale?: string) {
        const coords = this.map.getCoordinateFromPixel(pixel);
        if (features.getLength() > 0) {
            this.featureTooltip.setPosition(coords);
            const html = this.generateFeatureHtml(features.item(0), locale);
            this.featureTooltipElement.innerHTML = html;
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