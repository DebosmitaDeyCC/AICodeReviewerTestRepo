# Architecture Plan

## Stack

- Next.js 16.2.6
- App Router
- TypeScript
- Tailwind CSS
- OpenAI API

## Current Scaffold

```txt
app/
  api/
    review/
      route.ts
  globals.css
  layout.tsx
  page.tsx
components/
  code/
  review/
  ui/
constants/
  languages.ts
lib/
  openai/
  utils/
  validation/
types/
  api.ts
  review.ts
```

## Module Responsibilities

### `app/`

Contains public routes, layouts, global styles, and App Router route handlers.

- `app/page.tsx`: main reviewer screen.
- `app/layout.tsx`: root HTML shell and metadata.
- `app/api/review/route.ts`: server endpoint for code review requests.

### `components/`

Contains reusable React components.

- `components/code`: code input, code display, language selection.
- `components/review`: review summaries, issues, optimizations, improved code.
- `components/ui`: generic buttons, cards, badges, loading, errors.

### `lib/`

Contains business logic that should not live directly in React components.

- `lib/openai`: OpenAI client, prompts, and review service.
- `lib/validation`: request and response validation.
- `lib/utils`: shared formatting and UI helpers.

### `types/`

Contains shared TypeScript contracts used by API routes, services, and components.

### `constants/`

Contains static options such as supported programming languages.

## Client and Server Boundary

Use server code for:

- OpenAI API calls.
- Request validation.
- Prompt construction.
- Response normalization.

Use client components for:

- Text input state.
- Submit interactions.
- Loading and error state.
- Copy-to-clipboard.
- Tabs or expandable review sections.

Default to server components when no browser-only interactivity is required.
