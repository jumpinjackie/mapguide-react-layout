import OverlayPositioning from 'ol/OverlayPositioning';
import debounce = require('lodash.debounce');
import olOverlay from "ol/Overlay";
import olWKTFormat from "ol/format/WKT";
import olPolygon, { fromExtent } from "ol/geom/Polygon";
import olMap from "ol/Map";
import { GenericEvent, GenericEventHandler, ClientKind, Coordinate2D, Bounds } from '../../api/common';
import { Client } from '../../api/client';
import * as olExtent from "ol/extent";
import { isSessionExpiredError } from '../../api/error';
import { tr } from '../../api/i18n';
import { debug } from '../../utils/logger';
import Feature from 'ol/Feature';

export interface IFeatureQueryCallback {
    incrementBusyWorker(): void;
    decrementBusyWorker(): void;
    onSessionExpired(): void;
    getAgentUri(): string;
    getAgentKind(): ClientKind;
    getMapName(): string;
    getSessionId(): string;
    getLocale(): string | undefined;
    getPointSelectionBox(point: Coordinate2D): Bounds;
    openTooltipLink(url: string): void;
}

export class FeatureQueryTooltip {
    private wktFormat: olWKTFormat;
    private map: olMap;
    private throttledMouseMove: GenericEventHandler;
    private featureTooltipElement: HTMLElement;
    private featureTooltip: olOverlay;
    private linkElement: HTMLElement | null;
    private enabled: boolean;
    private isMouseOverTooltip: boolean;
    private callback: IFeatureQueryCallback;
    constructor(map: olMap, callback: IFeatureQueryCallback) {
        this.callback = callback;
        this.wktFormat = new olWKTFormat();
        this.featureTooltipElement = document.createElement("div");
        this.featureTooltipElement.addEventListener("mouseover", () => this.isMouseOverTooltip = true);
        this.featureTooltipElement.addEventListener("mouseout", () => this.isMouseOverTooltip = false);
        this.featureTooltipElement.className = 'feature-tooltip';
        this.featureTooltip = new olOverlay({
            element: this.featureTooltipElement,
            offset: [15, 0],
            positioning: OverlayPositioning.CENTER_LEFT
        })
        this.map = map;
        this.map.addOverlay(this.featureTooltip);
        this.throttledMouseMove = debounce((e: GenericEvent) => {
            this.raiseQueryFromPoint(e.pixel);
        }, 1000);
        this.enabled = true;
        this.isMouseOverTooltip = false;
    }
    public get isMouseOver() { return this.isMouseOverTooltip; }
    public raiseQueryFromPoint(pixel: [number, number]) {
        const box = this.callback.getPointSelectionBox(pixel);
        const geom = fromExtent(box);
        debug(`[${new Date()}] FeatureTooltip - onMouseMove (${box[0]}, ${box[1]}) (${box[2]}, ${box[3]})`);
        this.sendTooltipQuery(geom);
    }
    public onMouseMove(e: GenericEvent) {
        this.throttledMouseMove(e);
    }
    public isEnabled(): boolean {
        return this.enabled;
    }
    public setEnabled(enabled: boolean): void {
        this.enabled = enabled;
        if (!this.enabled) {
            this.featureTooltipElement.innerHTML = "";
            this.featureTooltipElement.classList.add("tooltip-hidden");
            if (this.linkElement) {
                this.linkElement.onclick = null;
            }
        }
    }
    private sendTooltipQuery(geom: olPolygon): void {
        if (!this.enabled) {
            return;
        }
        if (this.isMouseOverTooltip) {
            debug(`Mouse over tooltip. Doing nothing`);
            return;
        }
        //const selectedLayerNames = this.onRequestSelectableLayers();
        //if (selectedLayerNames != null && selectedLayerNames.length == 0) {
        //    return;
        //}
        const reqQueryFeatures = 4 | 8; //Tooltips and hyperlinks
        const wkt = this.wktFormat.writeGeometry(geom);
        const client = new Client(this.callback.getAgentUri(), this.callback.getAgentKind());

        //This is probably a case of blink and you'll miss
        //
        //this.featureTooltipElement.innerHTML = "Querying tooltip data ...";
        //this.featureTooltipElement.classList.remove("tooltip-hidden");
        const coords = olExtent.getCenter(geom.getExtent());
        this.featureTooltip.setPosition(coords);
        this.callback.incrementBusyWorker();
        client.queryMapFeatures({
            mapname: this.callback.getMapName(),
            session: this.callback.getSessionId(),
            //layernames: selectedLayerNames != null ? selectedLayerNames.join(",") : null,
            geometry: wkt,
            persist: 0,
            selectionvariant: "INTERSECTS",
            maxfeatures: 1,
            requestdata: reqQueryFeatures,
            layerattributefilter: 5
        }).then(res => {
            let html = "";
            if (res.Tooltip) {
                html += `<div class='feature-tooltip-body'>${res.Tooltip.replace(/\\n/g, "<br/>")}</div>`;
            }
            if (res.Hyperlink) {
                html += `<div><a id='feature-tooltip-link' href='${res.Hyperlink}'>${tr("FEATURE_TOOLTIP_URL_HELP_TEXT", this.callback.getLocale())}</a></div>`;
            }
            this.featureTooltipElement.innerHTML = html;
            this.linkElement = document.getElementById("feature-tooltip-link");
            this.setLinkClickHandler();
            if (html == "") {
                this.featureTooltipElement.classList.add("tooltip-hidden");
                if (this.linkElement) {
                    this.linkElement.onclick = null;
                }
            } else {
                this.featureTooltipElement.classList.remove("tooltip-hidden");
            }
        }).then(() => {
            this.callback.decrementBusyWorker();
        }).catch(err => {
            this.callback.decrementBusyWorker();
            if (isSessionExpiredError(err)) {
                this.callback.onSessionExpired();
            }
        });
    }
    private setLinkClickHandler = () => {
        if (this.linkElement) {
            this.linkElement.onclick = this.handleLinkClick;
        }
    }
    private handleLinkClick = (e: any) => {
        e.preventDefault();
        this.callback.openTooltipLink(e.target.href);
        return false;
    }
}