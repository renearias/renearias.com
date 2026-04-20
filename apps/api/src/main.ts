import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:4200', 'https://renearias.com'],
    methods: ['GET', 'POST'],
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('René Arias API')
    .setDescription('Personal website API for content and contact')
    .setVersion('1.0')
    .addTag('health', 'Health check endpoints')
    .addTag('content', 'Content endpoints')
    .addTag('contact', 'Contact endpoints')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env['PORT'] || 3000;
  try {
    await app.listen(port);
    console.log(`API running on port ${port}`);
  } catch (err: any) {
    if (err?.code === 'EADDRINUSE') {
      console.warn(`Port ${port} in use — skipping listen (likely Firebase CLI analysis)`);
      return;
    }
    throw err;
  }
}

bootstrap();

