import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    ICommand,
    IDOMElementMetrics,
    IApplicationState,
    FlyoutVisibilitySet} from "../api/common";
import { mapToolbarReference } from "../api/registry/command";
import { Toolbar, DEFAULT_TOOLBAR_SIZE } from "../components/toolbar";
import { processMenuItems } from "../utils/menu";
import { useReducedToolbarAppState } from './hooks';
import { invokeCommand } from '../actions/map';
import { openFlyout, closeFlyout, openComponent, closeComponent } from "../actions/flyout";

export interface IToolbarContainerProps {
    id: string;
    vertical?: boolean;
    hideVerticalLabels?: boolean;
    containerClass?: string;
    containerStyle?: React.CSSProperties;
}

const ToolbarContainer = (props: IToolbarContainerProps) => {
    const { containerClass, containerStyle, vertical, hideVerticalLabels } = props;
    const dispatch = useDispatch();
    const flyouts = useSelector<IApplicationState, any>(state => state.toolbar.flyouts);
    const toolbar = useSelector<IApplicationState, any>(state => state.toolbar.toolbars[props.id]);
    const tbState = useReducedToolbarAppState();

    const invokeCommandAction = (cmd: ICommand, parameters: any) => dispatch(invokeCommand(cmd, parameters));
    const openFlyoutAction = (id: string, metrics: IDOMElementMetrics) => dispatch(openFlyout(id, metrics));
    const closeFlyoutAction = (id: string) => dispatch(closeFlyout(id));
    const openComponentAction = (id: string, metrics: IDOMElementMetrics, name: string, props?: any) => dispatch(openComponent(id, metrics, name, props));
    const closeComponentAction = (id: string) => dispatch(closeComponent(id));

    const onCloseFlyout = (id: string) => closeFlyoutAction?.(id);
    const onOpenFlyout = (id: string, metrics: IDOMElementMetrics) => openFlyoutAction?.(id, metrics);
    const onOpenComponent = (id: string, metrics: IDOMElementMetrics, name: string, props?: any) => openComponentAction?.(id, metrics, name, props);
    const onCloseComponent = (id: string) => closeComponentAction?.(id);

    const flyoutStates: FlyoutVisibilitySet = {};
    if (flyouts) {
        const ids = Object.keys(flyouts);
        for (const fid of ids) {
            flyoutStates[fid] = !!flyouts[fid].open;
        }
    }
    let tbContainerStyle: React.CSSProperties = { ...(containerStyle || {}) };
    if (toolbar && toolbar.items && invokeCommandAction) {
        if (vertical === true) {
            tbContainerStyle.width = DEFAULT_TOOLBAR_SIZE;
        } else {
            tbContainerStyle.height = DEFAULT_TOOLBAR_SIZE;
            tbContainerStyle.overflow = "auto";
        }
        const items = (toolbar.items as any[]).map(tb => mapToolbarReference(tb, tbState, invokeCommandAction));
        const childItems = processMenuItems(items);
        return <Toolbar vertical={vertical}
            hideVerticalLabels={hideVerticalLabels}
            childItems={childItems}
            containerClass={containerClass}
            containerStyle={tbContainerStyle}
            flyoutStates={flyoutStates}
            onOpenComponent={onOpenComponent}
            onCloseComponent={onCloseComponent}
            onOpenFlyout={onOpenFlyout}
            onCloseFlyout={onCloseFlyout} />;
    } else {
        return <div />;
    }
}

export default ToolbarContainer;