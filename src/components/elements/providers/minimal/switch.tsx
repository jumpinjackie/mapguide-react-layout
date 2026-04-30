// Minimal provider – Switch component
import React from "react";
import type { SwitchProps } from "../../element-context";
import "./switch.css";

/**
 * @hidden
 * @since 0.15
 */
export const MnSwitch: React.FC<SwitchProps> = ({ style, disabled, checked, label, labelElement, onChange }) => {
   return (
      <label className="mrl-switch" style={style}>
         <input
            type="checkbox"
            checked={checked}
            disabled={disabled}
            onChange={onChange}
         />
         <span className="mrl-switch-track">
            <span className="mrl-switch-thumb" />
         </span>
         {labelElement ?? label}
      </label>
   );
};
