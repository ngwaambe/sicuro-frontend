import { Request, Response } from 'express';
import {SERVICE_BASE_URL} from './../config';
import{ getCustomerId, getTokenExpirationDate, hasTemproraryPwd, hasSecurityQuestion } from "../service/common"
const memCache = require('memory-cache');


export default async (req: Request, mainResponse: Response, next: any) => {
  const serviceBaseUrl = SERVICE_BASE_URL()
  const tokenRequest = JSON.parse(req.body);
  if (tokenRequest !== undefined && tokenRequest.token !== undefined && memCache.get(tokenRequest.token)) {
       const payload = memCache.get(tokenRequest.token)
       if (payload !== null ) {
         const expirationDate = getTokenExpirationDate(payload.access_token)
         if ( ((expirationDate * 1000) - Date.now()) / 60000 < 3) {
           try {
             const result = await refreshToken(serviceBaseUrl, payload)
             if(result.status === 200){
               const access_token = (result.data as any).access_token
               console.log("refreshed token:"+access_token)
               const ttl = ( (result.data as any).expires_in * 1000) - Date.now();
               memCache.put( tokenRequest.token, result.data, ttl);
               const tempPwd = hasTemproraryPwd(access_token)
               const securityQuestion = hasSecurityQuestion(access_token)
               const customerId = getCustomerId(payload.access_token)
               return mainResponse.json({
                 active: true,
                 tempPwd: tempPwd,
                 securityQuestion: securityQuestion,
                 customerId: customerId
               })
             }
           } catch (err) {
             console.log(`Authentication token is invalid. (message=${err.message})`, {
               stack: err.stack,
               meta: {req, mainResponse},
             });
             return mainResponse.json({active:false})
           }
         } else {
           const tempPwd = hasTemproraryPwd(payload.access_token)
           const securityQuestion = hasSecurityQuestion(payload.access_token)
           const customerId = getCustomerId(payload.access_token)
           return mainResponse.json({
             active: true,
             tempPwd: tempPwd,
             securityQuestion: securityQuestion,
             customerId: customerId
           })
         }
       }
  }
  return mainResponse.json({active:false, exp:0})
};


const refreshToken = async (url: string, payload: any):Promise<any> =>{
  const response = await fetch(`${url}/api/auth/refresh_token`, {
    body: `{"token": "${payload.refresh_token}"}`,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': `Bearer ${payload.access_token}`
    },
    method: 'POST'
  })

  let data = null;
  try {
    data = await response.text();
    data = JSON.parse(data);
  } catch (err) { /* ignore */
  }
  return {status:response.status, data};

}
