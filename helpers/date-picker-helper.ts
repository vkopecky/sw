import { Page } from '@playwright/test';
import { request_selectors } from '../selectors/request-selectors';

/**
 * Clicks through the calendar UI to set date and time
 * @param page Playwright page
 * @param inputIndex index of the date input (0 = first, 1 = second, etc.)
 * @param date date to set
 * @param minutesOffset optional number of minutes to add to the date (default: 10)
 */
export async function pickDateTime(page: Page, inputIndex: number, date: Date, minutesOffset: number = 10) {
    // Add offset minutes to the date
    const adjustedDate = new Date(date.getTime() + minutesOffset * 60000);
    const pad = (n: number) => n.toString().padStart(2, '0');
    const year = adjustedDate.getFullYear();
    const monthShort = adjustedDate.toLocaleString('en-US', { month: 'short' }); // "Aug"
    const day = adjustedDate.getDate();
    const hours = pad(adjustedDate.getHours());
    const minutes = pad(adjustedDate.getMinutes());

    console.log(`Setting date: ${monthShort} ${day}, ${year} ${hours}:${minutes}`);

    try {
        // Click the input to open calendar
        if (inputIndex <= 1) {
            await page.locator(request_selectors.input_waypoint1_earliest_pickup).nth(inputIndex).click();
        } else {
            await page.locator(request_selectors.input_waypoint2_earliest_delivery).nth(inputIndex).click();
        }

        // Wait for calendar popup
        await page.waitForSelector('.dp__instance_calendar', { state: 'visible', timeout: 5000 });

        // Click year selector to open year overlay
        await page.locator(`button[aria-label="${year}-Open years overlay"]`).click();
        await page.locator('.dp__overlay').waitFor({ state: 'visible', timeout: 5000 });
        await page.locator(`.dp__overlay_col[data-test-id="${year}"] .dp__overlay_cell_pad`).first().click();

        // Click month selector to open overlay
        await page.locator(`button[aria-label*="-Open months overlay"]`).click();
        await page.locator('.dp__overlay').waitFor({ state: 'visible', timeout: 5000 });

        // Click the correct month using shortName (Aug, Sep, ...)
        await page.locator(`[data-test-id="${monthShort}"]`).click();

        // Click day - using data-test-id for precise date selection
        const monthStr = String(adjustedDate.getMonth() + 1).padStart(2, '0');
        const dayStr = String(day).padStart(2, '0');
        await page.locator(`[data-test-id="dp-${year}-${monthStr}-${dayStr}"]`).click();

        // Set hours
        await page.locator(`[data-test-id="hours-toggle-overlay-btn-0"]`).click();
        await page.locator(`.dp__overlay_col[data-test-id="${hours}"]`).click();

        // Set minutes
        await page.locator(`[data-test-id="minutes-toggle-overlay-btn-0"]`).click();
        const closestMinutes = Math.round(Number(minutes) / 5) * 5;
        const formattedMinutes = String(closestMinutes).padStart(2, '0');
        await page.locator(`.dp__overlay_col[data-test-id="${formattedMinutes}"]`).click();

        // Click Select to apply
        await page.locator('button:has-text("Select")').click();

    } catch (error) {
        console.error('Error in pickDateTime:', error);
        throw error;
    }
}
