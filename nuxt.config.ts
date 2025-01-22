export default defineNuxtConfig({
    compatibilityDate: '2024-11-01',
    devtools: { enabled: false },
    app: {
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
        }
    },
    modules: ['@pinia/nuxt'],
    routeRules: {
        '/admin': {
            redirect: {
                to: '/admin/dashboards',
                statusCode: 301,
            },
        },
    },
})
