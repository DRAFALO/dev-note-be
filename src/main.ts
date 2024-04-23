import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from '~/app.module';
import { SwaggerModule } from '@nestjs/swagger';
import {
  swaggerPath,
  swaggerDocumentOptions,
  swaggerSetupOptions,
} from "~/shared/swagger/swagger";
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.enableCors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  });
  app.setGlobalPrefix('api/v1');

  const document = SwaggerModule.createDocument(app, swaggerDocumentOptions);
  SwaggerModule.setup(swaggerPath, app, document, swaggerSetupOptions);
  await app.listen(3000);
}
bootstrap();