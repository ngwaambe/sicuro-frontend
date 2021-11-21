import {CompleteSignupRequest, ResponseData, ResponseStatus, SignupRequest} from "../state";
import {APP_BASE_URL} from "../config";
import {checkStatus} from "./common";
import {defaultFailedResponsse, defaultSuccessResponse} from "./UtilService";


export const createAccountResponse = (data:unknown, res: Response): ResponseData<any> =>(
  {
    success: res.status >= 200 && res.status < 300,
    data: {
      status: res.status
    }
  });

export const createAccount = (signupRequest: SignupRequest): Promise<ResponseData<any>> =>
  fetch(`${APP_BASE_URL()}/api/auth/signup`, {
    body: JSON.stringify(signupRequest),
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    method: 'POST'
  }).then(checkStatus({
    success: (data, res) => createAccountResponse(data, res),
    error: (data, res) => createAccountResponse(data, res)
  }))

export const completeSignup = (request: CompleteSignupRequest): Promise<ResponseStatus> =>
  fetch(`${APP_BASE_URL()}/api/auth/complete_signup`, {
    body: JSON.stringify(request),
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    method: 'PUT'
  }).then(checkStatus({
    success: (data) => defaultSuccessResponse(data),
    error: (data) => defaultFailedResponsse(data)
  }))

export const activateAccount = (activationCode: string): Promise<ResponseStatus> =>
  fetch(`${APP_BASE_URL()}/api/auth/activate_account/${activationCode}`, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    method: 'GET'
  }).then( checkStatus({
    success: (data) => defaultSuccessResponse(data),
    error: (data) => defaultFailedResponsse(data)
  }))
