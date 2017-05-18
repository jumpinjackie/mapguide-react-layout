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
import { processMenuItems } from "../utils/menu";
import { mapToolbarReference } from "../api/registry/command";

export interface IFlyoutRegionContainerProps {

}

export interface IFlyoutRegionContainerState {
    flyouts: any;
    locale: string;
}

export interface IFlyoutRegionContainerDispatch {
    closeFlyout: (id: string) => void;
    invokeCommand: (cmd: ICommand) => void;
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
        invokeCommand: (cmd) => dispatch(invokeCommand(cmd))
    };
}

export type FlyoutRegionContainerProps = IFlyoutRegionContainerProps & Partial<IFlyoutRegionContainerState> & Partial<IFlyoutRegionContainerDispatch>;

export class FlyoutRegionContainer extends React.Component<FlyoutRegionContainerProps, any> {
    private fnCloseFlyout: (id: string) => void;
    constructor(props: FlyoutRegionContainerProps) {
        super(props);
        this.fnCloseFlyout = this.onCloseFlyout.bind(this);
    }
    static contextTypes: PropTypes.ValidationMap<any> = {
        store: PropTypes.object
    };
    private onCloseFlyout(id: string): void {
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
        const locale = this.props.locale ? this.props.locale : "en";
        const flyouts = this.prepareFlyouts();
        return <FlyoutRegion flyoutConf={flyouts} onCloseFlyout={this.fnCloseFlyout} locale={locale} />;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FlyoutRegionContainer);