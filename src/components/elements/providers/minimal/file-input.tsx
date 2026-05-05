// Minimal provider – FileInput component
import React from "react";
import type { FileInputProps } from "../../element-context";
import "./file-input.css";

/**
 * @hidden
 * @since 0.15
 */
export const MnFileInput: React.FC<FileInputProps> = ({ fill, text, buttonText, onInputChange }) => {
   const cls = ["mrl-file-input", fill ? "mrl-file-input--fill" : null].filter(Boolean).join(" ");

   return (
      <label className={cls}>
         <input type="file" onChange={onInputChange} />
         <span className="mrl-file-input-text">{text ?? "Choose file…"}</span>
         <span className="mrl-file-input-btn">{buttonText ?? "Browse"}</span>
      </label>
   );
};
