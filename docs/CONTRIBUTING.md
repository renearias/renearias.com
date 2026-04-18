# Contributing

## Development Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the frontend: `npx nx serve web`
4. Start the API: `npx nx serve api`

## Code Style

- TypeScript strict mode
- ESLint for linting
- Prettier for formatting

## Commit Convention

Use conventional commits:
- `feat:` new features
- `fix:` bug fixes
- `docs:` documentation
- `chore:` maintenance

## Adding Content

Content lives in `libs/shared/content/src/index.ts`. Add new articles, projects, or releases there.

## Testing

```bash
# Run all tests
npx nx run-many -t test

# Run specific project tests
npx nx test web
npx nx test api
```
