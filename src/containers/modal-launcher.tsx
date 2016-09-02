import * as React from "react";
import { connect } from "react-redux";
import { hideModal } from "../actions/modal";
import { ModalDialog } from "../components/modal-dialog";
import { getComponentFactory } from "../api/registry/component";

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
                    return <ModalDialog isOpen={true} key={key} onClose={() => this.onCloseModal(key)}>
                        {(() => {
                            if (componentRenderer != null) {
                                return componentRenderer(diag.componentProps);
                            } else {
                                return <div>ERROR: No such registered component ({diag.component})</div>;
                            }
                        })()}
                    </ModalDialog>;
                }
            })}
        </div>;
    }
}