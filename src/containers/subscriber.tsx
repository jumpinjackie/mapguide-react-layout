import * as React from "react";
import { IApplicationState } from '../api/common';
import { useAppState } from "../components/map-providers/context";

/**
 * @since 0.13
 */
export interface ISubscriberProps {
    name: string;
    appStateSelector: (state: IApplicationState) => any;
    appStateEqualityFn?: (left: any, right: any) => boolean;
    onNewState: (state: any) => void;
}

/**
 * 
 * @param props 
 * @since 0.13
 */
export const Subscriber = (props: ISubscriberProps) => {
    const state = useAppState<any>(props.appStateSelector, props.appStateEqualityFn);
    React.useEffect(() => {
        props.onNewState(state);
    }, [state]);
    return <noscript data-subscriber-name={props.name} />;
}