import { test, expect } from '@playwright/test';
import { request_selectors } from '../selectors/request-selectors';
import { requestData } from '../test-data/request-data';

test.use({ storageState: 'loginState.json' });

// Funkcia na formátovanie dátumu do "dd.MM.yyyy HH:mm"
function formatDate(date: Date): string {
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

test('create new transport request - happy path', async ({ page }) => {
//    await page.goto('https://stage.4shipper.transportly.eu/request/list');
    const baseURL = process.env.BASEURL || 'https://stage.4shipper.transportly.eu';
    await page.goto(`${baseURL}/request/list`);
    await page.locator('.btn-group').click();
    
    // Dynamické časy pre waypoint 1
    const now = new Date();
    const earliestPickup = new Date(now.getTime() + 10 * 60 * 1000); // teraz + 10 min
    const latestPickup = new Date(now.getTime() + 70 * 60 * 1000);    // teraz + 70 min

    // Fill Waypoint 1 - Pickup

    //await page.locator(request_selectors.input_waypoint1_earliest_pickup).nth(0).fill(formatDate(earliestPickup));

    await page.locator(request_selectors.input_waypoint1_earliest_pickup).nth(0).evaluate((el, value) => (el as HTMLInputElement).value = value,formatDate(earliestPickup));
    await page.locator(request_selectors.input_waypoint1_latest_pickup).nth(1).evaluate((el, value) => (el as HTMLInputElement).value = value,formatDate(latestPickup));


    await page.locator(request_selectors.input_waypoint1_name_company).fill(requestData.waypoint1.name);
    await page.locator(request_selectors.input_waypoint1_street).fill(requestData.waypoint1.street);
    await page.locator(request_selectors.input_waypoint1_city).fill(requestData.waypoint1.city);
    await page.locator(request_selectors.select_waypoint1_country).fill(requestData.waypoint1.country);
    await page.locator(request_selectors.select_waypoint1_country).press('Enter');
    await page.locator(request_selectors.input_waypoint1_zip).fill(requestData.waypoint1.zip);
    await page.locator(request_selectors.input_waypoint1_contact_name).fill(requestData.waypoint1.contact);
    await page.locator(request_selectors.input_waypoint1_email).fill(requestData.waypoint1.email);
    await page.locator(request_selectors.input_waypoint1_phone).fill(requestData.waypoint1.phone);
    await page.locator(request_selectors.chk_waypoint1_save_address).check();
    await page.locator(request_selectors.input_waypoint1_reference).fill(requestData.waypoint1.reference);
    await page.locator(request_selectors.chk_waypoint1_note).click();
    await page.locator(request_selectors.input_waypoint1_note).fill(requestData.waypoint1.note);

    // Dynamické časy pre waypoint 2 (napr. +1 deň od teraz)
    const earliestDelivery = new Date(now.getTime() + 24 * 60 * 60 * 1000 + 10 * 60 * 1000); // zajtra + 10 min
    const latestDelivery = new Date(now.getTime() + 24 * 60 * 60 * 1000 + 70 * 60 * 1000);   // zajtra + 70 min

    // Fill Waypoint 2 - Delivery
//    await page.locator(request_selectors.radio_waypoint2_delivery).check();
    await page.locator(request_selectors.input_waypoint2_earliest_delivery).nth(2).evaluate((el, value) => (el as HTMLInputElement).value = value,formatDate(earliestDelivery));
    await page.locator(request_selectors.input_waypoint2_latest_delivery).nth(3).evaluate((el, value) => (el as HTMLInputElement).value = value,formatDate(latestDelivery));

    await page.locator(request_selectors.input_waypoint2_name_company).fill(requestData.waypoint2.name);
    await page.locator(request_selectors.input_waypoint2_street).fill(requestData.waypoint2.street);
    await page.locator(request_selectors.input_waypoint2_city).fill(requestData.waypoint2.city);
    await page.locator(request_selectors.select_waypoint2_country).fill(requestData.waypoint2.country);
    await page.locator(request_selectors.select_waypoint2_country).press('Enter');
    await page.locator(request_selectors.input_waypoint2_zip).fill(requestData.waypoint2.zip);
    await page.locator(request_selectors.input_waypoint2_contact_name).fill(requestData.waypoint2.contact);
    await page.locator(request_selectors.input_waypoint2_email).fill(requestData.waypoint2.email);
    await page.locator(request_selectors.input_waypoint2_phone).fill(requestData.waypoint2.phone);
    await page.locator(request_selectors.chk_waypoint2_save_address).check();
    await page.locator(request_selectors.input_waypoint2_reference).fill(requestData.waypoint2.reference);
    await page.locator(request_selectors.chk_waypoint2_note).check();
    await page.locator(request_selectors.input_waypoint2_note).fill(requestData.waypoint2.note);

    await page.locator(request_selectors.btn_continue).click();

    // Fill Cargo Information

    await page.locator("#reference").fill(requestData.request.reference);
    await page.locator("#costCenter").fill(requestData.request.costCenter);

    // await page.locator("#cargo.description").click();
    // await page.getByText('Handling from top').click();

    await page.getByRole('textbox', { name: 'Cargo description' }).fill(requestData.cargo.description);

    await page.getByRole('combobox', { name: 'Special requirements' }).click();
    await page.getByText('Handling from top').click();
    await page.getByRole('combobox', { name: 'Handling from top' }).press('Escape');

    await page.locator('[id="cargo.type"]').click();
    await page.getByRole('option', { name: 'Other' }).click();
    await page.getByRole('combobox', { name: 'Not specified' }).click();
    await page.getByRole('option', { name: 'Parcel' }).click();


    await page.getByRole('spinbutton', { name: 'Value' }).fill(requestData.cargo.value);

    await page.locator('[id="cargo.maxLength"]').fill(requestData.cargo.weight);
    await page.locator('[id="cargo.weight"]').fill(requestData.cargo.length);


    await page.getByRole('checkbox', { name: 'Add note for carrier' }).check();
    await page.getByRole('textbox', { name: 'Note for carrier' }).fill(requestData.cargo.note);





    await page.pause()

});
