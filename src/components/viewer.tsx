import * as React from "react";
import * as ReactDOM from "react-dom";
import { CURSOR_DIGITIZE_POINT, CURSOR_DIGITIZE_LINE, CURSOR_DIGITIZE_LINESTRING, CURSOR_DIGITIZE_RECT, CURSOR_DIGITIZE_POLYGON, CURSOR_DIGITIZE_CIRCLE, CURSOR_GRABBING, CURSOR_GRAB, CURSOR_ZOOM_IN } from '../constants/assets';
import { ActiveMapTool, MapLoadIndicatorPositioning, LayerProperty, GenericEvent, IMapView, Bounds, IExternalBaseLayer } from '../api/common';
import { MapLoadIndicator, isMiddleMouseDownEvent } from './map-viewer-base';
import Map from "ol/Map";
import DragBox from 'ol/interaction/DragBox';
import { MapOptions } from 'ol/PluggableMap';
import Attribution from 'ol/control/Attribution';
import Rotate from 'ol/control/Rotate';
import DragRotate from 'ol/interaction/DragRotate';
import DragPan from 'ol/interaction/DragPan';
import PinchRotate from 'ol/interaction/PinchRotate';
import PinchZoom from 'ol/interaction/PinchZoom';
import KeyboardPan from 'ol/interaction/KeyboardPan';
import KeyboardZoom from 'ol/interaction/KeyboardZoom';
import MouseWheelZoom from 'ol/interaction/MouseWheelZoom';
import Select from 'ol/interaction/Select';
import { tr } from '../api/i18n';
import { MapViewerContext } from './map-viewer-context';
import * as olExtent from "ol/extent";
import Polygon from 'ol/geom/Polygon';
import { createExternalSource } from './external-layer-factory';
import TileLayer from 'ol/layer/Tile';
import Layer from 'ol/layer/Layer';
import { Callout, Intent } from '@blueprintjs/core';

import "ol/ol.css";

export interface IViewerProviderContext {
    isDigitizing(): boolean;
    isChildOfMountedComponent(): boolean;
    attachToComponent(el: Element, comp: IViewerComponent): void;
    addLayer(layer: Layer): void;
    removeLayer(layer: Layer): void;
}

export interface IViewerComponent {
    getTool: () => ActiveMapTool;
    getLocale: () => string | undefined;
    getMapName: () => string;
    isContextMenuOpen: () => boolean;
    onMouseCoordinateChanged: (coords: number[]) => void;
    onRequestZoomToView: (view: IMapView) => void;
}

class GenericViewerProviderContext implements IViewerProviderContext {
    private _map: Map;
    private _zoomSelectBox: DragBox;
    private _select: Select;
    private _mapContext: MapViewerContext | undefined;
    private _comp: IViewerComponent | undefined;

    private _supportsTouch: boolean;
    private _manualFeatureTooltips: boolean;

    /**
     * @virtual
     * @protected
     * @param {Polygon} geom
     * @memberof GenericViewerProviderContext
     */
    protected selectFeaturesByExtent(geom: Polygon) { }

    private getScaleForExtent(bounds: Bounds): number {
        if (!this._mapContext || !this._comp) {
            throw new Error("Map not ready");
        }
        const activeLayerSet = this._mapContext.getLayerSet(this._comp.getMapName());
        const mcsW = olExtent.getWidth(bounds);
        const mcsH = olExtent.getHeight(bounds);
        const size = this._map.getSize();
        const devW = size[0];
        const devH = size[1];
        const metersPerPixel = 0.0254 / activeLayerSet.getDpi();
        const metersPerUnit = activeLayerSet.getMetersPerUnit();
        //Scale calculation code from AJAX viewer
        let mapScale: number;
        if (devH * mcsW > devW * mcsH)
            mapScale = mcsW * metersPerUnit / (devW * metersPerPixel); // width-limited
        else
            mapScale = mcsH * metersPerUnit / (devH * metersPerPixel); // height-limited
        return mapScale;
    }
    private getViewForExtent(extent: Bounds): IMapView {
        const scale = this.getScaleForExtent(extent);
        const center = olExtent.getCenter(extent);
        return {
            x: center[0],
            y: center[1],
            scale: scale,
            resolution: this._map.getView().getResolution()
        };
    }
    private onZoomSelectBox(e: GenericEvent) {
        if (this._comp) {
            const extent = this._zoomSelectBox.getGeometry();
            switch (this._comp.getTool()) {
                case ActiveMapTool.Zoom:
                    {
                        const ext: any = extent.getExtent();
                        this._comp.onRequestZoomToView(this.getViewForExtent(ext));
                    }
                    break;
                case ActiveMapTool.Select:
                    {
                        //this.sendSelectionQuery(this.buildDefaultQueryOptions(extent));
                        this.selectFeaturesByExtent(extent);
                    }
                    break;
            }
        }
    }
    private onMouseMove(e: GenericEvent) {
        if (this._mapContext && this._comp) {
            this._mapContext.handleMouseTooltipMouseMove(e);
            if (this._comp.isContextMenuOpen()) {
                return;
            }
            if (!this._manualFeatureTooltips) {
                this._mapContext.handleFeatureTooltipMouseMove(e);
            }
            this._comp.onMouseCoordinateChanged?.(e.coordinate);
        }
    }

