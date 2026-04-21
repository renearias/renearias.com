# renearias.com

[![Angular](https://img.shields.io/badge/Angular-21-dd0031?logo=angular&logoColor=white)](https://angular.dev)
[![NestJS](https://img.shields.io/badge/NestJS-11-e0234e?logo=nestjs&logoColor=white)](https://nestjs.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06b6d4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Nx](https://img.shields.io/badge/Nx-22-143055?logo=nx&logoColor=white)](https://nx.dev)
[![Firebase](https://img.shields.io/badge/Firebase-Hosting%20%26%20Functions-ffca28?logo=firebase&logoColor=black)](https://firebase.google.com)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

Personal website for René Arias — software engineer and music artist.

## Stack

- **Frontend**: Angular 17+ with SSR (Server-Side Rendering)
- **Backend**: NestJS REST API
- **Monorepo**: Nx workspace
- **Styling**: Tailwind CSS
- **Language**: TypeScript (strict mode)

## Structure

```
apps/
  web/          # Angular SSR frontend
  api/          # NestJS API
libs/
  shared/
    types/      # Shared TypeScript interfaces
    utils/      # Pure utility functions
    content/    # Static content data
    api-contracts/  # API DTOs and response types
  ui/           # Shared Angular components
  features/     # Feature-specific Angular libraries
    home/
    engineering/
    music/
    writing/
```

## Development

```bash
npm install

# Start frontend
npx nx serve web

# Start API
npx nx serve api

# Run tests
npx nx run-many -t test

# Build all
npx nx run-many -t build
```

## Documentation

- [Architecture](docs/ARCHITECTURE.md)
- [Content Model](docs/CONTENT_MODEL.md)
- [Contributing](docs/CONTRIBUTING.md)
- [Roadmap](docs/ROADMAP.md)
