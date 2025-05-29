import * as React from "react";
import { isMenu } from "../../../../utils/type-guards";
import { IItem, getIconStyle, getEnabled } from "../../../toolbar";
import { ImageIcon } from "../../../icon";
import { Menu, MenuDivider, MenuItem } from '@blueprintjs/core';
import { MenuComponentProps } from "../../element-context";

const MENU_ITEM_HEIGHT = 30;

/**
 * A generic menu component
 * @param props 
 */
export const BpMenuComponent: React.FC<MenuComponentProps> = (props) => {
    const onClick = (item: IItem) => {
        if (getEnabled(item)) {
            item?.invoke?.();
            props.onInvoked?.();
        }
    }
    return <Menu className="bp3-elevation-1">
        {props.items.map((item, index) => {
            if (item.isSeparator) {
                return <MenuDivider key={index} />;
            } else if (isMenu(item)) {
                let text = "";
                if (typeof (item.label) == 'function') {
                    text = item.label();
                } else {
                    text = item.label || "";
                }
                return <MenuItem key={index} text={text} icon="menu-open">
                    <BpMenuComponent items={item.childItems} onInvoked={props.onInvoked} />
                </MenuItem>;
            } else {
                const height = MENU_ITEM_HEIGHT;
                let enabled = true;
                if (item.enabled != null) {
                    if (typeof (item.enabled) == 'function') {
                        enabled = item.enabled();
                    } else {
                        enabled = item.enabled;
                    }
                }
                const imgStyle = {
                    marginRight: 5,
                    ...getIconStyle(enabled, height)
                };
                const text = item.label || "";
                //NOTE: Not using MenuItem here as we want fine control over the item content
                return <li key={index}>
                    <a className="bp3-menu-item" onClick={() => onClick(item)}><ImageIcon style={imgStyle} url={item.icon} spriteClass={item.iconClass} /> {text}</a>
                </li>;
            }
        })}
    </Menu>;
}