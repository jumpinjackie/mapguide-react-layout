// Minimal provider – NonIdealState component
import React from "react";
import type { NonIdealStateProps } from "../../element-context";
import { MnIcon } from "./icon";
import "./non-ideal-state.css";

/**
 * @hidden
 * @since 0.15
 */
export const MnNonIdealState: React.FC<NonIdealStateProps> = ({ icon, title, description, action }) => {
   return (
      <div className="mrl-non-ideal-state">
         {icon && (
            <div className="mrl-non-ideal-state-icon">
               {typeof icon === "string" ? <MnIcon icon={icon} iconSize={40} /> : icon}
            </div>
         )}
         {title && (
            <h4 className="mrl-non-ideal-state-title">{title}</h4>
         )}
         {description && (
            <p className="mrl-non-ideal-state-description">{description}</p>
         )}
         {action && (
            <div className="mrl-non-ideal-state-action">{action}</div>
         )}
      </div>
   );
};
