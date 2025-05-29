import { NumericInput } from '@blueprintjs/core';
import { NumericInputProps } from '../../element-context';
import React from 'react';

/**
 * @hidden
 */
export const BpNumericInput: React.FC<NumericInputProps> = (props) => {
    return <NumericInput disabled={props.disabled} style={props.style} min={props.min} max={props.max} value={props.value} onValueChange={e => props.onChange?.(e)}/>;
};