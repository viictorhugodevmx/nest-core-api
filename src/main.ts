import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import compression from 'compression';
import helmet from 'helmet';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { RequestLoggerInterceptor } from './common/interceptors/request-logger.interceptor';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(
    AppModule
  );

  const configService = app.get(
    ConfigService
  );

  const port = configService.get<number>(
    'PORT',
    3004
  );

  const corsOrigin = configService.get<string>(
    'CORS_ORIGIN',
    'http://localhost:5173'
  );

  app.setGlobalPrefix('api');

  app.use(helmet());

  app.enableCors({
    origin: corsOrigin,
    credentials: true
  });

  app.use(
    compression({
      threshold: 1024
    })
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  );

  app.useGlobalFilters(
    new HttpExceptionFilter()
  );

  app.useGlobalInterceptors(
    new RequestLoggerInterceptor(),
    new ResponseInterceptor()
  );

  await app.listen(port);
}

void bootstrap();
