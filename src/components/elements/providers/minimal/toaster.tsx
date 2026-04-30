// Minimal provider – Toaster component
import React from "react";
import toast, { Toaster as HotToaster } from "react-hot-toast";
import type { IToasterRef, ToasterProps, ToastPosition, ElementVariant } from "../../element-context";
import { MnIcon } from "./icon";
import "./toaster.css";

function mapPosition(position: ToastPosition | undefined): "top-center" | "top-left" | "top-right" | "bottom-center" | "bottom-left" | "bottom-right" {
   switch (position) {
      case "top-left":    return "top-left";
      case "top-right":   return "top-right";
      case "bottom":      return "bottom-center";
      case "bottom-left": return "bottom-left";
      case "bottom-right": return "bottom-right";
      case "top":
      default:            return "top-center";
   }
}

/**
 * @hidden
 * @since 0.15
 */
export const MnToaster = React.forwardRef<IToasterRef, ToasterProps>((props, ref) => {
   React.useImperativeHandle(ref, () => ({
      show(message) {
         const variant: ElementVariant | undefined = message.variant;
         const classes = [
            "mrl-toast",
            variant ? `mrl-toast--${variant}` : null,
         ].filter(Boolean).join(" ");

         return toast.custom(
            <div className={classes} role="status" aria-live="polite">
               {message.icon && (
                  <span className="mrl-toast-icon" aria-hidden="true">
                     <MnIcon icon={message.icon} iconSize={16} />
                  </span>
               )}
               <div className="mrl-toast-message">{message.message}</div>
            </div>
         );
      },
      dismiss(key) {
         toast.dismiss(key);
      },
   }));
   return <HotToaster position={mapPosition(props.position)} />;
});

MnToaster.displayName = "MnToaster";
