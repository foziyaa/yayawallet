import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // This line allows your React frontend (on a different port)
  // to make requests to this backend.
  app.enableCors();

  // This line adds a global prefix to all routes.
  // So, TransactionController's '/transactions' becomes '/api/transactions'.
  app.setGlobalPrefix('api');

  await app.listen(3000);
}
bootstrap();