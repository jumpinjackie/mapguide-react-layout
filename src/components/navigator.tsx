import * as React from "react";
import { tr } from "../api/i18n";
// TODO: Consolidate on react-rnd which should be able to provide equivalent functionality
import Draggable from "react-draggable";
import { getFiniteScaleIndexForScale } from "../utils/number";
import {
    IMG_SLIDER,
    IMG_SLIDER_SCALE,
    GIF_SPINNER
} from "../constants/assets";

export enum ZoomDirection {
    In,
    Out
}

export enum PanDirection {
    East,
    West,
    South,
    North
}

interface DraggableData {
    node: HTMLElement;
    // lastX + deltaX === x
    x: number;
    y: number;
    deltaX: number;
    deltaY: number;
    lastX: number;
    lastY: number;
};

const VERT_START = 10;
const VERT_SPAN = 81;  //This is the pixel height of the maximum draggable scale range

const LN9 = Math.log(9);

/**
 * Navigator component props
 *
 * @interface INavigatorProps
 * @extends {React.Props<any>}
 */
export interface INavigatorProps extends React.Props<any> {
    style?: React.CSSProperties;
    busy: boolean;
    scale: number;
    /**
     * A list of finite scales. Set when the map contains base (tiled) layers. When set, slider drags will snap to the values
     * in this list. Zooming in and out will move to the next/previous finite scale instead of the default logarithmic calculation
     *
     * @type {number[]}
     */
    finiteScaleList?: number[];
    locale?: string;
    onZoom: (direction: ZoomDirection) => void;
    onPan: (direction: PanDirection) => void;
    onRequestZoomToScale: (scale: number) => void;
}

function calculatePosForScale(scale: number, finiteScaleList?: number[]): number {
    if (finiteScaleList) {
        const index = getFiniteScaleIndexForScale(finiteScaleList, scale);
        const pos = (VERT_SPAN / finiteScaleList.length) * (index + 1);
        //console.log(`Scale: ${scale} @ ${index} / ${finiteScaleList.length} -> ${Math.floor(pos)}`);
        return Math.floor(pos);
    } else {
        const pos = 9 * Math.log(scale) / LN9;
        return Math.floor(pos);
    }
}

function calculateScaleForPos(pos: number, finiteScaleList?: number[]): number {
    const scale = Math.pow(9, pos / 9);
    if (finiteScaleList) {
        const index = getFiniteScaleIndexForScale(finiteScaleList, scale);
        return finiteScaleList[index];
    } else {
        return scale;
    }
}

/**
 * The Navigator component provides an interactive zoom slider for the map viewer
 * @param props 
 */
