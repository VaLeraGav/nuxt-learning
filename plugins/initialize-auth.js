export default defineNuxtPlugin((nuxtApp) => {
    const authStore = useAuthStore();
    authStore.initializeStore();
});
