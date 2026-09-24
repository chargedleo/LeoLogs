# Om Karmuse — Portfolio & Tech Blog

A personal portfolio and technical blog for **Om Karmuse**, an AI/ML developer specialized in NLP architectures, production RAG retrieval pipelines, and inference quantization.

Built with **Vite**, **React**, **TypeScript**, **Tailwind CSS v4**, **MDX**, and **react-router**. Static frontend with no server, API routes, or database requirements.

---

## Development

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build
```

---

## Adding Content

### 1. How to Add a New Article
Articles are authored as standalone `.mdx` files under `content/articles/` and automatically discovered via `import.meta.glob`.

1. Drop a new `.mdx` file into `content/articles/` (e.g. `content/articles/optimizing-vector-retrieval.mdx`).
2. Add YAML frontmatter at the top of the file:

```mdx
---
title: "Your Article Title"
date: "2026-04-01"
excerpt: "A concise 1-2 sentence description of the technical topic."
slug: "optimizing-vector-retrieval"
readTime: "5 min read"
---

## Introduction

Your markdown and React/MDX content goes here...
```

3. The article will automatically appear on `/articles` (sorted newest first) and will be reachable at `/articles/:slug`. No manual route registration or listing edit is required.

---

### 2. How to Add a New Project
Projects live in the typed data file `src/app/data/projects.ts`.

1. Open `src/app/data/projects.ts`.
2. Add a new object to the `projects` array:

```ts
{
  id: 'my-new-system',
  title: 'System or Project Name',
  description: 'Concise summary of architecture, objectives, and impact.',
  stack: ['Python', 'FastAPI', 'PyTorch', 'Docker'],
  metrics: 'Sub-50ms p95 latency under 1000 QPS load',
  highlights: [
    'Engineered asynchronous stream processing with backpressure handling.',
    'Reduced memory allocation by 35% through custom buffer pooling.'
  ],
  links: [
    {
      label: 'GitHub',
      url: 'https://github.com/chargedleo/my-new-system'
    }
  ]
}
```

3. Save the file. The new project will render immediately on the `/projects` page and the home page featured systems preview.