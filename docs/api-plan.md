# API Plan

## Endpoint

```txt
POST /api/review
```

This endpoint receives pasted code and returns a structured AI code review.

## Request Shape

```ts
type ReviewRequest = {
  code: string;
  language: string;
};
```

## Success Response Shape

```ts
type ReviewResponse = {
  review: {
    summary: string;
    issues: ReviewIssue[];
    optimizations: ReviewSuggestion[];
    explanation: string;
    improvedCode: string;
  };
};
```

## Error Response Shape

```ts
type ApiErrorResponse = {
  error: string;
};
```

## Server Flow

1. Parse JSON request body.
2. Validate that `code` and `language` are present.
3. Enforce a maximum code length.
4. Build a review prompt from the input.
5. Call the OpenAI API from server code only.
6. Parse the model result into the shared TypeScript shape.
7. Return the review or a friendly error.

## Validation Rules

- `code` must not be empty.
- `language` must be one of the supported language values.
- Code length should be limited to protect cost and latency.
- API errors should not expose secrets or raw provider internals.

## Future Hardening

- Add runtime schema validation with Zod.
- Add rate limiting.
- Add request timeout handling.
- Add server-side logging for failed reviews.
- Add response schema validation before returning data to the client.
