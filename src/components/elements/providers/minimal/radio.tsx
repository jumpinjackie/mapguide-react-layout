// Minimal provider – Radio component
import React from "react";
import type { RadioProps } from "../../element-context";

/**
 * @hidden
 * @since 0.15
 */
export const MnRadio: React.FC<RadioProps> = ({ name, label, value, checked, onChange }) => {
   return (
      <label className="mrl-radio">
         <input
            type="radio"
            name={name}
            value={value}
            checked={checked}
            onChange={onChange}
         />
         {label}
      </label>
   );
};
