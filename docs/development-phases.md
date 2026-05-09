# Development Phases

## Phase 1: Foundation

- Confirm App Router structure.
- Replace starter page with the AI Code Reviewer shell.
- Add shared layout metadata.
- Define core TypeScript request and response types.

## Phase 2: Static UI

- Build the main dark responsive layout.
- Add code input area.
- Add language selector.
- Add submit button.
- Add empty review state.

## Phase 3: Interactive Client Flow

- Manage code input state.
- Manage selected language state.
- Add submit handler.
- Add loading and error states.
- Add copy-to-clipboard behavior.

## Phase 4: Server API

- Implement `POST /api/review`.
- Validate request data.
- Add OpenAI client setup.
- Add prompt builder.
- Return structured review data.

## Phase 5: Review Rendering

- Render summary.
- Render issue cards grouped by category.
- Render optimization suggestions.
- Render explanation text.
- Render improved code with syntax highlighting.

## Phase 6: Quality and Safety

- Add runtime schema validation.
- Add friendly errors for bad input and provider failures.
- Add basic rate limiting if the app is public.
- Add tests for validation and parsing helpers.

## Phase 7: Deployment

- Add production environment variables.
- Run lint and build checks.
- Deploy to Vercel or another Next-compatible host.
- Verify server route behavior in production.
