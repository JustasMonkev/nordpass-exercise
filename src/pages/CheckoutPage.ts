import {Page} from "@playwright/test";

export default class CheckoutPage {
    private page: Page;
    private readonly selectors = {
        taxCountryButton: `[data-testid="TaxSelector-country-link"]`,
        taxCountrySelect: `[data-testid="CountrySelect"]`,
        taxSelectorPercentage: `[data-testid="TaxSelector-percentage"]`,
        addOnButton: `[data-testid="NordVPNCartSummaryCard"]`,
        selectedItem: `[data-testid="NordVPNCartSummarySelectedItem"]`,
        totalPrice: `[data-testid="CartSummary-total-amount"]`
    };

    constructor(page: Page) {
        this.page = page;
    }

    async clickTaxCountryButton(country: string) {
        await this.page.click(this.selectors.taxCountryButton);
        await this.page.selectOption(this.selectors.taxCountrySelect, country);
    }

    async getTaxSelectorPercentageText() {
        return await this.page.textContent(this.selectors.taxSelectorPercentage);
    }

    async clickAddOnButton() {
        await this.page.click(this.selectors.addOnButton);
        await this.page.waitForSelector(this.selectors.selectedItem);
    }

    async getTotalPriceText() {
        return await this.page.textContent(this.selectors.totalPrice);
    }
}
