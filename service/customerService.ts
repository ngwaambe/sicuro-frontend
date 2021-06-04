import {
  Address,
  Customer,
  Language,
  ResponseData,
  Title,
  UpdateCustomerRequest,
} from "../state";
import {APP_BASE_URL} from "../config";
import {checkStatus, redirectTo, toCustomer, toResponseData} from "./common";

export const getCustomer = (customerId: string): Promise<ResponseData<Customer>> => {
  console.log(`${APP_BASE_URL()}/api/customers/${customerId}`)
  return fetch(`${APP_BASE_URL()}/api/customers/${customerId}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    method: 'GET'
  }).then(checkStatus({
    success: (data, resp) => toResponseData(resp.status, toCustomer(data)),
    error: (data, resp) =>{
      if (resp.status === 401) {
        return redirectTo("http://localhost:3000/authenticate")
      }
      return toResponseData(resp.status, null)
    }
  }))
}

export const updatePersonalData = (customerId: number, request:UpdateCustomerRequest): Promise<ResponseData<Customer>> => {
  return fetch(`${APP_BASE_URL()}/api/customers/${customerId}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(request),
    method: 'PUT'
  }).then(checkStatus({
    success: (data, resp) => {
      return toResponseData(resp.status, toCustomer(data))
    },
    error: (data, resp) => {
      if (resp.status === 401) {
         return redirectTo("http://localhost:3000/authenticate")
      }
      return toResponseData(resp.status, null)
    }
  }))
}

