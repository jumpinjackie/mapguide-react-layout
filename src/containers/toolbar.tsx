import * as React from "react";
import { connect } from "react-redux";
import * as PropTypes from "prop-types";
import {
    ICommand,
    IDOMElementMetrics,
    ReduxDispatch,
    IApplicationState,
    IToolbarReducerState,
    IBranchedMapSubState,
    FlyoutVisibilitySet
} from "../api/common";
import { getCommand, mapToolbarReference } from "../api/registry/command";
import { IItem, IInlineMenu, Toolbar, DEFAULT_TOOLBAR_SIZE } from "../components/toolbar";
import { invokeCommand } from "../actions/map";
import { processMenuItems } from "../utils/menu";
import * as FlyoutActions from "../actions/flyout";
import * as Constants from "../constants";
import { NULL_ACTION } from "../reducers/last-action";

export interface IToolbarContainerProps {
    id: string;
    vertical?: boolean;
    hideVerticalLabels?: boolean;
    containerClass?: string;
    containerStyle?: React.CSSProperties;
}

export interface IToolbarContainerState {
    map: IBranchedMapSubState;
    toolbar: IToolbarReducerState;
    flyouts: any;
    lastaction: any;
}

export interface IToolbarContainerDispatch {
    invokeCommand: (cmd: ICommand, parameters?: any) => void;
    openFlyout: (id: string, metrics: IDOMElementMetrics) => void;
    closeFlyout: (id: string) => void;
    openComponent: (id: string, metrics: IDOMElementMetrics, name: string, props?: any) => void;
    closeComponent: (id: string) => void;
}

function mapStateToProps(state: Readonly<IApplicationState>, ownProps: IToolbarContainerProps): Partial<IToolbarContainerState> {
    let map;
    let action = NULL_ACTION;
    if (state.config.activeMapName) {
        map = state.mapState[state.config.activeMapName];
    }
    //We only care to pass on the dispatched action if the action is any of the
    //following
    if (state.lastaction.type == Constants.MAP_SET_BUSY_COUNT ||
        state.lastaction.type == Constants.MAP_SET_MAPTIP ||
        state.lastaction.type == Constants.MAP_SET_SELECTION ||
        state.lastaction.type == Constants.MAP_SET_ACTIVE_TOOL) {
        action = state.lastaction;
    }
    return {
        map: map,
        flyouts: state.toolbar.flyouts,
        toolbar: state.toolbar.toolbars[ownProps.id],
        lastaction: action
    };
}

function mapDispatchToProps(dispatch: ReduxDispatch): Partial<IToolbarContainerDispatch> {
    return {
        invokeCommand: (cmd, parameters) => dispatch(invokeCommand(cmd, parameters)),
        openFlyout: (id, metrics) => dispatch(FlyoutActions.openFlyout(id, metrics)),
        closeFlyout: (id) => dispatch(FlyoutActions.closeFlyout(id)),
        openComponent: (id, metrics, name, props) => dispatch(FlyoutActions.openComponent(id, metrics, name, props)),
        closeComponent: (id) => dispatch(FlyoutActions.closeComponent(id))
    };
}

export type ToolbarContainerProps = IToolbarContainerProps & Partial<IToolbarContainerState> & Partial<IToolbarContainerDispatch>;

export class ToolbarContainer extends React.Component<ToolbarContainerProps, any> {
    constructor(props: ToolbarContainerProps) {
        super(props);
    }
    private onCloseFlyout = (id: string) => {
        if (this.props.closeFlyout) {
            this.props.closeFlyout(id);
        }
    }
    private onOpenFlyout = (id: string, metrics: IDOMElementMetrics) => {
        if (this.props.openFlyout) {
            this.props.openFlyout(id, metrics);
        }
    }
    private onOpenComponent = (id: string, metrics: IDOMElementMetrics, name: string, props?: any) => {
        if (this.props.openComponent) {
            this.props.openComponent(id, metrics, name, props);
        }
    }
    private onCloseComponent = (id: string) => {
        if (this.props.closeComponent) {
            this.props.closeComponent(id);
        }
    }
    static contextTypes: PropTypes.ValidationMap<any> = {
        store: PropTypes.object
    };
    render(): JSX.Element {
        const { toolbar, containerClass, containerStyle, vertical, hideVerticalLabels, invokeCommand, flyouts } = this.props;
        const store = (this.context as any).store;
        const flyoutStates: FlyoutVisibilitySet = {};
        if (flyouts) {
            const ids = Object.keys(flyouts);
            for (const fid of ids) {
                flyoutStates[fid] = !!flyouts[fid].open;
            }
        }
        let tbContainerStyle: React.CSSProperties = { ...(containerStyle || {}) };
        if (toolbar && toolbar.items && invokeCommand) {
            if (vertical === true) {
                tbContainerStyle.width = DEFAULT_TOOLBAR_SIZE;
            } else {
                tbContainerStyle.height = DEFAULT_TOOLBAR_SIZE;
                tbContainerStyle.overflow = "auto";
            }
            const items = (toolbar.items as any[]).map(tb => mapToolbarReference(tb, store, invokeCommand));
            const childItems = processMenuItems(items);
            return <Toolbar vertical={vertical}
                            hideVerticalLabels={hideVerticalLabels}
                            childItems={childItems}
                            containerClass={containerClass}
                            containerStyle={tbContainerStyle}
                            flyoutStates={flyoutStates}
                            onOpenComponent={this.onOpenComponent}
                            onCloseComponent={this.onCloseComponent}
                            onOpenFlyout={this.onOpenFlyout}
                            onCloseFlyout={this.onCloseFlyout} />;
        } else {
            return <div />;
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolbarContainer);