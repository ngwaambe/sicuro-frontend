import { Request, Response } from 'express';
import cookie from "cookie"
const memCache = require('memory-cache');

export default (req: Request, res: Response, next: any) => {
  if (req.headers['cookie'] !== undefined) {
    const data = cookie.parse(req.headers['cookie'])
    const payload = memCache.get(data.token)
    if (payload !== null) {
      req.headers['Authorization'] = `Bearer ${payload.access_token}`;
    }
  }
  return next();
};
