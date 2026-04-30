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
   const rightElementRef = React.useRef<HTMLSpanElement | null>(null);
   const [rightElementWidth, setRightElementWidth] = React.useState(0);

   React.useEffect(() => {
      if (!rightElement || !rightElementRef.current) {
         setRightElementWidth(0);
         return;
      }

      const updateWidth = () => {
         const width = Math.ceil(rightElementRef.current?.getBoundingClientRect().width ?? 0);
         setRightElementWidth(width);
      };

      updateWidth();

      if (typeof ResizeObserver === "undefined") {
         return;
      }

      const observer = new ResizeObserver(updateWidth);
      observer.observe(rightElementRef.current);

      return () => {
         observer.disconnect();
      };
   }, [rightElement]);

   const inputStyle = rightElement
      ? { paddingRight: `${rightElementWidth + 10}px` }
      : undefined;

   const classes = [
      "mrl-input-group",
      round ? "mrl-input-group--round" : null,
      leftIcon ? "mrl-input-group--with-left-icon" : null,
      rightElement ? "mrl-input-group--with-right-element" : null,
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
            style={inputStyle}
            onChange={onChange}
            onClick={onClick as React.MouseEventHandler<HTMLInputElement>}
         />
         {rightElement && (
            <span ref={rightElementRef} className="mrl-input-right-element">{rightElement}</span>
         )}
      </div>
   );
};
