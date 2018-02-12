import * as React from "react";
import { isMenu, isMenuRef } from "../utils/type-guards";
import { Menu, MenuItem, MenuDivider } from "@blueprintjs/core";
import { IItem, IInlineMenu, IFlyoutMenu, getIconStyle, getEnabled } from "./toolbar";
import { Icon } from "./icon";
import { GenericEvent } from "../api/common";
import { safePropAccess } from '../utils/safe-prop';

const MENU_ITEM_HEIGHT = 30;

/**
 * MenuComponent props
 *
 * @export
 * @interface IMenuComponentProps
 */
export interface IMenuComponentProps {
    items: IItem[];
    onInvoked?: () => void;
}

/**
 * A generic menu component
 *
 * @export
 * @class MenuComponent
 * @extends {React.Component<IMenuComponentProps, any>}
 */
export class MenuComponent extends React.Component<IMenuComponentProps, any> {
    constructor(props: IMenuComponentProps) {
        super(props);
    }
    private onClick(item: IItem, e: GenericEvent) {
        if (getEnabled(item)) {
            safePropAccess(item, "invoke", func => func!());
            safePropAccess(this.props, "onInvoked", func => func!());
        }
    }
    render(): JSX.Element {
        return <Menu className="pt-elevation-1">
            {this.props.items.map((item, index) => {
                if (item.isSeparator) {
                    return <MenuDivider key={index} />;
                } else if (isMenu(item)) {
                    let text = "";
                    if (typeof(item.label) == 'function') {
                        text = item.label();
                    } else {
                        text = item.label || "";
                    }
                    return <MenuItem key={index} text={text} iconName="pt-icon-menu-open">
                        <MenuComponent items={item.childItems} onInvoked={this.props.onInvoked} />
                    </MenuItem>;
                } else {
                    const height = MENU_ITEM_HEIGHT;
                    const invoke = this.onClick.bind(this, item);
                    let enabled = true;
                    if (item.enabled != null) {
                        if (typeof(item.enabled) == 'function') {
                            enabled = item.enabled();
                        } else {
                            enabled = item.enabled;
                        }
                    }
                    const imgStyle = getIconStyle(enabled, height);
                    const text = item.label || "";
                    //NOTE: Not using MenuItem here as we want fine control over the item content
                    return <li key={index}>
                        <a className="pt-menu-item" onClick={invoke}><Icon style={imgStyle} url={item.icon} spriteClass={item.iconClass} /> {text}</a>
                    </li>;
                }
            })}
        </Menu>;
    }
}