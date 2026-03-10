import { expect, test } from '@playwright/test'

test('portfolio home loads and nav works', async ({ page }) => {
  await page.goto('/portfolio')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()

  await page.getByRole('button', { name: /projets/i }).click()
  await expect(page).toHaveURL(/\/portfolio\/projets/)

  await page.getByRole('button', { name: /contact/i }).click()
  await expect(page).toHaveURL(/\/portfolio\/contact/)
})

test('logiciel and pageweb routes are reachable', async ({ page }) => {
  await page.goto('/logiciel')
  await expect(page).toHaveURL(/\/logiciel/)

  await page.goto('/pageweb')
  await expect(page).toHaveURL(/\/pageweb/)
})

