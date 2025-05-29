import React from "react";
import { SelectProps } from "../../element-context";
import { strIsNullOrEmpty } from "../../../../utils/string";

/**
 * @hidden
 */
export const BpSelect: React.FC<SelectProps> = ({ id, name, value, onChange, items, fill, placeholder, keyFunc, extraClassNames, style }) => {
    const classes = `bp3-select ${!!fill ? 'bp3-fill' : ''} ${extraClassNames}`.trim();
    return <div className={classes}>
        <select id={id} name={name} value={value} style={style} onChange={e => onChange?.(e.target.value)}>
            {!strIsNullOrEmpty(placeholder) && <option>{placeholder}</option>}
            {items.map((item, i) => {
                let key: React.Key = item.value;
                if (typeof(keyFunc) === 'function') {
                    key = keyFunc(item);
                }
                const label = item.label;
                return <option key={key} value={item.value}>{label}</option>;
            })}
        </select>
    </div>;
}