    public isDigitizing(): boolean {
        return false;
    }
    public attachToComponent(el: HTMLElement, comp: IViewerComponent): void {
        this._comp = comp;
        const tool = this._comp.getTool();
        const locale = this._comp.getLocale();
        this._select = new Select({
            condition: (e) => false,
            layers: (layer) => layer.get(LayerProperty.IS_SELECTABLE) == true || layer.get(LayerProperty.IS_SCRATCH) == true
        });
        this._zoomSelectBox = new DragBox({
            condition: (e) => !this.isDigitizing() && (tool === ActiveMapTool.Select || tool === ActiveMapTool.Zoom)
        });
        this._zoomSelectBox.on("boxend", this.onZoomSelectBox.bind(this));
        const mapOptions: MapOptions = {
            target: el as any,
            //layers: layers,
            //view: view,
            controls: [
                new Attribution({
                    tipLabel: tr("OL_ATTRIBUTION_TIP", locale)
                }),
                new Rotate({
                    tipLabel: tr("OL_RESET_ROTATION_TIP", locale)
                })
            ],
            interactions: [
                this._select,
                new DragRotate(),
                new DragPan({
                    condition: (e) => {
                        const startingMiddleMouseDrag = e.type == "pointerdown" && isMiddleMouseDownEvent((e as any).originalEvent);
                        const enabled = (startingMiddleMouseDrag || this._supportsTouch || this._comp?.getTool() === ActiveMapTool.Pan);
                        //console.log(e);
                        //console.log(`Allow Pan - ${enabled} (middle mouse: ${startingMiddleMouseDrag})`);
                        return enabled;
                    }
                }),
                new PinchRotate(),
                new PinchZoom(),
                new KeyboardPan(),
                new KeyboardZoom(),
                new MouseWheelZoom(),
                this._zoomSelectBox
            ]
        };
        this._map = new Map(mapOptions);
        this._map.on("pointermove", this.onMouseMove.bind(this));
        //this._map.on("change:size", this.onResize.bind(this));
    }
    public addLayer(layer: Layer): void {
        this._map.addLayer(layer);
        const v = this._map.getView();
        v.setCenter([0, 0]);
        v.setZoom(2);
    }
    public removeLayer(layer: Layer): void {
        this._map.removeLayer(layer);
    }
    public isChildOfMountedComponent(): boolean {
        if (this._map && this._comp) {
            return true;
        } else {
            return false;
        }
    }
}

const ViewerProviderContext = React.createContext<IViewerProviderContext>(new GenericViewerProviderContext());

