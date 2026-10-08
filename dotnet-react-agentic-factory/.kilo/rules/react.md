# React + TypeScript rules
- Use React, Vite and strict TypeScript; avoid any and unchecked casts at API boundaries.
- Browser code is public. Never put secrets in VITE_* variables, JavaScript or browser storage.
- Use functional components and hooks; keep effects cancellable and handle loading, empty, error and success states.
- Use semantic HTML, labels and keyboard-accessible controls. Avoid raw HTML rendering of untrusted content.
- Call relative /api paths through the development proxy; keep business decisions and authorization on the server.
- Validate external JSON at runtime; TypeScript alone does not validate a response.
- Use Vitest and Testing Library for observable behavior; introduce Playwright when browser acceptance tests are required.
- Run typecheck, ESLint, Prettier, tests with coverage, build and npm audit.
- Commit package-lock.json; use npm ci for reproducible installs.
