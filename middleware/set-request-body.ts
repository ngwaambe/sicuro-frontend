import { Request, Response } from 'express';

export default (req: Request, res: Response, next: any) => {
  var data='';
  req.setEncoding('utf8');
  req.on('data', function(chunk) {
    data += chunk;
  });

  req.on('end', function() {
    req.body = data;
    next();
  });
};
