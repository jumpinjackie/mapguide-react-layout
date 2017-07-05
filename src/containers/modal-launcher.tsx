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
    IModalComponentDisplayOptions,
    IModalDisplayOptions,
    IConfigurationReducerState
} from "../api/common";
import {
    isModalComponentDisplayOptions,
    isModalDisplayOptions
} from "../utils/type-guards";
import { assertNever } from "../utils/never";

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

function getComponentId(diag: IModalComponentDisplayOptions | IModalDisplayOptions): string | undefined {
    if (isModalComponentDisplayOptions(diag)) {
        return diag.component;
    } else if (isModalDisplayOptions(diag)) {
        return diag.url.substring("component://".length);
    } else {
        assertNever(diag);
    }
}

export class ModalLauncher extends React.Component<ToolbarContainerProps, any> {
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
        if (!modal) {
            return <noscript />;
        }
        let locale: string | undefined;
        if (config) {
            locale = config.locale;
        }
        return <div>
            {Object.keys(modal).map(key => {
                const diag = modal[key];
                if (isModalComponentDisplayOptions(diag) || (isModalDisplayOptions(diag) && diag.url.indexOf("component://") >= 0)) {
                    const componentId = getComponentId(diag);
                    if (componentId) {
                        const componentRenderer = getComponentFactory(componentId);
                        return <ModalDialog size={diag.modal.size}
                                            title={diag.modal.title}
                                            backdrop={diag.modal.backdrop}
                                            overflowYScroll={diag.modal.overflowYScroll}
                                            isOpen={true}
                                            key={key}
                                            onClose={() => this.onCloseModal(key)}>
                            {(() => {
                                if (componentRenderer) {
                                    if (isModalComponentDisplayOptions(diag))
                                        return componentRenderer(diag.componentProps);
                                    else //TODO: As this is a component:// pseudo-URI, we should extract props (if any) from the query string of this URI
                                        return componentRenderer({});
                                } else {
                                    return <Error error={tr("ERR_UNREGISTERED_COMPONENT", locale, { componentId: componentId })} />;
                                }
                            })()}
                        </ModalDialog>;
                    } else {
                        return <Error error={tr("ERR_NO_COMPONENT_ID", locale)} />;
                    }
                } else if (isModalDisplayOptions(diag)) {
                    return <ModalDialog size={diag.modal.size}
                                        title={diag.modal.title}
                                        backdrop={diag.modal.backdrop}
                                        isOpen={true}
                                        key={key}
                                        onClose={() => this.onCloseModal(key)}>
                        <iframe frameBorder={0} src={diag.url}  width={diag.modal.size[0]} height={diag.modal.size[1] - 30} />
                    </ModalDialog>;
                } else {
                    assertNever(diag);
                }
            })}
        </div>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalLauncher);