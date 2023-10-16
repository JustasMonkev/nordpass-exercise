export const apiConfig = {
    baseURL: 'https://virtserver.swaggerhub.com/nord-s/User-API/1.0.0',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + process.env.TOKEN
    }
};
