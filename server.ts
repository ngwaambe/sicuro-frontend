import express, { Request, Response } from "express";
import next from 'next'
import { isProd, isTest, isDev, isInt } from './util/env';
import { SERVICE_BASE_URL } from './util/config';
import mockRouter from './util/mock-data';
import { createProxyMiddleware } from 'http-proxy-middleware'
import setRequestBody from "./middleware/set-request-body"
import executeLogin from "./middleware/process-login"
import executeTokenCheck from "./middleware/checktoken"
import setToken from "./middleware/setToken";
import refreshTokenAction from "./middleware/executeAction";

const port = process.env.PORT || 3000
const app = next({ dev: process.env.NODE_ENV !== 'production' })
const handle = app.getRequestHandler();

(async () => {
  try {
    await app.prepare();
    const server = express();
    const serviceBaseUrl = SERVICE_BASE_URL()
    server.use('/api', setToken);
    if (isDev()) {
      //server.use('/api/auth/complete_signup', executeAction)
      console.log(`>=> mock `)
      server.use('/api', mockRouter)
    } else {
      console.info(`>=> int/test/prod `)
      server.use('/api/auth/complete_signup', refreshTokenAction)
      server.use('/api/customers/**/change_password', refreshTokenAction)
      server.use('/api', createProxyMiddleware([
        '/api/**',
        '!/api/logout',
        '!/api/auth/activate_account',
        '!/api/auth/refresh_token',
        '!/api/auth/token',
        '!/api/auth/check_token'],{
        target: `${serviceBaseUrl}`,
        changeOrigin: false,
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
        console.info(`> Ready on localhost:${port} - env ${process.env.NODE_ENV} - api ${serviceBaseUrl}`);
      }).timeout = 0;

  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();

