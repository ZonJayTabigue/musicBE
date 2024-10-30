/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,POST,PUT,PATCH,DELETE',
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
