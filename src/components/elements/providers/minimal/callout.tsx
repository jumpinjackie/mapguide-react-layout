// Minimal provider – Callout component
import React from "react";
import type { CalloutProps } from "../../element-context";
import { MnIcon } from "./icon";
import "./callout.css";

const DEFAULT_ICON_BY_VARIANT: Record<NonNullable<CalloutProps["variant"]>, string> = {
   primary: "info-sign",
   warning: "warning-sign",
   success: "tick",
   danger: "error",
};

/**
 * @hidden
 * @since 0.15
 */
export const MnCallout: React.FC<React.PropsWithChildren<CalloutProps>> = ({ variant, title, icon, children }) => {
   const cls = ["mrl-callout", variant ? `mrl-callout--${variant}` : null].filter(Boolean).join(" ");
   const resolvedIcon = icon ?? (variant ? DEFAULT_ICON_BY_VARIANT[variant] : undefined);

   return (
      <div className={cls}>
         {resolvedIcon ? (
            <div className="mrl-callout-content">
               <span className="mrl-callout-icon" aria-hidden="true">
                  <MnIcon icon={resolvedIcon} iconSize={20} />
               </span>
               <div className="mrl-callout-body">
                  {title && <p className="mrl-callout-title">{title}</p>}
                  {children}
               </div>
            </div>
         ) : (
            <>
               {title && <p className="mrl-callout-title">{title}</p>}
               {children}
            </>
         )}
      </div>
   );
};
