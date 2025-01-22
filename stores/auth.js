import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: null,
    }),
    actions: {
        setUser(user) {
            this.user = user;
            if (import.meta.client) {
                localStorage.setItem('user', JSON.stringify(user));
            }
        },
        setToken(token) {
            this.token = token;
            if (import.meta.client) {
                localStorage.setItem('token', token);
            }
        },
        logout() {
            this.user = null;
            this.token = null;
            if (import.meta.client) {
                localStorage.removeItem('user');
                localStorage.removeItem('token');
            }
        },
        initializeStore() {
            if (import.meta.client) {
                if (localStorage.getItem('user')) {
                    this.user = JSON.parse(localStorage.getItem('user'));
                }
                if (localStorage.getItem('token')) {
                    this.token = localStorage.getItem('token');
                }
            }
        },
    },
    getters: {
        isAuthenticated: (state) => !!state.user,
    },
});
