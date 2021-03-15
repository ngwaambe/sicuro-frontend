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


export class FetchTimeoutError extends Error {
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export interface User {
  loggedIn: boolean;
  username?: string;
  title?: string;
  firstName?: string;
  lastName?: string;
}

export enum Title {
  SELECT = "Select",
  Mr = "title-Mr",
  Ms = "title-Ms",
  Mrs = "title-Mrs",
  Mr_Dr = "title-Mr_Dr",
  Mrs_Dr = "title-Ms_Dr",
  Mr_Prof = "title-Mr_Prof",
  Mrs_Prof = "title-Ms_Prof"
}

export enum Language {
  SELECT = "Select",
  en = "language_en",
  es = "language_es",
  it = "language_it"
}


export interface SignupRequest {
  organisation?: {
    name: string,
    taxnumber: string
  },
  contact: {
    title: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    preferredLanguage: string
  }
}

export interface State {
  user?: User
}
