import {APIRequestContext, APIResponse} from "@playwright/test";
import {Item} from "../types/item";
import {apiConfig} from './apiConfig';
import {endpoints} from './endpoints';

export async function getUserToken(request: APIRequestContext): Promise<APIResponse> {
    return await request.post(endpoints.getUserToken, {
        data: {
            username: 'john@doe.com',
            password: 'veryStrongPassword'
        },
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
}

export async function getUserItems(request: APIRequestContext, headers?: {
    [key: string]: string;
}): Promise<APIResponse> {
    return await request.get(endpoints.getUserItems, {
        headers: headers || apiConfig.headers
    });
}

export async function getUserItem(request: APIRequestContext, id: string): Promise<APIResponse> {
    return await request.get(endpoints.getUserItem(id), {
        headers: apiConfig.headers
    });
}

export async function createUserItem(request: APIRequestContext, item: Item): Promise<APIResponse> {
    return await request.post(endpoints.createUserItem, {
        data: item,
        headers: apiConfig.headers
    });
}
