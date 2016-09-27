import * as React from "react";
import Draggable = require('react-draggable');

interface IModalDialogProps {
    isOpen: boolean;
    backdrop?: boolean;
    size?: [number, number];
    title?: string;
    onClose?: () => void;
}

export class ModalDialog extends React.Component<IModalDialogProps, any> {
    fnClose: (e) => void;
    constructor(props) {
        super(props);
        this.fnClose = this.onClose.bind(this);
    }
    render(): JSX.Element {
        if (this.props.isOpen === false)
            return <div />;

        const modalStyle: React.CSSProperties = {
            position: 'absolute',
            //top: '50%',
            //left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 9999,
            background: '#fff'
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
        const backdropStyle: React.CSSProperties = {
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: '0px',
            left: '0px',
            zIndex: 9998,
            background: 'rgba(0, 0, 0, 0.3)'
        };
        return <div>
            <Draggable handle=".modal-dialog-header">
                <div style={modalStyle}>
                    <div className="modal-dialog-header">{this.props.title}<span onClick={this.fnClose} style={{ float: "right" }}><i className="icon-cancel-squared" /></span></div>
                    <div className="modal-dialog-body" style={{ clear: "both" }}>{this.props.children}</div>
                </div>
            </Draggable>
            {(() => {
                if (this.props.backdrop === true) {
                    return <div style={backdropStyle} onClick={this.fnClose} />;
                }
            })()}
        </div>;
    }
    private onClose(e) {
        e.preventDefault()
        if (this.props.onClose) {
            this.props.onClose()
        }
    }
}