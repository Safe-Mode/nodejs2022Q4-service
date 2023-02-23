import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggingService } from 'src/logging/logging.service';

const objectToString = (object: unknown): string => Object.keys(object).reduce(
    (result, param, index) =>
        `${result}${param}: ${object[param]}${Object.keys(object).length - 1 === index ? ' }' : ', '}`,
    '{ '
);

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new LoggingService('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    this.logger.log(`Logging HTTP request:
    - type: ${req.method}
    - url: ${req.url}
    - query: ${objectToString(req.query)}
    - body: ${objectToString(req.body)}
    - status: ${res.statusCode}`);

    next();
  }
}

