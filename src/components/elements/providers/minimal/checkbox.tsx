// Minimal provider – Checkbox component
import React from "react";
import type { CheckboxProps } from "../../element-context";
import "./checkbox.css";

/**
 * @hidden
 * @since 0.15
 */
export const MnCheckbox: React.FC<CheckboxProps> = ({ checked, label, onChange, disabled, id, name }) => {
   return (
      <label className="mrl-checkbox">
         <input
            type="checkbox"
            id={id}
            name={name}
            checked={checked}
            disabled={disabled}
            onChange={onChange}
         />
         {label}
      </label>
   );
};
