import { Callout } from '@blueprintjs/core';
import { CalloutProps } from '../../element-context';
import React from 'react';
import { iconName, variantToIntent } from './utils';

/**
 * @hidden
 */
export const BpCallout: React.FC<React.PropsWithChildren<CalloutProps>> = (props) => {
    return <Callout
        intent={variantToIntent(props.variant)}
        title={props.title}
        icon={iconName(props.icon)}>
        {props.children}
    </Callout>;
};