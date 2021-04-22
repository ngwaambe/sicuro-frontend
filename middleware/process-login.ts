import { Request, Response } from 'express';
import {checkStatus} from "../service/common";
import { SERVICE_BASE_URL } from './../config';
const memCache = require("../service/get-cache");

export default (req: Request, res: Response, next: any) => {
  const serviceBaseUrl = SERVICE_BASE_URL()
  fetch(`${serviceBaseUrl}/api/auth/token`,{
    body: req.body,
    headers: {
      'Content-Type': req.get('Content-Type')
    },
    method: 'POST'
  }).then(checkStatus({
    success:(data, resp) =>{
      const ttl = ( (data as any).expires_in * 1000) - Date.now();
      memCache.put( (data as any).access_token, data, ttl);
      res.cookie("token",(data as any).access_token,{
        httpOnly: true,
        maxAge: 3600 * 1000,
        sameSite: "strict",
        path: "/",
      });
      res.status(200).json({loggedIn:true});
    },
    error: (data, resp) =>{
      res.status(resp.status).json({loggedIn:false})
    }
  }))
  .catch(error => {
    console.log(error.message);
    console.log(error.data);
    //console.log(error.response);
    res.status(401).json({loggedIn:false})
  });
};
