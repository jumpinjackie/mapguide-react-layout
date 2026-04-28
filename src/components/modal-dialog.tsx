import * as React from "react";
import { Rnd } from "react-rnd";
import { tr } from '../api/i18n';
import { ModalChangeArgs } from "../actions/defs";
import { useElementContext } from "./elements/element-context";

export interface IRndModalDialogProps {
    x: number;
    y: number;
    width: number;
    height: number;
    title: string;
    isOpen: boolean;
    /**
     * @since 0.15 changed from blueprint IconName to string
     */
    icon?: string;
    onClose?: () => void;
    children: (bodyDim: [number, number]) => React.ReactNode;
    locale: string;
    enableInteractionMask: boolean;
    disableYOverflow?: boolean;
    /**
     * Called when position or size changes
     * 
     * @param args 
     * @returns 
     * @since 0.14.8
     */
    onChange?: (args: ModalChangeArgs) => void;
}

const DIAG_HEADER_HEIGHT = 40;

export const RndModalDialog = (props: IRndModalDialogProps) => {
    const { Icon, Button, NonIdealState, Heading, DialogContainer, DialogShell, DialogHeader, DialogBody } = useElementContext();
    if (props.isOpen === false)
        return <div />;
    const [isDragging, setIsDragging] = React.useState(false);
    const [isResizing, setIsResizing] = React.useState(false);
    const [diagWidth, setDiagWidth] = React.useState<number>(props.width);
    const [diagHeight, setDiagHeight] = React.useState<number>(props.height);
    const modalBodyStyle: React.CSSProperties = {
        margin: 0,
        height: diagHeight - DIAG_HEADER_HEIGHT,
        overflow: "hidden"
    };
    if (!props.disableYOverflow) {
        modalBodyStyle.overflowY = "auto";
    }
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
            const args = {
                x: d.x,
                y: d.y,
                width: diagWidth,
                height: diagHeight
            };
            //console.log("Modal Change", args);
            props.onChange?.(args);
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
            const args = {
                x: position.x,
                y: position.y,
                width: ref.offsetWidth,
                height: ref.offsetHeight
            };
            //console.log("Modal Change", args);
            props.onChange?.(args);
        }}
        dragHandleClassName="mrl-modal-diag-drag-handle"
        default={{ x: props.x, y: props.y, width: props.width, height: props.height }}>
        <DialogContainer>
            <DialogShell style={modalStyle}>
                <DialogHeader className="noselect">
                    {props.icon && <Icon icon={props.icon} />}
                    <Heading level={4} className="mrl-modal-diag-drag-handle">{props.title}</Heading>
                    <Button onClick={props.onClose} aria-label={tr("ACTION_CLOSE", props.locale)} minimal icon="small-cross" />
                </DialogHeader>
                <DialogBody style={modalBodyStyle}>
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
                </DialogBody>
            </DialogShell>
        </DialogContainer>
    </Rnd>;
}