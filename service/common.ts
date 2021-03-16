import {ServiceError, FetchTimeoutError} from '../state';
import express, {NextFunction} from 'express';
import {State, User} from '../state'
import cookie from "cookie"

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
  if (response.status >= 200 && response.status < 300) {
    return props.success(data, response);
  }

  if (response.status >= 400 && response.status < 500 && props.error) {
    return props.error(data, response);
  }

  throw new ServiceError(generalErrorMessage, data, response);
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



const createInitialState = async (
  req: express.Request,
  res: express.Response
): Promise<State> => {
  const token = req.header('Authorization') as string;

  const user = {
    loggedIn: token != null
  };

  return {
    user
  };
};
