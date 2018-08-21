import * as React from "react";
import * as PropTypes from "prop-types";
import { connect } from "react-redux";
import { FlyoutRegion } from "../components/flyout-region";
import { closeFlyout } from "../actions/flyout";
import { invokeCommand } from "../actions/map";
import {
    ICommand,
    ReduxDispatch,
    IApplicationState
} from "../api/common";
import { mapToolbarReference } from "../api/registry/command";
import { DEFAULT_LOCALE } from "../api/i18n";

export interface IFlyoutRegionContainerProps {

}

export interface IFlyoutRegionContainerState {
    flyouts: any;
    locale: string;
}

export interface IFlyoutRegionContainerDispatch {
    closeFlyout: (id: string) => void;
    invokeCommand: (cmd: ICommand, parameters?: any) => void;
}

function mapStateToProps(state: Readonly<IApplicationState>, ownProps: IFlyoutRegionContainerProps): Partial<IFlyoutRegionContainerState> {
    return {
        flyouts: state.toolbar.flyouts,
        locale: state.config.locale
    };
}

function mapDispatchToProps(dispatch: ReduxDispatch): Partial<IFlyoutRegionContainerDispatch> {
    return {
        closeFlyout: (id) => dispatch(closeFlyout(id)),
        invokeCommand: (cmd, parameters) => dispatch(invokeCommand(cmd, parameters))
    };
}

export type FlyoutRegionContainerProps = IFlyoutRegionContainerProps & Partial<IFlyoutRegionContainerState> & Partial<IFlyoutRegionContainerDispatch>;

export class FlyoutRegionContainer extends React.Component<FlyoutRegionContainerProps, any> {
    constructor(props: FlyoutRegionContainerProps) {
        super(props);
    }
    static contextTypes: PropTypes.ValidationMap<any> = {
        store: PropTypes.object
    };
    private onCloseFlyout = (id: string) => {
        if (this.props.closeFlyout) {
            this.props.closeFlyout(id);
        }
    }
    private prepareFlyouts(): any {
        const store = (this.context as any).store;
        const prepared: any = {};
        const { flyouts, invokeCommand } = this.props;
        if (invokeCommand) {
            for (const flyoutId in flyouts) {
                const tb = flyouts[flyoutId];
                if (typeof(tb.componentName) == 'undefined') {
                    prepared[flyoutId] = mapToolbarReference(tb, store, invokeCommand);
                    prepared[flyoutId].open = !!flyouts[flyoutId].open;
                    prepared[flyoutId].metrics = flyouts[flyoutId].metrics;
                } else {
                    prepared[flyoutId] = flyouts[flyoutId];
                }
            }
        }
        return prepared;
    }
    render(): JSX.Element {
        const locale = this.props.locale ? this.props.locale : DEFAULT_LOCALE;
        const flyouts = this.prepareFlyouts();
        return <FlyoutRegion flyoutConf={flyouts} onCloseFlyout={this.onCloseFlyout} locale={locale} />;
    }
}

export default connect(mapStateToProps, mapDispatchToProps as any /* HACK: I dunno how to type thunked actions for 4.0 */)(FlyoutRegionContainer);