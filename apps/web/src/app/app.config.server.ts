import { mergeApplicationConfig, ApplicationConfig, makeStateKey, TransferState } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { API_ENDPOINT_CONFIG } from '@arxis/api';

export const API_URL_STATE_KEY = makeStateKey<string>('apiUrl');

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes)),
    {
      provide: API_ENDPOINT_CONFIG,
      useFactory: (transferState: TransferState) => {
        const url = process.env['API_URL'] ?? '';
        transferState.set(API_URL_STATE_KEY, url);
        return { url };
      },
      deps: [TransferState],
    },
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
