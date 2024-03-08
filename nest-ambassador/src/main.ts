import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from "cookie-parser"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: [
      "http://localhost:3000",
      "http://localhost:4300",
      "http://localhost:5001",
      "http://localhost:4000"
    ],
    credentials: true
  });
  app.use(cookieParser())
  await app.listen(3000);
}
bootstrap();
