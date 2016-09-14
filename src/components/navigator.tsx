import * as React from "react";
import { tr } from "../api/i18n";
import Draggable = require('react-draggable');

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
const VERT_SPAN = 81;
const VERT_BEGIN = 60; //This position represents the starting scale (ie. initial view)

const LN9 = Math.log(9);

interface INavigatorProps extends React.Props<any> {
    style?: React.CSSProperties;
    busy: boolean;
    scale: number;
    locale?: string;
    onZoom: (direction: ZoomDirection) => void;
    onPan: (direction: PanDirection) => void;
    onRequestZoomToScale: (scale: number) => void;
}

export class Navigator extends React.Component<INavigatorProps, any> {
    fnPanEast: (e) => void;
    fnPanWest: (e) => void;
    fnPanSouth: (e) => void;
    fnPanNorth: (e) => void;
    fnZoomOut: (e) => void;
    fnZoomIn: (e) => void;
    fnStart: (e, data) => void | boolean;
    fnDrag: (e, data) => void | boolean;
    fnStop: (e, data) => void | boolean;
    initialScale: number;
    constructor(props) {
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
        this.initialScale = props.scale;
        this.state = {
            previewPos: VERT_BEGIN, //Used to specify the preview destination scale "position"
            pos: VERT_BEGIN, //Used to specify the current scale "position"
            isDragging: false
        };
    }
    private onPanEast(e) {
        this.props.onPan(PanDirection.East);
    }
    private onPanWest(e) {
        this.props.onPan(PanDirection.West);
    }
    private onPanSouth(e) {
        this.props.onPan(PanDirection.South);
    }
    private onPanNorth(e) {
        this.props.onPan(PanDirection.North);
    }
    private onZoomOut(e) {
        this.props.onZoom(ZoomDirection.Out);
    }
    private onZoomIn(e) {
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
        const pos = 9 * Math.log(scale) / LN9;
        return Math.floor(pos);
    }
    private calculateScaleForPos(pos: number): number {
        const scale = Math.pow(9,pos/9);
        return scale;
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
        return <div id="Navigator" style={this.props.style} className="noselect">
            <map name="Navigator_ImageMap" id="Navigator_ImageMap">
                <area onClick={this.fnPanEast} shape="poly" alt={tr("NAVIGATOR_PAN_EAST", this.props.locale)} title={tr("NAVIGATOR_PAN_EAST", this.props.locale)} coords="27,176, 27,177, 40,190, 44,182, 44,159" />
                <area onClick={this.fnPanWest} shape="poly" alt={tr("NAVIGATOR_PAN_WEST", this.props.locale)} title={tr("NAVIGATOR_PAN_WEST", this.props.locale)} coords="24,177, 24,176, 7,159, 7,182, 11,190" />
                <area onClick={this.fnPanSouth} shape="poly" alt={tr("NAVIGATOR_PAN_SOUTH", this.props.locale)} title={tr("NAVIGATOR_PAN_SOUTH", this.props.locale)} coords="25,178, 12,191, 21,197, 30,197, 39,191, 26,178" />
                <area onClick={this.fnPanNorth} shape="poly" alt={tr("NAVIGATOR_PAN_NORTH", this.props.locale)} title={tr("NAVIGATOR_PAN_NORTH", this.props.locale)} coords="26,175, 43,158, 8,158, 25,175" />
                <area onClick={this.fnZoomOut} shape="circle" alt={tr("NAVIGATOR_ZOOM_OUT", this.props.locale)} title={tr("NAVIGATOR_ZOOM_OUT", this.props.locale)} coords="25,142,8" />
                <area onClick={this.fnZoomIn} shape="circle" alt={tr("NAVIGATOR_ZOOM_IN", this.props.locale)} title={tr("NAVIGATOR_ZOOM_IN", this.props.locale)} coords="25,34,8" />
            </map>
            <img src="stdicons/sliderscale.png" className="png24" width="51" height="201" useMap="#Navigator_ImageMap" style={{ position: "absolute", left: 0, top: 0 }} />
            <div style={{ position: "absolute", top: 6, left: 6, width: 39, height: 16 }}>
                <img src="stdicons/spinner.gif" className="navigator-spinner" width="18" height="6" style={{ position: "absolute", top: 3, right: 4, visibility: busy ? "visible" : "hidden" }} />
            </div>
            <Draggable axis="y"
                       handle="img.navigator-drag-handle"
                       position={{ x: 0, y: this.state.pos }}
                       bounds={{ top: VERT_START, bottom: (VERT_START + VERT_SPAN), left: 0, right: 0 }}
                       onStart={this.fnStart}
                       onDrag={this.fnDrag}
                       onStop={this.fnStop}>
                <div>
                    <img src="stdicons/slider.png" className="png24 navigator-drag-handle" width="29" height="12" style={{ position: "relative", left: 11, top: 28 }} />
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