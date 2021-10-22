import {CompleteSignupRequest, ResponseStatus, SignupRequest} from "../state";
import {APP_BASE_URL} from "../config";
import {checkStatus} from "./common";
import {defaultFailedResponsse, defaultSuccessResponse} from "./UtilService";

export const createAccount = (signupRequest: SignupRequest): Promise<ResponseStatus> =>
  fetch(`${APP_BASE_URL()}/api/auth/signup`, {
    body: JSON.stringify(signupRequest),
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    method: 'POST'
  }).then(checkStatus({
    success: (data) => defaultSuccessResponse(data),
    error: (data) => defaultFailedResponsse(data)
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
