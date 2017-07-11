import * as React from "react";
import { NBSP } from "../constants";
import { getAssetPath, STD_CSS_SPRITE_RELPATH } from "../utils/asset";

export interface IIconProps {
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
export const Icon = (props: IIconProps) => {
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
        return <div style={spStyle} onClick={props.onClick} className={spriteClass} {...props.otherProps} />;
    }
    return <img style={props.style} src={url} onClick={props.onClick} {...props.otherProps} />;
};