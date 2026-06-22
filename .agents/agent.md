# Agent Guide: Blog-UXiD-Lampung

## Project Summary
Astro-based website for UXiD Lampung. Current content is mostly static and markdown-driven, with a planned transition for event data to come from Google Script at runtime in the browser. The long-term direction may extend that same pattern to blogs and other content types.

## Current Goal
- Primary: fetch and render event data from Google Script in the browser.
- Secondary: keep the implementation extensible so blogs and other content can later use the same data pipeline.
- Safety: prefer the simplest working path, with graceful loading and error states.

## Known Repo Shape
- Astro app with Tailwind and Alpine integrations.
- Pages currently live in `src/pages`.
- Blog and event content currently exist as local markdown fixtures.
- Layouts and components already exist for navigation, cards, and markdown detail pages.
- PWA integration has been partially disabled, but some references still remain in layout code.

## Data Strategy
### Short term
- Events should load from a Google Script endpoint in the browser at runtime.
- UI must handle:
  - loading state
  - empty state
  - error state
  - fallback rendering if the endpoint is unavailable

### Medium term
- Keep the event data contract generic enough to be reused for other content types.
- Avoid tightly coupling UI components to markdown-only assumptions.

## Deployment Strategy
- Treat GitHub Pages as the default deployment target unless the user says otherwise.
- The site remains a static Astro build, so deployment should use the built `dist/` output.
- If the repository is served from a subpath on GitHub Pages, the Astro `site` and `base` configuration must be checked before release.
- Runtime browser fetches to Google Script must be verified against the deployed origin, not only against local dev.
- Any asset path, script path, or fetch URL that depends on deployment context must be validated for GitHub Pages behavior.
- Deployment work should include a browser smoke test on the published site, not only a local build.

### Suggested contract principles
- Use stable IDs for records.
- Keep dates in a machine-readable format.
- Avoid relying on presentation text as identifiers.
- Normalize optional fields at the adapter layer.

## Engineering Rules
- Read the repository first before changing code.
- Prefer small, vertical slices over broad rewrites.
- Do not remove user changes unless explicitly asked.
- Do not introduce new dependencies without clear benefit.
- Keep browser runtime fetch logic isolated from presentational components.
- Prefer graceful degradation over hard failure.
- Remove debug logs before merging.
- Do not leave placeholder links, random external images, or dead UI controls in production paths.

## Recommended Architecture
### Event runtime flow
1. Browser loads the events page.
2. A client-side fetcher requests Google Script JSON.
3. A small adapter normalizes the response into UI-friendly objects.
4. The page renders loading/error/empty/data states.
5. Event cards link to valid detail routes or event detail views.

### Future content flow
- Reuse the same idea for blogs or other content only after the event flow is stable.
- If multiple content types share similar structure, extract a shared adapter and rendering pattern.

## Implementation Order
1. Confirm the Google Script response shape.
2. Build a runtime fetch adapter for events.
3. Add loading, empty, and error states.
4. Refactor event cards and any detail view to use normalized data.
5. Clean up legacy static event fixtures when safe.
6. Verify GitHub Pages deployment assumptions and config.
7. Update documentation and backlog to match the new flow.

## Working Checklist
- Verify the current issue list before adding new work.
- Write a concise plan before editing multiple files.
- Keep tasks small enough to verify in one session.
- Prefer source-of-truth data contracts over hardcoded content.
- Validate behavior in browser, not just by inspection.

## Repository Conventions
- Use ASCII unless an existing file already uses non-ASCII content.
- Keep layout and component code consistent with Astro patterns already used here.
- Preserve the existing visual direction unless a design change is explicitly requested.
- Avoid overengineering: the first good runtime implementation is better than a complicated perfect one.

## Notes For Future Agents
- This repo may eventually move all content to Google Script, so avoid assumptions that only events will be external forever.
- Treat markdown content as temporary fixtures until migration is complete.
- If an issue or task depends on the Google Script response shape, confirm that shape before implementation.
- If the browser runtime approach becomes too brittle, consider an Astro endpoint or server-side fetch only if the user asks for it.
