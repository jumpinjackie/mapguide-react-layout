import * as React from "react";
import { InitError } from "../api/common";
import { isError, isInitError } from "../utils/type-guards";

export interface IErrorProps {
    error: Error|InitError|string;
    errorRenderer?: (err: Error|InitError) => JSX.Element;
}

export function normalizeStack(err: Error|InitError): string[] {
    let stack: string[];
    if (err.stack instanceof Array) {
        stack = err.stack || [];
    } else if (typeof(err.stack) == 'string') {
        stack = (err.stack || "").split("\n");
    } else {
        stack = [];
    }
    return stack;
}

export const Error = (props: IErrorProps) => {
    const err = props.error;
    if (isError(err) || isInitError(err)) {
        if (props.errorRenderer) {
            return props.errorRenderer(err);
        } else {
            const message = err.message;
            const stack = normalizeStack(err);
            return <div className="error-display">
                <div className="error-header">{err.message}</div>
                <ul className="error-stack">
                    {stack.map((ln, i) => <li key={`stack-line-${i}`}>{ln}</li>)}
                </ul>
            </div>;
        }
    } else {
        return <div className="error-display">
            <div className="error-header">{err}</div>
        </div>;
    }
};