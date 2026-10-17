## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Project-specific Codex instructions (2026-10-17)

### Project context
Legal-services Astro site with Persian RTL; preserve accuracy, credentials, privacy, legal copy and language-specific metadata.

### Read before acting
Read README, package scripts, CI workflows, existing instructions and affected sources. Do not treat old documentation as proof of live state.

### Safe execution
- Audit/review is read-only: no edits, commits, tracking or infrastructure changes.
- Requested changes must be small, reversible and scoped. Preserve design, mobile behavior, accessibility, content, routing and working integrations.
- Do not deploy or push to the default branch unless explicitly requested; prefer reviewable feature branches and PRs.
- Keep credentials, customer data and private analytics out of code and logs. Never invent business claims or credentials.

### Review checklist
- Prioritize security, broken functionality and data integrity over cosmetic style. Cite exact affected paths/lines and severity; distinguish observation from hypothesis.
- Check applicable canonical, robots, sitemap, metadata, Open Graph, schema, links, accessibility and performance. SEO checks do not guarantee rankings.
- Check hreflang and RTL only where supported; preserve actual locale architecture.
- For forms and APIs check validation, rate limiting, errors and privacy; do not modify consent or analytics behavior without instruction.

### Verification
- Use only repository-supported checks; distinguish not run, failed and passed.
- Report separately: changed files, tests, commits, pushes, PRs, CI, deployment and live verification. Note blockers and next step.
