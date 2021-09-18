import * as React from "react";
import { RndModalDialog } from "../components/modal-dialog";
import { getComponentFactory } from "../api/registry/component";
import { Error } from "../components/error";
import { tr } from "../api/i18n";
import {
    IModalReducerState,
    IModalComponentDisplayOptions,
    IModalDisplayOptions
} from "../api/common";
import {
    isModalComponentDisplayOptions,
    isModalDisplayOptions
} from "../utils/type-guards";
import { assertNever } from "../utils/never";
import { ParsedComponentUri, parseComponentUri, isComponentUri } from "../utils/url";
import { useViewerLocale } from './hooks';
import { hideModal } from '../actions/modal';
import { useAppState, useReduxDispatch } from "../components/map-providers/context";

function getComponentId(diag: IModalComponentDisplayOptions | IModalDisplayOptions): ParsedComponentUri | undefined {
    if (isModalComponentDisplayOptions(diag)) {
        return { name: diag.component, props: {} };
    } else if (isModalDisplayOptions(diag)) {
        return parseComponentUri(diag.url);
    } else {
        assertNever(diag);
    }
}

export const ModalLauncher = (props: { children?: React.ReactNode }) => {
    const dispatch = useReduxDispatch();
    const hideModalAction = (name: string) => dispatch(hideModal(name));
    const onCloseModal = (name: string) => hideModalAction(name);
    const modal = useAppState<IModalReducerState>(state => state.modal);
    const locale = useViewerLocale();
    const MODAL_INIT_X = 500;
    const MODAL_INIT_Y = 80;
    if (!modal) {
        return <noscript />;
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
                        locale={locale}
                        enableInteractionMask={true}
                        width={diag.modal.size[0]}
                        height={diag.modal.size[1]}
                        disableYOverflow={!diag.modal.overflowYScroll}
                        isOpen={true}
                        key={key}
                        onClose={() => onCloseModal(key)}>
                        {([]) => {
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
                    locale={locale}
                    enableInteractionMask={false}
                    width={diag.modal.size[0]}
                    height={diag.modal.size[1]}
                    onClose={() => onCloseModal(key)}>
                    {([w, h]) => <iframe frameBorder={0} src={diag.url} width={w} height={h} />}
                </RndModalDialog>;
            } else {
                assertNever(diag);
            }
        })}
        {props.children}
    </div>;
};