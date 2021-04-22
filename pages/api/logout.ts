import { NextApiRequest, NextApiResponse } from 'next';
import cookie from "cookie"

export default (req:NextApiRequest, res:NextApiResponse) => {
  res.setHeader("Set-Cookie", cookie.serialize("token", "", {
      httpOnly: true,
      expires: new Date(0),
      sameSite: "strict",
      path: "/",
    })
  );
  //res.writeHead(302, {Location:'/'});
  res.statusCode = 200;
  res.end();
}
