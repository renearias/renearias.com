# Content Model

## Articles

Blog posts about engineering and music.

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique identifier |
| title | string | Article title |
| slug | string | URL-friendly identifier |
| excerpt | string | Short summary |
| content | string | Full article content (Markdown) |
| tags | string[] | Category tags |
| publishedAt | string | ISO date string |
| readingTime | number | Estimated reading time in minutes |

## Projects

Engineering projects and open source work.

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique identifier |
| title | string | Project title |
| slug | string | URL-friendly identifier |
| description | string | Project description |
| technologies | string[] | Tech stack used |
| repoUrl | string? | GitHub repository URL |
| demoUrl | string? | Live demo URL |
| featured | boolean | Whether to feature on homepage |

## Releases

Music releases (albums, EPs, singles).

| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique identifier |
| title | string | Release title |
| slug | string | URL-friendly identifier |
| type | 'album' \| 'ep' \| 'single' | Release type |
| releaseDate | string | ISO date string |
| coverArt | string? | URL to cover art image |
| streamingLinks | { platform, url }[] | Streaming platform links |
| tracklist | { trackNumber, title, duration }[] | Track listing |
