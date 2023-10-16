import {expect, test} from "@playwright/test";
import {createUserItem, getUserItem, getUserItems, getUserToken} from "../../src/api/user-api";
import * as jwt from "jsonwebtoken";
import {JwtPayload} from "jsonwebtoken";
import {mainSchema} from "../../src/utils/itemValidation";
import {exampleItem, Item} from "../../src/types/item";
import {generateHMACSignature} from "../../src/utils/hmacSignature";

test.describe('user actions', () => {
    test(`should get user’s second item`, async ({request}) => {
        const files = await getUserItems(request);
        expect(files.status()).toBe(200);
        const itemsResponse = await files.json();
        expect(itemsResponse[0]).toHaveProperty('item_count');
        expect(itemsResponse[0]).toHaveProperty('items');
        expect(itemsResponse[0].items.length).toBeGreaterThanOrEqual(2);
        const secondItemId = itemsResponse[0].items[1] as string;
        const secondItem = await getUserItem(request, secondItemId);
        expect(secondItem.status()).toBe(200);
        const secondItemResponse = await secondItem.json();
        expect(secondItemResponse[0].id).toBe(secondItemId);
    });
    test('should validate JSON object structure for a user item', async ({request}) => {
        const files = await getUserItems(request);
        expect(files.status()).toBe(200);
        const itemsResponse = await files.json();
        const secondItemId = itemsResponse[0].items[1] as string;
        const secondItem = await getUserItem(request, secondItemId);
        expect(secondItem.status()).toBe(200);
        const secondItemResponse = await secondItem.json();
        const result = mainSchema.validate(secondItemResponse);
        expect(result.error).toBeUndefined();
    });
    test(`should create a new user item`, async ({request}) => {
        const response = await createUserItem(request, exampleItem);
        expect(response.status()).toBe(201);
        const createdItem = await response.json();
        const result = mainSchema.validate(createdItem);
        expect(result.error).toBeUndefined();
    });
    test('verify logged in user', async ({request}) => {
        const response = await getUserToken(request);
        const userToken = await response.json();
        const token = userToken.token;
        const decodedPayload = jwt.decode(token) as JwtPayload;

        const expectedUuid = "89652fc1-a523-458e-8101-7b8cadc9791e";  // Replace with expected user_uuid
        expect(decodedPayload.user_uuid).toBe(expectedUuid);
    });
    test('should eventually fetch the newly created item', async ({request}) => {
        const response = await createUserItem(request, exampleItem);
        expect(response.status()).toBe(201);
        const createdItem = await response.json();

        // Now try to fetch the item with retries
        let itemFound = false;
        let attempts = 0;
        const maxAttempts = 3;

        while (!itemFound && attempts < maxAttempts) {
            const files = await getUserItems(request);
            const itemsResponse = await files.json();
            itemFound = itemsResponse.some((item: Item) => item.id === createdItem.id);
            if (!itemFound) {
                await new Promise(res => setTimeout(res, 10000)); // Wait 10 seconds
            }
            attempts++;
        }

        expect(itemFound).toBeTruthy();
    });
    test('verify if a user can login after rate limit is reached and then expired', async ({request}) => {
        let rateLimitReached = false;
        let rateLimitHeader: string | null = null;

        // First, reach the rate limit
        while (!rateLimitReached) {
            const response = await getUserToken(request);
            if (response.status() === 429) {
                rateLimitReached = true;
            }
        }
        // Now wait for the rate limit to expire

        expect(rateLimitReached).toBeTruthy();

        await new Promise(res => setTimeout(res, 10000));

        // Now try to login again

        const postWaitLoginResponse = await getUserToken(request);

        expect(postWaitLoginResponse.status()).toBe(200);
    });
    test(`should perform HMAC authenticated request successfully`, async ({request}) => {
        // 1. Log in and obtain JWT token.
        const response = await getUserToken(request);
        const userToken = await response.json();
        const token = userToken.token;

        // 2. Extract `signature_key` and `nonce` from the JWT token.
        const decodedPayload = jwt.decode(token) as JwtPayload;
        const jwtContent = {
            signature_key: decodedPayload.signature_key,
            nonce: decodedPayload.nonce
        }

        // 3. Generate HMAC signature with the correct method and path.
        const hmacSignature = generateHMACSignature(`GET`, `/api/v1/123`, jwtContent.signature_key, jwtContent.nonce);

        const headers = {
            'X-Nonce': jwtContent.nonce,
            'X-Signature': hmacSignature,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };

        // 4. Send a request to `/user/items` using generated headers.
        const userItems = await getUserItems(request, headers);
        expect(userItems.status()).toBe(200);
        const itemsResponse = await userItems.json();
        expect(itemsResponse[0]).toHaveProperty('item_count');
        expect(itemsResponse[0]).toHaveProperty('items');
        expect(itemsResponse[0].items.length).toBeGreaterThanOrEqual(2);
    });
});
