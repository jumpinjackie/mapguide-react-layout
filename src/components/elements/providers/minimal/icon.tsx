// Minimal provider – Icon component
import React from "react";
import type { IconProps } from "../../element-context";
import { getSvgIconName } from "./icon-map";
import { SvgIcon } from "./svg-icons";

/**
 * @hidden
 * @since 0.15
 */
export const MnIcon: React.FC<IconProps> = ({ icon, style, iconSize }) => {
   if (!icon) {
      return null;
   }
   const svgName = getSvgIconName(icon);
   if (!svgName) {
      return null;
   }
   return <SvgIcon name={svgName} size={iconSize ?? 16} style={style} />;
};
