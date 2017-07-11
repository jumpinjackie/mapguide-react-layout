import * as React from "react";
import { getAssetPath } from "../utils/asset";

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
}

/**
 * An image icon component
 * @param props
 */
export const Icon = (props: IIconProps) => {
    return <img style={props.style} src={getAssetPath(props.url)} className={props.spriteClass} onClick={props.onClick} />;
};