const objectAssign = require('object-assign');

/**
 * Returns whether the provided value is a promise
 *
 * @param {object} value Potential promise
 * @return {Boolean}
 */
function isPromise(value) {
  if (value !== null && typeof value === 'object') {
    return value.promise && typeof value.promise.then === 'function';
  }
}


export default function promiseMiddleware({ dispatch }) {
  return next => action => {
    if (!isPromise(action.payload)) {
      return next(action);
    }

    const { types, payload, meta } = action;
    const { promise, data } = payload;
    const [ PENDING, FULFILLED, REJECTED ] = types;

   /**
    * Dispatch the pending action
    */
    dispatch( objectAssign({},
      { type: PENDING },
      data ? { payload: data } : {},
      meta ? { meta } : {}
    ));

    /**
     * If successful, dispatch the fulfilled action, otherwise dispatch
     * rejected action.
     */
    return promise.then(
      result => {
        dispatch({
          type: FULFILLED,
          payload: result,
          meta,
        });
      },
      error => {
        dispatch({
          type: REJECTED,
          payload: error,
          meta,
        });
      }
    );
  };
}
