import * as React from "react";
import { isMenu } from "../utils/type-guards";
import FlyoutWrapper from "@aneves/react-flyout";
import * as uuid from "node-uuid";
import * as Constants from "../constants";

export const TOOLBAR_BACKGROUND_COLOR = "#f0f0f0";
export const DEFAULT_TOOLBAR_SIZE = 29;
const TOOLBAR_STYLE = {
    backgroundColor: TOOLBAR_BACKGROUND_COLOR,
    border: "1px solid rgb(240, 240, 240)"
};
const TOOLBAR_ITEM_STYLE = {
    display: "inline-block",
    border: `1px solid ${TOOLBAR_BACKGROUND_COLOR}`
};
const TOOLBAR_ITEM_STYLE_HOVERED = {
    display: "inline-block",
    border: "1px solid rgb(153, 181, 202)"
};

export function getIcon(relPath: string): string {
    return `stdicons/${relPath}`;
}

function getSelected(item: IItem): boolean {
    const sel = item.selected;
    if (sel != null) {
        if (typeof sel === 'function') {
            return sel();
        } else {
            return sel;
        }
    }
    return false;
}

export function getEnabled(item: IItem): boolean {
    const en = item.enabled;
    if (en != null) {
        if (typeof en === 'function') {
            return en();
        } else {
            return en;
        }
    }
    return true;
}

function getIconStyle(enabled: boolean, height: number): React.CSSProperties {
    const imgStyle: React.CSSProperties = {
        verticalAlign: "middle",
        lineHeight: height 
    };
    if (!enabled) {
        imgStyle.opacity = 0.4;
    }
    return imgStyle;
}

function getItemStyle(enabled: boolean, selected: boolean, size: number, isMouseOver: boolean, vertical?: boolean): React.CSSProperties {
    const pad = ((size - 16) / 2);
    const vertPad = 6;
    const style: React.CSSProperties = {
        display: vertical === true ? "block" : "inline-block",
        //height: height,
        paddingLeft: pad,
        paddingRight: pad,
        paddingTop: vertPad,
        paddingBottom: vertPad
    };
    if (enabled && (isMouseOver === true || selected)) {
        style.cursor = "pointer";
        style.background = "rgb(220, 220, 220)";
        style.border = "1px solid rgb(160, 160, 160)";
        style.paddingLeft = pad - 1; //To compensate for border
        style.paddingRight = pad - 1; //To compensate for border
        style.paddingTop = vertPad - 1; //To compensate for border
        style.paddingBottom = vertPad - 1; //To compensate for border
    }
    return style;
}

function getToolbarSeparatorItemStyle(height: number, vertical?: boolean): React.CSSProperties {
    const vertPad = 6;
    const style: React.CSSProperties = {
        display: vertical === true ? "block" : "inline-block"
    };
    if (vertical === true) {
        style.paddingTop = 2;
        style.paddingBottom = -2;
        style.marginLeft = 0;
        style.marginRight = 0;
        style.borderBottom = "1px solid black";
    } else {
        style.paddingTop = 0;
        style.paddingBottom = 0;
        style.marginLeft = 2;
        style.marginRight = -2;
        style.borderLeft = "1px solid black";
    }
    return style;
}

function getMenuItemStyle(enabled: boolean, selected: boolean, height: number, isMouseOver: boolean): React.CSSProperties {
    const pad = ((height - 16) / 2);
    const vertPad = 6;
    const style: React.CSSProperties = {
        //height: height,
        paddingLeft: pad,
        paddingRight: pad,
        paddingTop: vertPad,
        paddingBottom: vertPad
    };
    if (enabled && (isMouseOver === true || selected)) {
        style.cursor = "pointer";
        style.border = "1px solid rgb(153, 181, 202)";
        style.paddingLeft = pad - 1; //To compensate for border
        style.paddingRight = pad - 1; //To compensate for border
        style.paddingTop = vertPad - 1; //To compensate for border
        style.paddingBottom = vertPad - 1; //To compensate for border
    }
    return style;
}

interface IFlyoutMenuChildItemProps {
    item: IItem|IMenu;
    onInvoked?: () => void;
}

