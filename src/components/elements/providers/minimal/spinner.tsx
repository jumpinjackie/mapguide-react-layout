// Minimal provider – Spinner component
import React from "react";
import type { SpinnerProps } from "../../element-context";
import "./spinner.css";

/**
 * @hidden
 * @since 0.15
 */
export const MnSpinner: React.FC<SpinnerProps> = ({ variant, sizePreset = "standard" }) => {
   const cls = [
      "mrl-spinner",
      `mrl-spinner--${sizePreset}`,
      variant ? `mrl-spinner--${variant}` : null,
   ].filter(Boolean).join(" ");

   return <div className={cls} role="status" aria-label="Loading" />;
};
