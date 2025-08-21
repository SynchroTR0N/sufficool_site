import { test, expect } from '@playwright/test';

test('Navigate to drcoolmd.com and take screenshot', async ({ page }) => {
  // Navigate to drcoolmd.com
  await page.goto('https://drcoolmd.com');
  
  // Wait for the page to load
  await page.waitForLoadState('networkidle');
  
  // Take a screenshot
  await page.screenshot({ 
    path: 'drcoolmd-screenshot.png',
    fullPage: true
  });
  
  // Basic assertions to verify the site loaded
  await expect(page).toHaveTitle(/.+/); // Should have some title
  
  // Check if the page contains some expected content (adjust as needed)
  const bodyText = await page.textContent('body');
  expect(bodyText).toBeTruthy();
  
  console.log('Successfully navigated to drcoolmd.com and took screenshot');
});

test('Basic browser automation on drcoolmd.com', async ({ page }) => {
  // Navigate to the site
  await page.goto('https://drcoolmd.com');
  
  // Wait for page load
  await page.waitForLoadState('domcontentloaded');
  
  // Get page title
  const title = await page.title();
  console.log('Page title:', title);
  
  // Get page URL
  const url = page.url();
  console.log('Current URL:', url);
  
  // Count number of links on the page
  const linkCount = await page.locator('a').count();
  console.log('Number of links found:', linkCount);
  
  // Count number of images
  const imageCount = await page.locator('img').count();
  console.log('Number of images found:', imageCount);
  
  // Get viewport size
  const viewportSize = page.viewportSize();
  console.log('Viewport size:', viewportSize);
  
  // Basic assertions
  expect(title.length).toBeGreaterThan(0);
  expect(linkCount).toBeGreaterThan(0);
});