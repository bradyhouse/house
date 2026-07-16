import { defineConfig } from '@playwright/test'

// Auto-starts the dev server and points tests at it. `npm test` just works.
// A dedicated, strict port avoids colliding with other vite dev servers that
// commonly squat on 5173 (the shared default) on this machine.
const PORT = 5321

export default defineConfig({
  testDir: './tests',
  use: { baseURL: `http://localhost:${PORT}` },
  webServer: {
    command: `npm run dev -- --port ${PORT} --strictPort`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: true,
    timeout: 60_000
  }
})
