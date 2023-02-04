import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { config } from 'dotenv';
import { env } from 'process';

import { AppModule } from './app.module';
import { NotFoundInterceptor } from './shared/interceptors/not-found.interceptor';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new NotFoundInterceptor());
  await app.listen(env.PORT);
}
bootstrap();
