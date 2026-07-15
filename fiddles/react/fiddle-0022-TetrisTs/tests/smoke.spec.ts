import { test, expect } from '@playwright/test'

test('fiddle loads and renders', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('body')).toBeVisible()
  // fiddle publish reuses this shot for the portfolio thumbnail
  await page.screenshot({ path: 'tests/screenshot.png', fullPage: true })
})
