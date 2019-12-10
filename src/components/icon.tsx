import * as React from "react";
import { getAssetPath } from "../utils/asset";
import { STD_CSS_SPRITE_RELPATH, ICON_ERROR } from "../constants/assets";
import { GenericEventHandler } from "../api/common";

export interface IIconProps {
    style?: React.CSSProperties;
    onClick?: GenericEventHandler;
    otherProps?: any;
    baseSize: number;
    children: (baseSize: number) => React.ReactElement;
}

export const Icon = (props: IIconProps) => {
    const spStyle = { ...(props.style || {}) };
    if (!spStyle.display) {
        spStyle.display = "inline-block";
    }
    return <div style={spStyle} onClick={props.onClick} {...props.otherProps}>
        {props.children(props.baseSize)}
    </div>;
};

export interface IImageIconProps {
    /**
     * The icon path relative to the standard asset path
     *
     * @type {string}
     * @memberof IIconProps
     */
    url?: string;
    spriteClass?: string;
    style?: React.CSSProperties;
    onClick?: GenericEventHandler;
    otherProps?: any;
}

/**
 * An image icon component
 * @param props
 */
export const ImageIcon = (props: IImageIconProps) => {
    if (!props.url && !props.spriteClass) {
        return <noscript />;
    }
    let url;
    let spriteClass = props.spriteClass;
    if (props.url && props.url != STD_CSS_SPRITE_RELPATH) {
        url = getAssetPath(props.url);
        spriteClass = undefined;
    }
    if (spriteClass) {
        const spStyle = { ...(props.style || {}) };
        if (!spStyle.display) {
            spStyle.display = "inline-block";
        }
        return <div style={spStyle} onClick={props.onClick} className={`icon ${spriteClass}`} {...props.otherProps} />;
    }
    return <img className="icon" style={props.style} src={url} onClick={props.onClick} {...props.otherProps} onError={e => e.currentTarget.src = ICON_ERROR} />;
};