function getRootElementStyle(context: IViewerProviderContext, tool: ActiveMapTool, isMouseDown: boolean, digitizingType?: string): React.CSSProperties {
    const style: React.CSSProperties = {
        width: "100%",
        height: "100%",
        backgroundColor: "gray"
    };
    if (context.isDigitizing()) {
        switch (digitizingType) {
            case "Point":
                style.cursor = `url(${CURSOR_DIGITIZE_POINT}), auto`;
                //console.log(`cursor: ${style.cursor}`);
                break;
            case "Line":
                style.cursor = `url(${CURSOR_DIGITIZE_LINE}), auto`;
                //console.log(`cursor: ${style.cursor}`);
                break;
            case "LineString":
                style.cursor = `url(${CURSOR_DIGITIZE_LINESTRING}), auto`;
                //console.log(`cursor: ${style.cursor}`);
                break;
            case "Rectangle":
                style.cursor = `url(${CURSOR_DIGITIZE_RECT}), auto`;
                //console.log(`cursor: ${style.cursor}`);
                break;
            case "Polygon":
                style.cursor = `url(${CURSOR_DIGITIZE_POLYGON}), auto`;
                //console.log(`cursor: ${style.cursor}`);
                break;
            case "Circle":
                style.cursor = `url(${CURSOR_DIGITIZE_CIRCLE}), auto`;
                //console.log(`cursor: ${style.cursor}`);
                break;
        }
    } else {
        switch (tool) {
            case ActiveMapTool.Pan:
                if (isMouseDown) {
                    style.cursor = `url(${CURSOR_GRABBING}), auto`;
                    //console.log(`cursor: ${style.cursor}`);
                } else {
                    style.cursor = `url(${CURSOR_GRAB}), auto`;
                    //console.log(`cursor: ${style.cursor}`);
                }
                break;
            case ActiveMapTool.Zoom:
                style.cursor = `url(${CURSOR_ZOOM_IN}), auto`;
                //console.log(`cursor: ${style.cursor}`);
                break;
        }
    }
    /*
    if (map) {
        style.backgroundColor = `#${map.BackgroundColor.substring(2)}`;
    }
    */
    return style;
}

export interface IViewerProps {
    tool: ActiveMapTool;
    mapName: string;
    locale?: string;
    view?: IMapView;
    indicatorColor: string;
    indicatorPosition: MapLoadIndicatorPositioning;
    onContextMenu?: (pos: [number, number]) => void;
    onRequestZoomToView: (view: IMapView) => void;
    children?: React.ReactNode;
}

export interface IExternalBaseLayerProps extends IExternalBaseLayer {
    
}

export const ExternalBaseLayer = (props: IExternalBaseLayerProps) => {
    const context = React.useContext(ViewerProviderContext);
    React.useEffect(() => {
        if (context.isChildOfMountedComponent()) {
            const layer = new TileLayer({
                source: createExternalSource(props) as any
            });
            context.addLayer(layer);
            return () => {
                context.removeLayer(layer);
            };
        }
    }, []);
    if (!context.isChildOfMountedComponent()) {
        return <Callout intent={Intent.DANGER}>
            <h4 className="bp3-heading">Invalid Configuration</h4>
            This component must be rendered as a child of the &lt;Viewer&gt; component
        </Callout>;
    }
    return <noscript />;
}

export const Viewer = (props: IViewerProps) => {
    const {
        tool,
        locale,
        mapName,
        indicatorColor,
        indicatorPosition,
        onRequestZoomToView
    } = props;

    // Hooks
    const [readyToMountChildren, setReadyToMountChildren] = React.useState(false);
    const [isMouseDown, setIsMouseDown] = React.useState(false);
    const [digitizingType, setDigitizingType] = React.useState<string | undefined>(undefined);
    const [loading, setLoading] = React.useState(0);
    const [loaded, setLoaded] = React.useState(0);
    const context = React.useContext(ViewerProviderContext);

    const mapEl = React.useRef<HTMLDivElement>(null);

    // Setup when component mounts
    React.useEffect(() => {
        const domNode = ReactDOM.findDOMNode(mapEl.current) as Element;
        context.attachToComponent(domNode, {
            getTool: () => tool,
            getLocale: () => locale,
            getMapName: () => mapName,
            isContextMenuOpen: () => false,
            onMouseCoordinateChanged: () => {},
            onRequestZoomToView: onRequestZoomToView
        });
        setReadyToMountChildren(true);
    }, []); 

    // Handlers
    const onContextMenu = (e: React.MouseEvent<HTMLDivElement>) => props?.onContextMenu?.([e.clientX, e.clientY]);
    const onMouseDown = () => setIsMouseDown(true);
    const onMouseUp = () => setIsMouseDown(false);

    const style = getRootElementStyle(context, tool, isMouseDown, digitizingType);
    return <div ref={mapEl} className="map-viewer-component" style={style} onContextMenu={onContextMenu} onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
        <MapLoadIndicator loaded={loaded} loading={loading} position={indicatorPosition} color={indicatorColor} />
        {readyToMountChildren && props.children}
    </div>;
};