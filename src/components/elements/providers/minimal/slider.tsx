// Minimal provider – Slider component
import React from "react";
import type { SliderProps } from "../../element-context";

/**
 * @hidden
 * @since 0.15
 */
export const MnSlider: React.FC<SliderProps> = ({ min, max, stepSize, value, onChange, disabled }) => {
   return (
      <input
         type="range"
         className="mrl-slider"
         min={min}
         max={max}
         step={stepSize}
         value={value}
         disabled={disabled}
         onChange={e => onChange?.(parseFloat(e.target.value))}
      />
   );
};
