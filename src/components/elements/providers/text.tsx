import React from "react"
import { TextProps } from "../element-context"

export const BpText: React.FC<TextProps> = ({ component, className, style, children }) => {
    const cmp = component || "span";
    switch (cmp) {
        case "p":
            return <p className={`mrl-text ${className ?? ''}`} style={style}>{children}</p>;
        case "div":
            return <div className={`mrl-text ${className ?? ''}`} style={style}>{children}</div>;
        default:
            return <span className={`mrl-text ${className ?? ''}`} style={style}>{children}</span>;
    }
}