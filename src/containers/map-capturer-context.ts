import { IMapViewer, Coordinate } from "../api/common";
import * as logger from "../utils/logger";
import { deg2rad } from "../utils/number";
import olExtent from "ol/extent";
import olFeature from "ol/feature";
import olPolygon from "ol/geom/polygon";
import olVectorSource from "ol/source/vector";
import olVectorLayer from "ol/layer/vector";
import olInteractionTranslate from "ol/interaction/translate";

export type Size = { w: number, h: number };

export class MapCapturerContext {
    private mapName: string;
    private mapCapturerSource: olVectorSource;
    private mapCapturerLayer: olVectorLayer;
    private viewer: IMapViewer;
    private layerName: string;
    private intTranslate: olInteractionTranslate;
    constructor(viewer: IMapViewer, mapName: string) {
        this.mapName = mapName;
        this.mapCapturerSource = new olVectorSource();
        this.mapCapturerLayer = new olVectorLayer({
            source: this.mapCapturerSource
        });
        this.intTranslate = new olInteractionTranslate({
            features: this.mapCapturerSource.getFeaturesCollection()
        })
        this.viewer = viewer;
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
    public updateBox(paperSize: Size, scaleDenominator: number, rotation: number): void {
        const features = this.mapCapturerSource.getFeaturesCollection();
        if (!features || features.getLength() == 0) {
            this.createCaptureBox(paperSize, scaleDenominator, rotation);
        } else {
            const box = features.item(0);
            const geom = box.getGeometry() as olPolygon;
            const center = olExtent.getCenter(geom.getExtent());
            const origin = {
                x: center[0],
                y: center[1]
            };
            const ring = this.getRing(origin, paperSize, scaleDenominator);
            geom.setCoordinates(ring);
            geom.rotate(deg2rad(rotation), center);
        }
    }
    private createCaptureBox(paperSize: Size, scaleDenominator: number, rotation: number) {
        const origin = this.viewer.getCurrentView();
        const ring = this.getRing(origin, paperSize, scaleDenominator);
        const poly = new olPolygon(ring);
        poly.rotate(deg2rad(rotation), [ origin.x, origin.y ]);
        const box = new olFeature(poly);
        this.mapCapturerSource.clear();
        this.mapCapturerSource.addFeature(box);
    }
    public getMapName(): string { return this.mapName; }
    public activate(paperSize: Size, scaleDenominator: number, rotation: number): void {
        logger.debug(`Activating map capturer context for ${this.mapName}`);
        this.viewer.addLayer(this.layerName, this.mapCapturerLayer);
        this.createCaptureBox(paperSize, scaleDenominator, rotation);
        this.intTranslate.setActive(true);
        this.viewer.addInteraction(this.intTranslate);
    }
    public deactivate(): void {
        logger.debug(`De-activating map capturer context for ${this.mapName}`);
        this.mapCapturerLayer.getSource().clear();
        this.viewer.removeLayer(this.layerName);
        this.intTranslate.setActive(false);
        this.viewer.removeInteraction(this.intTranslate);
    }
}