// Minimal provider – Card component
import React from "react";
import type { CardProps } from "../../element-context";
import "./card.css";

/**
 * @hidden
 * @since 0.15
 */
export const MnCard: React.FC<React.PropsWithChildren<CardProps>> = ({ style, children }) => {
   return (
      <div className="mrl-card" style={style}>
         {children}
      </div>
   );
};
