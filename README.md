# Blorg

[![CI](https://github.com/rvagg/blorg/actions/workflows/test-and-release.yml/badge.svg)](https://github.com/rvagg/blorg/actions/workflows/test-and-release.yml)

[![NPM](https://nodei.co/npm/blorg.svg?style=flat&data=n,v&color=blue)](https://nodei.co/npm/blorg/)

A flexible static blog / website generation engine.

## Installation

```bash
npm install blorg
```

## Quick Start

```bash
blorg config.json
```

Where `config.json` defines your blog structure (see [Configuration](#configuration) below).

## Directory Structure

A typical blog setup:

```
my-blog/
├── build.js          # Your build script
├── posts/            # Markdown posts
│   ├── my-first-post.md
│   └── another-post.md
├── templates/        # Nunjucks templates
│   ├── post.html     # Individual post template
│   ├── index.html    # Index/archive template
│   └── feed.xml      # Atom feed template
└── output/           # Generated site (git submodule or deploy target)
```

## Post Format

Posts are markdown files with a JSON metadata header:

```markdown
{
  "title": "My First Post",
  "date": "2026-01-24",
  "author": "Your Name"
}

Your markdown content here. Supports **GFM** and fenced code blocks
with syntax highlighting.
```

### Metadata Fields

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | Post title |
| `date` | Yes | Publication date (used for sorting) |
| `author` | No | Author name |
| `draft` | No | Set to `true` to exclude from output |
| `path` | No | Custom URL path (overrides config pattern) |
| `base` | No | URL slug (auto-generated from title if omitted) |

Any additional fields you add are available in templates via `post.spec.yourField`.

### Custom Paths

By default, posts use the path pattern from config (e.g., `/{year}/{month}/{title}.html`). Override per-post:

```json
{
  "title": "My Post",
  "date": "2026-01-24",
  "path": "/{title}.html"
}
```

Path patterns support: `{year}`, `{month}`, `{title}` (the base slug).

## Templates

Blorg uses [Nunjucks](https://mozilla.github.io/nunjucks/) for templating.

### post.html

Renders individual posts. Available variables:

| Variable | Description |
|----------|-------------|
| `spec` | Post metadata object (`spec.title`, `spec.date`, `spec.author`, etc.) |
| `page` | Rendered HTML content |
| `date` | Build timestamp |
| `postSpecs` | Array of all post metadata (for navigation/sidebar) |
| `blogPosts` | Array of all posts (full objects) |

Example:

```html
{% extends "layout.html" %}

{% block content %}
<article>
  <h1>{{ spec.title }}</h1>
  <time>{{ spec.date | date("F j, Y") }}</time>
  {{ page | safe }}
</article>
{% endblock %}
```

### index.html

Renders index and archive pages. Additional variables:

| Variable | Description |
|----------|-------------|
| `posts` | Array of posts for this page |
| `nextPage` | Next page number (or `null`) |
| `prevPage` | Previous page number (or `null`) |

Example:

```html
{% for post in posts %}
<article>
  <h2><a href="{{ post.spec.path }}">{{ post.spec.title }}</a></h2>
  <time>{{ post.spec.date | date("F j, Y") }}</time>
</article>
{% endfor %}

{% if prevPage !== null %}
<a href="page{{ prevPage }}.html">Newer</a>
{% endif %}
{% if nextPage !== null %}
<a href="page{{ nextPage }}.html">Older</a>
{% endif %}
```

### feed.xml

Atom feed template. Same variables as index, but typically uses `blogPosts` for all posts.

## Configuration

A minimal `config.json`:

```json
{
  "templateRoot": "./templates/",
  "outputRoot": "./output/",
  "data": [
    {
      "id": "blogPosts",
      "type": "markdown-posts",
      "postRoot": "./posts/",
      "path": "/{year}/{month}/{title}.html"
    },
    {
      "id": "postSpecs",
      "type": "post-specs",
      "blogData": "blogPosts"
    },
    {
      "id": "postTemplate",
      "type": "nunjucks-template",
      "file": "post.html"
    },
    {
      "id": "indexTemplate",
      "type": "nunjucks-template",
      "file": "index.html"
    },
    {
      "id": "feedTemplate",
      "type": "nunjucks-template",
      "file": "feed.xml"
    }
  ],
  "output": [
    {
      "id": "posts",
      "type": "post-files",
      "template": "postTemplate",
      "data": ["date", "blogPosts", "postSpecs"]
    },
    {
      "id": "index",
      "type": "index-files",
      "postsPerPage": 5,
      "indexFile": "index.html",
      "archiveFile": "page{number}.html",
      "template": "indexTemplate",
      "data": ["date", "blogPosts", "postSpecs"]
    },
    {
      "id": "feed",
      "type": "single-file",
      "output": "atom.xml",
      "template": "feedTemplate",
      "data": ["date", "blogPosts"]
    }
  ]
}
```

### Data Sources

Loaded sequentially (order matters - later sources can reference earlier ones).

| Type | Description |
|------|-------------|
| `markdown-posts` | Load posts from a directory via [ssbl](https://github.com/rvagg/ssbl) |
| `post-specs` | Extract just metadata from loaded posts |
| `nunjucks-template` | Compile a Nunjucks template |
| `multi-page-markdown` | Load markdown split into pages (for presentations) |

### Output Processors

Run in parallel after all data is loaded.

| Type | Description |
|------|-------------|
| `single-file` | Render one template to one file |
| `post-files` | Render each post to its own file |
| `index-files` | Render paginated index/archive pages |

## Programmatic API

For build scripts or integration with other tools:

```javascript
import Blorg, { archetypes } from 'blorg'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Use the blog archetype for sensible defaults
const config = archetypes.blog({
  outputRoot: './output/',
  // Optional overrides:
  // templateRoot: './templates/',
  // postRoot: './posts/',
  // postPath: '/{year}/{month}/{title}.html',
})

const blorg = new Blorg(__dirname, config)
await blorg.run()
```

## Markdown & Syntax Highlighting

Posts are processed with [Brucedown](https://github.com/rvagg/brucedown):
- GitHub Flavoured Markdown (tables, strikethrough, task lists)
- [Shiki](https://shiki.style/) syntax highlighting (VS Code quality, 200+ languages)
- Output uses inline styles (no CSS required for code blocks)

## Licence

MIT Licence. Copyright (c) Rod Vagg.
