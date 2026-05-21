// Minimal provider – Popover component
import React from "react";
import { Popover as TinyPopover } from "react-tiny-popover";
import type { PopoverProps } from "../../element-context";

function mapPosition(position: string): "left" | "right" | "top" | "bottom" {
   switch (position) {
      case "left":   return "left";
      case "right":  return "right";
      case "top":    return "top";
      case "bottom": return "bottom";
      default:       return "right";
   }
}

/**
 * @hidden
 * @since 0.15
 */
export const MnPopover: React.FC<React.PropsWithChildren<PopoverProps>> = ({ position, children }) => {
   const [isOpen, setIsOpen] = React.useState(false);
   const childArray = React.Children.toArray(children);
   const trigger = childArray[0];
   const content = childArray[1];

   if (!trigger) {
      return null;
   }

   return (
      <TinyPopover
         isOpen={isOpen}
         positions={[mapPosition(position)]}
         content={<>{content}</>}
         containerStyle={{ zIndex: "1002" }}
         onClickOutside={() => setIsOpen(false)}
      >
         <span onClick={() => setIsOpen(prev => !prev)}>
            {trigger}
         </span>
      </TinyPopover>
   );
};
