import { IMapViewer, Coordinate } from "../api/common";
import * as logger from "../utils/logger";
import { deg2rad } from "../utils/number";
import olExtent from "ol/extent";
import olFeature from "ol/feature";
import olCollection from "ol/collection";
import olPolygon from "ol/geom/polygon";
import olVectorSource from "ol/source/vector";
import olVectorLayer from "ol/layer/vector";
import olInteractionTranslate from "ol/interaction/translate";

export type Size = { w: number, h: number };

export interface IMapCapturerContextCallback {
    updateBoxCoords(box: string): void;
}

export class MapCapturerContext {
    private mapCapturerSource: olVectorSource;
    private mapCapturerLayer: olVectorLayer;
    private layerName: string;
    private intTranslate: olInteractionTranslate;
    private features: olCollection<olFeature>;
    private activeCallback: IMapCapturerContextCallback | undefined;
    constructor(private viewer: IMapViewer, private mapName: string) {
        this.features = new olCollection<olFeature>();
        this.mapCapturerSource = new olVectorSource({
            features: this.features
        });
        this.mapCapturerLayer = new olVectorLayer({
            source: this.mapCapturerSource
        });
        this.intTranslate = new olInteractionTranslate({
            features: this.features
        });
        this.intTranslate.on("translateend", this.onTranslateEnd.bind(this))
        this.layerName = `${mapName}_MapCapturer`;
    }
    private getRing(origin: { x: number, y: number }, paperSize: Size, scaleDenominator: number): [number, number][][] {
        const ring: Coordinate[] = [];
        const factor = scaleDenominator / (this.viewer.getMetersPerUnit() * 1000 * 2);
        ring.push([origin.x - paperSize.w * factor, origin.y - paperSize.h * factor]);
        ring.push([origin.x + paperSize.w * factor, origin.y - paperSize.h * factor]);
        ring.push([origin.x + paperSize.w * factor, origin.y + paperSize.h * factor]);
        ring.push([origin.x - paperSize.w * factor, origin.y + paperSize.h * factor]);
        return [ ring ];
    }
    private onTranslateEnd() {
        if (this.features.getLength() == 1 && this.activeCallback) {
            const box = this.features.item(0);
            const poly = box.getGeometry() as olPolygon;
            const coords = poly.getCoordinates()[0];
            const boxCoords = coords.map(c => `${c[0]},${c[1]}`).join(",");
            this.activeCallback.updateBoxCoords(boxCoords);
        }
    }
    public updateBox(paperSize: Size, scaleDenominator: number, rotation: number): void {
        if (this.activeCallback) {
            let poly: olPolygon;
            if (this.features.getLength() == 0) {
                poly = this.createCaptureBox(paperSize, scaleDenominator, rotation);
            } else {
                const box = this.features.item(0);
                poly = box.getGeometry() as olPolygon;
                const center = olExtent.getCenter(poly.getExtent());
                const origin = {
                    x: center[0],
                    y: center[1]
                };
                const ring = this.getRing(origin, paperSize, scaleDenominator);
                poly.setCoordinates(ring);
                poly.rotate(deg2rad(rotation), center);
            }
            const coords = poly.getCoordinates()[0];
            const boxCoords = coords.map(c => `${c[0]},${c[1]}`).join(",");
            this.activeCallback.updateBoxCoords(boxCoords);
        }
    }
    private createCaptureBox(paperSize: Size, scaleDenominator: number, rotation: number): olPolygon {
        const origin = this.viewer.getCurrentView();
        const ring = this.getRing(origin, paperSize, scaleDenominator);
        const poly = new olPolygon(ring);
        poly.rotate(deg2rad(rotation), [ origin.x, origin.y ]);
        const box = new olFeature(poly);
        this.features.clear();
        this.features.push(box);
        return poly;
    }
    public getMapName(): string { return this.mapName; }
    public activate(callback: IMapCapturerContextCallback, paperSize: Size, scaleDenominator: number, rotation: number): void {
        this.activeCallback = callback;
        logger.debug(`Activating map capturer context for ${this.mapName}`);
        this.viewer.addLayer(this.layerName, this.mapCapturerLayer);
        this.updateBox(paperSize, scaleDenominator, rotation);
        this.viewer.addInteraction(this.intTranslate);
    }
    public deactivate(): void {
        this.activeCallback = undefined;
        logger.debug(`De-activating map capturer context for ${this.mapName}`);
        this.features.clear();
        this.viewer.removeLayer(this.layerName);
        this.viewer.removeInteraction(this.intTranslate);
    }
}