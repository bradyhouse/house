import { defineConfig } from '@playwright/test'

// Auto-starts the dev server and points tests at it. `npm test` just works.
// Port 5271 (not the scaffold's 5173) to avoid colliding with other local servers.
export default defineConfig({
  testDir: './tests',
  use: { baseURL: 'http://localhost:5271' },
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5271',
    reuseExistingServer: true,
    timeout: 60_000
  }
})
