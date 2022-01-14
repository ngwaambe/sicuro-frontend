import { Request, Response } from 'express';
import {SERVICE_BASE_URL} from '../util/config';
import{ getCustomerId, getTokenExpirationDate, hasTemproraryPwd, completeRegistration } from "../service/common"
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
               const ttl = ( (result.data as any).expires_in * 1000) - Date.now();
               memCache.put( tokenRequest.token, result.data, ttl);

               const tempPwd = hasTemproraryPwd(access_token)
               const registrationNotCompleted = completeRegistration(access_token)
               const customerId = getCustomerId(payload.access_token)

               return mainResponse.json({
                 active: true,
                 orphanedToken:false,
                 tempPwd: tempPwd,
                 completeRegistration: registrationNotCompleted,
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
           const registrationNotCompleted = completeRegistration(payload.access_token)
           const customerId = getCustomerId(payload.access_token)
           return mainResponse.json({
             active: true,
             orphanedToken:false,
             tempPwd: tempPwd,
             completeRegistration: registrationNotCompleted,
             customerId: customerId
           })
         }
       }
  }
  return mainResponse.json({active:false, orphanedToken:true})
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
    console.log("access_tkeon:"+JSON.stringify(data))
  } catch (err) { /* ignore */
  }
  return {status:response.status, data};

}
