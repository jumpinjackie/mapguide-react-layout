import * as React from "react";
// According to this (https://github.com/mzabriskie/react-draggable/issues/246#issuecomment-299698481), typings
// only works if module type is "es6". This is not the case for us, so just use untyped require()
import Draggable from "react-draggable";
import { GenericEvent, IDOMElementMetrics } from "../api/common";
import { Dialog, Icon, Button, NonIdealState } from '@blueprintjs/core';
import { Rnd } from "react-rnd";
import { tr } from '../api/i18n';

export interface IRndModalDialogProps {
    x: number;
    y: number;
    width: number;
    height: number;
    title: string;
    isOpen: boolean;
    onClose?: () => void;
    children: (bodyDim: [number, number]) => React.ReactNode;
    locale?: string;
    enableInteractionMask: boolean;
    disableYOverflow?: boolean;
}

const DIAG_HEADER_HEIGHT = 40;

export const RndModalDialog = (props: IRndModalDialogProps) => {
    if (props.isOpen === false)
        return <div />;
    const modalBodyStyle: React.CSSProperties = {
        margin: 0
    };
    if (!props.disableYOverflow) {
        modalBodyStyle.overflowY = "auto";
    }
    const [isDragging, setIsDragging] = React.useState(false);
    const [isResizing, setIsResizing] = React.useState(false);
    const [diagWidth, setDiagWidth] = React.useState<number>(props.width);
    const [diagHeight, setDiagHeight] = React.useState< number>(props.height);
    const [diagX, setDiagX] = React.useState(props.x);
    const [diagY, setDiagY] = React.useState(props.y);
    const ZINDEX = {
        zIndex: 1980 //So flyouts will appear above it
    };
    const modalStyle: React.CSSProperties = {
        width: diagWidth,
        height: diagHeight,
        //bp defaults this to 30, which invisibly offsets the 
        //position of expected rnd drag/resize handles
        marginTop: 0,
        ...ZINDEX
    };
    const rndStyle: React.CSSProperties = {
        //border: "1px solid red", //Uncomment to debug where the rnd "container" is
        ...ZINDEX
    };
    const diagSize: [number, number] = [ diagWidth, diagHeight - DIAG_HEADER_HEIGHT ];
    //console.log(`Resizing: ${isResizing}, Dragging: ${isDragging}`);
    return <Rnd style={rndStyle}
        enableResizing={{
            bottomRight: true,
            bottomLeft: true,
            topLeft: true,
            topRight: true
        }}
        enableUserSelectHack={false}
        onDragStart={() => setIsDragging(true)}
        onDragStop={(e, d) => {
            setDiagX(d.x);
            setDiagY(d.y);
            setIsDragging(false);
        }}
        onResizeStart={() => setIsResizing(true)}
        onResize={(e, direction, ref, delta, position) => {
            setDiagWidth(ref.offsetWidth);
            setDiagHeight(ref.offsetHeight);
            setDiagX(position.x);
            setDiagY(position.y);
        }}
        onResizeStop={(e, direction, ref, delta, position) => {
            setDiagWidth(ref.offsetWidth);
            setDiagHeight(ref.offsetHeight);
            setDiagX(position.x);
            setDiagY(position.y);
            setIsResizing(false);
        }}
        dragHandleClassName="bp3-heading"
        default={{ x: props.x, y: props.y, width: props.width, height: props.height }}>
        <div className="bp3-dialog-container">
            <div className="bp3-dialog" style={modalStyle}>
                <div className="bp3-dialog-header noselect">
                    <h4 className="bp3-heading">{props.title}</h4>
                    <Button onClick={props.onClose} aria-label="Close" className="bp3-dialog-close-button bp3-button" minimal icon="small-cross" />
                </div>
                <div className="bp3-dialog-body" style={modalBodyStyle}>
                    {(() => {
                        //We use NonIdealState as a visual mask to suppress unwanted mouse 
                        //interaction during the act of dragging/resizing, similar to what the
                        //Task Pane does
                        if (props.enableInteractionMask && (isResizing || isDragging)) {
                            const key = isResizing ? "WINDOW_RESIZING" : "WINDOW_MOVING";
                            return <NonIdealState
                                icon="arrows-horizontal"
                                description={tr(key, props.locale)} />
                        } else {
                            return props.children(diagSize);
                        }
                    })()}
                </div>
            </div>
        </div>

    </Rnd>
}