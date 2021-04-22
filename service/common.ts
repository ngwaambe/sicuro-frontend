import {ServiceError, FetchTimeoutError} from '../state';
import express, {NextFunction} from 'express';
import {State, User} from '../state'
import cookie from "cookie"
import jwt_decode from "jwt-decode";

interface CheckStatusProps<T> {
  success: (data: unknown, response: Response) => T;
  error?: (data: unknown, response: Response) => Promise<T> | T;
}

export const generalErrorMessage = 'Wir haben technische Probleme. Leider können wir deine Anfrage momentan nicht verarbeiten. Bitte wende dich an den Sicuro Kundenservice.';

export const checkStatus = <T>(props: CheckStatusProps<T>) => async (response: Response): Promise<T> => {
  let data = null;
  try {
    data = await response.text();
    data = JSON.parse(data);
  } catch (err) { /* ignore */
  }
  //console.log("checkingStatus:"+JSON.stringify(data))
  if (response.status >= 200 && response.status < 300) {
    return props.success(data, response);
  }

  if (response.status >= 400 && response.status < 500 && props.error) {
    return props.error(data, response);
  }
  throw new ServiceError(generalErrorMessage, data, response);
};

const isError = (json: any) => json.title && json.status;
const isEmbeddedError = (json: any) => json._status && json._status.validationMessages;
const isPlainErrorMessage = (json: any) => (typeof json === 'string') && json.length > 0;

export const getErrorMessage = (json: any) => {
  if (isError(json)) {
    return json.message;
  }
  if (isEmbeddedError(json)) {
    return json._status.validationMessages[0].message;
  }
  if (isPlainErrorMessage(json)) {
    return json;
  }
  return undefined;
};

export const redirectTo = <T>(url: string) => new Promise<T>(() => {
  window.location.href = url;
  setTimeout(() => {
    throw new Error();
  }, 2000);
});

export const timeout = (ms: number, action: () => void): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new FetchTimeoutError(generalErrorMessage));
    }, ms);
    try {
      resolve(await action());
    } catch (e) {
      reject(e);
    }
    clearTimeout(timer);
  });
};

export function parseCookies(req) {
  return cookie.parse(req ? req.headers.cookie || "" : document.cookie)
}

export const isRedirect = (data: any, resp: Response): boolean => (
  resp.status === 403 && (
    data?._messages?.[0]?.forbidden.includes('Auth-Info-User-Id') ||
    data?.title?.includes('Auth-Info-User-Id')
  )
);

export const getCustomerId = (token: string):string =>{
  const decodedToken =  jwt_decode(token);
  return decodedToken['customerId']
}
