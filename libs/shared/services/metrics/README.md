# Servicio de Métricas

Un sistema robusto y escalable para manejar múltiples proveedores de métricas y analytics en aplicaciones Angular.

## Características

- 🎯 **Múltiples Proveedores**: Soporte para Google Analytics, Facebook Pixel, Mixpanel, Hotjar y más
- 🔧 **Configuración Flexible**: Configuración declarativa con tipado fuerte
- 🔄 **Inicialización Asíncrona**: Carga e inicialización asíncrona de scripts de terceros
- 📊 **Eventos Tipados**: Interfaces TypeScript para datos de eventos y usuarios
- 🛡️ **Manejo de Errores**: Logging y reporte de errores configurable
- 🔌 **Extensible**: Fácil adición de nuevos proveedores usando el patrón Strategy
- 💉 **Dependency Injection**: Uso moderno del sistema DI de Angular
- 🎮 **Control Granular**: Ejecutar métodos en proveedores específicos

## Patrones de Diseño Implementados

### Strategy Pattern
Cada proveedor de métricas implementa la interfaz `MetricProvider`, permitiendo intercambiar algoritmos de tracking de forma dinámica.

### Factory Pattern
`MetricProviderFactory` se encarga de crear instancias de proveedores específicos.

### Observer Pattern
Uso de RxJS Observables para manejar el estado de inicialización asíncrona.

### Dependency Injection
Uso del sistema DI moderno de Angular con `inject()` function.

## Instalación

El servicio está incluido en la librería `@alaz/services`:

```bash
npm install @alaz/services
```

## Configuración

### 1. Configuración de Providers

```typescript
import { ApplicationConfig } from '@angular/core';
import { 
  METRICS_CONFIG, 
  MetricProviderType,
  MetricsConfig 
} from '@alaz/services';

const metricsConfig: MetricsConfig = {
  enableLogging: true,
  enableErrorReporting: true,
  globalProperties: {
    platform: 'web',
    version: '1.0.0'
  },
  providers: {
    [MetricProviderType.GOOGLE_ANALYTICS]: {
      enabled: true,
      apiKey: 'GA_MEASUREMENT_ID',
      options: {
        anonymize_ip: true,
        allow_google_signals: false
      }
    },
    [MetricProviderType.FACEBOOK_PIXEL]: {
      enabled: true,
      apiKey: 'FACEBOOK_PIXEL_ID',
      options: {
        autoConfig: true
      }
    },
    [MetricProviderType.MIXPANEL]: {
      enabled: true,
      apiKey: 'MIXPANEL_PROJECT_TOKEN',
      options: {
        debug: false,
        track_pageview: true
      }
    }
  }
};

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: METRICS_CONFIG,
      useValue: metricsConfig
    },
    // ... otros providers
  ]
};
```

### 2. Variables de Entorno

Para mayor seguridad, usa variables de entorno:

```typescript
const metricsConfig: MetricsConfig = {
  providers: {
    [MetricProviderType.GOOGLE_ANALYTICS]: {
      enabled: environment.production,
      apiKey: environment.googleAnalyticsId,
    },
    [MetricProviderType.FACEBOOK_PIXEL]: {
      enabled: environment.production,
      apiKey: environment.facebookPixelId,
    },
    [MetricProviderType.MIXPANEL]: {
      enabled: true,
      apiKey: environment.mixpanelToken,
    }
  }
};
```

## Uso Básico

### Inyección del Servicio

```typescript
import { Component, inject, OnInit } from '@angular/core';
import { MetricsService, EventData, UserData } from '@alaz/services';

@Component({
  selector: 'app-my-component',
  template: '...'
})
export class MyComponent implements OnInit {
  private readonly metricsService = inject(MetricsService);

  ngOnInit(): void {
    // Esperar a que el servicio esté listo
    this.metricsService.isInitialized$.subscribe(isReady => {
      if (isReady) {
        console.log('Metrics service ready!');
      }
    });
  }
}
```

### Tracking de Eventos

```typescript
// Evento básico
this.metricsService.sendEvent('button_click', {
  button_id: 'cta-booking',
  page: '/tours',
  timestamp: Date.now()
});

// Evento de conversión
this.metricsService.trackConversion('purchase', 199.99, 'USD', {
  product_id: 'tour-cusco',
  category: 'tours',
  quantity: 1
});

// Page view
this.metricsService.trackPageView('/tours/machu-picchu', 'Machu Picchu Tour');
```

### Identificación de Usuarios

```typescript
// Identificar usuario
const userData: UserData = {
  id: '12345',
  email: 'usuario@example.com',
  name: 'Juan Pérez',
  properties: {
    plan: 'premium',
    country: 'PE',
    signup_date: '2024-01-15'
  }
};

this.metricsService.identifyUser(userData);

// Resetear usuario (logout)
this.metricsService.resetUser();
```

### Propiedades Globales

```typescript
// Registrar propiedades que se enviarán con todos los eventos
this.metricsService.register({
  user_type: 'premium',
  app_version: '2.1.0',
  feature_flags: ['new_ui', 'enhanced_search']
});
```

## Uso Avanzado

### Ejecutar en Proveedor Específico

