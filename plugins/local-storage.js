export default defineNuxtPlugin((nuxtApp) => {
    const localStoragePlugin = {
        setItem(key, value) {
            if (process.client) {
                localStorage.setItem(key, JSON.stringify(value));
            }
        },
        getItem(key) {
            if (process.client) {
                const value = localStorage.getItem(key);
                return value ? JSON.parse(value) : null;
            }
            return null;
        },
        removeItem(key) {
            if (process.client) {
                localStorage.removeItem(key);
            }
        },
    };

    nuxtApp.provide('localStorage', localStoragePlugin);
});
