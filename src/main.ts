import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { config } from 'dotenv';
import { env } from 'process';

import { AppModule } from './app.module';
import { NotFoundInterceptor } from './shared/interceptors/not-found.interceptor';
import { setHeaders } from './shared/middlewares/headers.middleware';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(setHeaders);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalInterceptors(new NotFoundInterceptor());
  await app.listen(env.PORT);
}
bootstrap();
