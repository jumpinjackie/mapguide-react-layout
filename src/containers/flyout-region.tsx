import * as React from "react";
import { useDispatch } from "react-redux";
import { FlyoutRegion } from "../components/flyout-region";
import * as FlyoutActions from "../actions/flyout";
import * as MapActions from "../actions/map";
import { ICommand } from "../api/common";
import { mapToolbarReference } from "../api/registry/command";
import { useViewerLocale, useViewerFlyouts, useReducedToolbarAppState } from './hooks';

export interface IFlyoutRegionContainerProps {

}

const FlyoutRegionContainer = () => {
    const dispatch = useDispatch();
    const closeFlyout = (id: string) => dispatch(FlyoutActions.closeFlyout(id));
    const invokeCommand = (cmd: ICommand, parameters?: any) => dispatch(MapActions.invokeCommand(cmd, parameters));
    const onCloseFlyout = (id: string) => closeFlyout(id);
    const flyouts = useViewerFlyouts();
    const locale = useViewerLocale();
    const tbState = useReducedToolbarAppState();
    const prepared: any = {};
    if (invokeCommand) {
        for (const flyoutId in flyouts) {
            const tb = flyouts[flyoutId];
            if (typeof (tb.componentName) == 'undefined') {
                prepared[flyoutId] = mapToolbarReference(tb, tbState, invokeCommand);
                prepared[flyoutId].open = !!flyouts[flyoutId].open;
                prepared[flyoutId].metrics = flyouts[flyoutId].metrics;
            } else {
                prepared[flyoutId] = flyouts[flyoutId];
            }
        }
    }
    return <FlyoutRegion flyoutConf={prepared} onCloseFlyout={onCloseFlyout} locale={locale} />;
};

export default FlyoutRegionContainer;