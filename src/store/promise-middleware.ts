/**
 * Returns whether the provided value is a promise
 *
 * @hidden
 * @param {object} value Potential promise
 * @return {Boolean}
 */
function isPromise(value: any) {
    if (value !== null && typeof value === 'object') {
        return value.promise && typeof value.promise.then === 'function';
    }
}

/**
 * @hidden
 */
export default function promiseMiddleware({ dispatch }: { dispatch: any }) {
    return (next: any) => (action: any) => {
        if (!isPromise(action.payload)) {
            return next(action);
        }

        const { types, payload, meta } = action;
        const { promise, data } = payload;
        const [PENDING, FULFILLED, REJECTED] = types;

        const p1 = { type: PENDING };
        const p2 = data ? { payload: data } : {};
        const p3 = meta ? { meta } : {};

        /**
         * Dispatch the pending action
         */
        dispatch({ ...p1, ...p2, ...p3 });

        /**
         * If successful, dispatch the fulfilled action, otherwise dispatch
         * rejected action.
         */
        return promise.then(
            (result: any) => {
                dispatch({
                    type: FULFILLED,
                    payload: result,
                    meta,
                });
            },
            (error: any) => {
                dispatch({
                    type: REJECTED,
                    payload: error,
                    meta,
                });
            }
        );
    };
}
