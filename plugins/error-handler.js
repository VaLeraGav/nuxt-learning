export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.hook('vue:error', (error) => {
        console.log('Глобальная ошибка:', error);
    });

    nuxtApp.hook('app:error', (error) => {
        console.log('Ошибка приложения:', error);
    });
});
