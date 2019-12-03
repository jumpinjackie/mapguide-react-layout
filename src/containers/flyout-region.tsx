import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FlyoutRegion } from "../components/flyout-region";
import * as FlyoutActions from "../actions/flyout";
import * as MapActions from "../actions/map";
import {
    ICommand,
    PropType,
    IApplicationState
} from "../api/common";
import { mapToolbarReference } from "../api/registry/command";
import { useViewerLocale, useViewerFlyouts } from './hooks';

export interface IFlyoutRegionContainerProps {

}


interface FRDispatch {
    closeFlyout: (id: string) => void;
    invokeCommand: (cmd: ICommand, parameters?: any) => void;
}

const FlyoutRegionContainer = () => {
    const dispatch = useDispatch();
    const closeFlyout: PropType<FRDispatch, "closeFlyout"> = (id) => dispatch(FlyoutActions.closeFlyout(id));
    const invokeCommand: PropType<FRDispatch, "invokeCommand"> = (cmd, parameters) => dispatch(MapActions.invokeCommand(cmd, parameters));
    const onCloseFlyout = (id: string) => closeFlyout(id);
    const flyouts = useViewerFlyouts();
    const locale = useViewerLocale();
    const appState = useSelector<IApplicationState, IApplicationState>(s => s);
    const prepared: any = {};
    if (invokeCommand) {
        for (const flyoutId in flyouts) {
            const tb = flyouts[flyoutId];
            if (typeof(tb.componentName) == 'undefined') {
                prepared[flyoutId] = mapToolbarReference(tb, appState, invokeCommand);
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