import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { config } from 'dotenv';
import { join } from 'node:path';
import { env } from 'process';

import { AppModule } from './app.module';
import { LoggingService } from './logging/logging.service';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';
import { NotFoundInterceptor } from './shared/interceptors/not-found.interceptor';
import { setHeaders } from './shared/middlewares/headers.middleware';

config();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'doc'), { prefix: '/doc' });
  app.use(setHeaders);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalInterceptors(new NotFoundInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter(new LoggingService()));
  app.useLogger(app.get(LoggingService));
  await app.listen(env.PORT);

  process.on('uncaughtException', (err) => {
    app.get(LoggingService).error(`Uncaught Exception: ${err.message}`);
    process.exit(1);
  });

  process.on('unhandledRejection', (reason, promise) => {
    app
      .get(LoggingService)
      .error(`Unhandled rejection at ${promise}, reason: ${reason}`);
    process.exit(1);
  });
}
bootstrap();
