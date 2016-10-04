import * as React from "react";

function isError(err: Error|string): err is Error {
    return typeof(err) != 'string';
}

export interface IErrorProps {
    error: Error|string;
    errorRenderer?: (err: Error) => JSX.Element;
}

export const Error = (props: IErrorProps) => {
    const err = props.error;
    if (isError(err)) {
        if (props.errorRenderer) {
            return props.errorRenderer(err);
        } else {
            const stack = err.stack || "";
            return <div className="error-display">
                <div className="error-header">{err.message}</div>
                <ul className="error-stack">
                    {stack.split("\n").map((ln, i) => <li key={`stack-line-${i}`}>{ln}</li>)}
                </ul>
            </div>;
        }
    } else {
        return <div className="error-display">
            <div className="error-header">{err}</div>
        </div>;
    }
};