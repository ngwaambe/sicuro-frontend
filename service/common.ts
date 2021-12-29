import {
  ServiceError,
  FetchTimeoutError,
  Title,
  Language,
  Address,
  Customer,
  ResponseData,
  PaypalAccount, PaymentAccount, PaymentType, BankAccount
} from '../state';
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
  }, 1000);
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

export const getTokenExpirationDate = (token: string):number =>{
  const decodedtoken = jwt_decode(token)
  return decodedtoken['exp'];
}

export const hasTemproraryPwd = (token: string): boolean => {
  const decodedtoken = jwt_decode(token)
  console.log(JSON.stringify(decodedtoken))
  return decodedtoken['tempPwd'];
}

export const completeRegistration = (token: string): boolean => {
  const decodedtoken = jwt_decode(token)
  return decodedtoken['completeRegistration'];
}


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
  firstname: customer.firstname,
  lastname: customer.lastname,
  gender: customer.gender,
  email: customer.email,
  language:Language[customer.language]?? Language.SELECT,
  applyVat:customer.applyVat,
  organisation:customer.organisation,
  address: (customer.address !== undefined && customer.address !== null ) ? toAddress(customer.address) : null,
  taxNumber: customer.taxNumber,
  identityNumber: customer.identityNumber

})

export const formatCustomerName = (customer:Customer): string =>{
  return `${customer.title} ${customer.firstname} ${customer.lastname}`
}

export const toResponseData = <T>(success: boolean, statusCode:Number, data?:T): ResponseData<T>=>({
  success: success,
  statusCode: statusCode,
  data:data
})

export const toPaypalAccount = (account: any): PaypalAccount => ({
  id: account.id,
  paymentType: account.paymentType,
  owner: account.owner,
  paypalAccount: account.paypalAccount
})

export const toBankAccount = (account: any): BankAccount => ({
  id: account.id,
  paymentType: account.paymentType,
  owner: account.owner,
  bankName: account.bankName,
  iban: account.iban,
  swiftCode: account.swiftCode,
  city: account.city,
  postalCode: account.postalCode,
  countryIso: account.countryIso
})

export const toPaymentAccounts = (accounts: any[]): PaymentAccount[] => {
  return accounts.map(it => (it.paymentType === PaymentType.PAYPAL? toPaypalAccount(it): toBankAccount(it)))
}

export const titleToString = (title:Title): string => Object.keys(Title).filter(k => Title[k] == title).pop()

export const languageToString = (language:Language): string => Object.keys(Language).filter(k => Language[k] == language).pop()
