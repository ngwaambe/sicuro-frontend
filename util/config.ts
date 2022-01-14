import {isProd, isDev, isInt, isTest} from './env';
const localIp = 'localhost'; //internalIp.v4.sync()

export const SERVICE_BASE_URL = ( ) =>{

  return isProd() ?
    'http://api.sicuro.com:8080' :
    (isInt()) ?
      'http://localhost:8080' : 'http://localhost:8080';
}
export const APP_BASE_URL = () =>{
  console.log(process.env.NODE_ENV)
  return isProd() ? 'http://localhost:3000' : isTest() ? 'http://46.163.75.202:300' :  `http://localhost:3000`;
}


