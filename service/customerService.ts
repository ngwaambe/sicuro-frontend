import {
  Address, BankAccount, ChangePasswordRequest,
  Customer,
  Language, PaymentAccount, PaymentType, PaypalAccount,
  ResponseData, ResponseStatus,
  Title,
  UpdateCustomerRequest,
} from "../state";
import {APP_BASE_URL} from "../util/config";
import {
  checkStatus,
  redirectTo,
  toBankAccount,
  toCustomer,
  toPaymentAccounts,
  toPaypalAccount,
  toResponseData
} from "./common";
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
    success: (data, resp ) => toResponseData(true, resp.status, toCustomer(data)),
    error: (data, resp) =>{
      if (resp.status === 401) {
        return redirectTo(`${APP_BASE_URL()}/authenticate`)
      }
      return toResponseData(false, resp.status, null)
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
    success: (data, resp ) => {
      return toResponseData(true, resp.status, toCustomer(data))
    },
    error: (data, resp) => {
      if (resp.status === 401) {
         return redirectTo(`${APP_BASE_URL()}/authenticate`)
      }
      return toResponseData(false, resp.status, null)
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
    success: (data, resp) => {
      return toResponseData(true, resp.status, toCustomer(data))
    },
    error: (data, resp) => {
      if (resp.status === 401) {
        return redirectTo(`${APP_BASE_URL()}/authenticate`)
      }
      return toResponseData(false, resp.status, null)
    }
  }))
}

export const updateCustomerEmail = (customerId: number, request: any): Promise<ResponseData<any>> => {
  return fetch(`${APP_BASE_URL()}/api/customers/${customerId}/change_email`, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(request),
    method: 'PUT'
  }).then(checkStatus({
    success: (data, resp) => toResponseData(true, resp.status, data),
    error: (data, resp) => toResponseData(false, resp.status, data)
  }))
}

export const updateCustomerPassword = (customerId: number, request: ChangePasswordRequest): Promise<ResponseData<any>> => {
  return fetch(`${APP_BASE_URL()}/api/customers/${customerId}/change_password`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(request),
    method: 'PUT'
  }).then(checkStatus({
    success: (data, resp) => toResponseData(true, resp.status, data),
    error: (data, resp) => toResponseData(false, resp.status, data)
  }))
}

export const getPaymentAccounts = (customerId:string): Promise<ResponseData<PaymentAccount[]>> => {
  return fetch(`${APP_BASE_URL()}/api/customers/${customerId}/payment_accounts`, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    method: 'GET'
  }).then(checkStatus({
    success: (data, resp ) => toResponseData(true, resp.status, toPaymentAccounts(data as any)),
    error: (data, resp) =>{
      if (resp.status === 401) {
        return redirectTo(`${APP_BASE_URL()}/authenticate`)
      }
      return toResponseData(false, resp.status, null)
    }
  }))
}

export const updatePaymentAccount = (customerId:number, request: PaymentAccount): Promise<ResponseData<BankAccount>> => {
  return fetch(`${APP_BASE_URL()}/api/customers/${customerId}/payment_accounts`, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(request),
    method: 'PUT'
  }).then(checkStatus({
    success: (data, resp ) =>{
      if ((data as PaymentAccount).paymentType === PaymentType.BANK)
        return toResponseData(true, resp.status, toBankAccount(data));
      else
        return toResponseData(true,resp.status, toBankAccount(data));
    },
    error: (data, resp) =>{
      if (resp.status === 401) {
        return redirectTo( `${APP_BASE_URL()}/authenticate`)
      }
      return toResponseData(false, resp.status, null)
    }
  }))
}

export const createPaymentAccount = (customerId:number, request: PaymentAccount): Promise<ResponseData<BankAccount>> => {
  return fetch(`${APP_BASE_URL()}/api/customers/${customerId}/payment_accounts`, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    body: JSON.stringify(request),
    method: 'POST'
  }).then(checkStatus({
    success: (data, resp) => {
      if ((data as PaymentAccount).paymentType === PaymentType.PAYPAL)
        return toResponseData(true, resp.status, toBankAccount(data));
      else
        return toResponseData(true, resp.status, toBankAccount(data));
    },
    error: (data, resp) =>{
      if (resp.status === 401) {
        return redirectTo(`${APP_BASE_URL()}/authenticate`)
      }
      return toResponseData(false, resp.status, null)
    }
  }))
}

export const deletePaymentAccount = (customerId:number, paymentAccountId: number): Promise<ResponseStatus> => {
  return fetch(`${APP_BASE_URL()}/api/customers/${customerId}/payment_accounts/${paymentAccountId}`, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    method: 'DELETE'
  }).then(checkStatus({
    success: (data, resp) => toResponseData(true, resp.status),
    error: (data, resp) =>{
      if (resp.status === 401) {
        return redirectTo(`${APP_BASE_URL()}/authenticate`)
      }
      return toResponseData(false, resp.status, null)
    }
  }))
}


