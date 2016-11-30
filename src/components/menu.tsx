import * as React from "react";
import { isMenu, isMenuRef } from "../utils/type-guards";
import { Menu, MenuItem, MenuDivider } from "@blueprintjs/core";
import { IItem, IInlineMenu, IFlyoutMenu, getIconStyle, getIcon, getEnabled } from "./toolbar";

const MENU_ITEM_HEIGHT = 30;

export interface IMenuComponentProps {
    items: IItem[];
    onInvoked?: () => void;
}

export class MenuComponent extends React.Component<IMenuComponentProps, any> {
    constructor(props: IMenuComponentProps) {
        super(props);
    }
    private onClick(item: any, e: GenericEvent) {
        const { onInvoked } = this.props;
        if (getEnabled(item)) {
            item.invoke();
            if (onInvoked != null) {
                onInvoked();
            }
        }
    }
    render(): JSX.Element {
        return <Menu className="pt-elevation-1">
            {this.props.items.map((item, index) => {
                if (item.isSeparator) {
                    return <MenuDivider key={index} />;
                } else if (isMenu(item)) {
                    const text = item.label || "";
                    return <MenuItem key={index} text={text}>
                        <MenuComponent items={item.childItems} />
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
                        <a className="pt-menu-item" onClick={invoke}><img style={imgStyle} src={getIcon(item.icon)} /> {text}</a>
                    </li>;
                }
            })}
        </Menu>;
    }
}