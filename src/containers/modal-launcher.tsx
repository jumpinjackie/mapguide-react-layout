import * as React from "react";
import { connect } from "react-redux";
import { hideModal } from "../actions/modal";
import { ModalDialog } from "../components/modal-dialog";
import { getComponentFactory } from "../api/registry/component";
import { Error } from "../components/error";

interface IToolbarContainerState {
    modal?: any;
}

interface IToolbarContainerDispatch {
    hideModal?: (options) => void;
}

function mapStateToProps(state, ownProps): IToolbarContainerState {
    return {
        modal: state.modal
    };
}

function mapDispatchToProps(dispatch): IToolbarContainerDispatch {
    return {
        hideModal: (options) => dispatch(hideModal(options))
    };
}

type ToolbarContainerProps = IToolbarContainerState & IToolbarContainerDispatch;

@connect(mapStateToProps, mapDispatchToProps)
export class ModalLauncher extends React.Component<ToolbarContainerProps, any> {
    constructor(props) {
        super(props);
    }
    onCloseModal(name) {
        this.props.hideModal({ name: name });
    }
    render(): JSX.Element {
        const { modal } = this.props;
        return <div>
            {Object.keys(modal).map(key => {
                const diag = modal[key];
                if (diag.component != null) {
                    const componentRenderer = getComponentFactory(diag.component);
                    return <ModalDialog size={diag.modal.size}
                                        title={diag.modal.title}
                                        backdrop={diag.modal.backdrop}
                                        isOpen={true}
                                        key={key}
                                        onClose={() => this.onCloseModal(key)}>
                        {(() => {
                            if (componentRenderer != null) {
                                return componentRenderer(diag.componentProps);
                            } else {
                                return <Error error={`ERROR: No such registered component (${diag.component}). Ensure the component has been registered in the component registry with an id of: ${diag.component}`} />;
                            }
                        })()}
                    </ModalDialog>;
                } else if (diag.url != null) {
                    return <ModalDialog size={diag.modal.size}
                                        title={diag.modal.title}
                                        backdrop={diag.modal.backdrop}
                                        isOpen={true}
                                        key={key}
                                        onClose={() => this.onCloseModal(key)}>
                        <iframe frameBorder={0} src={diag.url}  width={diag.modal.size[0]} height={diag.modal.size[1] - 30} />
                    </ModalDialog>;
                }
            })}
        </div>;
    }
}