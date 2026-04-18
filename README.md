# renearias.com

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
