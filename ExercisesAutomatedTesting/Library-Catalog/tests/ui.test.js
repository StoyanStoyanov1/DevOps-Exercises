const {test, expect} = require("@playwright/test");
const baseUrl = "http://localhost:3000"

test('Verify Login link is visible', async ({page}) => {
	await page.goto(baseUrl);
	await page.waitForSelector('nav.navbar');
	const loginLink = await page.$('a[href="/login"]');
	const isElementVisible = await loginLink.isVisible();

	expect(isElementVisible).toBe(true);
});

test('Verify Register link is visible', async ({page}) => {
	await page.goto(baseUrl);
	await page.waitForSelector('nav.navbar');
	const registerLink = await page.$('a[href="/register"]');
	const isElementVisible = await registerLink.isVisible();

	expect(isElementVisible).toBe(true);
});

test('Verify All Books link is visible', async ({ page }) => {
	await page.goto(baseUrl);
	await page.waitForSelector('nav.navbar');
	const allBooksList = await page.$('section > a');
	const isElementVisible = await allBooksList.isVisible();

	expect(isElementVisible).toBe(true);
});

test('Verify valid user can login', async ({page}) => {
	await page.goto(baseUrl);
	await page.waitForSelector('nav.navbar');

	const loginLink = await page.$('a[href="/login"]');
	await loginLink.click();

	await page.fill("#email", "peter@abv.bg");
	await page.fill("#password", "123456");

	const loginButton = await page.$('xpath=//*[@id="login-form"]/fieldset/input');
	await loginButton.click();

	const createBookLink = await page.$('a[href="/create"]');
	const createBookLinkText = await createBookLink.textContent();

	expect(createBookLinkText).toBe("Add Book");
});

test('Add book with correct data', async ({ page }) => {

	await page.goto(baseUrl + '/login');

	await page.fill('input[name="email"]', 'peter@abv.bg');
	await page.fill('input[name="password"]', '123456');

	await Promise.all([
		page.click('input[type="submit"]'),
		page.waitForURL(baseUrl + '/catalog')
	]);

	expect(page.url()).toBe(baseUrl + '/catalog');

	await page.click('a[href="/create"]');
	await page.waitForSelector('#create-form');

	await page.fill('#title', 'Test Book');
	await page.fill('#description', 'This is a test book');
	await page.fill('#image', 'https://example.jpg');
	await page.selectOption('#type', 'Fiction');

	await page.click('#create-form input[type="submit"]'); // Липсва затварящата скоба на селектора

	await page.waitForURL(baseUrl + '/catalog');

	// Проверка дали URL е правилен след създаване на книгата
	expect(page.url()).toBe(baseUrl + '/catalog');
});
