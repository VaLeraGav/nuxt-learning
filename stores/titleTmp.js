export const storeTitleTmp = defineStore('titleTmp', {
    state: () => ({
        titlePage: '',
    }),
    getters: {
        getTitlePage: (state) => state.titlePage,
    },
    actions: {
        setTitlePage(titlePage) {
            this.titlePage = titlePage
        },
    },
})
