// Minimal provider – Icon component
import React from "react";
import type { IconProps } from "../../element-context";
import { getIconComponent } from "./icon-map";

/**
 * @hidden
 * @since 0.15
 */
export const MnIcon: React.FC<IconProps> = ({ icon, style, iconSize }) => {
   if (!icon) {
      return null;
   }
   const LucideIcon = getIconComponent(icon);
   if (!LucideIcon) {
      return null;
   }
   return <LucideIcon size={iconSize ?? 16} style={style} />;
};
