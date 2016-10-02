import * as React from "react";

function isError(err: Error|string): err is Error {
    return typeof(err) != 'string';
}

export interface IErrorProps {
    error: Error|string;
}

export const Error = (props: IErrorProps) => {
    const err = props.error;
    if (isError(err)) {
        const stack = err.stack || "";
        return <div className="error-display">
            <div className="error-header">{err.message}</div>
            <ul className="error-stack">
                {stack.split("\n").map((ln, i) => <li key={`stack-line-${i}`}>{ln}</li>)}
            </ul>
        </div>;
    } else {
        return <div className="error-display">
            <div className="error-header">{err}</div>
        </div>;
    }
};