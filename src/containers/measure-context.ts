import {
    GenericEvent,
    IMapViewer
} from "../api/common";
import { IOLFactory } from "../api/ol-factory";
import { tr } from "../api/i18n";
import { roundTo } from "../utils/number";
import Observable from "ol/observable";
import olSphere from "ol/sphere";
import olOverlay from "ol/overlay";
import olLineString from "ol/geom/linestring";
import olPolygon from "ol/geom/polygon";
import olStyle from "ol/style/style";
import olInteractionDraw from "ol/interaction/draw";
import olFeature from "ol/feature";
import olVectorLayer from "ol/layer/vector";
import { debug } from '../utils/logger';

const LAYER_NAME = "measure-layer";
const WGS84_SPHERE = new olSphere(6378137);

/**
 * @hidden
 */
export interface MeasureSegment { 
    segment: number;
    length: number;
}

/**
 * @hidden
 */
export interface IMeasureCallback {
    updateSegments(kind: "LineString" | "Area", total: number, segments: MeasureSegment[] | undefined): void;
    clearSegments(): void;
}

/**
 * @hidden
 */
export interface IMeasureComponent {
    getCurrentDrawType(): string | undefined;
    getLocale(): string;
}

/**
 * @hidden
 */
export class MeasureContext {
    private olFactory: IOLFactory;
    private draw: olInteractionDraw;
    private measureOverlays: olOverlay[];
    private measureLayer: olVectorLayer;
    private viewer: IMapViewer;
    private sketch: olFeature | null;
    private listener: any;
    private helpTooltipElement: Element;
    private helpTooltip: olOverlay;
    private measureTooltipElement: Element | null;
    private measureTooltip: olOverlay;
    private mapName: string;
    private layerName: string;
    private parent: IMeasureComponent | undefined;
    private callback: IMeasureCallback | undefined;
    constructor(viewer: IMapViewer, mapName: string, parent: IMeasureComponent) {
        this.measureOverlays = [];
        this.viewer = viewer;
        this.mapName = mapName;
        this.parent = parent;
        this.layerName = `${LAYER_NAME}-${mapName}`;
        this.olFactory = viewer.getOLFactory();
        this.measureLayer = this.olFactory.createVectorLayer({
            source: this.olFactory.createVectorSource()
        });
        this.measureLayer.setStyle(this.createMeasureStyle());
    }
    /**
     * Establishes the new parent component for this context. Is called by the
     * new parent component when it mounts and is resuming from previously recorded
     * measurements and is not meant to be called directly
     * 
     * @param parent The new parent component
     * @since 0.12
     */
    public setParent(parent: IMeasureComponent) {
        this.parent = parent;
    }
    /**
     * Detaches the parent component from this context. Is called by the parent
     * component when it unmounts and is not meant to be called directly.
     * 
     * @since 0.12
     */
    public detachParent() {
        this.parent = undefined;
    }
    /**
     * Format length output.
     * @param {LineString} line The line.
     * @return {string} The formatted length.
     */
    private formatLength(line: olLineString): [string, number, MeasureSegment[] | undefined] {
        let length: number;
        let segments: MeasureSegment[] | undefined;
        if (this.parent) {
            const coordinates = line.getCoordinates();
            segments = [];
            length = 0;
            const sourceProj = this.viewer.getProjection();
            for (let i = 0, ii = coordinates.length - 1; i < ii; ++i) {
                const c1 = this.olFactory.transformCoordinate(coordinates[i], sourceProj, 'EPSG:4326');
                const c2 = this.olFactory.transformCoordinate(coordinates[i + 1], sourceProj, 'EPSG:4326');
                const dist = WGS84_SPHERE.haversineDistance(c1, c2);
                length += dist;
                segments.push({ segment: (i + 1), length: dist });
            }
        } else {
            length = NaN;
        }
        let output: string;
        if (length > 100) {
            output = (roundTo(length / 1000, 2)) + ' ' + 'km';
        } else {
            output = (roundTo(length, 2)) + ' ' + 'm';
        }
        return [output, length, segments];
    }
    /**
     * Format area output.
     * @param {Polygon} polygon The polygon.
     * @return {string} Formatted area.
     */
    private formatArea(polygon: olPolygon): [string, number, MeasureSegment[] | undefined] {
        let area: number;
        let segments: MeasureSegment[] | undefined;
        let locale;
        if (this.parent) {
            locale = this.parent.getLocale();
            //TODO: When we upgrade to OL 6, we'll need to update this (they changed their measure example)
            segments = [];
            const sourceProj = this.viewer.getProjection();
            const geom = (polygon.clone().transform(sourceProj, 'EPSG:4326') as olPolygon);
            const coordinates = geom.getLinearRing(0).getCoordinates();
            area = Math.abs(WGS84_SPHERE.geodesicArea(coordinates));
            for (let i = 0, ii = coordinates.length - 1; i < ii; ++i) {
                const c1 = coordinates[i]; 
                const c2 = coordinates[i + 1];
                const dist = WGS84_SPHERE.haversineDistance(c1, c2);
                segments.push({ segment: (i + 1), length: dist });
            }
        } else {
            area = NaN;
        }
        let output: string;
        //TODO: The dynamic switch in display of measurement unit based on size of value may prove to be
        //jarring, so we should provide a fixed unit value option in the future that will be used to 
        //display regardless of the size of value
        if (area > 10000) {
            output = tr("UNIT_FMT_SQKM", locale, {
                value: `${(roundTo(area / 1000000, 2))}`
            });
        } else {
            output = tr("UNIT_FMT_SQM", locale, {
                value: `${(roundTo(area, 2))}`
            });
        }
        return [output, area, segments];
    }
    private onDrawStart = (evt: GenericEvent) => {
        // set sketch
        this.sketch = evt.feature;

        /** @type {ol.Coordinate|undefined} */
        let tooltipCoord = evt.coordinate;

        if (this.sketch) {
            this.listener = this.sketch.getGeometry().on('change', (e: GenericEvent) => {
                const geom = e.target;
                let output: string;
                if (geom instanceof olPolygon) {
                    const [o, total, segments] = this.formatArea(geom);
                    output = o;
                    if (this.callback) {
                        this.callback.updateSegments("Area", total, segments);
                    }
                    tooltipCoord = geom.getInteriorPoint().getCoordinates();
                } else if (geom instanceof olLineString) {
                    const [o, total, segments] = this.formatLength(geom);
                    output = o;
                    if (this.callback) {
                        this.callback.updateSegments("LineString", total, segments);
                    }
                    tooltipCoord = geom.getLastCoordinate();
                } else {
                    output = "";
                }
                if (this.measureTooltipElement) {
                    this.measureTooltipElement.innerHTML = output;
                }
                this.measureTooltip.setPosition(tooltipCoord);
            });
        }
    }
    private onDrawEnd = () => {
        if (this.measureTooltipElement) {
            this.measureTooltipElement.className = 'tooltip tooltip-static';
        }
        this.measureTooltip.setOffset([0, -7]);
        // unset sketch
        this.sketch = null;
        // unset tooltip so that a new one can be created
        this.measureTooltipElement = null;
        this.createMeasureTooltip();
        Observable.unByKey(this.listener);
    }
    private onMouseMove = (evt: GenericEvent) => {
        if (evt.dragging || !this.parent) {
            return;
        }
        const locale = this.parent.getLocale();
        /** @type {string} */
        let helpMsg = tr("MEASUREMENT_START_DRAWING", locale);
        if (this.sketch) {
            const geom = (this.sketch.getGeometry());
            if (geom instanceof olPolygon) {
                helpMsg = tr("MEASUREMENT_CONTINUE_POLYGON", locale);
            } else if (geom instanceof olLineString) {
                helpMsg = tr("MEASUREMENT_CONTINUE_LINE", locale);
            }
        }
        this.helpTooltipElement.innerHTML = helpMsg;
        this.helpTooltip.setPosition(evt.coordinate);
        this.helpTooltipElement.classList.remove('hidden');
    }
    public getMapName(): string { return this.mapName; }
    private createMeasureStyle(): olStyle {
        return this.olFactory.createStyle({
            fill: this.olFactory.createStyleFill({
                color: 'rgba(255, 255, 255, 0.2)'
            }),
            stroke: this.olFactory.createStyleStroke({
                color: '#ffcc33',
                width: 2
            }),
            image: this.olFactory.createStyleCircle({
                radius: 7,
                fill: this.olFactory.createStyleFill({
                    color: '#ffcc33'
                })
            })
        });
    }
    private createDrawInteraction(type: string): olInteractionDraw {
        const source = this.measureLayer.getSource();
        return this.olFactory.createInteractionDraw({
            source: source,
            type: /** @type {ol.geom.GeometryType} */ (type),
            style: this.olFactory.createStyle({
                fill: this.olFactory.createStyleFill({
                    color: 'rgba(255, 255, 255, 0.2)'
                }),
                stroke: this.olFactory.createStyleStroke({
                    color: 'rgba(0, 0, 0, 0.5)',
                    lineDash: [10, 10],
                    width: 2
                }),
                image: this.olFactory.createStyleCircle({
                    radius: 5,
                    stroke: this.olFactory.createStyleStroke({
                        color: 'rgba(0, 0, 0, 0.7)'
                    }),
                    fill: this.olFactory.createStyleFill({
                        color: 'rgba(255, 255, 255, 0.2)'
                    })
                })
            })
        });
    }
    private removeElement(el: Element | null) {
        if (el && el.parentNode) {
            el.parentNode.removeChild(el);
        }
    }
    /**
     * Creates a new help tooltip
     */
    private createHelpTooltip() {
        this.removeElement(this.helpTooltipElement);
        this.helpTooltipElement = document.createElement('div');
        this.helpTooltipElement.className = 'tooltip hidden';
        this.helpTooltip = this.olFactory.createOverlay({
            element: this.helpTooltipElement,
            offset: [15, 0],
            positioning: 'center-left'
        });
        this.viewer.addOverlay(this.helpTooltip);
    }
    /**
     * Creates a new measure tooltip
     */
    private createMeasureTooltip() {
        this.removeElement(this.measureTooltipElement);
        this.measureTooltipElement = document.createElement('div');
        this.measureTooltipElement.className = 'tooltip tooltip-measure';
        //Stash the old overlay
        if (this.measureTooltip) {
            this.measureOverlays.push(this.measureTooltip);
        }
        this.measureTooltip = this.olFactory.createOverlay({
            element: this.measureTooltipElement,
            offset: [0, -15],
            positioning: 'bottom-center'
        });
        this.viewer.addOverlay(this.measureTooltip);
    }
    private setActiveInteraction(type: string) {
        if (this.draw) {
            this.draw.un("drawstart", this.onDrawStart);
            this.draw.un("drawend", this.onDrawEnd);
            this.viewer.removeInteraction(this.draw);
        }
        this.draw = this.createDrawInteraction(type);
        if (this.draw) {
            this.draw.on("drawstart", this.onDrawStart);
            this.draw.on("drawend", this.onDrawEnd);
            this.viewer.addInteraction(this.draw);
        }
    }
    public startMeasure() {
        if (this.parent) {
            const type = this.parent.getCurrentDrawType();
            if (type) {
                this.createMeasureTooltip();
                this.createHelpTooltip();
                this.setActiveInteraction(type);
                this.viewer.addHandler('pointermove', this.onMouseMove);
            }
        }
    }
    public endMeasure() {
        this.viewer.removeHandler('pointermove', this.onMouseMove);
        if (this.draw) {
            this.draw.un("drawstart", this.onDrawStart);
            this.draw.un("drawend", this.onDrawEnd);
            this.viewer.removeInteraction(this.draw);
            //this.draw = null;
        }
        this.removeElement(this.helpTooltipElement);
    }
    public clearMeasurements() {
        this.measureLayer.getSource().clear();
        for (const ov of this.measureOverlays) {
            this.viewer.removeOverlay(ov);
        }
        this.measureOverlays.length = 0; //Clear
        if (this.callback) {
            this.callback.clearSegments();
        }
    }
    public handleDrawTypeChange() {
        if (this.parent) {
            const type = this.parent.getCurrentDrawType();
            if (type) {
                this.setActiveInteraction(type);
            }
        }
    }
    /**
     * Since 0.12, mapName is required to explicitly state which map you are activating the context for
     *
     * @param {string} mapName
     * @param {IMeasureCallback} callback
     * @memberof MeasureContext
     */
    public activate(mapName: string, callback: IMeasureCallback) {
        this.callback = callback;
        debug(`Activating measure context for ${this.mapName}`);
        for (const ov of this.measureOverlays) {
            this.viewer.addOverlay(ov);
        }
        this.viewer.getLayerManager(mapName).addLayer(this.layerName, this.measureLayer, true);
    }
    /**
     * Since 0.12, mapName is required to explicitly state which map you are deactivating the context for
     *
     * @param {string} mapName
     * @memberof MeasureContext
     */
    public deactivate(mapName: string) {
        this.callback = undefined;
        debug(`De-activating measure context for ${this.mapName}`);
        this.endMeasure();
        for (const ov of this.measureOverlays) {
            this.viewer.removeOverlay(ov);
        }
        this.viewer.getLayerManager(mapName).removeLayer(this.layerName);
    }
}