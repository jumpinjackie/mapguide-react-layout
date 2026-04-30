// Minimal provider – InputGroup component
import React from "react";
import type { InputGroupProps } from "../../element-context";
import { MnIcon } from "./icon";
import "./input-group.css";

/**
 * @hidden
 * @since 0.15
 */
export const MnInputGroup: React.FC<InputGroupProps> = ({
   style,
   round,
   autoFocus,
   leftIcon,
   placeholder,
   value,
   readOnly,
   disabled,
   id,
   name,
   rightElement,
   onChange,
   onClick,
}) => {
   const classes = [
      "mrl-input-group",
      round ? "mrl-input-group--round" : null,
      leftIcon ? "mrl-input-group--with-left-icon" : null,
   ].filter(Boolean).join(" ");

   return (
      <div className={classes} style={style}>
         {leftIcon && (
            <span className="mrl-input-left-icon" aria-hidden="true">
               <MnIcon icon={leftIcon} iconSize={14} />
            </span>
         )}
         <input
            id={id}
            name={name}
            type="text"
            autoFocus={autoFocus}
            placeholder={placeholder}
            value={value}
            readOnly={readOnly}
            disabled={disabled}
            onChange={onChange}
            onClick={onClick as React.MouseEventHandler<HTMLInputElement>}
         />
         {rightElement && (
            <span className="mrl-input-right-element">{rightElement}</span>
         )}
      </div>
   );
};
