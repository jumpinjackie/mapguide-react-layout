import { Dialog } from "@blueprintjs/core";
import React from "react";
import type { DialogBodyProps, DialogContainerProps, DialogFooterActionsProps, DialogFooterProps, DialogHeaderProps, DialogProps, DialogShellProps } from "../../element-context";
import { iconName } from "./utils";

/**
 * @hidden
 */
export const BpDialog: React.FC<React.PropsWithChildren<DialogProps>> = ({ icon, isOpen, usePortal, onClose, title, children }) => {
    return <Dialog
        icon={iconName(icon)}
        isOpen={isOpen}
        usePortal={usePortal}
        onClose={onClose}
        title={title}>
        {children}
    </Dialog>;
};

BpDialog.displayName = "BpDialog";

/**
 * @hidden
 */
export const BpDialogContainer: React.FC<React.PropsWithChildren<DialogContainerProps>> = ({ className, style, children }) => {
    const cls = ["bp3-dialog-container", className].filter(Boolean).join(" ");
    return <div className={cls} style={style}>{children}</div>;
};

BpDialogContainer.displayName = "BpDialogContainer";

/**
 * @hidden
 */
export const BpDialogShell: React.FC<React.PropsWithChildren<DialogShellProps>> = ({ style, className, children }) => {
    const cls = ["bp3-dialog", className].filter(Boolean).join(" ");
    const combinedStyle: React.CSSProperties = {
        // Neutralize Blueprint's default padding-bottom that would otherwise shrink the
        // available flex layout area for the dialog body when an explicit height is set.
        paddingBottom: 0,
        // Clip any content that exceeds the dialog shell bounds.
        overflow: "hidden",
        ...style,
    };
    return <div className={cls} style={combinedStyle}>{children}</div>;
};

BpDialogShell.displayName = "BpDialogShell";

/**
 * @hidden
 */
export const BpDialogHeader: React.FC<React.PropsWithChildren<DialogHeaderProps>> = ({ className, children }) => {
    const cls = ["bp3-dialog-header", className].filter(Boolean).join(" ");
    return <div className={cls}>{children}</div>;
};

BpDialogHeader.displayName = "BpDialogHeader";

/**
 * @hidden
 */
export const BpDialogBody: React.FC<React.PropsWithChildren<DialogBodyProps>> = ({ style, className, children }) => {
    const cls = ["bp3-dialog-body", className].filter(Boolean).join(" ");
    return <div className={cls} style={style}>{children}</div>;
};

BpDialogBody.displayName = "BpDialogBody";

/**
 * @hidden
 */
export const BpDialogFooter: React.FC<React.PropsWithChildren<DialogFooterProps>> = ({ style, className, children }) => {
    const cls = ["bp3-dialog-footer", className].filter(Boolean).join(" ");
    return <div className={cls} style={style}>{children}</div>;
};

BpDialogFooter.displayName = "BpDialogFooter";

/**
 * @hidden
 */
export const BpDialogFooterActions: React.FC<React.PropsWithChildren<DialogFooterActionsProps>> = ({ style, className, children }) => {
    const cls = ["bp3-dialog-footer-actions", className].filter(Boolean).join(" ");
    return <div className={cls} style={style}>{children}</div>;
};

BpDialogFooterActions.displayName = "BpDialogFooterActions";
