// Minimal provider – Callout component
import React from "react";
import type { CalloutProps } from "../../element-context";
import "./callout.css";

/**
 * @hidden
 * @since 0.15
 */
export const MnCallout: React.FC<React.PropsWithChildren<CalloutProps>> = ({ variant, title, children }) => {
   const cls = ["mrl-callout", variant ? `mrl-callout--${variant}` : null].filter(Boolean).join(" ");

   return (
      <div className={cls}>
         {title && <p className="mrl-callout-title">{title}</p>}
         {children}
      </div>
   );
};
