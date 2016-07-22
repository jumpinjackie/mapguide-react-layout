import * as React from "react";
import { isMenu } from "../utils/type-guards";

export const DEFAULT_TOOLBAR_HEIGHT = 32;
const TOOLBAR_STYLE = {
    backgroundColor: "#f0f0f0",
    border: "1px solid rgb(240, 240, 240)"
};
const TOOLBAR_ITEM_STYLE = {
    display: "inline-block",
    border: "1px solid #f0f0f0"
};
const TOOLBAR_ITEM_STYLE_HOVERED = {
    display: "inline-block",
    border: "1px solid rgb(153, 181, 202)"
};

function getIcon(relPath: string): string {
    return `stdicons/${relPath}`;
}

interface IFlyoutMenuItemProps {
    height: number;
    menu: IMenu;
}

class FlyoutMenuItem extends React.Component<IFlyoutMenuItemProps, any> {
    fnMouseLeave: (e) => void;
    fnMouseEnter: (e) => void;
    constructor(props) {
        super(props);
        this.fnMouseEnter = this.onMouseEnter.bind(this);
        this.fnMouseLeave = this.onMouseLeave.bind(this);
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
    render(): JSX.Element {
        const { height, menu } = this.props;
        const enabled = menu.enabled != null ? menu.enabled() : true;
        const imgStyle: React.CSSProperties = {
            verticalAlign: "middle",
            lineHeight: height
        };
        const style: React.CSSProperties = {
            display: "inline-block",
            height: height,
            padding: ((height - 16) / 2)
        };
        if (enabled && this.state.isMouseOver === true) {
            style.cursor = "pointer";
            style.border = "1px solid rgb(153, 181, 202)";
            style.padding = ((height - 16) / 2) - 1; //To compensate for border
        } else if (!enabled) {
            imgStyle.opacity = 0.4;
        }
        return <div style={style} title={menu.tooltip}>
            <img style={imgStyle} src={getIcon(menu.icon || "ui-menu.png")} /> {menu.label}
        </div>;
    }
}

interface IToolbarButtonProps {
    height: number;
    item: IItem;
}

class ToolbarButton extends React.Component<IToolbarButtonProps, any> {
    fnMouseLeave: (e) => void;
    fnMouseEnter: (e) => void;
    constructor(props) {
        super(props);
        this.fnMouseEnter = this.onMouseEnter.bind(this);
        this.fnMouseLeave = this.onMouseLeave.bind(this);
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
    render(): JSX.Element {
        const { height, item } = this.props;
        const enabled = item.enabled != null ? item.enabled() : true;
        const imgStyle: React.CSSProperties = {
            verticalAlign: "middle",
            lineHeight: height 
        };
        const style: React.CSSProperties = {
            display: "inline-block",
            height: height,
            padding: ((height - 16) / 2)
        };
        if (enabled && this.state.isMouseOver === true) {
            style.cursor = "pointer";
            style.border = "1px solid rgb(153, 181, 202)";
            style.padding = ((height - 16) / 2) - 1; //To compensate for border
        } else if (!enabled) {
            imgStyle.opacity = 0.4;
        }
        const handler = enabled ? item.invoke : null;
        return <div onMouseEnter={this.fnMouseEnter} onMouseLeave={this.fnMouseLeave} style={style} title={item.tooltip} onClick={handler}>
            <img style={imgStyle} src={getIcon(item.icon)} />
        </div>;
    }
}

export interface IItem {
    label?: string;
    tooltip?: string;
    icon?: string;
    invoke?: (e) => void;
    enabled?: () => boolean;
}

export interface IMenu extends IItem {
    childItems: IItem[];
}

export interface IToolbarProps {
    childItems: IItem[];
    containerStyle?: React.CSSProperties;
}

export class Toolbar extends React.Component<IToolbarProps, any> {
    constructor(props) {
        super(props);
    }
    render(): JSX.Element {
        const { containerStyle, childItems } = this.props;
        const height = containerStyle != null 
            ? (containerStyle.height || DEFAULT_TOOLBAR_HEIGHT)
            : DEFAULT_TOOLBAR_HEIGHT; 
        return <div style={containerStyle}>
            {childItems.map((item, index) => {
                if (isMenu(item)) {
                    return <FlyoutMenuItem key={index} height={height} menu={item} />;
                } else {
                    return <ToolbarButton key={index} height={height} item={item} />;
                }
            })}
        </div>;
    }
}