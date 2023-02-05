import { Request, Response, NextFunction } from 'express';
import { CONTENT_TYPE } from 'src/app.const';

export function setHeaders(req: Request, res: Response, next: NextFunction) {
  req.headers['content-type'] = CONTENT_TYPE;
  res.set('Accept', CONTENT_TYPE);
  next();
}
