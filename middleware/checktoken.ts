import { Request, Response } from 'express';
import {SERVICE_BASE_URL} from './../config';
import jwt_decode from "jwt-decode";
const memCache = require("../service/get-cache");

export default async (req: Request, mainResponse: Response, next: any) => {
  const serviceBaseUrl = SERVICE_BASE_URL()
  const tokenRequest = JSON.parse(req.body);
  if (tokenRequest !== undefined && tokenRequest.token !== undefined && memCache.get(tokenRequest.token)) {
       const payload = memCache.get(tokenRequest.token)
       const expirationDate = getTokenExpirationDate(tokenRequest.token)
       if ( ((expirationDate * 1000) - Date.now()) / 60000 < 3) {
         try {
           const result = await refreshToken(serviceBaseUrl, payload)
           if(result.status === 200){
             const ttl = ( (result.data as any).expires_in * 1000) - Date.now();
             memCache.put( (result.data as any).access_token, result.data, ttl);
             return mainResponse.json({active:true, exp:100, refreshToken:result.data})
           }
         } catch (err) {
           console.log(`Authentication token is invalid. (message=${err.message})`, {
             stack: err.stack,
             meta: {req, mainResponse},
           });
         }
       } else {
         return mainResponse.json({active:true, exp:100})
       }
  }
  return mainResponse.json({active:false, exp:0})
};


const getTokenExpirationDate = (token: string):number =>{
  const decodedtoken = jwt_decode(token)
  return decodedtoken['exp'];
}

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
