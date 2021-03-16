import express, { Request, Response } from "express";
import next from 'next'
import { isProd, isTest, isDev, isInt } from './env';
import { SERVICE_BASE_URL } from './config';
import mockRouter from './mock-data';
import { createProxyMiddleware, Filter, Options, RequestHandler } from 'http-proxy-middleware'
import setRequestBody from "./middleware/set-request-body"
import executeLogin from "./middleware/process-login"

const port = process.env.PORT || 3000
const app = next({ dev: process.env.NODE_ENV !== 'production' })
const handle = app.getRequestHandler();

(async () => {
  try {
    await app.prepare();
    const server = express();
    const serviceBaseUrl = SERVICE_BASE_URL()
    if (isDev(process.env)) {
      server.use('/api', mockRouter)
    } else {
      server.use('/api', createProxyMiddleware(['/api/**', '!/api/login', '!/api/logout','!/api/auth/token'],{
        target: `${serviceBaseUrl}`,
        changeOrigin: false,
        logLevel: 'debug'
      }))
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

