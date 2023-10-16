import {test} from "@playwright/test";
import {getUserToken} from "../../src/api/user-api";

test('setup token', async ({request}) => {
    const response = await getUserToken(request);
    const userToken = await response.json();
    process.env.TOKEN = userToken.token;
});
