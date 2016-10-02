import * as React from "react";
import { connect } from "react-redux";
import { ICommand, getCommand, mapToolbarReference } from "../api/registry/command";
import { IItem, IMenu, Toolbar, DEFAULT_TOOLBAR_SIZE } from "../components/toolbar";
import { invokeCommand } from "../actions/map";

interface IToolbarContainerProps {
    id: string;
    vertical?: boolean;
    containerStyle?: React.CSSProperties;
}

interface IToolbarContainerState {
    map?: any;
    toolbar?: any;
    view?: any;
    selection?: any;
}

interface IToolbarContainerDispatch {
    invokeCommand?: (cmd: ICommand) => void;
}

function mapStateToProps(state: any, ownProps: IToolbarContainerProps): IToolbarContainerState {
    return {
        map: state.map,
        view: state.view,
        selection: state.selection,
        toolbar: state.toolbar[ownProps.id]
    };
}

function mapDispatchToProps(dispatch: ReduxDispatch): IToolbarContainerDispatch {
    return {
        invokeCommand: (cmd) => dispatch(invokeCommand(cmd))
    };
}

type ToolbarContainerProps = IToolbarContainerProps & IToolbarContainerState & IToolbarContainerDispatch;

@connect(mapStateToProps, mapDispatchToProps)
export class ToolbarContainer extends React.Component<ToolbarContainerProps, any> {
    constructor(props: ToolbarContainerProps) {
        super(props);
    }
    static contextTypes: React.ValidationMap<any> = {
        store: React.PropTypes.object
    };
    render(): JSX.Element {
        const { toolbar, containerStyle, vertical, invokeCommand } = this.props;
        const store = (this.context as any).store;
        if (toolbar && toolbar.items && invokeCommand && containerStyle) {
            if (vertical === true) {
                containerStyle.width = DEFAULT_TOOLBAR_SIZE;
            } else {
                containerStyle.height = DEFAULT_TOOLBAR_SIZE;
            }
            const childItems = (toolbar.items as any[])
                .map(tb => mapToolbarReference(tb, store, invokeCommand))
                .filter((tb): tb is IItem => tb != null);
            return <Toolbar vertical={vertical} childItems={childItems} containerStyle={containerStyle} />;
        } else {
            return <div />;
        }
    }
}