// Minimal provider – Drawer component
import React from "react";
import ReactDOM from "react-dom";
import { X } from "lucide-react";
import type { DrawerProps } from "../../element-context";
import "./drawer.css";

/**
 * @hidden
 * @since 0.15
 */
export const MnDrawer: React.FC<React.PropsWithChildren<DrawerProps>> = ({ title, isOpen, position = "right", onClose, children }) => {
   if (typeof document === "undefined") {
      return null;
   }
   const posClass = `mrl-drawer--${position}`;
   const openClass = isOpen ? " mrl-drawer--open" : "";
   return ReactDOM.createPortal(
      <>
         {isOpen && (
            <div className="mrl-drawer-backdrop" onClick={onClose as React.MouseEventHandler<HTMLDivElement>} />
         )}
         <div className={`mrl-drawer ${posClass}${openClass}`} role="dialog" aria-modal="true">
            <div className="mrl-drawer-header">
               <span className="mrl-drawer-title">{title}</span>
               <button className="mrl-drawer-close mrl-btn mrl-btn--minimal" onClick={onClose as React.MouseEventHandler<HTMLButtonElement>} aria-label="Close"><X size={14} /></button>
            </div>
            <div className="mrl-drawer-body">{children}</div>
         </div>
      </>,
      document.body
   );
};
