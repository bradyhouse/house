import { test, expect } from '@playwright/test'

test('landscape Tetris renders over a YouTube backdrop with a live HUD', async ({
  page,
}) => {
  const pageErrors: string[] = []
  page.on('pageerror', (err) => pageErrors.push(err.message))

  await page.goto('/')
  await expect(page.locator('body')).toBeVisible()

  // --- YouTube backdrop present in the DOM, behind the canvas --------------
  const iframe = page.locator('iframe.youtube-background')
  await expect(iframe).toHaveCount(1)
  const src = await iframe.getAttribute('src')
  expect(src).toContain('youtube.com/embed/xCLTpcx9aO8')
  expect(src).toContain('autoplay=1')
  expect(src).toContain('mute=1') // autoplay requires mute
  expect(src).toContain('loop=1')

  // --- canvas is a WIDE landscape board, sized to the viewport ------------
  const canvas = page.locator('canvas.game-canvas')
  await expect(canvas).toBeVisible()
  const dims = await canvas.evaluate((el: HTMLCanvasElement) => ({
    w: el.width,
    h: el.height,
    cssW: el.clientWidth,
    cssH: el.clientHeight,
  }))
  expect(dims.w).toBeGreaterThan(dims.h) // landscape backing store
  expect(dims.cssW).toBeGreaterThan(dims.cssH) // landscape on screen
  expect(dims.cssW).toBeGreaterThan(400) // filled the available width

  // video backdrop sits behind the canvas (lower z-index on its wrapper)
  const zIndexes = await page.evaluate(() => {
    const wrapper = document.querySelector('.video-wrapper') as HTMLElement
    const cv = document.querySelector('.game-canvas') as HTMLElement
    return {
      video: Number(getComputedStyle(wrapper).zIndex),
      canvas: Number(getComputedStyle(cv).zIndex),
    }
  })
  expect(zIndexes.video).toBeLessThan(zIndexes.canvas)

  // --- score HUD present ---------------------------------------------------
  await expect(page.getByText('Score', { exact: true })).toBeVisible()
  await expect(page.getByText('Level', { exact: true })).toBeVisible()

  // --- fullscreen button present and toggles without error ----------------
  const fsButton = page.getByRole('button', { name: /fullscreen/i })
  await expect(fsButton).toBeVisible()
  await fsButton.click() // exercise the toggle handler (headless may deny FS)
  // Return to the framed view for a representative thumbnail.
  await page.evaluate(() =>
    document.fullscreenElement ? document.exitFullscreen() : undefined,
  )
  await page.waitForTimeout(100)

  // --- play a little so the thumbnail shows the wide board with blocks ----
  await page.getByRole('button', { name: 'Start' }).first().click()
  for (let i = 0; i < 22; i++) {
    if (i % 3 === 0) await page.keyboard.press('ArrowLeft')
    if (i % 3 === 1) await page.keyboard.press('ArrowRight')
    await page.keyboard.press('Space')
    await page.waitForTimeout(35)
  }
  await page.waitForTimeout(200)

  // no uncaught page errors from our code
  expect(pageErrors).toEqual([])

  // fiddle publish reuses this shot for the portfolio thumbnail
  await page.screenshot({ path: 'tests/screenshot.png', fullPage: true })
})
