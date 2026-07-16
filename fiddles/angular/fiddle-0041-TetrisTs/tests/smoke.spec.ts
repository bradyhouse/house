import { test, expect } from '@playwright/test'

test('landscape tetris renders over a youtube backdrop, with HUD + fullscreen', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', (e) => errors.push(String(e)))
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text())
  })

  await page.goto('/')

  // The playfield is a canvas (not a DOM grid).
  const canvas = page.locator('canvas.playfield')
  await expect(canvas).toBeVisible()

  // Landscape + sized to the viewport: wide, and wider than it is tall.
  const size = await canvas.evaluate((c: HTMLCanvasElement) => ({ w: c.width, h: c.height }))
  expect(size.w).toBeGreaterThan(size.h) // landscape
  expect(size.w).toBeGreaterThan(600) // sized to the viewport, not a portrait well

  // YouTube iframe backdrop is present in the DOM BEHIND the canvas, with the
  // autoplay+mute+loop embed src (video won't actually play headless — assert the element).
  const backdrop = page.locator('iframe.youtube-backdrop')
  await expect(backdrop).toHaveCount(1)
  const src = await backdrop.getAttribute('src')
  expect(src).toContain('youtube.com/embed/xCLTpcx9aO8')
  expect(src).toContain('autoplay=1')
  expect(src).toContain('mute=1')

  // Canvas paints on top of the iframe.
  const zCanvas = await canvas.evaluate((c) => Number(getComputedStyle(c).zIndex))
  const zVideo = await page
    .locator('.video-wrapper')
    .evaluate((v) => Number(getComputedStyle(v).zIndex))
  expect(zCanvas).toBeGreaterThan(zVideo)

  // Score HUD present.
  await expect(page.getByText('Score')).toBeVisible()
  await expect(page.getByText('Level')).toBeVisible()

  // Grid + Video controls present (the faithful-base features).
  await expect(page.getByRole('button', { name: /Grid/ })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Video' })).toBeVisible()

  // Fullscreen button present.
  const fsButton = page.getByRole('button', { name: /Fullscreen/ })
  await expect(fsButton).toBeVisible()

  // Play a bit so the thumbnail shows colored blocks scattered across the wide board.
  await page.getByRole('button', { name: 'Start' }).click()
  for (let i = 0; i < 8; i++) {
    for (let n = 0; n < i; n++) await page.keyboard.press('ArrowRight')
    await page.keyboard.press('Space')
    await page.waitForTimeout(110)
  }
  await page.waitForTimeout(500)

  // fiddle publish reuses this shot for the portfolio thumbnail — clip to the stage.
  await page.locator('.stage').screenshot({ path: 'tests/screenshot.png' })

  // Fullscreen reacts: either enters fullscreen and flips its label, or the API is
  // blocked headless and it degrades gracefully via the FullscreenService — no crash.
  await fsButton.click()
  await page.waitForTimeout(300)
  const label = await page.getByRole('button', { name: /fullscreen/i }).textContent()
  const graceful = await page.locator('.fullscreen-error').count()
  const entered = /exit fullscreen/i.test(label ?? '')
  // Clicking must DO something observable: enter fullscreen (label flips) or degrade
  // gracefully with a message. (Headless can reject requestFullscreen; both are fine.)
  expect(entered || graceful > 0).toBe(true)
  if (entered) {
    await page.getByRole('button', { name: /Exit fullscreen/ }).click()
  }

  expect(errors, `page errors:\n${errors.join('\n')}`).toEqual([])
})
