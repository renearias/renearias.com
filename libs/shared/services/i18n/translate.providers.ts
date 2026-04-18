import { provideHttpClient, withFetch } from '@angular/common/http';
import { importProvidersFrom, Provider } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

export interface TranslateOptions {
  /** Base path where i18n JSON files live. Defaults to '/i18n/'. */
  basePath?: string;
  /** File extension for translation files. Defaults to '.json'. */
  fileExtension?: string;
}

export function provideTranslate(
  options?: TranslateOptions,
): Array<Provider | import('@angular/core').EnvironmentProviders> {
  const basePath = options?.basePath ?? '/i18n/';
  const fileExtension = options?.fileExtension ?? '.json';

  return [
    provideHttpClient(withFetch()),
    importProvidersFrom(TranslateModule.forRoot()),
    ...provideTranslateHttpLoader({ prefix: basePath, suffix: fileExtension }),
  ];
}
