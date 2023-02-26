import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggingService } from 'src/logging/logging.service';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    constructor(private loggingService: LoggingService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const responseData = {
        statusCode: status,
        message: exception.message,
        timestamp: new Date().toISOString(),
        path: request.url
    };

    response
      .status(status)
      .json(responseData);

    this.loggingService.error(LoggingService.objectToString(responseData));
  }
}