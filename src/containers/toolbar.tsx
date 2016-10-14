import * as React from "react";
import { connect } from "react-redux";
import {
    ICommand,
    IDOMElementMetrics,
    ReduxDispatch,
    IApplicationState,
    IToolbarReducerState,
    IViewReducerState,
    ISelectionReducerState,
    IMapReducerState
} from "../api/common";
import { getCommand, mapToolbarReference } from "../api/registry/command";
import { IItem, IInlineMenu, Toolbar, DEFAULT_TOOLBAR_SIZE } from "../components/toolbar";
import { invokeCommand } from "../actions/map";
import { processMenuItems } from "../utils/menu";
import * as FlyoutActions from "../actions/flyout";

export interface IToolbarContainerProps {
    id: string;
    vertical?: boolean;
    containerClass?: string;
    containerStyle?: React.CSSProperties;
}

export interface IToolbarContainerState {
    map?: IMapReducerState;
    toolbar?: IToolbarReducerState;
    flyouts?: any;
    view?: IViewReducerState;
    selection?: ISelectionReducerState;
}

export interface IToolbarContainerDispatch {
    invokeCommand?: (cmd: ICommand) => void;
    openFlyout?: (id: string, metrics: IDOMElementMetrics) => void;
    closeFlyout?: (id: string) => void;
}

function mapStateToProps(state: IApplicationState, ownProps: IToolbarContainerProps): IToolbarContainerState {
    return {
        map: state.map,
        view: state.view,
        selection: state.selection,
        flyouts: state.toolbar.flyouts,
        toolbar: state.toolbar.toolbars[ownProps.id]
    };
}

function mapDispatchToProps(dispatch: ReduxDispatch): IToolbarContainerDispatch {
    return {
        invokeCommand: (cmd) => dispatch(invokeCommand(cmd)),
        openFlyout: (id, metrics) => dispatch(FlyoutActions.openFlyout(id, metrics)),
        closeFlyout: (id) => dispatch(FlyoutActions.closeFlyout(id))
    };
}

export type ToolbarContainerProps = IToolbarContainerProps & IToolbarContainerState & IToolbarContainerDispatch;

@connect(mapStateToProps, mapDispatchToProps)
export class ToolbarContainer extends React.Component<ToolbarContainerProps, any> {
    private fnOpenFlyout: (id: string) => void;
    private fnCloseFlyout: (id: string) => void;
    constructor(props: ToolbarContainerProps) {
        super(props);
        this.fnCloseFlyout = this.onCloseFlyout.bind(this);
        this.fnOpenFlyout = this.onOpenFlyout.bind(this);
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
                            onOpenFlyout={this.fnOpenFlyout}
                            onCloseFlyout={this.fnCloseFlyout} />;
        } else {
            return <div />;
        }
    }
}