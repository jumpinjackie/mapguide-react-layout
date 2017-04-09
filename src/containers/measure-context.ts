import {
    IMapViewer,
    ActiveMapTool,
    ReduxDispatch,
    IApplicationState,
    IConfigurationReducerState
} from "../api/common";
import { IOLFactory } from "../api/ol-factory";
import { tr } from "../api/i18n";
import * as logger from "../utils/logger";

import Observable from "ol/observable";
import olSphere from "ol/sphere";
import olOverlay from "ol/overlay";
import olLineString from "ol/geom/linestring";
import olPolygon from "ol/geom/polygon";
import olStyle from "ol/style/style";
import olInteractionDraw from "ol/interaction/draw";
import olFeature from "ol/feature";
import olVectorLayer from "ol/layer/vector";

const LAYER_NAME = "measure-layer";
const WGS84_SPHERE = new olSphere(6378137);

export interface IMeasureComponent {
    getCurrentDrawType(): string | undefined;
    getLocale(): string;
    isGeodesic(): boolean;
}

export class MeasureContext {
    private olFactory: IOLFactory;
    private fnDrawStart: GenericEventHandler;
    private fnDrawEnd: GenericEventHandler;
    private fnMouseMove: GenericEventHandler;
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
    private parent: IMeasureComponent;
    constructor(viewer: IMapViewer, mapName: string, parent: IMeasureComponent) {
        this.measureOverlays = [];
        this.viewer = viewer;
        this.mapName = mapName;
        this.parent = parent;
        this.fnDrawStart = this.onDrawStart.bind(this);
        this.fnDrawEnd = this.onDrawEnd.bind(this);
        this.fnMouseMove = this.onMouseMove.bind(this);
        this.layerName = `${LAYER_NAME}-${mapName}`;
        this.olFactory = viewer.getOLFactory();
        this.measureLayer = this.olFactory.createVectorLayer({
            source: this.olFactory.createVectorSource(),
            renderOrder: null as any //This is probably a bug in OL API doc
        });
        this.measureLayer.setStyle(this.createMeasureStyle());
    }
    /**
     * Format length output.
     * @param {LineString} line The line.
     * @return {string} The formatted length.
     */
    private formatLength(line: olLineString) {
        let length: number;
        if (this.parent.isGeodesic()) {
            const coordinates = line.getCoordinates();
            length = 0;
            const sourceProj = this.viewer.getProjection();
            for (let i = 0, ii = coordinates.length - 1; i < ii; ++i) {
                const c1 = this.olFactory.transformCoordinate(coordinates[i], sourceProj, 'EPSG:4326');
                const c2 = this.olFactory.transformCoordinate(coordinates[i + 1], sourceProj, 'EPSG:4326');
                length += WGS84_SPHERE.haversineDistance(c1, c2);
            }
        } else {
            length = Math.round(line.getLength() * 100) / 100;
        }
        let output: string;
        if (length > 100) {
            output = (Math.round(length / 1000 * 100) / 100) +
                ' ' + 'km';
        } else {
            output = (Math.round(length * 100) / 100) +
                ' ' + 'm';
        }
        return output;
    }
    /**
     * Format area output.
     * @param {Polygon} polygon The polygon.
     * @return {string} Formatted area.
     */
    private formatArea(polygon: olPolygon) {
        let area: number;
        if (this.parent.isGeodesic()) {
            const sourceProj = this.viewer.getProjection();
            const geom = (polygon.clone().transform(sourceProj, 'EPSG:4326') as olPolygon);
            const coordinates = geom.getLinearRing(0).getCoordinates();
            area = Math.abs(WGS84_SPHERE.geodesicArea(coordinates));
        } else {
            area = polygon.getArea();
        }
        let output: string;
        if (area > 10000) {
            output = (Math.round(area / 1000000 * 100) / 100) +
                ' ' + 'km<sup>2</sup>';
        } else {
            output = (Math.round(area * 100) / 100) +
                ' ' + 'm<sup>2</sup>';
        }
        return output;
    }
    private onDrawStart(evt: GenericEvent) {
        // set sketch
        this.sketch = evt.feature;

        /** @type {ol.Coordinate|undefined} */
        let tooltipCoord = evt.coordinate;

        if (this.sketch) {
            this.listener = this.sketch.getGeometry().on('change', (e: GenericEvent) => {
                const geom = e.target;
                let output: string;
                if (geom instanceof olPolygon) {
                    output = this.formatArea(geom);
                    tooltipCoord = geom.getInteriorPoint().getCoordinates();
                } else if (geom instanceof olLineString) {
                    output = this.formatLength(geom);
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
    private onDrawEnd(evt: GenericEvent) {
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
    private onMouseMove(evt: GenericEvent) {
        if (evt.dragging) {
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
            this.draw.un("drawstart", this.fnDrawStart);
            this.draw.un("drawend", this.fnDrawEnd);
            this.viewer.removeInteraction(this.draw);
        }
        this.draw = this.createDrawInteraction(type);
        if (this.draw) {
            this.draw.on("drawstart", this.fnDrawStart);
            this.draw.on("drawend", this.fnDrawEnd);
            this.viewer.addInteraction(this.draw);
        }
    }
    public startMeasure() {
        const type = this.parent.getCurrentDrawType();
        if (type) {
            this.createMeasureTooltip();
            this.createHelpTooltip();
            this.setActiveInteraction(type);
            this.viewer.addHandler('pointermove', this.fnMouseMove);
        }
    }
    public endMeasure() {
        this.viewer.removeHandler('pointermove', this.fnMouseMove);
        if (this.draw) {
            this.draw.un("drawstart", this.fnDrawStart);
            this.draw.un("drawend", this.fnDrawEnd);
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
    }
    public handleDrawTypeChange() {
        const type = this.parent.getCurrentDrawType();
        if (type) {
            this.setActiveInteraction(type);
        }
    }
    public activate() {
        logger.debug(`Activating measure context for ${this.mapName}`);
        for (const ov of this.measureOverlays) {
            this.viewer.addOverlay(ov);
        }
        this.viewer.addLayer(this.layerName, this.measureLayer);
    }
    public deactivate() {
        logger.debug(`De-activating measure context for ${this.mapName}`);
        this.endMeasure();
        for (const ov of this.measureOverlays) {
            this.viewer.removeOverlay(ov);
        }
        this.viewer.removeLayer(this.layerName);
    }
}