import { IMapViewer, Coordinate2D, Size } from "../api/common";
import { deg2rad } from "../utils/number";
import * as olExtent from "ol/extent";
import olFeature from "ol/Feature";
import olCollection from "ol/Collection";
import olPolygon from "ol/geom/Polygon";
import olVectorSource from "ol/source/Vector";
import olVectorLayer from "ol/layer/Vector";
import olInteractionTranslate from "ol/interaction/Translate";
import { debug } from '../utils/logger';

export interface IMapCapturerContextCallback {
    updateBoxCoords(box: string, normalizedBox: string): void;
}

export class MapCapturerContext {
    private mapCapturerSource: olVectorSource;
    private mapCapturerLayer: olVectorLayer;
    private layerName: string;
    private intTranslate: olInteractionTranslate;
    private features: olCollection<olFeature>;
    private activeCallback: IMapCapturerContextCallback | undefined;
    constructor(private viewer: IMapViewer, private mapName: string, private rotation: number = 0) {
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
        const ring: Coordinate2D[] = [];
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
            const boxCoords = coords.map((c: any) => `${c[0]},${c[1]}`).join(",");
            //Process normalized one
            const npoly = poly.clone() as olPolygon;
            const ncenter = olExtent.getCenter(npoly.getExtent());
            npoly.rotate(deg2rad(this.rotation), ncenter);
            //HACK: Missing getCoordinates() from type defn
            const ncoords = npoly.getCoordinates()[0];
            const nBoxCoords = ncoords.map((c: any) => `${c[0]},${c[1]}`).join(",");
            this.activeCallback.updateBoxCoords(boxCoords, nBoxCoords);
        }
    }
    public updateBox(paperSize: Size, scaleDenominator: number, rotation: number): void {
        if (this.activeCallback) {
            this.rotation = rotation;
            let poly: olPolygon;
            if (this.features.getLength() == 0) {
                poly = this.createCaptureBox(paperSize, scaleDenominator, this.rotation);
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
                poly.rotate(-deg2rad(this.rotation), center);
            }
            const coords = poly.getCoordinates()[0];
            const boxCoords = coords.map((c: any) => `${c[0]},${c[1]}`).join(",");
            //Process normalized one
            const npoly = poly.clone() as olPolygon;
            const ncenter = olExtent.getCenter(npoly.getExtent());
            npoly.rotate(deg2rad(this.rotation), ncenter);
            const ncoords = npoly.getCoordinates()[0];
            const nBoxCoords = ncoords.map((c: any) => `${c[0]},${c[1]}`).join(",");
            this.activeCallback.updateBoxCoords(boxCoords, nBoxCoords);
        }
    }
    private createCaptureBox(paperSize: Size, scaleDenominator: number, rotation: number): olPolygon {
        const origin = this.viewer.getCurrentView();
        const ring = this.getRing(origin, paperSize, scaleDenominator);
        const poly = new olPolygon(ring);
        poly.rotate(-deg2rad(rotation), [ origin.x, origin.y ]);
        const box = new olFeature(poly);
        this.features.clear();
        this.features.push(box);
        return poly;
    }
    public getMapName(): string { return this.mapName; }
    public activate(callback: IMapCapturerContextCallback, paperSize: Size, scaleDenominator: number, rotation: number): void {
        this.activeCallback = callback;
        debug(`Activating map capturer context for ${this.mapName}`);
        this.viewer.getLayerManager().addLayer(this.layerName, this.mapCapturerLayer, true);
        this.updateBox(paperSize, scaleDenominator, rotation);
        this.viewer.addInteraction(this.intTranslate);
    }
    public deactivate(): void {
        this.activeCallback = undefined;
        debug(`De-activating map capturer context for ${this.mapName}`);
        this.features.clear();
        this.viewer.getLayerManager().removeLayer(this.layerName);
        this.viewer.removeInteraction(this.intTranslate);
    }
}