class FlyoutMenuChildItem extends React.Component<any, any> {
    private fnMouseLeave: (e) => void;
    private fnMouseEnter: (e) => void;
    private fnClick: (e) => void;
    constructor(props) {
        super(props);
        this.fnClick = this.onClick.bind(this);
        this.fnMouseEnter = this.onMouseEnter.bind(this);
        this.fnMouseLeave = this.onMouseLeave.bind(this);
        this.state = {
            isMouseOver: false
        };
    }
    private onClick(e) {
        const { item, onInvoked } = this.props;
        if (getEnabled(item)) {
            item.invoke();
            if (onInvoked != null) {
                onInvoked();
            }
        }
    }
    private onMouseLeave(e) {
        this.setState({ isMouseOver: false });
    }
    private onMouseEnter(e) {
        this.setState({ isMouseOver: true });
    }
    render(): JSX.Element {
        const { item } = this.props;
        const height = DEFAULT_TOOLBAR_SIZE;
        const selected = item.selected != null ? item.selected() : false;
        const enabled = item.enabled != null ? item.enabled() : true;
        const imgStyle = getIconStyle(enabled, height);
        const style = getMenuItemStyle(enabled, selected, height, this.state.isMouseOver);
        return <li className="noselect" title={item.tooltip} onMouseEnter={this.fnMouseEnter} onMouseLeave={this.fnMouseLeave} onClick={this.fnClick}>
            <div style={style}>
                <img style={imgStyle} src={getIcon(item.icon)} /> {item.label}
            </div>
        </li>;
    }
}

interface IToolbarContentContainerProps {
    size: number;
    vertical?: boolean;
}

class ToolbarContentContainer extends React.Component<IToolbarContentContainerProps, any> {
    constructor(props) {
        super(props);
    }
    render(): JSX.Element {
        const { size, vertical } = this.props;
        const imgStyle = getIconStyle(true, size);
        const style = getItemStyle(true, false, size, false, vertical);
        return <div className="noselect">{this.props.children}</div>;
    }
}

interface IFlyoutMenuItemProps {
    size: number;
    menu: IMenu;
    vertical?: boolean;
}

class FlyoutMenuItem extends React.Component<IFlyoutMenuItemProps, any> {
    private fnMouseLeave: (e) => void;
    private fnMouseEnter: (e) => void;
    private fnClick: (e) => void;
    private fnChildInvoked: () => void;
    private flyoutId: string;
    constructor(props) {
        super(props);
        this.fnClick = this.onClick.bind(this);
        this.fnMouseEnter = this.onMouseEnter.bind(this);
        this.fnMouseLeave = this.onMouseLeave.bind(this);
        this.fnChildInvoked = this.onChildInvoked.bind(this);
        this.state = {
            isMouseOver: false,
            isFlownOut: false
        };
        this.flyoutId = uuid.v4();
    }
    private onClick(e) {
        e.preventDefault();
        this.setState({ isFlownOut: !this.state.isFlownOut });
        return false;
    }
    private onMouseLeave(e) {
        this.setState({ isMouseOver: false });
    }
    private onMouseEnter(e) {
        this.setState({ isMouseOver: true });
    }
    private onChildInvoked() {
        this.setState({ isFlownOut: false, isMouseOver: false });
    }
    render(): JSX.Element {
        const { size, menu, vertical } = this.props;
        const selected = getSelected(menu);
        const enabled = getEnabled(menu);
        const imgStyle = getIconStyle(enabled, size);
        const style = getItemStyle(enabled, selected, size, this.state.isMouseOver, vertical);
        let label: any = menu.label;
        if (vertical === true) {
            label = <div className="rotated-text"><span className="rotated-text__inner rotated-text-ccw">{menu.label}</span></div>;
        }
        let align = menu.flyoutAlign;
        if (!align) {
            align = (vertical === true) ? "right bottom" : "bottom right";
        }
        return <div className="has-flyout noselect" onMouseEnter={this.fnMouseEnter} onMouseLeave={this.fnMouseLeave} onClick={this.fnClick} style={style} title={menu.tooltip}>
            <div data-flyout-id={`flyout-${this.flyoutId}`}>
                {label} <img style={imgStyle} src={getIcon(menu.icon || ((this.state.isFlownOut) ? "icon_menuarrowup.gif" : "icon_menuarrow.gif"))} />
            </div>
            <FlyoutWrapper id={`flyout-${this.flyoutId}`} open={this.state.isFlownOut} options={{ type: "dropdown", align: align }}>
                <ul className="mg-flyout-menu-content">
                {this.props.menu.childItems.map((item, index) => {
                    if (item.isSeparator) {
                        return <hr key={index} />;
                    } else {
                        return <FlyoutMenuChildItem key={index} item={item} onInvoked={this.fnChildInvoked} />;
                    }
                })}
                </ul>
            </FlyoutWrapper>
        </div>;
    }
}

