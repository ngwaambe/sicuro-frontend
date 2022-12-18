import { Request, Response } from 'express';
import {
  checkStatus,
  getCustomerId,
  hasSecurityQuestion,
  hasTemproraryPwd
} from "../service/common";
import { SERVICE_BASE_URL } from '../util/config';
import { v4 as uuidv4 } from 'uuid';
const memCache = require('memory-cache');

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
      const sessionId = uuidv4()
      const ttl = ( (data as any).expires_in * 1000) - Date.now();
      console.log("token:"+JSON.stringify(data));
      memCache.put( sessionId, data, ttl);
      res.cookie("token",sessionId,{
        httpOnly: true,
        maxAge: Math.ceil(ttl),
        sameSite: "strict",
        path: "/",
      });
      const access_token = (data as any).access_token
      const tempPwd = hasTemproraryPwd(access_token)
      const securityQuestion = hasSecurityQuestion(access_token)
      const customerId = getCustomerId(access_token)
      res.status(200).json({
        active: true,
        orphanedToken:false,
        tempPwd: tempPwd,
        hasSecurityQuestion: securityQuestion,
        customerId: customerId
      });
    },
    error: (data, resp) =>{
      res.status(resp.status).json({loggedIn:false})
    }
  }))
  .catch(error => {
    console.log("Error:"+error.message);
    res.status(401).json({loggedIn:false})
  });
};
