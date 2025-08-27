import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // --- THE DEFINITIVE CORS FIX ---
  // By calling enableCors() with no options, we are telling our backend
  // to allow requests from ANY origin. This is the most robust way
  // to solve this issue in a deployment environment like Render.
  app.enableCors();
  // --- END OF FIX ---

  app.setGlobalPrefix('api');
  
  // Render provides the PORT as an environment variable
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
