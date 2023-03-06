import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggingService } from 'src/logging/logging.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new LoggingService('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
      this.logger.log(`Logging HTTP request:
- type: ${req.method}
- url: ${req.url}
- query: ${LoggingService.objectToString(req.query)}
- body: ${LoggingService.objectToString(req.body)}
- status: ${res.statusCode}`);
    });

    next();
  }
}
