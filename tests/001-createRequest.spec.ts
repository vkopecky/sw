import { test, expect } from '@playwright/test';
import { request_selectors } from '../selectors/request-selectors';
import { requestData } from '../test-data/request-data';
import { pickDateTime } from '../helpers/date-picker-helper';

test.use({ storageState: 'loginState.json' });

function formatDate(date: Date): string {
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

test('create new transport request - happy path', async ({ page }) => {
    const baseURL = process.env.BASEURL || 'https://stage.4shipper.transportly.eu';
    await page.goto(`${baseURL}/request/list`);
    
    // Click create new request button
    await page.locator(request_selectors.new_request_button).click();
    
    // Assert we're on the create request page
    await expect(page).toHaveURL(/.*\/request\/create/);

    // Verify initial waypoints form state
     await expect(page.getByRole('radio', { name: 'One way' })).toBeChecked();
     await expect(page.locator(request_selectors.sidebar1)).toContainText('Start with the waypoints');
     await expect(page.locator(request_selectors.sidebar1)).toContainText('Fill in details about route');
     await expect(page.getByRole('button', { name: 'Road' })).toBeVisible();
     await expect(page.locator(request_selectors.topsidebarbtns)).toContainText('Road');
     await expect(page.locator(request_selectors.topsidebarbtns)).toContainText('Air');
     await expect(page.locator(request_selectors.topsidebarbtns)).toContainText('Sea');
     await expect(page.locator(request_selectors.topsidebarbtns)).toContainText('Rail');
     await expect(page.locator(request_selectors.topsidebarbtns)).toContainText('Intermodal');

    // Fill Waypoint 1 - Pickup using calendar clicks
    await pickDateTime(page, 0, requestData.dates.pickup.earliest());
    await pickDateTime(page, 1, requestData.dates.pickup.latest());

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

    // Verify waypoint 1 inputs
    await expect(page.locator(request_selectors.input_waypoint1_name_company)).toHaveValue(requestData.waypoint1.name);
    await expect(page.locator(request_selectors.input_waypoint1_city)).toHaveValue(requestData.waypoint1.city);
    await expect(page.locator(request_selectors.input_waypoint1_zip)).toHaveValue(requestData.waypoint1.zip);
    
    // Additional assertions commented out for review
     await expect(page.locator(request_selectors.input_waypoint1_street)).toHaveValue(requestData.waypoint1.street);
     await expect(page.locator(request_selectors.input_waypoint1_contact_name)).toHaveValue(requestData.waypoint1.contact);
     await expect(page.locator(request_selectors.input_waypoint1_email)).toHaveValue(requestData.waypoint1.email);
     await expect(page.locator(request_selectors.input_waypoint1_phone)).toHaveValue(requestData.waypoint1.phone);
     await expect(page.locator(request_selectors.input_waypoint1_reference)).toHaveValue(requestData.waypoint1.reference);
     await expect(page.locator(request_selectors.input_waypoint1_note)).toHaveValue(requestData.waypoint1.note);
     await expect(page.locator(request_selectors.chk_waypoint1_save_address)).toBeChecked();
     await expect(page.locator(request_selectors.chk_waypoint1_note)).toBeChecked();

    // Fill Waypoint 2 - Delivery using calendar clicks
    await pickDateTime(page, 2, requestData.dates.delivery.earliest());
    await pickDateTime(page, 3, requestData.dates.delivery.latest());

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

    // Verify waypoint 2 inputs
    await expect(page.locator(request_selectors.input_waypoint2_name_company)).toHaveValue(requestData.waypoint2.name);
    await expect(page.locator(request_selectors.input_waypoint2_city)).toHaveValue(requestData.waypoint2.city);
    await expect(page.locator(request_selectors.input_waypoint2_zip)).toHaveValue(requestData.waypoint2.zip);

    // Additional assertions commented out for review
    await expect(page.locator(request_selectors.input_waypoint2_street)).toHaveValue(requestData.waypoint2.street);
    await expect(page.locator(request_selectors.input_waypoint2_contact_name)).toHaveValue(requestData.waypoint2.contact);
    await expect(page.locator(request_selectors.input_waypoint2_email)).toHaveValue(requestData.waypoint2.email);
    await expect(page.locator(request_selectors.input_waypoint2_phone)).toHaveValue(requestData.waypoint2.phone);
    await expect(page.locator(request_selectors.input_waypoint2_reference)).toHaveValue(requestData.waypoint2.reference);
    await expect(page.locator(request_selectors.input_waypoint2_note)).toHaveValue(requestData.waypoint2.note);
    await expect(page.locator(request_selectors.chk_waypoint2_save_address)).toBeChecked();
    await expect(page.locator(request_selectors.chk_waypoint2_note)).toBeChecked();

    // !Confirm past date warning dialog
    await page.locator(request_selectors.btn_continue).click();
    // await expect(page.getByText('Some waypoints are scheduled for a date and time in the past.')).toBeVisible();
    // await page.getByRole('button', { name: 'Continue', exact: true }).click();

    // Verify we're on the cargo info page
    await expect(page.getByRole('heading', { name: 'Cargo details' })).toBeVisible();

    // Fill Cargo Information
    // Additional assertions commented out for review
    // await expect(page.getByRole('heading', { name: 'Describe your cargo and select special requirements' })).toBeVisible();
    // await expect(page.getByText('You can describe your cargo units details.')).toBeVisible();
    await page.getByRole('textbox', { name: 'Cargo description' }).fill(requestData.cargo.description);
    await page.locator(request_selectors.select_cargo_type).click();
    await page.getByRole('option', { name: requestData.cargo.type }).click();
    
    // Request type
    await page.getByRole('combobox', { name: 'Not specified' }).click();
    await page.getByRole('option', { name: requestData.cargo.requestType }).click();

    // Value and dimensions
    await page.getByRole('spinbutton', { name: 'Value' }).fill(requestData.cargo.value);
    await page.locator(request_selectors.input_cargo_length).fill(requestData.cargo.length);
    await page.locator(request_selectors.input_cargo_weight).fill(requestData.cargo.weight);

    // Add note for carrier
    await page.getByRole('checkbox', { name: 'Add note for carrier' }).check();
    await page.getByRole('textbox', { name: 'Note for carrier' }).fill(requestData.cargo.note);

    // Verify cargo info before proceeding
    await expect(page.getByRole('textbox', { name: 'Cargo description' })).toHaveValue(requestData.cargo.description);
    await expect(page.getByRole('spinbutton', { name: 'Value' })).toHaveValue(requestData.cargo.value);
    await expect(page.locator(request_selectors.input_cargo_length)).toHaveValue(requestData.cargo.length);
    await expect(page.locator(request_selectors.input_cargo_weight)).toHaveValue(requestData.cargo.weight);

    await page.locator(request_selectors.btn_continue).click();

    // Verify we're on the carriers page
    await expect(page.getByRole('heading', { name: 'Carriers and options' })).toBeVisible();

    // Select transport type
    await page.getByLabel(requestData.request.transportType).check();

    // Select carrier
    await page.getByText(requestData.request.carrier).click();
    
    // Verify duration is set to 30 minutes
    await expect(page.getByLabel('30 min')).toBeChecked();
    
    // Submit and go to review
    await page.locator(request_selectors.btn_continue).click();

    // Verify we're on the review page
    await expect(page.getByRole('heading', { name: 'Check and confirm your request' })).toBeVisible();

    // Final review assertions


    await expect(page.locator(request_selectors.sidebar1)).toContainText('Check and confirm your request');
    await expect(page.locator(request_selectors.sidebar1)).toContainText('After confirmation, this request will be sent to selected carriers');
    await expect(page.locator(request_selectors.waypoints_info)).toContainText('Road');
    await expect(page.locator(request_selectors.waypoints_info)).toContainText(requestData.waypoint1.name);
    await expect(page.locator(request_selectors.waypoints_info)).toContainText(requestData.waypoint1.street);
    await expect(page.locator(request_selectors.waypoints_info)).toContainText(requestData.waypoint1.zip);
    await expect(page.locator(request_selectors.waypoints_info)).toContainText(requestData.waypoint1.reference);
    await expect(page.locator(request_selectors.waypoints_info)).toContainText(requestData.waypoint1.contact);
    await expect(page.locator(request_selectors.waypoints_info)).toContainText(requestData.waypoint1.note);
    await expect(page.locator(request_selectors.waypoints_info)).toContainText(requestData.waypoint2.name);
    await expect(page.locator(request_selectors.waypoints_info)).toContainText(requestData.waypoint2.street);
    await expect(page.locator(request_selectors.waypoints_info)).toContainText(requestData.waypoint2.zip);
    await expect(page.locator(request_selectors.waypoints_info)).toContainText(requestData.waypoint2.reference);
    await expect(page.locator(request_selectors.waypoints_info)).toContainText(requestData.waypoint2.contact);
    await expect(page.locator(request_selectors.waypoints_info)).toContainText(requestData.waypoint2.note);
    await expect(page.locator(request_selectors.cargo_info)).toContainText(requestData.cargo.description);
    // await expect(page.locator(request_selectors.cargo_info)).toContainText(requestData.cargo.value);//this one need regex since is 50 000 € ...
    await expect(page.locator(request_selectors.cargo_info)).toContainText(requestData.cargo.length);
    await expect(page.locator(request_selectors.cargo_info)).toContainText(requestData.cargo.weight);
    await expect(page.locator(request_selectors.cargo_info)).toContainText(requestData.cargo.note);



    // Send the request
    await page.getByRole('button', { name: ' Send request' }).click();

    await expect(page.locator(request_selectors.waypoints_info)).toContainText(requestData.waypoint1.name);
    await expect(page.locator(request_selectors.waypoints_info)).toContainText(requestData.waypoint1.street);
    await expect(page.locator(request_selectors.waypoints_info)).toContainText(requestData.waypoint1.zip);
    await expect(page.locator(request_selectors.waypoints_info)).toContainText(requestData.waypoint1.reference);
    await expect(page.locator(request_selectors.waypoints_info)).toContainText(requestData.waypoint1.contact);
    await expect(page.locator(request_selectors.waypoints_info)).toContainText(requestData.waypoint1.note);
    await expect(page.locator(request_selectors.waypoints_info)).toContainText(requestData.waypoint2.name);
    await expect(page.locator(request_selectors.waypoints_info)).toContainText(requestData.waypoint2.street);
    await expect(page.locator(request_selectors.waypoints_info)).toContainText(requestData.waypoint2.zip);
    await expect(page.locator(request_selectors.waypoints_info)).toContainText(requestData.waypoint2.reference);
    await expect(page.locator(request_selectors.waypoints_info)).toContainText(requestData.waypoint2.contact);
    await expect(page.locator(request_selectors.waypoints_info)).toContainText(requestData.waypoint2.note);
    await expect(page.locator(request_selectors.waypoints_info)).toContainText(requestData.waypoint2.note);

    await expect(page.locator(request_selectors.header_cargo)).toContainText('Cargo info');
    await expect(page.locator(request_selectors.header_settings)).toContainText('Request settings');
    await expect(page.locator(request_selectors.header_documents)).toContainText('Documents');
    await expect(page.locator(request_selectors.header_bids)).toContainText('Carriers bids');

});
