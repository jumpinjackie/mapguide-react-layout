import * as React from "react";
import { isMenu, isMenuRef, isComponentFlyout } from "../utils/type-guards";
import { IDOMElementMetrics, FlyoutVisibilitySet, GenericEvent, GenericEventHandler } from "../api/common";
import { Popover, Position } from "@blueprintjs/core";
import { MenuComponent } from "./menu";
import { IToolbarContext, TOOLBAR_CONTEXT_VALIDATION_MAP } from "./context";
import { STR_EMPTY } from "../utils/string";
import { Icon } from "./icon";
import { 
    SPRITE_ICON_MENUARROWUP,
    SPRITE_ICON_MENUARROW
} from "../constants/assets";
import * as Constants from "../constants";

export const DEFAULT_TOOLBAR_SIZE = 29;
export const TOOLBAR_BACKGROUND_COLOR = "#f0f0f0";

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

function getTooltip(item: IItem): string {
    const tt = item.tooltip;
    if (tt != null) {
        if (typeof tt === 'function') {
            return tt();
        } else {
            return tt;
        }
    }
    return STR_EMPTY;
}

export function getIconStyle(enabled: boolean, height: number): React.CSSProperties {
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
    if ((isMouseOver === true && enabled === true) || selected) {
        style.borderWidth = 1;
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
    } else {
        style.paddingTop = 0;
        style.paddingBottom = 0;
        style.marginLeft = 2;
        style.marginRight = -2;
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

export interface IFlyoutMenuChildItemProps {
    item: IItem|IInlineMenu;
    onInvoked?: () => void;
}

export class FlyoutMenuChildItem extends React.Component<IFlyoutMenuChildItemProps, any> {
    private fnMouseLeave: GenericEventHandler;
    private fnMouseEnter: GenericEventHandler;
    private fnClick: GenericEventHandler;
    constructor(props: IFlyoutMenuChildItemProps) {
        super(props);
        this.fnClick = this.onClick.bind(this);
        this.fnMouseEnter = this.onMouseEnter.bind(this);
        this.fnMouseLeave = this.onMouseLeave.bind(this);
        this.state = {
            isMouseOver: false
        };
    }
    private onClick(e: GenericEvent) {
        const { item, onInvoked } = this.props;
        if (getEnabled(item)) {
            if (item.invoke) {
                item.invoke();
            }
            if (onInvoked != null) {
                onInvoked();
            }
        }
    }
    private onMouseLeave(e: GenericEvent) {
        this.setState({ isMouseOver: false });
    }
    private onMouseEnter(e: GenericEvent) {
        this.setState({ isMouseOver: true });
    }
    render(): JSX.Element {
        const { item } = this.props;
        const height = DEFAULT_TOOLBAR_SIZE;
        const selected = getSelected(item);
        const enabled = getEnabled(item);
        const tt = getTooltip(item);
        const imgStyle = getIconStyle(enabled, height);
        const style = getMenuItemStyle(enabled, selected, height, this.state.isMouseOver);
        return <li className="noselect flyout-menu-child-item" title={tt} onMouseEnter={this.fnMouseEnter} onMouseLeave={this.fnMouseLeave} onClick={this.fnClick}>
            <div style={style}>
                <Icon style={imgStyle} url={item.icon} /> {item.label}
            </div>
        </li>;
    }
}

interface IToolbarContentContainerProps {
    size: number;
    vertical?: boolean;
}

class ToolbarContentContainer extends React.Component<IToolbarContentContainerProps, any> {
    constructor(props: IToolbarContentContainerProps) {
        super(props);
    }
    render(): JSX.Element {
        const { size, vertical } = this.props;
        return <div className="noselect toolbar-content-container">{this.props.children}</div>;
    }
}

interface IComponentFlyoutItemProps {
    size: number;
    item: IComponentFlyoutItem;
    vertical?: boolean;
    isFlownOut?: boolean;
}

class ComponentFlyoutItem extends React.Component<IComponentFlyoutItemProps, any> {
    private fnMouseLeave: GenericEventHandler;
    private fnMouseEnter: GenericEventHandler;
    private fnClick: GenericEventHandler;
    private fnChildInvoked: () => void;
    static contextTypes = TOOLBAR_CONTEXT_VALIDATION_MAP;
    context: IToolbarContext;
    constructor(props: IComponentFlyoutItemProps) {
        super(props);
        this.fnClick = this.onClick.bind(this);
        this.fnMouseEnter = this.onMouseEnter.bind(this);
        this.fnMouseLeave = this.onMouseLeave.bind(this);
        this.fnChildInvoked = this.onChildInvoked.bind(this);
        this.state = {
            isMouseOver: false
        };
    }
    private onClick(e: GenericEvent) {
        e.preventDefault();
        const { flyoutId, componentName, componentProps } = this.props.item;
        const newState = !!!this.props.isFlownOut;
        if (newState) {
            const rect = e.currentTarget.getBoundingClientRect();
            const metrics: IDOMElementMetrics = {
                posX: rect.left, // e.clientX,
                posY: rect.top, // e.clientY,
                width: rect.width, // e.currentTarget.offsetWidth,
                height: rect.height, // e.currentTarget.offsetHeight
                vertical: this.props.vertical
            };
            this.context.openComponent(flyoutId, metrics, componentName, componentProps);
        } else {
            this.context.closeComponent(flyoutId);
        }
        return false;
    }
    private onMouseLeave(e: GenericEvent) {
        this.setState({ isMouseOver: false });
    }
    private onMouseEnter(e: GenericEvent) {
        this.setState({ isMouseOver: true });
    }
    private onChildInvoked() {
        this.setState({ isMouseOver: false });
        this.context.closeFlyout(this.props.item.flyoutId);
    }
    render(): JSX.Element {
        const { size, item, vertical, isFlownOut } = this.props;
        const selected = getSelected(item);
        const enabled = getEnabled(item);
        const imgStyle = getIconStyle(enabled, size);
        const style = getItemStyle(enabled, selected, size, this.state.isMouseOver, vertical);
        let label: any = item.label;
        if (vertical === true) {
            label = <div className="rotated-text"><span className="rotated-text__inner rotated-text-ccw">{item.label}</span></div>;
        }
        const ttip = getTooltip(item);
        return <div className={`noselect toolbar-flyout-btn ${selected ? "selected-item" : ""} ${this.state.isMouseOver ? "mouse-over" : ""}`} onMouseEnter={this.fnMouseEnter} onMouseLeave={this.fnMouseLeave} onClick={this.fnClick} style={style} title={ttip}>
            <div data-flyout-id={`flyout-${item.flyoutId}`}>
                <Icon style={imgStyle} url={item.icon} spriteClass={item.iconClass} /> {label} <Icon style={imgStyle} spriteClass={isFlownOut ? SPRITE_ICON_MENUARROWUP : SPRITE_ICON_MENUARROW } />
            </div>
        </div>;
    }
}

interface IFlyoutMenuReferenceItemProps {
    size: number;
    menu: IFlyoutMenu;
    vertical?: boolean;
    isFlownOut?: boolean;
}

class FlyoutMenuReferenceItem extends React.Component<IFlyoutMenuReferenceItemProps, any> {
    private fnMouseLeave: GenericEventHandler;
    private fnMouseEnter: GenericEventHandler;
    private fnClick: GenericEventHandler;
    private fnChildInvoked: () => void;
    static contextTypes = TOOLBAR_CONTEXT_VALIDATION_MAP;
    context: IToolbarContext;
    constructor(props: IFlyoutMenuReferenceItemProps) {
        super(props);
        this.fnClick = this.onClick.bind(this);
        this.fnMouseEnter = this.onMouseEnter.bind(this);
        this.fnMouseLeave = this.onMouseLeave.bind(this);
        this.fnChildInvoked = this.onChildInvoked.bind(this);
        this.state = {
            isMouseOver: false,
        };
    }
    private onClick(e: GenericEvent) {
        e.preventDefault();
        const newState = !!!this.props.isFlownOut;
        if (newState) {
            const rect = e.currentTarget.getBoundingClientRect();
            const metrics: IDOMElementMetrics = {
                posX: rect.left, // e.clientX,
                posY: rect.top, // e.clientY,
                width: rect.width, // e.currentTarget.offsetWidth,
                height: rect.height, // e.currentTarget.offsetHeight
                vertical: this.props.vertical
            };
            this.context.openFlyout(this.props.menu.flyoutId, metrics);
        } else {
            this.context.closeFlyout(this.props.menu.flyoutId);
        }
        return false;
    }
    private onMouseLeave(e: GenericEvent) {
        this.setState({ isMouseOver: false });
    }
    private onMouseEnter(e: GenericEvent) {
        this.setState({ isMouseOver: true });
    }
    private onChildInvoked() {
        this.setState({ isMouseOver: false });
        this.context.closeFlyout(this.props.menu.flyoutId);
    }
    render(): JSX.Element {
        const { size, menu, vertical, isFlownOut } = this.props;
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
        const ttip = getTooltip(menu);
        return <div className={`noselect toolbar-flyout-btn ${selected ? "selected-item" : ""} ${this.state.isMouseOver ? "mouse-over" : ""}`} onMouseEnter={this.fnMouseEnter} onMouseLeave={this.fnMouseLeave} onClick={this.fnClick} style={style} title={ttip}>
            <div data-flyout-id={`flyout-${menu.flyoutId}`}>
                <Icon style={imgStyle} url={menu.icon} spriteClass={menu.iconClass} /> {label} <Icon style={imgStyle} spriteClass={isFlownOut ? SPRITE_ICON_MENUARROWUP : SPRITE_ICON_MENUARROW} />
            </div>
        </div>;
    }
}

interface IToolbarSeparatorProps {
    size: number;
    vertical?: boolean;
}

class ToolbarSeparator extends React.Component<IToolbarSeparatorProps, any> {
    constructor(props: IToolbarSeparatorProps) {
        super(props);
    }
    render(): JSX.Element {
        const style = getToolbarSeparatorItemStyle(this.props.size, this.props.vertical);
        if (this.props.vertical === true) {
            return <div className="noselect toolbar-separator-vertical" style={style} />;
        } else {
            return <div className="noselect toolbar-separator-horizontal" style={style}>{Constants.NBSP}</div>;
        }
    }
}

interface IToolbarButtonProps {
    height: number;
    item: IItem;
    vertical?: boolean;
    hideVerticalLabels?: boolean;
}

class ToolbarButton extends React.Component<IToolbarButtonProps, any> {
    fnMouseLeave: GenericEventHandler;
    fnMouseEnter: GenericEventHandler;
    fnClick: GenericEventHandler;
    constructor(props: IToolbarButtonProps) {
        super(props);
        this.fnMouseEnter = this.onMouseEnter.bind(this);
        this.fnMouseLeave = this.onMouseLeave.bind(this);
        this.fnClick = this.onClick.bind(this);
        this.state = {
            isMouseOver: false
        };
    }
    onMouseLeave(e: any) {
        this.setState({ isMouseOver: false });
    }
    onMouseEnter(e: any) {
        this.setState({ isMouseOver: true });
    }
    onClick(e: any) {
        e.preventDefault();
        const { item } = this.props;
        const enabled = getEnabled(item);
        if (enabled && item.invoke) {
            item.invoke();
        }
        return false;
    }
    render(): JSX.Element {
        const { height, item, vertical, hideVerticalLabels } = this.props;
        const selected = getSelected(item);
        const enabled = getEnabled(item);
        const imgStyle = getIconStyle(enabled, height);
        const style = getItemStyle(enabled, selected, height, this.state.isMouseOver, vertical);
        let ttip = null;
        if (typeof(item.tooltip) == 'function') {
            ttip = item.tooltip();
        } else {
            ttip = item.tooltip;
        }
        return <div className={`noselect toolbar-btn ${selected ? "selected-item" : ""} ${(this.state.isMouseOver && enabled) ? "mouse-over" : ""}`} onMouseEnter={this.fnMouseEnter} onMouseLeave={this.fnMouseLeave} style={style} title={ttip} onClick={this.fnClick}>
            <Icon style={imgStyle} url={item.icon} spriteClass={item.iconClass} /> {(vertical == true && hideVerticalLabels == true) ? null : item.label}
        </div>;
    }
}

export interface IItem {
    label?: string | (() => string);
    tooltip?: string | (() => string);
    icon?: string;
    iconClass?: string;
    invoke?: () => void;
    enabled?: boolean | (() => boolean);
    selected?: boolean | (() => boolean);
    isSeparator?: boolean;
}

export interface IInlineMenu extends IItem {
    childItems: IItem[];
    flyoutAlign?: string;
}

export interface IFlyoutMenu extends IItem {
    flyoutId: string;
    flyoutAlign?: string;
}

export interface IComponentFlyoutItem extends IItem {
    flyoutId: string;
    componentName: string;
    componentProps?: any;
}

export interface IContainerItem extends IItem {
    renderContainerContent: () => JSX.Element;
}

/**
 * Toolbar component props
 *
 * @export
 * @interface IToolbarProps
 */
export interface IToolbarProps {
    childItems: IItem[];
    containerClass?: string;
    containerStyle?: React.CSSProperties;
    vertical?: boolean;
    hideVerticalLabels?: boolean;
    onOpenFlyout?: (id: string, metrics: IDOMElementMetrics) => void;
    onCloseFlyout?: (id: string) => void;
    onOpenComponent?: (id: string, metrics: IDOMElementMetrics, name: string, props?: any) => void;
    onCloseComponent?: (id: string) => void;
    flyoutStates?: FlyoutVisibilitySet;
}

/**
 * A generic toolbar component
 *
 * @export
 * @class Toolbar
 * @extends {React.Component<IToolbarProps, any>}
 */
export class Toolbar extends React.Component<IToolbarProps, any> {
    static childContextTypes = TOOLBAR_CONTEXT_VALIDATION_MAP;
    constructor(props: IToolbarProps) {
        super(props);
    }
    getChildContext(): IToolbarContext {
        return {
            openFlyout: this.openFlyout.bind(this),
            closeFlyout: this.closeFlyout.bind(this),
            openComponent: this.openComponent.bind(this),
            closeComponent: this.closeComponent.bind(this)
        }
    }
    private openFlyout(id: string, metrics: IDOMElementMetrics): void {
        if (this.props.onOpenFlyout) {
            this.props.onOpenFlyout(id, metrics);
        }
    }
    private closeFlyout(id: string): void {
        if (this.props.onCloseFlyout) {
            this.props.onCloseFlyout(id);
        }
    }
    private openComponent(id: string, metrics: IDOMElementMetrics, name: string, props?: any): void {
        if (this.props.onOpenComponent) {
            this.props.onOpenComponent(id, metrics, name, props);
        }
    }
    private closeComponent(id: string): void {
        if (this.props.onCloseComponent) {
            this.props.onCloseComponent(id);
        }
    }
    render(): JSX.Element {
        const { containerStyle, containerClass, childItems, vertical, hideVerticalLabels, flyoutStates } = this.props;
        const height = containerStyle != null
            ? (containerStyle.height || DEFAULT_TOOLBAR_SIZE)
            : DEFAULT_TOOLBAR_SIZE;
        return <div style={containerStyle} className={`has-flyout noselect ${containerClass}`}>
            {childItems.map((item, index) => {
                if (isComponentFlyout(item)) {
                    const isFlownOut = flyoutStates && !!flyoutStates[item.flyoutId];
                    return <ComponentFlyoutItem key={index} size={height} item={item} vertical={vertical} isFlownOut={isFlownOut} />;
                } else if (isMenuRef(item)) {
                    const isFlownOut = flyoutStates && !!flyoutStates[item.flyoutId];
                    return <FlyoutMenuReferenceItem key={index} size={height} menu={item} vertical={vertical} isFlownOut={isFlownOut} />;
                } else if (item.isSeparator === true) {
                    return <ToolbarSeparator key={index} size={height} vertical={vertical} />;
                } else {
                    return <ToolbarButton key={index} height={height} item={item} vertical={vertical} hideVerticalLabels={hideVerticalLabels} />;
                }
            })}
        </div>;
    }
}