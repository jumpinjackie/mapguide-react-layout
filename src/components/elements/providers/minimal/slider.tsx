// Minimal provider – Slider component
import React from "react";
import type { SliderProps } from "../../element-context";
import "./slider.css";

function computeTickLabels(min: number, max: number, labelStepSize?: number, labelValues?: number[]): number[] {
   if (labelValues && labelValues.length > 0) {
      return labelValues;
   }
   if (labelStepSize && labelStepSize > 0) {
      const labels: number[] = [];
      for (let v = min; v <= max; v += labelStepSize) {
         labels.push(Math.round(v * 1e9) / 1e9);
      }
      if (labels[labels.length - 1] < max) {
         labels.push(max);
      }
      return labels;
   }
   return [min, max];
}

/**
 * @hidden
 * @since 0.15
 */
export const MnSlider: React.FC<SliderProps> = ({ min = 0, max = 100, stepSize, labelStepSize, labelValues, value, onChange, disabled }) => {
   const range = max - min;
   const ticks = computeTickLabels(min, max, labelStepSize, labelValues);

   return (
      <div className="mrl-slider-wrapper">
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
         {ticks.length > 0 && (
            <div className="mrl-slider-labels">
               {ticks.map((tick, i) => (
                  <span
                     key={i}
                     className="mrl-slider-label"
                     style={{ left: `${((tick - min) / range) * 100}%` }}
                  >
                     {tick}
                  </span>
               ))}
            </div>
         )}
      </div>
   );
};
