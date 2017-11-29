import * as Constants from "../constants";
import { Client } from "../api/client";

interface IData {
  user: string;
  isAuth: boolean;
}

interface IResponse {
  user: string | null;
  errorMessage: string;
  success: boolean;
  isAuth: boolean | null;
  data: IData;
}

export function checkUserIsAuthenticated() {
  return (dispatch: any, getState: any) => {
    const state = getState();
    const args = state.config;
    if (args.agentUri && args.agentKind) {
        const client = new Client(args.agentUri, args.agentKind);
        client.getRoot(`/mapguide/fusion/check.php`).then((res: IResponse) => {
          if(res.success) {
            dispatch({ type: Constants.CHECK_AUTHENTIFICATED_SUCCESS, payload: { auth: res.data.isAuth, user: res.data.user } });
          } else {
            dispatch({ type: Constants.CHECK_AUTHENTIFICATED_FAILURE, payload: res.errorMessage });
          }
        });
    }
  };
}

export function signIn(login: string, password: string) {
  return (dispatch: any, getState: any) => {
    const state = getState();
    const args = state.config;
    if (args.agentUri && args.agentKind) {
        const client = new Client(args.agentUri, args.agentKind);
        client.postRoot(`/mapguide/fusion/login.php`, {login, pass: password}).then((res: IResponse) => {
            if(res.success) {
              dispatch({ type: Constants.SIGN_IN_SUCCESS, payload: res.data.user });
            } else {
              dispatch({ type: Constants.SIGN_IN_FAILURE, payload: res.errorMessage });
            }
        });
    }
  };
}

export function signOut() {
  return (dispatch: any, getState: any) => {
    const state = getState();
    const args = state.config;
    if (args.agentUri && args.agentKind) {
        const client = new Client(args.agentUri, args.agentKind);
        client.getRoot(`/mapguide/fusion/logout.php`).then((res: IResponse) => {
          if(res.success) {
            dispatch({ type: Constants.LOG_OUT_SUCCESS});
          } else {
            dispatch({ type: Constants.LOG_OUT_FAILURE, payload: res.errorMessage });
          }
        });
    }
  };
}