import { Icon } from '@blueprintjs/core';
import { IconProps } from '../../element-context';
import React from 'react';
import { iconName } from './utils';

export const BpIcon: React.FC<IconProps> = (props) => {
    return <Icon icon={iconName(props.icon)} style={props.style} iconSize={props.iconSize} />;
}