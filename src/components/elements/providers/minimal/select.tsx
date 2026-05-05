// Minimal provider – Select component
import React from "react";
import type { SelectProps } from "../../element-context";
import "./select.css";

/**
 * @hidden
 * @since 0.15
 */
export const MnSelect: React.FC<SelectProps> = ({ id, name, fill, style, placeholder, value, items, onChange, keyFunc, extraClassNames }) => {
   const wrapperCls = ["mrl-select", fill ? "mrl-select--fill" : null, extraClassNames ?? null].filter(Boolean).join(" ");

   const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const selected = e.target.value;
      onChange?.(selected === "" ? undefined : selected);
   };

   return (
      <div className={wrapperCls} style={style}>
         <select id={id} name={name} value={value ?? ""} onChange={handleChange}>
            {placeholder !== undefined && (
               <option value="">{placeholder}</option>
            )}
            {items.map((item, idx) => {
               const key = keyFunc ? keyFunc(item) : idx;
               return (
                  <option key={key} value={String(item.value)}>
                     {item.label}
                  </option>
               );
            })}
         </select>
      </div>
   );
};
