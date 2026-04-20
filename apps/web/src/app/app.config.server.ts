import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { API_ENDPOINT_CONFIG } from '@arxis/api';
import { environment } from '../environments/environment';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes)),
    {
      provide: API_ENDPOINT_CONFIG,
      useValue: { url: process.env['API_URL'] || environment.apiUrl },
    },
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
