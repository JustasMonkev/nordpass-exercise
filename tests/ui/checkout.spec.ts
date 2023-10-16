import PlansPage from "../../src/pages/PlansPage";
import CheckoutPage from "../../src/pages/CheckoutPage";
import {expect} from "@playwright/test";
import {test} from "../../src/utils/fixtures";
import {convertToNumber} from "../../src/utils/testHelper";

test.describe('Checkout', () => {
    test.beforeEach(async ({page}) => {
        const baseUrl = 'https://nordpass.com/';
        const plansPage = new PlansPage(page);
        await page.goto(`${baseUrl}/plans`);
        await plansPage.waitForPricingCardsElements();
        await plansPage.clickPremiumPlanButton();
    });
    test('verify if TAX is updated when the country changes for a person/family plan', async ({context}) => {
        // A new page is created due to the new tab that opens when clicking on the premium plan
        const [page] = await Promise.all([
            context.waitForEvent('page'),
        ]);
        const checkoutPage = new CheckoutPage(page);
        await page.waitForURL(/checkout/);
        const totalAmountBeforeTaxSwitch = convertToNumber(await checkoutPage.getTotalPriceText());
        const taxSelectorPercentageText = await checkoutPage.getTaxSelectorPercentageText();
        await checkoutPage.clickTaxCountryButton('United States');
        await page.waitForLoadState(`load`);
        const totalAmountAfterTaxSwitch = convertToNumber(await checkoutPage.getTotalPriceText());
        const taxSelectorPercentageText2 = await checkoutPage.getTaxSelectorPercentageText();
        expect(taxSelectorPercentageText).not.toEqual(taxSelectorPercentageText2);
        expect(totalAmountBeforeTaxSwitch).toBeGreaterThan(totalAmountAfterTaxSwitch);
    });

    test('verify if the total price is updated when user adds add-ons', async ({context}) => {
        // A new page is created due to the new tab that opens when clicking on the premium plan
        const [page] = await Promise.all([
            context.waitForEvent('page'),
        ]);
        const checkoutPage = new CheckoutPage(page);
        await page.waitForURL(/payment/);
        const totalAmountBeforeAddOn = convertToNumber(await checkoutPage.getTotalPriceText());
        await checkoutPage.clickAddOnButton();
        await page.waitForLoadState(`load`);
        const totalAmountAfterAddOn = convertToNumber(await checkoutPage.getTotalPriceText());
        expect(totalAmountAfterAddOn).toBeGreaterThan(totalAmountBeforeAddOn);
    });
});
