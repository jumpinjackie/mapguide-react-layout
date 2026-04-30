// Minimal provider – Text component
import React from "react";
import type { TextProps } from "../../element-context";

/**
 * @hidden
 * @since 0.15
 */
export const MnText: React.FC<React.PropsWithChildren<TextProps>> = ({ component, className, style, children }) => {
   const cls = ["mrl-text", className].filter(Boolean).join(" ");
   const cmp = component ?? "span";
   switch (cmp) {
      case "p":
         return <p className={cls} style={style}>{children}</p>;
      case "div":
         return <div className={cls} style={style}>{children}</div>;
      default:
         return <span className={cls} style={style}>{children}</span>;
   }
};
