import * as React from "react";
import { RndModalDialog } from "../components/modal-dialog";
import { getComponentFactory } from "../api/registry/component";
import { Error } from "../components/error";
import { tr } from "../api/i18n";
import {
    IModalReducerState,
    IModalComponentDisplayOptions,
    IModalDisplayOptions,
    DEFAULT_MODAL_POSITION,
    DEFAULT_MODAL_SIZE
} from "../api/common";
import {
    isModalComponentDisplayOptions,
    isModalDisplayOptions
} from "../utils/type-guards";
import { assertNever } from "../utils/never";
import { ParsedComponentUri, parseComponentUri, isComponentUri } from "../utils/url";
import { useViewerLocale } from './hooks';
import { hideModal, updateModal } from '../actions/modal';
import { useAppState, useReduxDispatch } from "../components/map-providers/context";
import { ModalChangeArgs } from "../actions/defs";

function getComponentId(diag: IModalComponentDisplayOptions | IModalDisplayOptions): ParsedComponentUri | undefined {
    if (isModalComponentDisplayOptions(diag)) {
        return { name: diag.component, props: {} };
    } else if (isModalDisplayOptions(diag)) {
        return parseComponentUri(diag.url);
    } else {
        assertNever(diag);
    }
}

export const ModalLauncher: React.FC<React.PropsWithChildren<{}>> = (props) => {
    const dispatch = useReduxDispatch();
    const hideModalAction = (name: string) => dispatch(hideModal(name));
    const onCloseModal = (name: string) => hideModalAction(name);
    const modal = useAppState<IModalReducerState>(state => state.modal);
    const locale = useViewerLocale();
    const onModalChanged = (name: string, args: ModalChangeArgs) => {
        dispatch(updateModal(name, args));
    };
    
    if (!modal) {
        return <noscript />;
    }
    return <div>
        {Object.keys(modal).map(key => {
            const diag = modal[key];
            const pos = diag.modal.position ?? DEFAULT_MODAL_POSITION;
            const size = diag.modal.size ?? DEFAULT_MODAL_SIZE;
            if (isModalComponentDisplayOptions(diag) || (isModalDisplayOptions(diag) && isComponentUri(diag.url))) {
                const componentId = getComponentId(diag);
                if (componentId) {
                    const componentRenderer = getComponentFactory(componentId.name);
                    return <RndModalDialog title={diag.modal.title}
                        x={pos[0]}
                        y={pos[1]}
                        locale={locale}
                        enableInteractionMask={true}
                        width={size[0]}
                        height={size[1]}
                        disableYOverflow={!diag.modal.overflowYScroll}
                        isOpen={true}
                        key={key}
                        onChange={args => onModalChanged(key, args)}
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
                    x={pos[0]}
                    y={pos[1]}
                    locale={locale}
                    enableInteractionMask={false}
                    width={size[0]}
                    height={size[1]}
                    onChange={args => onModalChanged(key, args)}
                    onClose={() => onCloseModal(key)}>
                    {([w, h]) => <iframe frameBorder={0} src={diag.url} width={w} height={h} />}
                </RndModalDialog>;
            }/* else {
                assertNever(diag);
            }*/
        })}
        {props.children}
    </div>;
};