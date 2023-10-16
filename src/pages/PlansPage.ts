import {Page} from "@playwright/test";
import {BasePage} from "./BasePage";

export default class PlansPage extends BasePage {
    private readonly selectors = {
        pricingCardsElements: `div[id= "Pricing Card Tabs - B2C Plans"]`,
        premiumPlanButton: `Get Premium Plan`,
    };

    constructor(page: Page) {
        super(page);
    }

    async clickPremiumPlanButton() {
        await this.page.getByRole('link', {name: this.selectors.premiumPlanButton}).click()
    }

    async waitForPricingCardsElements() {
        await this.page.waitForSelector(this.selectors.pricingCardsElements);
    }
}
