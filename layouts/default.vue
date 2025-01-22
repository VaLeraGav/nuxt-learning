<template>
    <div>
        <div class="wrapper">
            <div class="sidebar" :class="{ hide: !isSidebarVisible }">
                <div class="sidebar-content">
                    <div class="profile-block">
                        <span class="profile-preview"><i class="ico-user"></i></span>
                        <NuxtLink to="/login"><span>{{ user ? user.email : 'User' }}</span></NuxtLink>
                        <button v-if="user" @click="logout" class="logout-button">Logout</button>
                    </div>
                    <UiSidebarMenu :sidebarMenu="menuData" />
                </div>
            </div>
            <div class="main-content" :class="{ hide: !isSidebarVisible }">
                <header class="wr-header">
                    <div class="header-left">
                        <div class="wr-menu-sidebar">
                            <button class="btn-menu-sidebar" @click="toggleMenu">
                                <i class="ico-burger"></i>
                            </button>
                        </div>
                        <div class="title-page">
                            {{ stateTitleTmp?.getTitlePage }}
                        </div>
                    </div>
                    <div class="header-right">
                        <div class="wr-notification">
                            <i class="ico-notification"></i>
                        </div>
                    </div>
                </header>
                <main class="content">
                    <slot />
                </main>
            </div>
        </div>
    </div>
</template>


<style>
@import url("~/assets/scss/layouts/default.scss");
</style>

<script setup>
import { ref } from 'vue';
const router = useRouter(); // Получаем экземпляр маршрутизатора

const authStore = useAuthStore();
const user = authStore.user;

if (user) {
    console.log('User ID:', user.id);
    console.log('User Email:', user.email);
} else {
    console.log('Пользователь не найден');
}

let menu;
if (user) {
    menu = [
        { name: 'Дашборды', href: '/admin/dashboards', ico: 'ico-dashboards', children: [] },


        { name: 'Категории', ico: 'ico-catalog', href: '/admin/catalog/categories', children: [] },
        { name: 'Товары', ico: 'ico-catalog', href: '/catalog/products', children: [] },

        { name: 'Пользователи', href: '/admin/users', ico: 'ico-users', children: [] },
        { name: 'Корзина', href: '/cart', ico: 'ico-payment', children: [] },
    ];
} else {
    menu = [
        {
            name: 'Каталог', href: '#', ico: 'ico-catalog', children: [
                { name: 'Товары', href: '/catalog/products' }
            ]
        },
        { name: 'Корзина', href: '/cart', ico: 'ico-payment', children: [] },
    ];
}

const menuData = ref(menu);

const stateTitleTmp = storeTitleTmp();
const isSidebarVisible = ref(true);

function toggleMenu() {
    isSidebarVisible.value = !isSidebarVisible.value;
}

const logout = async () => {
    authStore.logout();

    // Перенаправляем на страницу логина
    await router.replace('/login');
    await router.go(0);
};
</script>
