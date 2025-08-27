import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // --- START: PRODUCTION CORS FIX ---
  const frontendURL = 'https://yayawallettest-2cg5.vercel.app/'; 

  app.enableCors({
    origin: [
      'http://localhost:3001', // For local development
      frontendURL,            // For the deployed application
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  // --- END: PRODUCTION CORS FIX ---

  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
