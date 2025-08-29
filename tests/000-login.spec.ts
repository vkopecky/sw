// tests/loginAndSaveSession.spec.ts
import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

const baseURL = process.env.BASE_URL;
const email = process.env.TEST_EMAIL;
const password = process.env.TEST_PASSWORD;
const STORAGE_STATE_PATH = './loginState.json';

// Bezpečná kontrola, že premenné existujú
if (!baseURL) throw new Error('Missing BASE_URL in .env');
if (!email) throw new Error('Missing TEST_EMAIL in .env');
if (!password) throw new Error('Missing TEST_PASSWORD in .env');

test('Login and save session', async ({ page }) => {
  await page.goto(`${baseURL}/login`);

  // Fill login form
  await page.fill('#email', email);
  await page.fill('#password', password);
  await page.locator('button:has-text("Login")').click();

  // Overenie úspešného loginu
  await expect(page).toHaveURL(`${baseURL}/request/list`);

  // Uloženie session/cookies do súboru
  await page.context().storageState({ path: STORAGE_STATE_PATH });
});
