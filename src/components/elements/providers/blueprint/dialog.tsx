import { Dialog } from "@blueprintjs/core";
import React from "react";
import type { DialogProps } from "../../element-context";
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
