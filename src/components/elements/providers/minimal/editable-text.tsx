// Minimal provider – EditableText component
import React from "react";
import type { EditableTextProps } from "../../element-context";
import "./editable-text.css";

/**
 * @hidden
 * @since 0.15
 */
export const MnEditableText: React.FC<EditableTextProps> = ({ value, onChange }) => {
   const [editing, setEditing] = React.useState(false);
   const [localValue, setLocalValue] = React.useState(value ?? "");

   React.useEffect(() => {
      setLocalValue(value ?? "");
   }, [value]);

   const commit = () => {
      setEditing(false);
      onChange?.(localValue);
   };

   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
         commit();
      } else if (e.key === "Escape") {
         setLocalValue(value ?? "");
         setEditing(false);
      }
   };

   if (editing) {
      return (
         <span className="mrl-editable-text">
            <input
               className="mrl-editable-text-input"
               autoFocus
               value={localValue}
               onChange={e => setLocalValue(e.target.value)}
               onBlur={commit}
               onKeyDown={handleKeyDown}
            />
         </span>
      );
   }

   return (
      <span className="mrl-editable-text">
         <span
            className="mrl-editable-text-display"
            onClick={() => setEditing(true)}
         >
            {localValue}
         </span>
      </span>
   );
};
