import {Customer, ResponseData} from "../state";
import {APP_BASE_URL} from "../util/config";
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
      success: (data, resp) => toResponseData(true, resp.status, toCustomer(data)),
      error: (data, resp) => toResponseData(false, resp.status, null)
    }))
  }
  // @ts-ignore
  return toResponseData(false, 401, null)

}
