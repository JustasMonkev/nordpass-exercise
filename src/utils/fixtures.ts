import {test as base} from "@playwright/test";

export const test = base.extend({
    storageState: async ({browser}, use) => {
        async function getPopUpCookie() {
            const page = await browser.newPage();
            // Add the desired cookie.
            await page.context().addCookies([
                {
                    name: `consent`,
                    value: `{%22functionality_storage%22:%22granted%22%2C%22analytics_storage%22:%22granted%22%2C%22ad_storage%22:%22granted%22}`,
                    path: `/`,
                    domain: `.nordpass.com`,
                },
            ]);

            // Retrieve the cookie and return it.
            const cookies = await page.context().cookies();
            return cookies.find(cookie => cookie.name === 'consent');
        }

        const cookie = await getPopUpCookie();
        await use({
            cookies: [cookie],
            origins: []
        });
    },
});
