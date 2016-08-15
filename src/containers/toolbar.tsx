import * as React from "react";
import { connect } from "react-redux";
import { getCommand } from "../api/command-registry";
import { IItem, IMenu, Toolbar } from "../components/toolbar";
import { invokeCommand } from "../actions/map";

interface IToolbarContainerProps {
    id: string;
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

function mapToolbarReference(tb: any, store, props: ToolbarContainerProps): IItem|IMenu {
    const state = store.getState();
    if (tb.isSeparator === true) {
        return { isSeparator: true };
    } else if (tb.command) {
        const cmd = getCommand(tb.command);
        if (cmd != null) {
            const cmdItem: IItem = {
                icon: cmd.icon,
                tooltip: cmd.tooltip,
                label: cmd.label,
                selected: () => cmd.selected(state),
                enabled: () => cmd.enabled(state),
                invoke: () => props.invokeCommand(cmd)
            };
            return cmdItem;
        }
    } else if (tb.label && tb.children) {
        return {
            label: tb.label,
            childItems: tb.children.map(mapToolbarReference)
        };
    }
    return null;
}

@connect(mapStateToProps, mapDispatchToProps)
export class ToolbarContainer extends React.Component<ToolbarContainerProps, any> {
    constructor(props) {
        super(props);
    }
    static contextTypes: React.ValidationMap<any> = {
        store: React.PropTypes.object
    };
    render(): JSX.Element {
        const { toolbar, containerStyle } = this.props;
        const store = (this.context as any).store;
        if (toolbar != null && toolbar.items != null) {
            const childItems = toolbar.items.map(tb => mapToolbarReference(tb, store, this.props)).filter(tb => tb != null);
            return <Toolbar childItems={childItems} containerStyle={containerStyle} />;
        } else {
            return <div />;
        }
    }
}