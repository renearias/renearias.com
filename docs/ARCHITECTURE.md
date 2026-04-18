# Architecture

## Overview

renearias.com is built as an Nx monorepo containing an Angular SSR frontend and a NestJS API backend.

## Project Structure

```
apps/
  web/          # Angular 17+ frontend with SSR
  api/          # NestJS REST API
libs/
  shared/
    types/      # Shared TypeScript interfaces
    utils/      # Pure utility functions
    content/    # Static content data
    api-contracts/  # API request/response types
  ui/           # Shared Angular UI components
  features/     # Feature-specific Angular modules
    home/
    engineering/
    music/
    writing/
```

## Frontend (apps/web)

- Angular 17+ with standalone components
- Server-Side Rendering (SSR) via Angular Universal
- Tailwind CSS for styling
- Lazy-loaded routes for each page section

## Backend (apps/api)

- NestJS with TypeScript
- Swagger/OpenAPI documentation
- Class-validator for input validation
- CORS configured for frontend origins

## Shared Libraries

- **types**: TypeScript interfaces shared between frontend and backend
- **utils**: Pure utility functions (slugify, formatDate, etc.)
- **content**: Static content data (articles, projects, releases)
- **api-contracts**: DTOs and response types for API communication

## Design System

- Dark theme with #0a0a0a background
- Gold accent (#d4af37) for engineering/general UI
- Purple accent (#7c3aed) for music-related UI
- Inter font for body text, Playfair Display for headings
