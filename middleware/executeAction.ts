import { Request, Response } from 'express';
import {SERVICE_BASE_URL} from './../config';
import cookie from "cookie";
const memCache = require('memory-cache');


export default async (req: Request, rep: Response, next: any) => {
  function refreshTokenAfterExecution() {
    console.log("working as expected-1")
    const serviceBaseUrl = SERVICE_BASE_URL()
    if (req.headers['cookie'] !== undefined) {
      console.log("working as expected-2")
      const data = cookie.parse(req.headers['cookie'])
      const payload = memCache.get(data.token)
      if (payload !== null) {
        console.log("working as expected-3:"+serviceBaseUrl)
        refreshToken(serviceBaseUrl, payload).then( (res) => {
           if (res.status >= 200 && res.status < 300){
             console.log(res.status)
             console.log("working as expected-4")
             const ttl = ((res.data as any).expires_in * 1000) - Date.now();
             memCache.put(data.token, res.data, ttl);
           } else {
             console.log("working as expected-5")
             console.log("Error occured while refreshing access token")
           }
        })
      }
    }
  }

  rep.on('finish', refreshTokenAfterExecution)
  return next();
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
    console.log(JSON.stringify(err))
  }
  console.log(data )
  return {status:response.status, data};

}
