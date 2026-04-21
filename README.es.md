# renearias.com

[![Angular](https://img.shields.io/badge/Angular-21-dd0031?logo=angular&logoColor=white)](https://angular.dev)
[![NestJS](https://img.shields.io/badge/NestJS-11-e0234e?logo=nestjs&logoColor=white)](https://nestjs.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06b6d4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Nx](https://img.shields.io/badge/Nx-22-143055?logo=nx&logoColor=white)](https://nx.dev)
[![Firebase](https://img.shields.io/badge/Firebase-Hosting%20%26%20Functions-ffca28?logo=firebase&logoColor=black)](https://firebase.google.com)
[![Licencia: ISC](https://img.shields.io/badge/Licencia-ISC-blue.svg)](https://opensource.org/licenses/ISC)

Sitio web personal de René Arias — ingeniero de software y artista musical.

## Tecnologías

- **Frontend**: Angular 21+ con SSR (Renderizado del lado del servidor)
- **Backend**: API REST con NestJS
- **Monorepo**: Nx workspace
- **Estilos**: Tailwind CSS
- **Lenguaje**: TypeScript (modo estricto)

## Estructura

```
apps/
  web/          # Frontend Angular con SSR
  api/          # API NestJS
libs/
  shared/
    types/      # Interfaces TypeScript compartidas
    utils/      # Funciones utilitarias puras
    content/    # Datos de contenido estático
    api-contracts/  # DTOs y tipos de respuesta de la API
  ui/           # Componentes Angular compartidos
  features/     # Librerías Angular por funcionalidad
    home/
    engineering/
    music/
    writing/
```

## Desarrollo

```bash
npm install

# Iniciar frontend
npx nx serve web

# Iniciar API
npx nx serve api

# Ejecutar pruebas
npx nx run-many -t test

# Compilar todo
npx nx run-many -t build
```

## Documentación

- [Arquitectura](docs/ARCHITECTURE.md)
- [Modelo de Contenido](docs/CONTENT_MODEL.md)
- [Contribuir](docs/CONTRIBUTING.md)
- [Hoja de Ruta](docs/ROADMAP.md)

## Licencia

[ISC](LICENSE) © 2026 René Arias
