import { Page } from '@playwright/test';

/**
 * Vykliká dátum a čas v PrimeNG datepickeri
 * @param page Playwright page
 * @param inputIndex index dp-input (0 = prvý, 1 = druhý, ...)
 * @param date dátum, ktorý chceme nastaviť
 */
export async function pickDateTime(
  page: Page,
  inputIndex: number,
  date: Date
) {
  const pad = (n: number) => n.toString().padStart(2, '0');
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = date.getHours().toString();
  const minutes = pad(date.getMinutes());

  // otvor input podľa indexu
  const input = page.locator('[data-test-id="dp-input"]').nth(inputIndex);
  await input.click();

  // vyber rok
  const yearToggle = page.locator(`[data-test-id="year-toggle-overlay-${inputIndex}"]`);
  await yearToggle.click();
  const yearCell = page.locator(`[data-test-id="${year}"]`).getByText(year.toString());
  await yearCell.waitFor({ state: 'visible' });
  await yearCell.click();

  // vyber deň
  const dayCell = page.locator(`[data-test-id="dp-${year}-${month}-${day}"]`).getByText(day);
  await dayCell.waitFor({ state: 'visible' });
  await dayCell.click();

  // vyber hodinu
  const hourToggle = page.locator(`[data-test-id="hours-toggle-overlay-btn-${inputIndex}"]`);
  await hourToggle.click();
  const hourOverlay = page.locator('dialog[aria-label="hours overlay"]');
  await hourOverlay.waitFor({ state: 'visible' });
  const hourCell = hourOverlay.getByText(hours);
  await hourCell.click();

  // vyber minútu
  const minuteToggle = page.locator(`[data-test-id="minutes-toggle-overlay-btn-${inputIndex}"]`);
  await minuteToggle.click();
  const minuteOverlay = page.locator('.dp__overlay_minutes');
  await minuteOverlay.waitFor({ state: 'visible' });
  const minuteCell = minuteOverlay.getByText(minutes);
  await minuteCell.click();
}
