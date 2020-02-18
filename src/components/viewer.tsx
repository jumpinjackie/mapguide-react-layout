import * as React from "react";
import * as ReactDOM from "react-dom";
import { CURSOR_DIGITIZE_POINT, CURSOR_DIGITIZE_LINE, CURSOR_DIGITIZE_LINESTRING, CURSOR_DIGITIZE_RECT, CURSOR_DIGITIZE_POLYGON, CURSOR_DIGITIZE_CIRCLE, CURSOR_GRABBING, CURSOR_GRAB, CURSOR_ZOOM_IN } from '../constants/assets';
import { ActiveMapTool, MapLoadIndicatorPositioning } from '../api/common';
import { MapLoadIndicator } from './map-viewer-base';
import Map from "ol/Map";
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import View from 'ol/View';

export interface IViewerProviderContext {
    isDigitizing(): boolean;
    setupComponent(el: Element): void;
}

class GenericViewerProviderContext implements IViewerProviderContext {
    private map_: Map;
    public isDigitizing(): boolean {
        return false;
    }
    public setupComponent(el: HTMLElement): void {
        this.map_ = new Map({
            layers: [
                new TileLayer({
                    source: new OSM()
                })
            ],
            target: el,
            view: new View({
                center: [0, 0],
                zoom: 2
            })
        })
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
    indicatorColor: string;
    indicatorPosition: MapLoadIndicatorPositioning;
    onContextMenu?: (pos: [number, number]) => void;
}

export const Viewer = (props: IViewerProps) => {
    const {
        tool,
        indicatorColor,
        indicatorPosition
    } = props;
    

    // Hooks
    const [isMouseDown, setIsMouseDown] = React.useState(false);
    const [digitizingType, setDigitizingType] = React.useState<string | undefined>(undefined);
    const [loading, setLoading] = React.useState(0);
    const [loaded, setLoaded] = React.useState(0);
    const context = React.useContext(ViewerProviderContext);

    const mapEl = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const domNode = ReactDOM.findDOMNode(mapEl.current) as Element;
        context.setupComponent(domNode);
    }, []);

    // Handlers
    const onContextMenu = (e: React.MouseEvent<HTMLDivElement>) => props?.onContextMenu?.([e.clientX, e.clientY]);
    const onMouseDown = () => setIsMouseDown(true);
    const onMouseUp = () => setIsMouseDown(false);

    const style = getRootElementStyle(context, tool, isMouseDown, digitizingType);
    return <div ref={mapEl} className="map-viewer-component" style={style} onContextMenu={onContextMenu} onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
        <MapLoadIndicator loaded={loaded} loading={loading} position={indicatorPosition} color={indicatorColor} />
    </div>;
};