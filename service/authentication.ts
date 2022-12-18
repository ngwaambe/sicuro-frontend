import 'isomorphic-fetch';
import { APP_BASE_URL} from '../util/config';
import {checkStatus, toResponseData} from './common';
import {Resetpassword, ResponseData, ResponseStatus, UserSecurityQuestion} from '../state'
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
  orphanedToken: boolean,
  tempPwd?: boolean,
  hasSecurityQuestion?: boolean,
  customerId?: number,
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
  hasSecurityQuestion: (!error)? response.hasSecurityQuestion : false,
  customerId:(!error)? response.customerId: undefined,
  orphanedToken: (!error)? response.orphanedToken: false,
  error: (error) ? response.error : undefined,
  error_description: (error) ? response.error_description : undefined
});

const toUserSecurityQuestion = (response: any, error: boolean):UserSecurityQuestion =>({
  question: (!error)? response.question: '',
  activationId: (!error)?response.activationId:''
})

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

export const authenticate = (username: string, password:string): Promise<ResponseData<CheckTokenResponse>> =>
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
      console.log(JSON.stringify(data))
      return  toResponseData(true, resp.status,checkTokenResponse(data, false));
    },
    error: (data, resp) => {
      return toResponseData(false, resp.status, checkTokenResponse(data, true));
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

export const initPasswordReset = (email: string): Promise<ResponseStatus> =>
  fetch(`${APP_BASE_URL()}/api/auth/init_reset_password`, {
    body: `{"email":"${email}"}`,
    headers:{
      'Content-Type': 'application/json',
    },
    method: 'POST'
  }).then(checkStatus({
    success: (data)=>defaultSuccessResponse(data),
    error:(data)=>defaultFailedResponsse(data)
  }));

export const getSecurityQuestion = (uuid: string): Promise<ResponseData<UserSecurityQuestion>> => {
  console.log(`${APP_BASE_URL}/api/auth/reset_password/${uuid}`)
  return fetch(`${APP_BASE_URL()}/api/auth/reset_password/${uuid}`, {
    headers:{'Content-Type': 'application/json'},
    method: 'GET'
  }).then(checkStatus({
    success: (data, resp ) => toResponseData(true, resp.status, toUserSecurityQuestion(data, false)),
    error: (data, resp) =>{
      return toResponseData(false, resp.status, toUserSecurityQuestion(data, true))
    }
  }));
}

export const getResetpassword = (request: Resetpassword): Promise<ResponseData<any>> => {
  console.log(`${APP_BASE_URL}/api/auth/reset_password`)
  return fetch(`${APP_BASE_URL()}/api/auth/reset_password`, {
    headers:{'Content-Type': 'application/json'},
    body:JSON.stringify(request),
    method: 'POST'
  }).then(checkStatus({
    success: (data, resp ) => toResponseData(true, resp.status, null),
    error: (data, resp) =>{
      return toResponseData(false, resp.status, null)
    }
  }));
}
//const tokenCache = new cache.Cache();




