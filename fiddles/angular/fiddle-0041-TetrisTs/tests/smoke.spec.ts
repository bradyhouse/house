import { test, expect } from '@playwright/test'

test('fiddle loads and renders', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('grid', { name: 'Tetris board' })).toBeVisible()
  await expect(page.getByText('Score')).toBeVisible()

  // Start a game so the thumbnail shows a piece on the board.
  await page.getByRole('button', { name: 'Start' }).click()
  await page.keyboard.press('ArrowDown')
  await page.waitForTimeout(900) // let gravity tick a couple of times

  // fiddle publish reuses this shot for the portfolio thumbnail
  await page.screenshot({ path: 'tests/screenshot.png', fullPage: true })
})