export const Navigator = (props: INavigatorProps) => {
    const { busy, locale } = props;
    const onPanEast = () => {
        props.onPan(PanDirection.East);
    };
    const onPanWest = () => {
        props.onPan(PanDirection.West);
    };
    const onPanSouth = () => {
        props.onPan(PanDirection.South);
    };
    const onPanNorth = () => {
        props.onPan(PanDirection.North);
    };
    const onZoomOut = () => {
        props.onZoom(ZoomDirection.Out);
    };
    const onZoomIn = () => {
        props.onZoom(ZoomDirection.In);
    };
    const onStart = (e: MouseEvent) => {
        e.preventDefault();
        //console.log(`Drag start (dy: ${data.deltaY})`);
        setIsDragging(true);
        setPreviewPos(pos);
    };
    const onDrag = (e: MouseEvent, data: DraggableData) => {
        e.preventDefault();
        //console.log(`Dragging (dy: ${data.deltaY})`);
        const pos = previewPos;
        setPreviewPos(pos + data.deltaY);
    };
    const onStop = (e: MouseEvent) => {
        e.preventDefault();
        const newScale = calculateScaleForPos(previewPos);
        //console.log(`posDelta: ${posDelta}`);
        setIsDragging(false);
        setPos(previewPos);
        props.onRequestZoomToScale(newScale);
    };
    //Used to specify the preview destination scale "position"
    const [previewPos, setPreviewPos] = React.useState(calculatePosForScale(props.scale, props.finiteScaleList));
    //Used to specify the current scale "position"
    const [pos, setPos] = React.useState(calculatePosForScale(props.scale, props.finiteScaleList));
    const [isDragging, setIsDragging] = React.useState(false);
    React.useEffect(() => {
        const pos = calculatePosForScale(props.scale, props.finiteScaleList);
        setPos(pos);
        setPreviewPos(pos);
    }, [props.scale, props.finiteScaleList]);
    return <div id="Navigator" style={props.style} className="component-navigator noselect">
        <map name="Navigator_ImageMap" id="Navigator_ImageMap">
            <area onClick={onPanEast} shape="poly" alt={tr("NAVIGATOR_PAN_EAST", locale)} title={tr("NAVIGATOR_PAN_EAST", locale)} coords="27,176, 27,177, 40,190, 44,182, 44,159" />
            <area onClick={onPanWest} shape="poly" alt={tr("NAVIGATOR_PAN_WEST", locale)} title={tr("NAVIGATOR_PAN_WEST", locale)} coords="24,177, 24,176, 7,159, 7,182, 11,190" />
            <area onClick={onPanSouth} shape="poly" alt={tr("NAVIGATOR_PAN_SOUTH", locale)} title={tr("NAVIGATOR_PAN_SOUTH", locale)} coords="25,178, 12,191, 21,197, 30,197, 39,191, 26,178" />
            <area onClick={onPanNorth} shape="poly" alt={tr("NAVIGATOR_PAN_NORTH", locale)} title={tr("NAVIGATOR_PAN_NORTH", locale)} coords="26,175, 43,158, 8,158, 25,175" />
            <area onClick={onZoomOut} shape="circle" alt={tr("NAVIGATOR_ZOOM_OUT", locale)} title={tr("NAVIGATOR_ZOOM_OUT", locale)} coords="25,142,8" />
            <area onClick={onZoomIn} shape="circle" alt={tr("NAVIGATOR_ZOOM_IN", locale)} title={tr("NAVIGATOR_ZOOM_IN", locale)} coords="25,34,8" />
        </map>
        <img src={IMG_SLIDER_SCALE} className="png24" width="51" height="201" useMap="#Navigator_ImageMap" style={{ position: "absolute", left: 0, top: 0 }} />
        <div style={{ position: "absolute", top: 6, left: 6, width: 39, height: 16 }}>
            <img src={GIF_SPINNER} className="navigator-spinner" width="18" height="6" style={{ position: "absolute", top: 3, right: 4, visibility: busy ? "visible" : "hidden" }} />
        </div>
        {/*
            NOTE: pos is the displacement from VERT_START instead of 0. This ensures
            at the lowest possible scale, the slider doesn't "cross over" the (+) button
        */}
        <Draggable axis="y"
            handle="img.navigator-drag-handle"
            position={{ x: 0, y: (VERT_START + pos) }}
            bounds={{ top: VERT_START, bottom: (VERT_START + VERT_SPAN), left: 0, right: 0 }}
            onStart={onStart}
            onDrag={onDrag}
            onStop={onStop}>
            <div>
                <img src={IMG_SLIDER} className="png24 navigator-drag-handle" width="29" height="12" style={{ position: "relative", left: 11, top: 28 }} />
                {(() => {
                    if (isDragging === true) {
                        const dragLabel = tr("FMT_NAVIGATOR_ZOOM_TO_SCALE", props.locale, { scale: calculateScaleForPos(previewPos).toFixed(2) });
                        return <div className="tooltip" style={{ position: "relative", width: 170, right: 190, top: 28, textAlign: "right" }}>{dragLabel}</div>;
                    }
                })()}
            </div>
        </Draggable>
    </div>;
}