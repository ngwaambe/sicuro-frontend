import { Request, Response } from 'express';
import {checkStatus} from "../service/common";
import cookie from "cookie";
import { SERVICE_BASE_URL } from './../config';

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
      // @ts-ignore
      res.setHeader("Set-Cookie",cookie.serialize("token", data.access_token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 60 * 60,
          sameSite: "strict",
          path: "/",
        })
      );
      res.status(200).json({loggedIn:true});
    },
    error: (data, resp) =>{
      res.status(401).json({loggedIn:false})
    }
  }))
    .catch(error => {
      console.log(error.message);
      res.status(401).json({loggedIn:false})
    });
};
