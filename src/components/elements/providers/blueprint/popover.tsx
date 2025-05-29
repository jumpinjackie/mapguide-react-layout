import { Popover } from "@blueprintjs/core";
import { PopoverProps } from "../../element-context";
import React from "react";

/**
 * @hidden
 */
export const BpPopover: React.FC<PopoverProps> = ({ usePortal, position, minimal, children }) => {
    return <Popover usePortal={usePortal} position={position} minimal={minimal}>
        {children}
    </Popover>
}