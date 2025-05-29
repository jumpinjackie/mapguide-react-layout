import { Radio } from '@blueprintjs/core';
import { RadioProps } from '../../element-context';
import React from 'react';

/**
 * @hidden
 */
export const BpRadio: React.FC<RadioProps> = (props) => {
    return <Radio
        name={props.name}
        value={props.value as any}
        label={props.label}
        checked={props.checked}
        onChange={props.onChange}
    />;
};