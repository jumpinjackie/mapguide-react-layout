import * as React from "react";

interface IModalDialogProps {
    isOpen: boolean;
    onClose?: () => void;
}

export class ModalDialog extends React.Component<IModalDialogProps, any> {
    fnClose: (e) => void;
    constructor(props) {
        super(props);
        this.fnClose = this.onClose.bind(this);
    }
    render() {
        if (this.props.isOpen === false)
            return null

        const modalStyle: React.CSSProperties = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 9999,
            background: '#fff'
        };
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
            <div style={modalStyle}>{this.props.children}</div>
            <div style={backdropStyle} onClick={this.fnClose} />
        </div>;
    }
    private onClose(e) {
        e.preventDefault()
        if (this.props.onClose) {
            this.props.onClose()
        }
    }
}