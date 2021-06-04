import 'isomorphic-fetch';
import { APP_BASE_URL} from '../config';
import { checkStatus } from './common';
import { ResponseStatus } from '../state'
import {defaultFailedResponsse, defaultSuccessResponse} from "./UtilService";

export interface GetTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  error: boolean;
  error_description: string;
}

export interface CheckTokenResponse {
  active: boolean;
  tempPwd?: boolean,
  securityQuestion?: boolean,
  error?: string;
  error_description?: string;
}

interface Token {
  access_token: string;
  exp_ms: number;
}

const toTokenResponse = (tokenResponse: any, error: boolean):GetTokenResponse => ({
  access_token: (!error)? tokenResponse.access_token : '',
  refresh_token: (!error)? tokenResponse.refresh_token : '',
  expires_in: (!error)? tokenResponse.expires_in : 0,
  error: error,
  error_description: (error)? tokenResponse.error_description: ''
});

export const checkTokenResponse = (response: any, error: boolean):CheckTokenResponse => ({
  active: (!error)? response.active : false,
  tempPwd: (!error)? response.tempPwd : false,
  securityQuestion: (!error)? response.securityQuestion : false,
  error: (error) ? response.error : null,
  error_description: (error) ? response.error_description : null
});

export const authServiceCheckToken = (token: string): Promise<CheckTokenResponse> =>
  fetch(`${APP_BASE_URL()}/api/auth/check_token`, {
    body: `{ "token":"${token}"}`,
    headers: {'Content-Type': 'application/json'},
    method: 'POST'
  }).then(checkStatus({
    success: (data) => checkTokenResponse(data, false),
    error: (data, resp) => {
      return checkTokenResponse(data, true)
    }
  }));

export const authenticate = (username: string, password:string): Promise<ResponseStatus> =>
  fetch(`${APP_BASE_URL()}/api/auth/token`, {
    body: `{ "username":"${username}", "password":"${password}" }`,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'withCredentials':'true'
    },
    method: 'POST'
  }).then(checkStatus({
    success: (data, resp) =>{
      //save refresh token in httpOnly cookie
      return  defaultSuccessResponse(data);
    },
    error: (data, resp) => {
      return defaultFailedResponsse(data);
    }
  }));

export const clearToken = (): Promise<ResponseStatus> => {
  const localIp = APP_BASE_URL()
  return  fetch(`${localIp}/api/logout`, {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({})
  }).then(checkStatus({
    success: (data, resp) => {
      //save refresh token in httpOnly cookie
      return defaultSuccessResponse(data);
    },
    error: (data, resp) => {
      return defaultFailedResponsse(data);
    }
  }));
}
export const resetPassword = (email: string): Promise<ResponseStatus> =>
  fetch(`${APP_BASE_URL()}/api/auth/reset_password/`, {
    body: `{email:${email}}`,
    headers:{
      'Content-Type': 'application/json; charset=utf-8',
    },
    method: 'POST'
  }).then(checkStatus({
    success: (data)=>defaultSuccessResponse(data),
    error:(data)=>defaultFailedResponsse(data)
  }));

//const tokenCache = new cache.Cache();




