import * as React from "react";
import { connect } from "react-redux";
import { hideModal } from "../actions/modal";
import { ModalDialog } from "../components/modal-dialog";
import { getComponentFactory } from "../api/registry/component";
import { Error } from "../components/error";
import { tr } from "../api/i18n";
import {
    ReduxDispatch,
    IApplicationState,
    IModalReducerState,
    IConfigurationReducerState
} from "../api/common";

export interface IToolbarContainerState {
    modal: IModalReducerState;
    config: IConfigurationReducerState;
}

export interface IToolbarContainerDispatch {
    hideModal: (options: any) => void;
}

function mapStateToProps(state: Readonly<IApplicationState>): Partial<IToolbarContainerState> {
    return {
        config: state.config,
        modal: state.modal
    };
}

function mapDispatchToProps(dispatch: ReduxDispatch): Partial<IToolbarContainerDispatch> {
    return {
        hideModal: (options) => dispatch(hideModal(options))
    };
}

export type ToolbarContainerProps = Partial<IToolbarContainerState> & Partial<IToolbarContainerDispatch>;

class ModalLauncher extends React.Component<ToolbarContainerProps, any> {
    constructor(props: ToolbarContainerProps) {
        super(props);
    }
    onCloseModal(name: string) {
        if (this.props.hideModal) {
            this.props.hideModal({ name: name });
        }
    }
    render(): JSX.Element {
        const { modal, config } = this.props;
        let locale: string | undefined;
        if (config) {
            locale = config.locale;
        }
        return <div>
            {Object.keys(modal).map(key => {
                const diag = modal[key];
                if (diag.component != null || (diag.url != null && diag.url.indexOf("component://") >= 0)) {
                    const componentId = diag.component || (diag.url.substring(12));
                    const componentRenderer = getComponentFactory(componentId);
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
                                return <Error error={tr("ERR_UNREGISTERED_COMPONENT", locale, { componentId: componentId })} />;
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalLauncher);