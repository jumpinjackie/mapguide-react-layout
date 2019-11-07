import * as React from "react";
// According to this (https://github.com/mzabriskie/react-draggable/issues/246#issuecomment-299698481), typings
// only works if module type is "es6". This is not the case for us, so just use untyped require()
import Draggable from "react-draggable";
import { GenericEvent } from "../api/common";

/**
 * [left, top, right, bottom]
 */
export type ModalDialogPositioning = [number|undefined, number|undefined, number|undefined, number|undefined] | [string|undefined, string|undefined, string|undefined, string|undefined];

/**
 * ModalDialog component props
 *
 * @export
 * @interface IModalDialogProps
 */
export interface IModalDialogProps {
    isOpen: boolean;
    backdrop?: boolean;
    /**
     * [left, top, right, bottom]
     *
     * @type {ModalDialogPositioning}
     * @memberOf IModalDialogProps
     */
    position?: ModalDialogPositioning;
    overflowYScroll?: boolean;
    size?: [number, number];
    title?: string;
    onClose?: () => void;
}

/**
 * A generic floating Modal Dialog
 *
 * @export
 * @class ModalDialog
 * @extends {React.Component<IModalDialogProps, any>}
 */
export class ModalDialog extends React.Component<IModalDialogProps, any> {
    constructor(props: IModalDialogProps) {
        super(props);
    }
    render(): JSX.Element {
        const { isOpen, backdrop, size, position, title, overflowYScroll } = this.props;
        if (isOpen === false)
            return <div />;

        const modalStyle: React.CSSProperties = {
            //position: 'absolute',
            //top: '50%',
            //left: '50%',
            //transform: 'translate(-50%, -50%)',
            //zIndex: 9999,
        };
        //NOTE: Now need to apply absolute positioning so that initial position will be respected as before
        //See: https://github.com/mzabriskie/react-draggable/issues/259
        if (size != null) {
            modalStyle.position = "absolute";
            modalStyle.top = 120;
            modalStyle.left = "50%";
            modalStyle.width = size[0];
            modalStyle.height = size[1];
        } else {
            modalStyle.top = "50%";
            modalStyle.left = "50%";
        }
        if (position != null) {
            modalStyle.position = "absolute";
            modalStyle.left = position[0];
            modalStyle.top = position[1];
            modalStyle.right = position[2];
            modalStyle.bottom = position[3];
        }
        if (backdrop === true) {
            modalStyle.zIndex = 5000;
        }
        const modalBodyStyle: React.CSSProperties = { margin: 0 };
        if (overflowYScroll == true) {
            modalBodyStyle.overflowY = "auto";
        }
        const diag = <Draggable handle=".bp3-dialog-header">
            <div className="bp3-dialog" style={modalStyle}>
                <div className="bp3-dialog-header noselect">
                    <h5>{title}</h5>
                    <button onClick={this.onClose} aria-label="Close" className="bp3-dialog-close-button small-cross"></button>
                </div>
                <div className="bp3-dialog-body" style={modalBodyStyle}>{this.props.children}</div>
            </div>
        </Draggable>;
        if (backdrop === true) {
            return <div>
                {diag}
                <div className="modal-dialog-backdrop" onClick={this.onClose} />
            </div>;
        } else {
            return diag;
        }
    }
    private onClose = (e: GenericEvent) => {
        e.preventDefault()
        if (this.props.onClose) {
            this.props.onClose()
        }
    }
}