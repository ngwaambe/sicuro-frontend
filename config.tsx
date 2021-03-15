import { Request } from 'express';
import {isProd, isDev, isInt} from './env';

export const SERVICE_BASE_URL = ( ) =>{
  return isProd() ?
    'http://api.sicuro.com' :
    (isInt()) ?
      'http://localhost:8080' : 'http://localhost:3000';
}
export const APP_BASE_URL =
  isProd() ? 'http://sicuro.com' : 'http://localhost:3000'

export const API_SECRET = process.env["AUTH_SERVICE_CLIENT_ID "]
export const API_PASSWORD = process.env["AUTH_SERVICE_CLIENT_SECRET "]


