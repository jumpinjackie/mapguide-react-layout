// Minimal provider – Collapsible component
import React from "react";
import type { CollapsibleProps } from "../../element-context";

/**
 * @hidden
 * @since 0.15
 */
export const MnCollapsible: React.FC<React.PropsWithChildren<CollapsibleProps>> = ({ isOpen, children }) => {
   const style: React.CSSProperties = {
      maxHeight: isOpen ? "9999px" : 0,
      overflow: isOpen ? "visible" : "hidden",
      transition: "max-height var(--mrl-transition-speed, 150ms) ease-in-out",
   };
   return <div style={style}>{children}</div>;
};
