import * as React from "react";
import Draggable = require('react-draggable');

/**
 * [left, top, right, bottom]
 */
export type ModalDialogPositioning = [number|null, number|null, number|null, number|null] | [string|null, string|null, string|null, string|null]; 

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
    size?: [number, number];
    title?: string;
    onClose?: () => void;
}

export class ModalDialog extends React.Component<IModalDialogProps, any> {
    fnClose: GenericEventHandler;
    constructor(props: IModalDialogProps) {
        super(props);
        this.fnClose = this.onClose.bind(this);
    }
    render(): JSX.Element {
        if (this.props.isOpen === false)
            return <div />;

        const modalStyle: React.CSSProperties = {
            //position: 'absolute',
            //top: '50%',
            //left: '50%',
            //transform: 'translate(-50%, -50%)',
            //zIndex: 9999,
        };
        if (this.props.size != null) {
            modalStyle.top = 20;
            modalStyle.left = "50%";
            modalStyle.width = this.props.size[0];
            modalStyle.height = this.props.size[1];
        } else {
            modalStyle.top = "50%";
            modalStyle.left = "50%";
        }
        if (this.props.position != null) {
            modalStyle.left = this.props.position[0];
            modalStyle.top = this.props.position[1];
            modalStyle.right = this.props.position[2];
            modalStyle.bottom = this.props.position[3];
        }
        return <div>
            <Draggable handle=".modal-dialog-header">
                <div className="modal-dialog" style={modalStyle}>
                    <div className="modal-dialog-header noselect">
                        <div className="modal-dialog-header-title" style={{ float: "left" }}>{this.props.title}</div>
                        <div onClick={this.fnClose} style={{ float: "right" }}><i className="icon-cancel-squared" /></div>
                        <div style={{ clear: "both" }} />
                    </div>
                    <div className="modal-dialog-body">{this.props.children}</div>
                </div>
            </Draggable>
            {(() => {
                if (this.props.backdrop === true) {
                    return <div className="modal-dialog-backdrop" onClick={this.fnClose} />;
                }
            })()}
        </div>;
    }
    private onClose(e: GenericEvent) {
        e.preventDefault()
        if (this.props.onClose) {
            this.props.onClose()
        }
    }
}