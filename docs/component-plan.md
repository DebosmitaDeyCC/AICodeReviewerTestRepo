# Component Plan

## Code Components

### `CodeEditor`

User-facing code input component.

Responsibilities:

- Display a large code textarea or editor.
- Accept pasted code.
- Report code changes to the parent form.
- Show basic empty and disabled states.

### `LanguageSelect`

Language dropdown driven by `constants/languages.ts`.

Responsibilities:

- Render supported languages.
- Keep selected language accessible and visible.

### `CodeBlock`

Syntax-highlighted read-only code display.

Responsibilities:

- Render code snippets and improved code.
- Support a copy button.
- Keep long lines readable.

## Review Components

### `ReviewPanel`

Container for the full review result.

Responsibilities:

- Render summary, issues, optimizations, explanation, and improved code.
- Show an empty state before the first review.

### `IssueCard`

Reusable issue display.

Responsibilities:

- Show severity, category, title, description, and suggestion.
- Optionally show line number and code snippet.

### `ImprovedCodePanel`

Focused improved-code result area.

Responsibilities:

- Render generated improved code.
- Provide a copy action.

## UI Components

### `Button`

Reusable button with variants such as primary, secondary, and ghost.

### `CopyButton`

Browser-only component that copies a string to the clipboard.

### `LoadingSpinner`

Small loading indicator for submit and result states.

### `ErrorMessage`

Consistent error display for validation and API failures.

### `Badge`

Small label for severity and category values.
