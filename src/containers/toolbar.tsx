import * as React from "react";
import { connect } from "react-redux";
import {
    ICommand,
    IDOMElementMetrics,
    ReduxDispatch,
    IApplicationState,
    IToolbarReducerState,
    IBranchedMapSubState
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
    invokeCommand: (cmd: ICommand) => void;
    openFlyout: (id: string, metrics: IDOMElementMetrics) => void;
    closeFlyout: (id: string) => void;
    openComponent: (id: string, metrics: IDOMElementMetrics, name: string, props?: any) => void;
    closeComponent: (id: string) => void;
}

function mapStateToProps(state: IApplicationState, ownProps: IToolbarContainerProps): Partial<IToolbarContainerState> {
    let map;
    let action = NULL_ACTION;
    if (state.config.activeMapName) {
        map = state.mapState[state.config.activeMapName];
    }
    //We only care to pass on the dispatched action if the action is any of the
    //following
    if (state.lastaction.type == Constants.MAP_SET_MAPTIP ||
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

function mapDispatchToProps(dispatch: ReduxDispatch): IToolbarContainerDispatch {
    return {
        invokeCommand: (cmd) => dispatch(invokeCommand(cmd)),
        openFlyout: (id, metrics) => dispatch(FlyoutActions.openFlyout(id, metrics)),
        closeFlyout: (id) => dispatch(FlyoutActions.closeFlyout(id)),
        openComponent: (id, metrics, name, props) => dispatch(FlyoutActions.openComponent(id, metrics, name, props)),
        closeComponent: (id) => dispatch(FlyoutActions.closeComponent(id))
    };
}

export type ToolbarContainerProps = IToolbarContainerProps & Partial<IToolbarContainerState> & Partial<IToolbarContainerDispatch>;

@connect(mapStateToProps, mapDispatchToProps)
export class ToolbarContainer extends React.Component<ToolbarContainerProps, any> {
    private fnOpenFlyout: (id: string, metrics: IDOMElementMetrics) => void;
    private fnCloseFlyout: (id: string) => void;
    private fnOpenComponent: (id: string, metrics: IDOMElementMetrics, name: string, props?: any) => void;
    private fnCloseComponent: (id: string) => void;
    constructor(props: ToolbarContainerProps) {
        super(props);
        this.fnCloseFlyout = this.onCloseFlyout.bind(this);
        this.fnOpenFlyout = this.onOpenFlyout.bind(this);
        this.fnOpenComponent = this.onOpenComponent.bind(this);
        this.fnCloseComponent = this.onCloseComponent.bind(this);
    }
    private onCloseFlyout(id: string): void {
        if (this.props.closeFlyout) {
            this.props.closeFlyout(id);
        }
    }
    private onOpenFlyout(id: string, metrics: IDOMElementMetrics): void {
        if (this.props.openFlyout) {
            this.props.openFlyout(id, metrics);
        }
    }
    private onOpenComponent(id: string, metrics: IDOMElementMetrics, name: string, props?: any): void {
        if (this.props.openComponent) {
            this.props.openComponent(id, metrics, name, props);
        }
    }
    private onCloseComponent(id: string): void {
        if (this.props.closeComponent) {
            this.props.closeComponent(id);
        }
    }
    static contextTypes: React.ValidationMap<any> = {
        store: React.PropTypes.object
    };
    render(): JSX.Element {
        const { toolbar, containerClass, containerStyle, vertical, invokeCommand } = this.props;
        const store = (this.context as any).store;
        if (toolbar && toolbar.items && invokeCommand && containerStyle) {
            if (vertical === true) {
                containerStyle.width = DEFAULT_TOOLBAR_SIZE;
            } else {
                containerStyle.height = DEFAULT_TOOLBAR_SIZE;
                containerStyle.overflow = "auto";
            }
            const items = (toolbar.items as any[]).map(tb => mapToolbarReference(tb, store, invokeCommand));
            const childItems = processMenuItems(items);
            return <Toolbar vertical={vertical}
                            childItems={childItems}
                            containerClass={containerClass}
                            containerStyle={containerStyle}
                            onOpenComponent={this.fnOpenComponent}
                            onCloseComponent={this.fnCloseComponent}
                            onOpenFlyout={this.fnOpenFlyout}
                            onCloseFlyout={this.fnCloseFlyout} />;
        } else {
            return <div />;
        }
    }
}