import 'isomorphic-fetch';
import { APP_BASE_URL} from '../config';
import { checkStatus } from './common';
import { ResponseStatus } from '../state'
import cache from 'memory-cache';
import {defaultFailedResponsse, defaultSuccessResponse} from "./UtilService";
import jwt_decode from "jwt-decode";

export interface GetTokenResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  error: boolean;
  error_description: string;
}

export interface CheckTokenResponse {
  active: boolean;
  exp: number;
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

const checkTokenResponse = (response: any, error: boolean):CheckTokenResponse => ({
  active: (!error)? response.active : false,
  exp: (!error)? response.exp : 0,
  error: (error) ? response.error : null,
  error_description: (error) ? response.error_description : null
});

const authServiceCheckToken = (token: string): Promise<CheckTokenResponse> =>
  fetch(`${APP_BASE_URL}/api/auth/check_token`, {
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
  fetch(`${APP_BASE_URL}/api/auth/token`, {
    body: `{ "username":"${username}", "password":"${password}" }`,
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
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

export const resetPassword = (email: string): Promise<ResponseStatus> =>
  fetch(`${APP_BASE_URL}/api/auth/reset_password/`, {
    body: `{email:${email}}`,
    headers:{
      'Content-Type': 'application/json; charset=utf-8'
    },
    method: 'POST'
  }).then(checkStatus({
    success: (data)=>defaultSuccessResponse(data),
    error:(data)=>defaultFailedResponsse(data)
  }));

const tokenCache = new cache.Cache();

/**
 * check auth token against rewe-auth-service.
 * Tokens are cached for their ttl and check is performance against cache first.
 *
 * @param token access token to check
 */
export const checkToken = async (token: string): Promise<boolean> => {
  console.log("1====>>>"+token)
  if (tokenCache.get(token)){
    const decodedToken = jwt_decode(token);
    console.log(decodedToken);
    // check expiration date
    if (decodedToken['exp']- Date.now()>0)
    // if expired check refresh token expiration date(look up refresh token from server cach
    // if get new
      console.log("2=>ldkaösldkaösldkaösdkaöldkaölsd")
    return true;
  }
  console.log("3=>"+token)
  const response = await authServiceCheckToken(token);
  if (response.active) {
    console.log(response.exp+'  '+Date.now());
    const ttl = (response.exp * 1000) - Date.now();
    tokenCache.put(token, response, ttl);
    return true;
  }
  return false;
};


