import { Callout } from '@blueprintjs/core';
import { CalloutProps } from '../../element-context';
import React from 'react';
import { iconName, variantToIntent } from './utils';

/**
 * @hidden
 */
export const BpCallout: React.FC<React.PropsWithChildren<CalloutProps>> = (props) => {
    const title = props.title;
    const content = title ? <>
        <h5 className="bp3-heading">{title}</h5>
        {props.children}
    </> : props.children;

    return <Callout
        intent={variantToIntent(props.variant)}
        icon={iconName(props.icon)}>
        {content}
    </Callout>;
};