// Minimal provider – InputGroup component
import React from "react";
import type { InputGroupProps } from "../../element-context";
import "./input-group.css";

/**
 * @hidden
 * @since 0.15
 */
export const MnInputGroup: React.FC<InputGroupProps> = ({
   style,
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
   return (
      <div className="mrl-input-group" style={style}>
         {leftIcon && (
            <span className="mrl-input-left-icon" aria-hidden="true" />
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
