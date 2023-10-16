import {apiConfig} from "./apiConfig";

export const endpoints = {
    getUserToken: `${apiConfig.baseURL}/v1/user/login`,
    getUserItems: `${apiConfig.baseURL}/user/items`,
    getUserItem: (id: string) => `${apiConfig.baseURL}/user/${id}/item`,
    createUserItem: `${apiConfig.baseURL}/user/item`
};
