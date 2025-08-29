import {test, expect} from '@playwright/test';
import {application_settings_selectors} from "../../../../page-object-modeling/application/application_settings";
import {main_info_selectors} from "../../../../page-object-modeling/application/main_information";
import data from "../../../../fixtures/register-application-constants.json" assert { type: "json" };
import {testsupport} from '../../../../support/helpers/testsupport';

const appNamePrefix = data.registerApp.PW_Test_;
const sso = data.registerApp.sso[0];
const state = "Draft";

test.beforeEach(async ({page}) => {
    await testsupport.navigateToApp(page, sso, appNamePrefix, state);
});


test.use({storageState: 'support/login-sessions/user-session.json'});

test.describe("Tests for Application settings", async () => {

    test("Platform configuration", async ({page}) => {
        await page.click(application_settings_selectors.application_settings_button);
        await expect(page.locator(application_settings_selectors.application_settings_openID).first()).toHaveClass(/.*disabled.*/);
        // await expect(page.locator('.details-nav-item')).toHaveAttribute('disabled', 'true');
        // await expect(page.locator(application_settings_selectors.application_settings_submenu.platform_configurations_submenu.platform_configurations_button)).not.toBeEnabled();
        // console.log(`✅ Platform configuration is disabled for draft application`);
    });

    test("Adding claims to application", async ({page}) => {
        await testsupport.addClaims(page)

    });

    test("Adding secret value ID to application", async ({page}) => {
        await page.click(application_settings_selectors.application_settings_button);
        await expect(page.locator(application_settings_selectors.application_settings_openID).nth(1)).toHaveClass(/.*disabled.*/);
        // console.log("✅ Secret value ID is disabled for draft application");
    });


    test("Checking application consents table exists", async ({page}) => {
        await page.click(main_info_selectors.navigation.application_settings);
        await page.click(application_settings_selectors.application_settings_submenu.application_consents_submenu.application_consents);
        await expect(page.locator('.list-wrapper')).toBeVisible();
        // console.log("✅ Application consents table exists");
    });

    test("Custom security attributes can be added with default values", async ({page}) => {
        await page.click(application_settings_selectors.application_settings_button);
        await expect(page.locator(application_settings_selectors.application_settings_openID).nth(2)).toHaveClass(/.*disabled.*/);
        // console.log("✅ Custom security attributes disabled for draft application");
    });

    test("Configure broker integration", async ({page}) => {
        await page.click(application_settings_selectors.application_settings_button);
        await expect(page.locator(application_settings_selectors.application_settings_openID).nth(3)).toHaveClass(/.*disabled.*/);
        // console.log("✅ Broker integration disabled for draft application");

    });
    test("Tardis Client mapping", async ({page}) => {
        await testsupport.tardisClientMapping(page);
    });
});
