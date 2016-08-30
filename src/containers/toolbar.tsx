import * as React from "react";
import { connect } from "react-redux";
import { getCommand, mapToolbarReference } from "../api/registry/command";
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
    invokeCommand?: (cmd) => void;
}

function mapStateToProps(state, ownProps): IToolbarContainerState {
    return {
        map: state.map,
        view: state.view,
        selection: state.selection,
        toolbar: state.toolbar[ownProps.id]
    };
}

function mapDispatchToProps(dispatch): IToolbarContainerDispatch {
    return {
        invokeCommand: (cmd) => dispatch(invokeCommand(cmd))
    };
}

type ToolbarContainerProps = IToolbarContainerProps & IToolbarContainerState & IToolbarContainerDispatch;

@connect(mapStateToProps, mapDispatchToProps)
export class ToolbarContainer extends React.Component<ToolbarContainerProps, any> {
    constructor(props) {
        super(props);
    }
    static contextTypes: React.ValidationMap<any> = {
        store: React.PropTypes.object
    };
    render(): JSX.Element {
        const { toolbar, containerStyle, vertical } = this.props;
        if (vertical === true) {
            containerStyle.width = DEFAULT_TOOLBAR_SIZE;
        } else {
            containerStyle.height = DEFAULT_TOOLBAR_SIZE;
        }
        const store = (this.context as any).store;
        if (toolbar != null && toolbar.items != null) {
            const childItems = toolbar.items.map(tb => mapToolbarReference(tb, store, this.props.invokeCommand)).filter(tb => tb != null);
            return <Toolbar vertical={vertical} childItems={childItems} containerStyle={containerStyle} />;
        } else {
            return <div />;
        }
    }
}