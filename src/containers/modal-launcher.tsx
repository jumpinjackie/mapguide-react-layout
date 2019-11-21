import * as React from "react";
import { connect } from "react-redux";
import { hideModal } from "../actions/modal";
import { RndModalDialog } from "../components/modal-dialog";
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
import { ParsedComponentUri, parseComponentUri, isComponentUri } from "../utils/url";

export interface IModalLauncherState {
    modal: IModalReducerState;
    config: IConfigurationReducerState;
}

export interface IModalLauncherDispatch {
    hideModal: (options: any) => void;
}

function mapStateToProps(state: Readonly<IApplicationState>): Partial<IModalLauncherState> {
    return {
        config: state.config,
        modal: state.modal
    };
}

function mapDispatchToProps(dispatch: ReduxDispatch): Partial<IModalLauncherDispatch> {
    return {
        hideModal: (options) => dispatch(hideModal(options))
    };
}

export type ModalLauncherProps = Partial<IModalLauncherState> & Partial<IModalLauncherDispatch> & { children?: any };

function getComponentId(diag: IModalComponentDisplayOptions | IModalDisplayOptions): ParsedComponentUri | undefined {
    if (isModalComponentDisplayOptions(diag)) {
        return { name: diag.component, props: {} };
    } else if (isModalDisplayOptions(diag)) {
        return parseComponentUri(diag.url);
    } else {
        assertNever(diag);
    }
}

export class ModalLauncher extends React.Component<ModalLauncherProps, any> {
    constructor(props: ModalLauncherProps) {
        super(props);
    }
    onCloseModal(name: string) {
        if (this.props.hideModal) {
            this.props.hideModal({ name: name });
        }
    }
    render(): JSX.Element {
        const { modal, config } = this.props;
        const MODAL_INIT_X = 500;
        const MODAL_INIT_Y = 80;
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
                if (isModalComponentDisplayOptions(diag) || (isModalDisplayOptions(diag) && isComponentUri(diag.url))) {
                    const componentId = getComponentId(diag);
                    if (componentId) {
                        const componentRenderer = getComponentFactory(componentId.name);
                        return <RndModalDialog title={diag.modal.title}
                            x={MODAL_INIT_X}
                            y={MODAL_INIT_Y}
                            enableInteractionMask={true}
                            width={diag.modal.size[0]}
                            height={diag.modal.size[1]}
                            disableYOverflow={!diag.modal.overflowYScroll}
                            isOpen={true}
                            key={key}
                            onClose={() => this.onCloseModal(key)}>
                            {([w, h]) => {
                                if (componentRenderer) {
                                    if (isModalComponentDisplayOptions(diag))
                                        return componentRenderer(diag.componentProps);
                                    else
                                        return componentRenderer(componentId.props);
                                } else {
                                    return <Error error={tr("ERR_UNREGISTERED_COMPONENT", locale, { componentId: componentId })} />;
                                }
                            }}
                        </RndModalDialog>;
                    } else {
                        return <Error error={tr("ERR_NO_COMPONENT_ID", locale)} />;
                    }
                } else if (isModalDisplayOptions(diag)) {
                    return <RndModalDialog title={diag.modal.title}
                        isOpen={true}
                        key={key}
                        x={MODAL_INIT_X}
                        y={MODAL_INIT_Y}
                        enableInteractionMask={false}
                        width={diag.modal.size[0]}
                        height={diag.modal.size[1]}
                        onClose={() => this.onCloseModal(key)}>
                        {([w, h]) => <iframe frameBorder={0} src={diag.url} width={w} height={h} />}
                    </RndModalDialog>;
                } else {
                    assertNever(diag);
                }
            })}
            {this.props.children}
        </div>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps as any /* HACK: I dunno how to type thunked actions for 4.0 */)(ModalLauncher);