import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideAppInitializer,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { provideRouter, withViewTransitions } from '@angular/router';
import { appRoutes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { I18nService } from 'i18n';
import { provideApi, API_ENDPOINT_CONFIG } from '@arxis/api';
import { makeStateKey, TransferState } from '@angular/core';

const API_URL_STATE_KEY = makeStateKey<string>('apiUrl');

export const appConfig: ApplicationConfig = {
  providers: [
    provideClientHydration(withEventReplay()),
    provideBrowserGlobalErrorListeners(),
    provideRouter(appRoutes, withViewTransitions()),
    provideHttpClient(withFetch()),
    ...provideApi({ url: '' }),
    {
      provide: API_ENDPOINT_CONFIG,
      useFactory: (transferState: TransferState) => {
        const url = transferState.get(API_URL_STATE_KEY, '');
        return { url };
      },
      deps: [TransferState],
    },
    importProvidersFrom(TranslateModule.forRoot()),
    ...provideTranslateHttpLoader({ prefix: '/i18n/', suffix: '.json' }),
    provideAppInitializer(() => {
      const i18n = inject(I18nService);
      const platformId = inject(PLATFORM_ID);
      const navigatorLang = isPlatformBrowser(platformId)
        ? navigator.language
        : undefined;
      const locale = i18n.detectLocale(undefined, undefined, navigatorLang);
      return i18n.use(locale, 'app.title');
    }),
  ],
};
