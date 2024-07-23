const {test, expect} = require("@playwright/test");
const baseUrl = "http://localhost:3000"

test('Verify Login link is visible', async ({page}) => {
	await page.goto(baseUrl);
	await page.waitForSelector('nav.navbar');
	const loginLink = await page.$('a[href="/login"]');
	const isElementVisible = await loginLink.isVisible();

	expect(isElementVisible).toBe(true);
})

test('Velify All Books link is visible', async ({ page }) => {
	await page.goto(baseUrl);
	await page.waitForSelector('nav.navbar');
	const allBooksList = await page.$('section > a');
	const isElementVisible = await allBooksList.isVisible();

	expect(isElementVisible).toBe(true);
})