interface IToolbarSeparatorProps {
    size: number;
    vertical?: boolean;
}

class ToolbarSeparator extends React.Component<IToolbarSeparatorProps, any> {
    constructor(props) {
        super(props);
    }
    render(): JSX.Element {
        const style = getToolbarSeparatorItemStyle(this.props.size, this.props.vertical);
        if (this.props.vertical === true) {
            return <div className="noselect" style={style} />;
        } else {
            return <div className="noselect" style={style}>{Constants.NBSP}</div>;
        }
    }
}

interface IToolbarButtonProps {
    height: number;
    item: IItem;
    vertical?: boolean;
}

class ToolbarButton extends React.Component<IToolbarButtonProps, any> {
    fnMouseLeave: (e) => void;
    fnMouseEnter: (e) => void;
    fnClick: (e) => void;
    constructor(props) {
        super(props);
        this.fnMouseEnter = this.onMouseEnter.bind(this);
        this.fnMouseLeave = this.onMouseLeave.bind(this);
        this.fnClick = this.onClick.bind(this);
        this.state = {
            isMouseOver: false
        };
    }
    onMouseLeave(e) {
        this.setState({ isMouseOver: false });
    }
    onMouseEnter(e) {
        this.setState({ isMouseOver: true });
    }
    onClick(e) {
        e.preventDefault();
        const { item } = this.props;
        const enabled = getEnabled(item);
        if (enabled) {
            item.invoke();
        }
        return false;
    }
    render(): JSX.Element {
        const { height, item, vertical } = this.props;
        const selected = getSelected(item);
        const enabled = getEnabled(item);
        const imgStyle = getIconStyle(enabled, height);
        const style = getItemStyle(enabled, selected, height, this.state.isMouseOver, vertical);
        return <div className="noselect" onMouseEnter={this.fnMouseEnter} onMouseLeave={this.fnMouseLeave} style={style} title={item.tooltip} onClick={this.fnClick}>
            <img style={imgStyle} src={getIcon(item.icon)} /> {item.label}
        </div>;
    }
}

export interface IItem {
    label?: string;
    tooltip?: string;
    icon?: string;
    invoke?: () => void;
    enabled?: boolean | (() => boolean);
    selected?: boolean | (() => boolean);
    isSeparator?: boolean;
}

export interface IMenu extends IItem {
    childItems: IItem[];
    flyoutAlign?: string;
}

export interface IContainerItem extends IItem {
    renderContainerContent: () => JSX.Element;
}

export interface IToolbarProps {
    childItems: IItem[];
    containerStyle?: React.CSSProperties;
    vertical?: boolean;
}

export class Toolbar extends React.Component<IToolbarProps, any> {
    constructor(props) {
        super(props);
    }
    render(): JSX.Element {
        const { containerStyle, childItems, vertical } = this.props;
        const height = containerStyle != null 
            ? (containerStyle.height || DEFAULT_TOOLBAR_SIZE)
            : DEFAULT_TOOLBAR_SIZE; 
        return <div style={containerStyle} className="noselect">
            {childItems.map((item, index) => {
                if (isMenu(item)) {
                    return <FlyoutMenuItem key={index} size={height} menu={item} vertical={vertical} />;
                } else if (item.isSeparator === true) {
                    return <ToolbarSeparator key={index} size={height} vertical={vertical} />;
                } else {
                    return <ToolbarButton key={index} height={height} item={item} vertical={vertical} />;
                }
            })}
        </div>;
    }
}