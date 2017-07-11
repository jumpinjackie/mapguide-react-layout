import * as React from "react";
import { tr } from "../api/i18n";
// According to this (https://github.com/mzabriskie/react-draggable/issues/246#issuecomment-299698481), typings
// only works if module type is "es6". This is not the case for us, so just use untyped require()
const Draggable = require('react-draggable');
import { getFiniteScaleIndexForScale } from "../utils/number";

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
const VERT_BEGIN = 60; //This position represents the starting scale (ie. initial view)

const LN9 = Math.log(9);

/**
 * Navigator component props
 *
 * @export
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
     * @memberOf INavigatorProps
     */
    finiteScaleList?: number[] | null;
    locale?: string;
    onZoom: (direction: ZoomDirection) => void;
    onPan: (direction: PanDirection) => void;
    onRequestZoomToScale: (scale: number) => void;
}

/**
 * The Navigator component provides an interactive zoom slider for the map viewer
 *
 * @export
 * @class Navigator
 * @extends {React.Component<INavigatorProps, any>}
 */
export class Navigator extends React.Component<INavigatorProps, any> {
    private fnPanEast: GenericEventHandler;
    private fnPanWest: GenericEventHandler;
    private fnPanSouth: GenericEventHandler;
    private fnPanNorth: GenericEventHandler;
    private fnZoomOut: GenericEventHandler;
    private fnZoomIn: GenericEventHandler;
    private fnStart: (e: any, data: any) => void | boolean;
    private fnDrag: (e: any, data: any) => void | boolean;
    private fnStop: (e: any, data: any) => void | boolean;
    constructor(props: INavigatorProps) {
        super(props);
        this.fnPanEast = this.onPanEast.bind(this);
        this.fnPanWest = this.onPanWest.bind(this);
        this.fnPanSouth = this.onPanSouth.bind(this);
        this.fnPanNorth = this.onPanNorth.bind(this);
        this.fnZoomOut = this.onZoomOut.bind(this);
        this.fnZoomIn = this.onZoomIn.bind(this);
        this.fnStart = this.onStart.bind(this);
        this.fnDrag = this.onDrag.bind(this);
        this.fnStop = this.onStop.bind(this);
        this.state = {
            previewPos: this.calculatePosForScale(props.scale), //Used to specify the preview destination scale "position"
            pos: this.calculatePosForScale(props.scale), //Used to specify the current scale "position"
            isDragging: false
        };
    }
    private onPanEast(e: GenericEvent) {
        this.props.onPan(PanDirection.East);
    }
    private onPanWest(e: GenericEvent) {
        this.props.onPan(PanDirection.West);
    }
    private onPanSouth(e: GenericEvent) {
        this.props.onPan(PanDirection.South);
    }
    private onPanNorth(e: GenericEvent) {
        this.props.onPan(PanDirection.North);
    }
    private onZoomOut(e: GenericEvent) {
        this.props.onZoom(ZoomDirection.Out);
    }
    private onZoomIn(e: GenericEvent) {
        this.props.onZoom(ZoomDirection.In);
    }
    private onStart(e: Event, data: DraggableData): void | boolean {
        e.preventDefault();
        //console.log(`Drag start (dy: ${data.deltaY})`);
        this.setState({ isDragging: true, previewPos: this.state.pos });
    }
    private onDrag(e: Event, data: DraggableData): void | boolean {
        e.preventDefault();
        //console.log(`Dragging (dy: ${data.deltaY})`);
        const pos = this.state.previewPos;
        this.setState({ previewPos: pos + data.deltaY });
    }
    private onStop(e: Event, data: DraggableData): void | boolean {
        e.preventDefault();
        //console.log(`Drag stop (dy: ${data.deltaY})`);
        const posDelta = this.state.previewPos - this.state.pos;
        const newScale = this.calculateScaleForPos(this.state.previewPos);
        //console.log(`posDelta: ${posDelta}`);
        this.setState({ isDragging: false, pos: this.state.previewPos });
        this.props.onRequestZoomToScale(newScale);
    }
    private calculatePosForScale(scale: number): number {
        const { finiteScaleList } = this.props;
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
    private calculateScaleForPos(pos: number): number {
        const scale = Math.pow(9,pos/9);
        const { finiteScaleList } = this.props;
        if (finiteScaleList) {
            const index = getFiniteScaleIndexForScale(finiteScaleList, scale);
            return finiteScaleList[index];
        } else {
            return scale;
        }
    }
    componentDidMount() {
        const pos = this.calculatePosForScale(this.props.scale);
        this.setState({ pos: pos, previewPos: pos });
    }
    componentWillReceiveProps(nextProps: INavigatorProps) {
        if (this.props.scale != nextProps.scale) {
            const pos = this.calculatePosForScale(nextProps.scale);
            this.setState({ pos: pos, previewPos: pos });
        }
    }
    render(): JSX.Element {
        const { busy } = this.props;
        return <div id="Navigator" style={this.props.style} className="component-navigator noselect">
            <map name="Navigator_ImageMap" id="Navigator_ImageMap">
                <area onClick={this.fnPanEast} shape="poly" alt={tr("NAVIGATOR_PAN_EAST", this.props.locale)} title={tr("NAVIGATOR_PAN_EAST", this.props.locale)} coords="27,176, 27,177, 40,190, 44,182, 44,159" />
                <area onClick={this.fnPanWest} shape="poly" alt={tr("NAVIGATOR_PAN_WEST", this.props.locale)} title={tr("NAVIGATOR_PAN_WEST", this.props.locale)} coords="24,177, 24,176, 7,159, 7,182, 11,190" />
                <area onClick={this.fnPanSouth} shape="poly" alt={tr("NAVIGATOR_PAN_SOUTH", this.props.locale)} title={tr("NAVIGATOR_PAN_SOUTH", this.props.locale)} coords="25,178, 12,191, 21,197, 30,197, 39,191, 26,178" />
                <area onClick={this.fnPanNorth} shape="poly" alt={tr("NAVIGATOR_PAN_NORTH", this.props.locale)} title={tr("NAVIGATOR_PAN_NORTH", this.props.locale)} coords="26,175, 43,158, 8,158, 25,175" />
                <area onClick={this.fnZoomOut} shape="circle" alt={tr("NAVIGATOR_ZOOM_OUT", this.props.locale)} title={tr("NAVIGATOR_ZOOM_OUT", this.props.locale)} coords="25,142,8" />
                <area onClick={this.fnZoomIn} shape="circle" alt={tr("NAVIGATOR_ZOOM_IN", this.props.locale)} title={tr("NAVIGATOR_ZOOM_IN", this.props.locale)} coords="25,34,8" />
            </map>
            <img src="stdassets/icons/sliderscale.png" className="png24" width="51" height="201" useMap="#Navigator_ImageMap" style={{ position: "absolute", left: 0, top: 0 }} />
            <div style={{ position: "absolute", top: 6, left: 6, width: 39, height: 16 }}>
                <img src="stdassets/icons/spinner.gif" className="navigator-spinner" width="18" height="6" style={{ position: "absolute", top: 3, right: 4, visibility: busy ? "visible" : "hidden" }} />
            </div>
            {/*
                NOTE: this.state.pos is the displacement from VERT_START instead of 0. This ensures
                at the lowest possible scale, the slider doesn't "cross over" the (+) button
            */}
            <Draggable axis="y"
                       handle="img.navigator-drag-handle"
                       position={{ x: 0, y: (VERT_START + this.state.pos) }}
                       bounds={{ top: VERT_START, bottom: (VERT_START + VERT_SPAN), left: 0, right: 0 }}
                       onStart={this.fnStart}
                       onDrag={this.fnDrag}
                       onStop={this.fnStop}>
                <div>
                    <img src="stdassets/icons/slider.png" className="png24 navigator-drag-handle" width="29" height="12" style={{ position: "relative", left: 11, top: 28 }} />
                    {(() => {
                        if (this.state.isDragging === true) {
                            const dragLabel = tr("FMT_NAVIGATOR_ZOOM_TO_SCALE", this.props.locale, { scale: this.calculateScaleForPos(this.state.previewPos).toFixed(2) });
                            return <div className="tooltip" style={{ position: "relative", width: 170, right: 190, top: 28, textAlign: "right" }}>{dragLabel}</div>;
                        }
                    })()}
                </div>
            </Draggable>
        </div>;
    }
}