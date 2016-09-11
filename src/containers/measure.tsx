import * as React from "react";
import * as ol from "openlayers";
import { connect } from "react-redux";
import { IMapViewer, ActiveMapTool } from "../components/map-viewer-base";
import { getViewer } from "../api/runtime";
import { tr } from "../api/i18n";
import { NBSP } from "../constants";

const LAYER_NAME = "measure-layer";
const WGS84_SPHERE = new ol.Sphere(6378137);
const measureOverlays: ol.Overlay[] = [];

interface IMeasureContainerProps {
    
}

interface IMeasureContainerState {
    config?: any;
}

interface IMeasureContainerDispatch {
    
}

function mapStateToProps(state): IMeasureContainerState {
    return {
        config: state.config
    };
}

function mapDispatchToProps(dispatch) {
    return {
        
    };
}

type MeasureProps = IMeasureContainerProps & IMeasureContainerState & IMeasureContainerDispatch;

@connect(mapStateToProps, mapDispatchToProps)
export class MeasureContainer extends React.Component<MeasureProps, any> {
    private measureLayer: ol.layer.Vector;
    private viewer: IMapViewer;
    private draw: ol.interaction.Draw;
    private fnTypeChanged: (e) => void;
    private fnGeodesicChanged: (e) => void;
    private fnDrawStart: (e) => void;
    private fnDrawEnd: (e) => void;
    private fnMouseMove: (e) => void;
    private fnClearMeasurements: (e) => void;
    private sketch: ol.Feature;
    private listener: any;
    private helpTooltipElement: Element;
    private helpTooltip: ol.Overlay;
    private measureTooltipElement: Element;
    private measureTooltip: ol.Overlay;
    constructor(props) {
        super(props);
        this.fnTypeChanged = this.onTypeChanged.bind(this);
        this.fnGeodesicChanged = this.onGeodesicChanged.bind(this);
        this.fnDrawStart = this.onDrawStart.bind(this);
        this.fnDrawEnd = this.onDrawEnd.bind(this);
        this.fnMouseMove = this.onMouseMove.bind(this);
        this.fnClearMeasurements = this.onClearMeasurements.bind(this);
        this.state = {
            geodesic: false,
            type: "LineString"
        };
    }
    private setActiveInteraction(type) {
        if (this.draw) {
            this.draw.un("drawstart", this.fnDrawStart);
            this.draw.un("drawend", this.fnDrawEnd);
            this.viewer.removeInteraction(this.draw);
        }
        this.draw = this.createDrawInteraction(type);
        this.draw.on("drawstart", this.fnDrawStart);
        this.draw.on("drawend", this.fnDrawEnd);
        this.viewer.addInteraction(this.draw);
    }
    private onTypeChanged(e) {
        const newType = e.target.value;
        this.setState({ type: newType }, () => {
            this.setActiveInteraction(newType);
        });
    }
    private onGeodesicChanged(e) {
        const newValue = e.target.checked;
        this.setState({ geodesic: newValue });
    }
    private createDrawInteraction(type): ol.interaction.Draw {
        const source = this.measureLayer.getSource();
        return new ol.interaction.Draw({
            source: source,
            type: /** @type {ol.geom.GeometryType} */ (type),
            style: new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'rgba(255, 255, 255, 0.2)'
                }),
                stroke: new ol.style.Stroke({
                    color: 'rgba(0, 0, 0, 0.5)',
                    lineDash: [10, 10],
                    width: 2
                }),
                image: new ol.style.Circle({
                    radius: 5,
                    stroke: new ol.style.Stroke({
                        color: 'rgba(0, 0, 0, 0.7)'
                    }),
                    fill: new ol.style.Fill({
                        color: 'rgba(255, 255, 255, 0.2)'
                    })
                })
            })
        });
    }
    private createMeasureStyle(): ol.style.Style {
        return new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(255, 255, 255, 0.2)'
            }),
            stroke: new ol.style.Stroke({
                color: '#ffcc33',
                width: 2
            }),
            image: new ol.style.Circle({
                radius: 7,
                fill: new ol.style.Fill({
                    color: '#ffcc33'
                })
            })
        });
    }
    /**
     * Format length output.
     * @param {ol.geom.LineString} line The line.
     * @return {string} The formatted length.
     */
    private formatLength(line) {
        let length;
        if (this.state.geodesic) {
            const coordinates = line.getCoordinates();
            length = 0;
            const sourceProj = this.viewer.getProjection();
            for (let i = 0, ii = coordinates.length - 1; i < ii; ++i) {
                const c1 = ol.proj.transform(coordinates[i], sourceProj, 'EPSG:4326');
                const c2 = ol.proj.transform(coordinates[i + 1], sourceProj, 'EPSG:4326');
                length += WGS84_SPHERE.haversineDistance(c1, c2);
            }
        } else {
            length = Math.round(line.getLength() * 100) / 100;
        }
        let output;
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
     * @param {ol.geom.Polygon} polygon The polygon.
     * @return {string} Formatted area.
     */
    private formatArea(polygon) {
        let area;
        if (this.state.geodesic) {
            const sourceProj = this.viewer.getProjection();
            const geom = /** @type {ol.geom.Polygon} */(polygon.clone().transform(
                sourceProj, 'EPSG:4326'));
            const coordinates = geom.getLinearRing(0).getCoordinates();
            area = Math.abs(WGS84_SPHERE.geodesicArea(coordinates));
        } else {
            area = polygon.getArea();
        }
        let output;
        if (area > 10000) {
            output = (Math.round(area / 1000000 * 100) / 100) +
                ' ' + 'km<sup>2</sup>';
        } else {
            output = (Math.round(area * 100) / 100) +
                ' ' + 'm<sup>2</sup>';
        }
        return output;
    }
    private onDrawStart(evt) {
        // set sketch
        this.sketch = evt.feature;

        /** @type {ol.Coordinate|undefined} */
        let tooltipCoord = evt.coordinate;

        this.listener = this.sketch.getGeometry().on('change', (evt) => {
            const geom = evt.target;
            let output;
            if (geom instanceof ol.geom.Polygon) {
                output = this.formatArea(geom);
                tooltipCoord = geom.getInteriorPoint().getCoordinates();
            } else if (geom instanceof ol.geom.LineString) {
                output = this.formatLength(geom);
                tooltipCoord = geom.getLastCoordinate();
            }
            this.measureTooltipElement.innerHTML = output;
            this.measureTooltip.setPosition(tooltipCoord);
        });
    }
    private onDrawEnd(evt) {
        this.measureTooltipElement.className = 'tooltip tooltip-static';
        this.measureTooltip.setOffset([0, -7]);
        // unset sketch
        this.sketch = null;
        // unset tooltip so that a new one can be created
        this.measureTooltipElement = null;
        this.createMeasureTooltip();
        ol.Observable.unByKey(this.listener);
    }
    /**
     * Creates a new help tooltip
     */
    private createHelpTooltip() {
        if (this.helpTooltipElement) {
            this.helpTooltipElement.parentNode.removeChild(this.helpTooltipElement);
        }
        this.helpTooltipElement = document.createElement('div');
        this.helpTooltipElement.className = 'tooltip hidden';
        this.helpTooltip = new ol.Overlay({
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
        if (this.measureTooltipElement) {
            this.measureTooltipElement.parentNode.removeChild(this.measureTooltipElement);
        }
        this.measureTooltipElement = document.createElement('div');
        this.measureTooltipElement.className = 'tooltip tooltip-measure';
        //Stash the old overlay
        if (this.measureTooltip) {
            measureOverlays.push(this.measureTooltip);
        }
        this.measureTooltip = new ol.Overlay({
            element: this.measureTooltipElement,
            offset: [0, -15],
            positioning: 'bottom-center'
        });
        this.viewer.addOverlay(this.measureTooltip);
    }
    private onMouseMove(evt) {
        if (evt.dragging) {
            return;
        }
        const { locale } = this.props.config;
        /** @type {string} */
        let helpMsg = tr("MEASUREMENT_START_DRAWING", locale);
        if (this.sketch) {
            const geom = (this.sketch.getGeometry());
            if (geom instanceof ol.geom.Polygon) {
                helpMsg = tr("MEASUREMENT_CONTINUE_POLYGON", locale);
            } else if (geom instanceof ol.geom.LineString) {
                helpMsg = tr("MEASUREMENT_CONTINUE_LINE", locale);
            }
        }
        this.helpTooltipElement.innerHTML = helpMsg;
        this.helpTooltip.setPosition(evt.coordinate);
        this.helpTooltipElement.classList.remove('hidden');
    }
    private onClearMeasurements(e) {
        e.preventDefault();
        this.measureLayer.getSource().clear();
        for (const ov of measureOverlays) {
            this.viewer.removeOverlay(ov);
        }
        measureOverlays.length = 0; //Clear
        return false;
    }
    componentDidMount() {
        this.viewer = getViewer();
        this.measureLayer = this.viewer.getLayer(LAYER_NAME, () => {
            return new ol.layer.Vector({
                source: new ol.source.Vector(),
                renderOrder: null //This is probably a bug in OL API doc
            });
        });
        this.measureLayer.setStyle(this.createMeasureStyle());
        this.createMeasureTooltip();
        this.createHelpTooltip();
        this.setActiveInteraction(this.state.type);
        this.viewer.addHandler('pointermove', this.fnMouseMove);
    }
    componentWillUnmount() {
        this.viewer.removeHandler('pointermove', this.fnMouseMove);
        if (this.draw) {
            this.draw.un("drawstart", this.fnDrawStart);
            this.draw.un("drawend", this.fnDrawEnd);
            this.viewer.removeInteraction(this.draw);
            this.draw = null;
        }
        if (this.helpTooltipElement) {
            this.helpTooltipElement.parentNode.removeChild(this.helpTooltipElement);
        }
        this.viewer = null;
        this.measureLayer = null;
    }
    render(): JSX.Element {
        const { locale } = this.props.config;
        return <div>
            <form className="form-inline">
                <div>
                    <label>{tr("MEASUREMENT_TYPE", locale)} {NBSP}</label>
                    <select value={this.state.type} onChange={this.fnTypeChanged}>
                        <option value="LineString">{tr("MEASUREMENT_TYPE_LENGTH", locale)}</option>
                        <option value="Polygon">{tr("MEASUREMENT_TYPE_AREA", locale)}</option>
                    </select>
                </div>
                <div>
                    <label className="checkbox">
                        <input type="checkbox" checked={this.state.geodesic} onChange={this.fnGeodesicChanged} />
                        {tr("MEASUREMENT_USE_GEODESIC", locale)}
                    </label>
                </div>
                <div>
                    <button type="button" onClick={this.fnClearMeasurements}>{tr("MEASUREMENT_CLEAR", locale)}</button>
                </div>
            </form>
        </div>;
    }
}