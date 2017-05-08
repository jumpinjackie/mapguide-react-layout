import * as React from "react";
// According to this (https://github.com/mzabriskie/react-draggable/issues/246#issuecomment-299698481), typings
// only works if module type is "es6". This is not the case for us, so just use untyped require()
const Draggable = require('react-draggable');

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
        const { isOpen, backdrop, size, position, title } = this.props;
        if (isOpen === false)
            return <div />;

        const modalStyle: React.CSSProperties = {
            //position: 'absolute',
            //top: '50%',
            //left: '50%',
            //transform: 'translate(-50%, -50%)',
            //zIndex: 9999,
        };
        if (size != null) {
            modalStyle.top = 120;
            modalStyle.left = "50%";
            modalStyle.width = size[0];
            modalStyle.height = size[1];
        } else {
            modalStyle.top = "50%";
            modalStyle.left = "50%";
        }
        if (position != null) {
            modalStyle.left = position[0];
            modalStyle.top = position[1];
            modalStyle.right = position[2];
            modalStyle.bottom = position[3];
        }
        if (backdrop === true) {
            modalStyle.zIndex = 5000;
        }
        return <div>
            <Draggable handle=".pt-dialog-header">
                <div className="pt-dialog" style={modalStyle}>
                    <div className="pt-dialog-header noselect">
                        <h5>{title}</h5>
                        <button onClick={this.fnClose} aria-label="Close" className="pt-dialog-close-button pt-icon-small-cross"></button>
                    </div>
                    <div className="pt-dialog-body" style={{ margin: 0 }}>{this.props.children}</div>
                </div>
            </Draggable>
            {(() => {
                if (backdrop === true) {
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