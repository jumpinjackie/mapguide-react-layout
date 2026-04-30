// Minimal provider – Dialog and dialog sub-components
import React from "react";
import ReactDOM from "react-dom";
import { X } from "lucide-react";
import { MnIcon } from "./icon";
import type {
   DialogProps,
   DialogContainerProps,
   DialogShellProps,
   DialogHeaderProps,
   DialogBodyProps,
   DialogFooterProps,
   DialogFooterActionsProps,
} from "../../element-context";
import "./dialog.css";

/**
 * @hidden
 * @since 0.15
 */
export const MnDialog: React.FC<React.PropsWithChildren<DialogProps>> = ({ icon, isOpen, title, onClose, children }) => {
   if (typeof document === "undefined" || !isOpen) {
      return null;
   }

   return ReactDOM.createPortal(
      <div className="mrl-dialog-backdrop" onClick={(e) => { if (e.target === e.currentTarget) { onClose?.(); } }}>
         <div className="mrl-dialog-shell" role="dialog" aria-modal="true">
            {title && (
               <div className="mrl-dialog-header">
                  <h5>
                     {icon && (
                        <span className="mrl-dialog-icon" aria-hidden="true">
                           <MnIcon icon={icon} iconSize={18} />
                        </span>
                     )}
                     <span>{title}</span>
                  </h5>
                  <button className="mrl-dialog-close mrl-btn mrl-btn--minimal" onClick={onClose} aria-label="Close"><X size={14} /></button>
               </div>
            )}
            {children}
         </div>
      </div>,
      document.body
   );
};

/**
 * @hidden
 * @since 0.15
 */
export const MnDialogContainer: React.FC<React.PropsWithChildren<DialogContainerProps>> = ({ style, className, children }) => {
   const cls = ["mrl-dialog-container", className].filter(Boolean).join(" ");
   return <div className={cls} style={style}>{children}</div>;
};

/**
 * @hidden
 * @since 0.15
 */
export const MnDialogShell: React.FC<React.PropsWithChildren<DialogShellProps>> = ({ style, className, children }) => {
   const cls = ["mrl-dialog-shell", className].filter(Boolean).join(" ");
   return <div className={cls} style={style} role="dialog" aria-modal="true">{children}</div>;
};

/**
 * @hidden
 * @since 0.15
 */
export const MnDialogHeader: React.FC<React.PropsWithChildren<DialogHeaderProps>> = ({ className, children }) => {
   const cls = ["mrl-dialog-header", className].filter(Boolean).join(" ");
   return <div className={cls}>{children}</div>;
};

/**
 * @hidden
 * @since 0.15
 */
export const MnDialogBody: React.FC<React.PropsWithChildren<DialogBodyProps>> = ({ style, className, children }) => {
   const cls = ["mrl-dialog-body", className].filter(Boolean).join(" ");
   return <div className={cls} style={style}>{children}</div>;
};

/**
 * @hidden
 * @since 0.15
 */
export const MnDialogFooter: React.FC<React.PropsWithChildren<DialogFooterProps>> = ({ style, className, children }) => {
   const cls = ["mrl-dialog-footer", className].filter(Boolean).join(" ");
   return <div className={cls} style={style}>{children}</div>;
};

/**
 * @hidden
 * @since 0.15
 */
export const MnDialogFooterActions: React.FC<React.PropsWithChildren<DialogFooterActionsProps>> = ({ style, className, children }) => {
   const cls = ["mrl-dialog-footer-actions", className].filter(Boolean).join(" ");
   return <div className={cls} style={style}>{children}</div>;
};
