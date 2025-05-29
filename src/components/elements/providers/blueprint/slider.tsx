import { Slider } from '@blueprintjs/core';
import { SliderProps } from '../../element-context';
import React from 'react';

/**
 * @hidden
 */
export const BpSlider: React.FC<SliderProps> = (props) => {
    return <Slider
        min={props.min}
        max={props.max}
        stepSize={props.stepSize}
        labelStepSize={props.labelStepSize}
        value={props.value}
        onChange={props.onChange}
        disabled={props.disabled}
        labelValues={props.labelValues}
    />;
};