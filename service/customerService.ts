import {Address, Customer, Language, ResponseData, ServiceError, Title} from "../state";
import {APP_BASE_URL} from "../config";
import {checkStatus, getErrorMessage} from "./common";


export const toAddress = (address: any): Address =>({
  id: address.id,
  street: address.street,
  houseNumber: address.houseNumber,
  streetExtension: address.streetExtension,
  postalCode: address.postalCode,
  city: address.city,
  region: address.region,
  countryIso: address.countryIso,
  phoneNumber: address.phoneNumber
})



export const toCustomer = (customer: any): Customer =>({
  id: customer.id,
  customerNumber: customer.customerNumber,
  title: Title[customer.title],
  firstName: customer.firstName,
  lastName: customer.lastName,
  gender: customer.gender,
  email: customer.email,
  preferedLanguage:Language[customer.preferedLanguage]?? Language.SELECT,
  applyVat:customer.applyVat,
  organisation:customer.organisation,
  address: toAddress(customer.address),
  taxNumber: customer.taxNumber,
  identityNumber: customer.identityNumber

})

export const formatCustomerName = (customer:Customer): string =>{
  return `${customer.title} ${customer.firstName} ${customer.lastName}`
}

export const toResponseData = <T>(status:number, data?:T): ResponseData<T>=>({
  status:status,
  data:data
})

export const getCustomer = (customerId: string, token:string): Promise<ResponseData<Customer>> => {
  console.log(`${APP_BASE_URL()}/api/customers/${customerId}`)
  return fetch(`${APP_BASE_URL()}/api/customers/${customerId}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': `Bearer ${token}`
    },
    method: 'GET'
  }).then(checkStatus({
    success: (data, resp) => toResponseData(resp.status, toCustomer(data)),
    error: (data, resp) => toResponseData(resp.status, null)
  }))
}
