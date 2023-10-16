import {Page} from "@playwright/test";

/**
 * Base class for pages.
 */
export class BasePage {
    // The page object.
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }
}
