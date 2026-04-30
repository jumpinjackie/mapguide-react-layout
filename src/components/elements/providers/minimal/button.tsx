// Minimal provider – Button component
import React from "react";
import type { ButtonProps } from "../../element-context";
import { MnIcon } from "./icon";
import "./button.css";

/**
 * @hidden
 * @since 0.15
 */
export const MnButton: React.FC<React.PropsWithChildren<ButtonProps>> = ({
   type = "button",
   icon,
   variant,
   minimal,
   active,
   loading,
   disabled,
   onClick,
   title,
   style,
   className,
   children,
}) => {
   const classes = [
      "mrl-btn",
      variant ? `mrl-btn--${variant}` : null,
      minimal ? "mrl-btn--minimal" : null,
      active ? "mrl-btn--active" : null,
      loading ? "mrl-btn--loading" : null,
      className ?? null,
   ].filter(Boolean).join(" ");

   return (
      <button
         type={type}
         className={classes}
         disabled={disabled || loading}
         onClick={onClick}
         title={title}
         style={style}
      >
         {loading && <span className="mrl-btn-spinner" aria-hidden="true" />}
         {icon && <MnIcon icon={icon} iconSize={16} />}
         <span className="mrl-btn-text">{children}</span>
      </button>
   );
};
