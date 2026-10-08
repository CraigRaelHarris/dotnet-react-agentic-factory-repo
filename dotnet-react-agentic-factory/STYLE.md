# Style Rules
The enforced baseline lives in `.editorconfig`, `Directory.Build.props`, `.kilo/rules/dotnet.md`, `.kilo/rules/react.md` and `src/web/` tooling.

- Use clear domain names, focused methods/components and explicit typed boundaries.
- Prefer composition; avoid speculative abstractions and premature generalization.
- Comments explain why. Tests describe externally observable behavior.
- C#: PascalCase for types/methods; camelCase for locals/parameters; async methods end in Async.
- React: PascalCase components, camelCase functions, semantic HTML and accessible status/error states.
- README explains usage; specs define behavior; architecture/ADRs explain choices; runbooks cover operations.
- Run `dotnet format Starter.sln` and `npm --prefix src/web run format` to apply formatting.
