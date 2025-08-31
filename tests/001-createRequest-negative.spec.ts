import { test, expect } from '@playwright/test';
import { request_selectors } from '../selectors/request-selectors';
import { invalidData } from '../test-data/invalid-data';
import { pickDateTime } from '../helpers/date-picker-helper';

test.use({ storageState: 'loginState.json' });

test('create transport request - waypoint validation messages', async ({ page }) => {
    const baseURL = process.env.BASEURL || 'https://stage.4shipper.transportly.eu';
    await page.goto(`${baseURL}/request/list`);

    // Click create new request button
    await page.locator(request_selectors.new_request_button).click();
    
    // Assert we're on the create request page
    await expect(page).toHaveURL(/.*\/request\/create/);

    // Test invalid dates - latest before earliest
    await pickDateTime(page, 0, invalidData.dates.pickup.earliest());
    await pickDateTime(page, 1, invalidData.dates.pickup.latest());
    await expect(page.getByText('The beginning of interval must be earlier than the end of interval')).toBeVisible();


    //fill valid dates

    await pickDateTime(page, 0, invalidData.dates.pickup.latest());
    await pickDateTime(page, 1, invalidData.dates.pickup.earliest());

    // Fill waypoint 1 with invalid data
    await page.locator(request_selectors.input_waypoint1_name_company).fill(invalidData.waypoint1.name);
    await page.locator(request_selectors.input_waypoint1_street).fill(invalidData.waypoint1.street);
    await page.locator(request_selectors.input_waypoint1_city).fill(invalidData.waypoint1.city);
    await page.locator(request_selectors.select_waypoint1_country).fill(invalidData.waypoint1.country);
    await page.locator(request_selectors.select_waypoint1_country).press('Enter');
    await page.locator(request_selectors.input_waypoint1_zip).fill(invalidData.waypoint1.zip);
    await page.locator(request_selectors.input_waypoint1_contact_name).fill(invalidData.waypoint1.contact);
    await page.locator(request_selectors.input_waypoint1_email).fill(invalidData.waypoint1.email);
    await page.locator(request_selectors.input_waypoint1_phone).fill(invalidData.waypoint1.phone);
    await page.locator(request_selectors.input_waypoint1_reference).fill(invalidData.waypoint1.reference);
    await page.locator(request_selectors.chk_waypoint1_note).click();
    await page.locator(request_selectors.input_waypoint1_note).fill(invalidData.waypoint1.note);







    
    // Fill waypoint 2 with valid dates
    await pickDateTime(page, 2, invalidData.dates.delivery.latest());
    await pickDateTime(page, 3, invalidData.dates.delivery.earliest());

    await page.locator(request_selectors.input_waypoint2_name_company).fill(invalidData.waypoint2.name);
    await page.locator(request_selectors.input_waypoint2_street).fill(invalidData.waypoint2.street);
    await page.locator(request_selectors.input_waypoint2_city).fill(invalidData.waypoint2.city);
    await page.locator(request_selectors.select_waypoint2_country).fill(invalidData.waypoint2.country);
    await page.locator(request_selectors.select_waypoint2_country).press('Enter');
    await page.locator(request_selectors.input_waypoint2_zip).fill(invalidData.waypoint2.zip);
    await page.locator(request_selectors.input_waypoint2_contact_name).fill(invalidData.waypoint2.contact);
    await page.locator(request_selectors.input_waypoint2_email).fill(invalidData.waypoint2.email);
    await page.locator(request_selectors.input_waypoint2_phone).fill(invalidData.waypoint2.phone);
    await page.locator(request_selectors.input_waypoint2_reference).fill(invalidData.waypoint2.reference);
    await page.locator(request_selectors.chk_waypoint2_note).check();
    await page.locator(request_selectors.input_waypoint2_note).fill(invalidData.waypoint2.note);
    
    // Try to continue with invalid data and verify all validation messages
    await page.locator(request_selectors.btn_continue).click();


    // await page.pause();
    // Verify waypoint 1 validation messages
    await expect(page.getByText('This field is required.').nth(0)).toBeVisible();
    await expect(page.getByText('This field is required.').nth(1)).toBeVisible();
    await expect(page.getByText('This field is required.').nth(2)).toBeVisible();
    await expect(page.getByText('Enter a valid email address.').nth(0)).toBeVisible();
    await expect(page.getByText('Enter a valid email address.').nth(1)).toBeVisible();

    await expect(page.getByText('The phone number entered is not valid. Use international format, e.g. +421 911 111 111').nth(0)).toBeVisible();
    await expect(page.getByText('The phone number entered is not valid. Use international format, e.g. +421 911 111 111').nth(1)).toBeVisible();




    // Verify that Continue button is disabled
    await expect(page.locator(request_selectors.btn_continue)).toBeDisabled();
});
