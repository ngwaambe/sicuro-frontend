import { ReactNode } from "react";

export interface Notification {
  message?: string | ReactNode;
  title?: string;
  error?: Error;
}

export class ServiceError extends Error {
  public data: unknown;
  public response: Response;

  constructor(message: string, data: unknown, response: Response) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.data = data;
    this.response = response;
  }
}

export interface ResponseStatus {
  success: boolean
}

export interface ResponseData<T>{
  success:boolean;
  statusCode:Number
  data?:T
}

export class FetchTimeoutError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export enum AppView{
  DASCHBOARD,
  SIGNIN,
  SIGNUP,
  USER_DETAILS,
  TRANSACTION
}

export interface User {
  loggedIn: boolean,
  tempPwd?: boolean,
  securityQuestion?: boolean,
  customerId?: number
}

export enum Title {
  SELECT = "select",
  Mr = "title-Mr",
  Ms = "title-Ms",
  Mr_Dr = "title-Mr_Dr",
  Mrs_Dr = "title-Ms_Dr",
  Mr_Prof = "title-Mr_Prof",
  Mrs_Prof = "title-Ms_Prof"
}

export enum Language {
  SELECT = "select",
  en = "language_en",
  es = "language_es",
  it = "language_it"
}

export enum PaymentType {
  PAYPAL = "PAYPAL",
  BANK = "BANK"
}

export interface Address {
  id: number,
  street: string,
  houseNumber: string,
  streetExtension?: string,
  postalCode: string,
  city: string,
  region?: string,
  countryIso: string,
  phoneNumber?: string
}

export interface Customer {
  id:number,
  customerNumber: string,
  title: Title,
  firstname: string,
  lastname: string,
  gender: string,
  email: string,
  language:Language,
  applyVat:boolean,
  organisation?:string,
  address?: Address,
  taxNumber?:string,
  identityNumber?:string
}

export enum SecurityQuestion {
  DEFAULT_SELECT="choose_security_question",
  GRAND_MOTHERS_MAIDEN_NAME="security_question_1",
  CHILD_HOOD_NICNAME="security_question_2",
  PLACE_FIRST_KISS="security_question_3",
  PLACE_MOTHER_FATHER_MEET="security_question_4",
  DAD_LICENCE_PLATE_FIRST_CAR="security_question_5",
}

export interface UpdateCustomerRequest {
  title: string,
  firstname: string,
  lastname: string,
  language: string,
  organisation?: {
    name: string,
    taxnumber: string
  },
}

export interface SignupRequest {
  organisation?: {
    name: string,
    taxNumber: string
  },
  contact: {
    title: string,
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    language: string
  }
}

export interface CompleteSignupRequest {
  address: {
    street: string,
    streetExtension: string,
    houseNumber: string,
    postalCode: string,
    city: string,
    countryIso: string,
    phoneNumber: string,
  },
  securityQuestion:{
    question:SecurityQuestion,
    answer: string
  }
}

export interface ChangePasswordRequest {
  currentPassword: string,
  password: string
}

export interface PaymentAccount {
  id?:number,
  owner: string,
  paymentType: PaymentType
}

export interface PaypalAccount extends  PaymentAccount{
  paypalAccount: string
}

export interface BankAccount extends PaymentAccount{
  bankName: string,
  iban: string,
  swiftCode: string,
  city: string,
  postalCode: string,
  countryIso: string
}

export interface State {
  user?: User,
  customer?:Customer
  view?: AppView
}