```typescript
// Ejecutar solo en Mixpanel
this.metricsService.executeOnProvider(
  MetricProviderType.MIXPANEL, 
  (provider) => {
    if (provider.register) {
      provider.register({
        super_property: 'mixpanel_specific_value'
      });
    }
  }
);
```

### Verificar Proveedores Listos

```typescript
const readyProviders = this.metricsService.getReadyProviders();
console.log('Proveedores activos:', readyProviders);

const isReady = this.metricsService.isReady();
console.log('Servicio listo:', isReady);
```

## Crear Nuevos Proveedores

### 1. Implementar la Interfaz

```typescript
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseMetricProvider } from './interfaces/metric-provider.interface';
import { EventData, UserData, MetricProviderConfig, MetricProviderType } from './types/metric.types';

@Injectable({
  providedIn: 'root'
})
export class HotjarProvider extends BaseMetricProvider {
  readonly name = MetricProviderType.HOTJAR;

  protected doInitialize(config: MetricProviderConfig): Observable<boolean> {
    return new Observable(subscriber => {
      // Implementar lógica de inicialización
      // ...
      this.setReady(true);
      subscriber.next(true);
      subscriber.complete();
    });
  }

  sendEvent(eventName: string, data?: EventData): void {
    if (!this.isReady()) return;
    // Implementar envío de evento
  }

  identifyUser(userData: UserData): void {
    if (!this.isReady()) return;
    // Implementar identificación de usuario
  }

  resetUser(): void {
    if (!this.isReady()) return;
    // Implementar reset de usuario
  }
}
```

### 2. Registrar en la Factory

```typescript
// En el constructor de MetricProviderFactory o en la configuración
factory.registerProvider(MetricProviderType.HOTJAR, HotjarProvider);
```

### 3. Añadir al Enum

```typescript
export enum MetricProviderType {
  GOOGLE_ANALYTICS = 'googleAnalytics',
  FACEBOOK_PIXEL = 'facebookPixel',
  MIXPANEL = 'mixpanel',
  HOTJAR = 'hotjar',
  // ... nuevos proveedores
}
```

## Tipos de Datos

### EventData

```typescript
interface EventData {
  [key: string]: string | number | boolean | null | undefined | EventData | EventData[];
}
```

### UserData

```typescript
interface UserData {
  id: string | number;
  email?: string;
  name?: string;
  properties?: Record<string, string | number | boolean | null>;
}
```

### MetricProviderConfig

```typescript
interface MetricProviderConfig {
  enabled: boolean;
  apiKey?: string;
  options?: Record<string, unknown>;
}
```

## Eventos Comunes

```typescript
// E-commerce
this.metricsService.sendEvent('add_to_cart', {
  product_id: 'tour-123',
  product_name: 'Machu Picchu Tour',
  price: 299.99,
  currency: 'USD'
});

// Navegación
this.metricsService.sendEvent('search', {
  search_term: 'cusco tours',
  results_count: 15
});

// Engagement
this.metricsService.sendEvent('video_play', {
  video_id: 'intro-peru',
  duration: 120,
  position: 0
});

// Conversiones
this.metricsService.trackConversion('booking_completed', 299.99, 'USD', {
  booking_id: 'BK-2024-001',
  tour_date: '2024-06-15',
  participants: 2
});
```

## Testing

```typescript
import { TestBed } from '@angular/core/testing';
import { MetricsService, METRICS_CONFIG } from '@alaz/services';

describe('MetricsService', () => {
  let service: MetricsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: METRICS_CONFIG,
          useValue: {
            enableLogging: false,
            providers: {
              // Mock configuration
            }
          }
        }
      ]
    });
    service = TestBed.inject(MetricsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
```

## Mejores Prácticas

1. **Configuración por Entorno**: Usa diferentes configuraciones para desarrollo y producción
2. **Lazy Loading**: Los scripts se cargan de forma asíncrona sin bloquear la aplicación
3. **Error Handling**: El servicio maneja errores gracefully sin romper la aplicación
4. **Performance**: Solo se cargan los proveedores habilitados
5. **Privacy**: Configura opciones de privacidad según las regulaciones locales
6. **Testing**: Deshabilita métricas en entornos de testing

## Troubleshooting

### Problema: Proveedores no se inicializan

```typescript
// Verificar configuración
console.log('Config:', this.config);

// Verificar providers listos
console.log('Ready providers:', this.metricsService.getReadyProviders());

// Habilitar logging
const config: MetricsConfig = {
  enableLogging: true,
  // ...
};
```

### Problema: Eventos no se envían

```typescript
// Verificar que el servicio esté listo
this.metricsService.isInitialized$.subscribe(ready => {
  if (ready) {
    // Enviar eventos aquí
  }
});
```

## Roadmap

- [ ] Soporte para Customer.io
- [ ] Soporte para Hotjar
- [ ] Soporte para Amplitude
- [ ] Batch processing de eventos
- [ ] Offline queuing
- [ ] A/B testing integration
- [ ] GDPR compliance helpers

---

Este servicio de métricas proporciona una base sólida y escalable para el tracking de analytics en aplicaciones Angular, siguiendo las mejores prácticas de diseño de software y la arquitectura moderna de Angular.
