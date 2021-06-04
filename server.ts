import express, { Request, Response } from "express";
import next from 'next'
import { isProd, isTest, isDev, isInt } from './env';
import { SERVICE_BASE_URL } from './config';
import mockRouter from './mock-data';
import { createProxyMiddleware } from 'http-proxy-middleware'
import setRequestBody from "./middleware/set-request-body"
import executeLogin from "./middleware/process-login"
import executeTokenCheck from "./middleware/checktoken"
import {parseCookies} from "./service/common";
import setToken from "./middleware/setToken";
import cookie from "cookie";

const port = process.env.PORT || 3000
const app = next({ dev: process.env.NODE_ENV !== 'production' })
const handle = app.getRequestHandler();

(async () => {
  try {
    await app.prepare();
    const server = express();
    const serviceBaseUrl = SERVICE_BASE_URL()
    server.use('/api', setToken);
    if (isDev(process.env)) {
      console.log(`>=> mock `)
      server.use('/api', mockRouter)
    } else {
      console.log(`>=> int/pre/prod `)
      server.use('/api', createProxyMiddleware(['/api/**', '!/api/login', '!/api/logout','!/api/auth/token', '!/api/auth/check_token'],{
        target: `${serviceBaseUrl}`,
        changeOrigin: false,
        //onProxyReq:onProxyReq,
        logLevel: 'debug'
      }))
      server.use('/api/auth/check_token',setRequestBody, executeTokenCheck)
      server.use('/api/auth/token',setRequestBody, executeLogin);
    }

    server
      .all('*', (req: Request, res: Response) => {
        return handle(req, res);
      })
      .listen(port, (err?: any) => {
        if (err) throw err;
        console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV} - api ${serviceBaseUrl}`);
      });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();

function onProxyReq(proxyReq, req, res) {
  // add custom header
  const cookies = parseCookies(req);
  console.log(JSON.stringify(req.get('set-cookie')))

  //console.log("3=>"+JSON.stringify(req.headers['cookie']))
  //console.log(JSON.stringify(req.headers)+"#########################################################")
  console.log("3=>"+JSON.stringify(req.headers['Authorization'])+"#########################################################")
  //proxyReq.setHeader('Authorization', req.headers['authorization']); //TODO do we really neeed to copy this
}
