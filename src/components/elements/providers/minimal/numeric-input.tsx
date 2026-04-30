// Minimal provider – NumericInput component
import React from "react";
import type { NumericInputProps } from "../../element-context";

/**
 * @hidden
 * @since 0.15
 */
export const MnNumericInput: React.FC<NumericInputProps> = ({ style, min, max, value, disabled, onChange }) => {
   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const parsed = parseFloat(e.target.value);
      if (!isNaN(parsed)) {
         onChange?.(parsed);
      }
   };

   return (
      <input
         type="number"
         className="mrl-numeric-input"
         style={style}
         min={min}
         max={max}
         value={value}
         disabled={disabled}
         onChange={handleChange}
      />
   );
};
