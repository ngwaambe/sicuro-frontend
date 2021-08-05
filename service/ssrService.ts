import {Customer, ResponseData} from "../state";
import {APP_BASE_URL} from "../config";
import {checkStatus, toCustomer, toResponseData, getCustomerId} from "./common";
const memCache = require('memory-cache');

export const getCustomerSSR = (token:string): Promise<ResponseData<Customer>> => {
  const payload = memCache.get(token)
  if (payload !==null) {
    return fetch(`${APP_BASE_URL()}/api/customers/${getCustomerId(payload.access_token)}`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': `Bearer ${payload.access_token}`
      },
      method: 'GET'
    }).then(checkStatus({
      success: (data, resp) => toResponseData(true, toCustomer(data)),
      error: (data, resp) => toResponseData(false, null)
    }))
  }
  // @ts-ignore
  return toResponseData(401, null)

}
