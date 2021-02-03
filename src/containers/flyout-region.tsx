import * as React from "react";
import { FlyoutRegion } from "../components/flyout-region";
import { ICommand } from "../api/common";
import { mapToolbarReference } from "../api/registry/command";
import { useViewerLocale, useViewerFlyouts, useReducedToolbarAppState } from './hooks';
import { closeFlyout } from '../actions/flyout';
import { invokeCommand } from '../actions/map';
import { useReduxDispatch } from "../components/map-providers/context";

export interface IFlyoutRegionContainerProps {

}

export const FlyoutRegionContainer = () => {
    const dispatch = useReduxDispatch();
    const closeFlyoutAction = (id: string) => dispatch(closeFlyout(id));
    const invokeCommandAction = (cmd: ICommand, parameters?: any) => dispatch(invokeCommand(cmd, parameters));
    const onCloseFlyout = (id: string) => closeFlyoutAction(id);
    const flyouts = useViewerFlyouts();
    const locale = useViewerLocale();
    const tbState = useReducedToolbarAppState();
    const prepared: any = {};
    if (invokeCommandAction) {
        for (const flyoutId in flyouts) {
            const tb = flyouts[flyoutId];
            if (typeof (tb.componentName) == 'undefined') {
                prepared[flyoutId] = mapToolbarReference(tb, tbState, invokeCommandAction);
                prepared[flyoutId].open = !!flyouts[flyoutId].open;
                prepared[flyoutId].metrics = flyouts[flyoutId].metrics;
            } else {
                prepared[flyoutId] = flyouts[flyoutId];
            }
        }
    }
    return <FlyoutRegion flyoutConf={prepared} onCloseFlyout={onCloseFlyout} locale={locale} />;
};