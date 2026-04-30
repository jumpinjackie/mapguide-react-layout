// Minimal provider – Toaster component
import React from "react";
import toast, { Toaster as HotToaster } from "react-hot-toast";
import type { IToasterRef, ToasterProps, ToastPosition, ElementVariant } from "../../element-context";

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
         const text = message.message as string;
         const variant: ElementVariant | undefined = message.variant;
         if (variant === "danger") {
            return toast.error(text);
         } else if (variant === "success") {
            return toast.success(text);
         } else {
            return toast(text);
         }
      },
      dismiss(key) {
         toast.dismiss(key);
      },
   }));
   return <HotToaster position={mapPosition(props.position)} />;
});

MnToaster.displayName = "MnToaster";
