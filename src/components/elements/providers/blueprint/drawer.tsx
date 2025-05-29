import { Drawer, DrawerSize } from "@blueprintjs/core"
import { DrawerProps } from "../../element-context"
import React from "react"
import { iconName } from "./utils"

/**
 * @hidden
 */
export const BpDrawer: React.FC<DrawerProps> = ({ icon, onClose, title, position, isOpen, children }) => {
    return <Drawer usePortal={false}
        icon={iconName(icon)}
        size={DrawerSize.SMALL}
        canOutsideClickClose={true}
        onClose={onClose}
        title={title}
        position={position}
        isOpen={isOpen}>
        {children}
    </Drawer>
}