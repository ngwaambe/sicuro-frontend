import {
  Address,
  Customer,
  Language, PaymentAccount, PaypalAccount,
  ResponseData, ResponseStatus,
  Title,
  UpdateCustomerRequest,
} from "../state";
import {APP_BASE_URL} from "../config";
import {checkStatus, redirectTo, toCustomer, toPaymentAccounts, toPaypalAccount, toResponseData} from "./common";
import {defaultFailedResponsse, defaultSuccessResponse} from "./UtilService";

export const getCustomer = (customerId: string): Promise<ResponseData<Customer>> => {
  console.log(`${APP_BASE_URL()}/api/customers/${customerId}`)
  return fetch(`${APP_BASE_URL()}/api/customers/${customerId}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    method: 'GET'
  }).then(checkStatus({
    success: (data) => toResponseData(true, toCustomer(data)),
    error: (data, resp) =>{
      if (resp.status === 401) {
        return redirectTo("http://localhost:3000/authenticate")
      }
      return toResponseData(false, null)
    }
  }))
}

export const updateCustomerPersonalData = (customerId: number, request:UpdateCustomerRequest): Promise<ResponseData<Customer>> => {
  return fetch(`${APP_BASE_URL()}/api/customers/${customerId}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(request),
    method: 'PUT'
  }).then(checkStatus({
    success: (data) => {
      return toResponseData(true, toCustomer(data))
    },
    error: (data, resp) => {
      if (resp.status === 401) {
         return redirectTo("http://localhost:3000/authenticate")
      }
      return toResponseData(false, null)
    }
  }))
}

export const updateCustomerAddress = (customerId: number, request:Address): Promise<ResponseData<Customer>> => {
  return fetch(`${APP_BASE_URL()}/api/customers/${customerId}/address`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(request),
    method: 'PUT'
  }).then(checkStatus({
    success: (data) => {
      return toResponseData(true, toCustomer(data))
    },
    error: (data, resp) => {
      if (resp.status === 401) {
        return redirectTo("http://localhost:3000/authenticate")
      }
      return toResponseData(false, null)
    }
  }))
}

export const updateCustomerEmail = (customerId: number, request: any): Promise<ResponseStatus> => {
  return fetch(`${APP_BASE_URL()}/api/customers/${customerId}/change_email`, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(request),
    method: 'PUT'
  }).then(checkStatus({
    success: (data) => defaultSuccessResponse(data),
    error: (data) => defaultFailedResponsse(data)
  }))
}

export const updateCustomerPassword = (customerId: number, request: any): Promise<ResponseStatus> => {
  return fetch(`${APP_BASE_URL()}/api/customers/${customerId}/change_password`, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(request),
    method: 'PUT'
  }).then(checkStatus({
    success: (data) => defaultSuccessResponse(data),
    error: (data) => defaultFailedResponsse(data)
  }))
}

export const getPaymentAccounts = (customerId:string): Promise<ResponseData<PaymentAccount[]>> => {
  return fetch(`${APP_BASE_URL()}/api/customers/${customerId}/payment_accounts`, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    method: 'GET'
  }).then(checkStatus({
    success: (data) => toResponseData(true,toPaymentAccounts(data as any)),
    error: (data, resp) =>{
      if (resp.status === 401) {
        return redirectTo("http://localhost:3000/authenticate")
      }
      return toResponseData(false, null)
    }
  }))
}

export const updatePaypalAccount = (request: any): Promise<ResponseData<PaypalAccount>> => {
  return fetch(`${APP_BASE_URL()}/api/payment_accounts`, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(request),
    method: 'POST'
  }).then(checkStatus({
    success: (data) => toResponseData(true,toPaypalAccount(data)),
    error: (data, resp) =>{
      if (resp.status === 401) {
        return redirectTo("http://localhost:3000/authenticate")
      }
      return toResponseData(false, null)
    }
  }))
}


