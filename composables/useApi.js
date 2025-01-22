import { useFetch } from '#imports';

const BASE_URL = 'https://dummyjson.com';

export function useApi(endpoint, options = {}) {
    const url = `${BASE_URL}${endpoint}`;

    return useFetch(url, {
        ...options,
    });
}
