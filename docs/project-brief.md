# Project Brief

## Goal

Build a web app where a user can paste code and receive an AI-assisted review that identifies bugs, security issues, performance improvements, readability suggestions, and an improved version of the code.

## Target User

Developers who want quick feedback before committing, learning, refactoring, or sharing code.

## Core User Flow

1. User opens the app.
2. User selects a programming language.
3. User pastes code into the editor.
4. User submits the code for review.
5. App shows a loading state while the server calls OpenAI.
6. App displays a structured review.
7. User copies individual suggestions or the improved code.

## Initial Scope

- Code input editor.
- Language selection.
- AI review API route.
- Structured review result.
- Bug and security issue sections.
- Optimization and explanation sections.
- Improved code output.
- Copy-to-clipboard actions.
- Responsive dark UI.

## Out of Scope for the First Build

- Authentication.
- Saved review history.
- GitHub repository import.
- Team collaboration.
- Billing.
- Multi-file project analysis.
