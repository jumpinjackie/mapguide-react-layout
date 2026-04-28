import { Toaster, Position } from "@blueprintjs/core";
import type { ToasterPosition } from "@blueprintjs/core";
import React from "react";
import type { IToasterRef, ToasterProps, ToastPosition } from "../../element-context";
import { iconName, variantToIntent } from "./utils";

function toastPositionToBp(position: ToastPosition | undefined): ToasterPosition {
    switch (position) {
        case "top-left": return Position.TOP_LEFT as ToasterPosition;
        case "top-right": return Position.TOP_RIGHT as ToasterPosition;
        case "bottom": return Position.BOTTOM as ToasterPosition;
        case "bottom-left": return Position.BOTTOM_LEFT as ToasterPosition;
        case "bottom-right": return Position.BOTTOM_RIGHT as ToasterPosition;
        case "top":
        default:
            return Position.TOP as ToasterPosition;
    }
}

/**
 * @hidden
 */
export const BpToaster = React.forwardRef<IToasterRef, ToasterProps>((props, ref) => {
    const bpToasterRef = React.useRef<Toaster>(null);

    React.useImperativeHandle(ref, () => ({
        show(message) {
            return bpToasterRef.current?.show({
                icon: iconName(message.icon),
                message: message.message,
                intent: variantToIntent(message.variant)
            });
        },
        dismiss(key) {
            bpToasterRef.current?.dismiss(key);
        }
    }));

    return <Toaster
        ref={bpToasterRef}
        usePortal={props.usePortal}
        position={toastPositionToBp(props.position)}
    />;
});

BpToaster.displayName = "BpToaster";
