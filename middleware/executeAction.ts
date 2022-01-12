import { Request, Response } from 'express';
import {SERVICE_BASE_URL} from './../config';
import cookie from "cookie";
const memCache = require('memory-cache');

/**
 * Hook to any request which needs a token refresh afterwards
 * @param req
 * @param rep
 * @param next
 */
export default async (req: Request, rep: Response, next: any) => {
  function refreshTokenAfterExecution() {
    console.log("Refresh auth token triggered")
    const serviceBaseUrl = SERVICE_BASE_URL()
    if (req.headers['cookie'] !== undefined) {
      const data = cookie.parse(req.headers['cookie'])
      const payload = memCache.get(data.token)
      if (payload !== null) {
        refreshToken(serviceBaseUrl, payload).then( (res) => {
           if (res.status >= 200 && res.status < 300){
             console.log("Refresh auth token successful")
             const ttl = ((res.data as any).expires_in * 1000) - Date.now();
             memCache.put(data.token, res.data, ttl);
           } else {
             console.log("Refresh auth token failed")
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
    console.log("Error: "+JSON.stringify(err))
  }
  //console.log(data )
  return {status:response.status, data};

}
