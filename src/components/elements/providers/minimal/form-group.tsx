// Minimal provider – FormGroup component
import React from "react";
import type { FormGroupProps } from "../../element-context";
import "./form-group.css";

/**
 * @hidden
 * @since 0.15
 */
export const MnFormGroup: React.FC<React.PropsWithChildren<FormGroupProps>> = ({ label, labelFor, inline, children }) => {
   const cls = ["mrl-form-group", inline ? "mrl-form-group--inline" : null].filter(Boolean).join(" ");

   return (
      <div className={cls}>
         {label && (
            <label htmlFor={labelFor}>{label}</label>
         )}
         {children}
      </div>
   );
};
