<!-- не используется так как дополнительные поля admin добавляется в default -->
<template>
    <div>
        <UiSidebarMenu :sidebarMenu="menuDataAdmin" />
    </div>
    <main class="content">
        <slot />
    </main>
</template>


<style>
@import url("~/assets/scss/layouts/default.scss");
</style>

<script setup>
import { ref } from 'vue';

const menuDataAdmin = ref([
    { name: 'Дашборды', href: '/admin/dashboards', ico: 'ico-dashboards', children: [] },
    {
        name: 'Каталог', href: '#', ico: 'ico-catalog', children: [
            { name: 'Категории', href: '/admin/catalog/categories' },
            { name: 'Товары', href: '/catalog/products' }
        ]
    },
    { name: 'Пользователи', href: '/admin/users', ico: 'ico-users', children: [] },
    { name: 'Корзина', href: '/cart', ico: 'ico-payment', children: [] },
]);
</script>
