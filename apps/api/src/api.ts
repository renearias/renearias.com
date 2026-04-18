import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import express, { Express } from 'express';
import { AppModule } from './app/app.module';

export const server: Express = express();

// @nestjs/platform-express uses the deprecated Express 3.x `app.router` getter
// which throws in Express 4.x. Override it to return the internal `_router` instead.
Object.defineProperty(server, 'router', {
  get: () => (server as any)._router,
  configurable: true,
  enumerable: false,
});

export async function createFunction(expressInstance: Express): Promise<Express> {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
    { logger: ['error', 'warn'] },
  );

  app.enableCors({
    origin: ['http://localhost:4200', 'https://renearias.com'],
    methods: ['GET', 'POST'],
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  app.setGlobalPrefix('api');

  await app.init();

  return expressInstance;
}
