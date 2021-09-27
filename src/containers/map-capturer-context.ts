import { IMapViewer, Coordinate2D, Size } from "../api/common";
import { deg2rad } from "../utils/number";
import * as olExtent from "ol/extent";
import Feature from "ol/Feature";
import Collection from "ol/Collection";
import Polygon from "ol/geom/Polygon";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import Translate from "ol/interaction/Translate";
import { debug } from '../utils/logger';
import Geometry from 'ol/geom/Geometry';

export interface IMapCapturerContextCallback {
    updateBoxCoords(box: string, normalizedBox: string): void;
}

export class MapCapturerContext {
    private mapCapturerSource: VectorSource<Geometry>;
    private mapCapturerLayer: VectorLayer<VectorSource<Geometry>>;
    private layerName: string;
    private intTranslate: Translate;
    private features: Collection<Feature<Geometry>>;
    private activeCallback: IMapCapturerContextCallback | undefined;
    constructor(private viewer: IMapViewer, private mapName: string, private rotation: number = 0) {
        this.features = new Collection<Feature<Geometry>>();
        this.mapCapturerSource = new VectorSource({
            features: this.features
        });
        this.mapCapturerLayer = new VectorLayer({
            source: this.mapCapturerSource
        });
        this.intTranslate = new Translate({
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
            const poly = box.getGeometry() as Polygon;
            const coords = poly.getCoordinates()[0];
            const boxCoords = coords.map(c => `${c[0]},${c[1]}`).join(",");
            //Process normalized one
            const npoly = poly.clone() as Polygon;
            const ncenter = olExtent.getCenter(npoly.getExtent());
            npoly.rotate(deg2rad(this.rotation), ncenter);
            const ncoords = npoly.getCoordinates()[0];
            const nBoxCoords = ncoords.map(c => `${c[0]},${c[1]}`).join(",");
            this.activeCallback.updateBoxCoords(boxCoords, nBoxCoords);
        }
    }
    public updateBox(paperSize: Size, scaleDenominator: number, rotation: number): void {
        if (this.activeCallback) {
            this.rotation = rotation;
            let poly: Polygon;
            if (this.features.getLength() == 0) {
                poly = this.createCaptureBox(paperSize, scaleDenominator, this.rotation);
            } else {
                const box = this.features.item(0);
                poly = box.getGeometry() as Polygon;
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
            const npoly = poly.clone() as Polygon;
            const ncenter = olExtent.getCenter(npoly.getExtent());
            npoly.rotate(deg2rad(this.rotation), ncenter);
            const ncoords = npoly.getCoordinates()[0];
            const nBoxCoords = ncoords.map((c: any) => `${c[0]},${c[1]}`).join(",");
            this.activeCallback.updateBoxCoords(boxCoords, nBoxCoords);
        }
    }
    private createCaptureBox(paperSize: Size, scaleDenominator: number, rotation: number): Polygon {
        const origin = this.viewer.getCurrentView();
        const ring = this.getRing(origin, paperSize, scaleDenominator);
        const poly = new Polygon(ring);
        poly.rotate(-deg2rad(rotation), [ origin.x, origin.y ]);
        const box = new Feature(poly);
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