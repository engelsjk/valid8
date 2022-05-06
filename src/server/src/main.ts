import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const server = await app.listen(3001);
  server.setTimeout(30 * 1000);
}
bootstrap();
