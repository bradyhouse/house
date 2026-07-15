# fiddle-0041-TetrisTs

A **angular** fiddle — a throwaway sandbox for exploring one idea, scaffolded and
managed with [fiddle](https://github.com/hetalhouse/fiddle).

## Run it
```bash
fiddle start angular fiddle-0041-TetrisTs     # or, from here: npm run dev
```

## Test / screenshot it
Playwright is pre-configured and auto-starts the dev server:
```bash
npx playwright install    # one-time: download browsers
npm test                  # runs tests/smoke.spec.ts → writes tests/screenshot.png
```

## Notes for Claude
- This is a **single-purpose sandbox** — keep changes scoped to this fiddle.
- `fiddle publish` builds it and integrates it into the portfolio **automatically**
  (auto-nav + the screenshot above as its thumbnail). Do **not** hand-wire portfolio
  plumbing in here.
- Iterate by `fiddle fork angular fiddle-0041-TetrisTs` rather than editing a "known-good" fiddle.
