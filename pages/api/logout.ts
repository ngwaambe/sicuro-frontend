import { NextApiRequest, NextApiResponse } from 'next';

export default (req:NextApiRequest, res:NextApiResponse) => {
  if (req.cookies['token']) {
      res.setHeader("Set-Cookie", "token=;httpOnly=true;maxAge=0;expires=Thu, 01 Jan 1970 00:00:01 GMT;sameSite=strict;path=/")
  }
  res.statusCode = 200;
  res.end();
}
