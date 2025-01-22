<script setup>

useSeoMeta({
    title: 'Категории',
});

definePageMeta({
    // layout: 'admin',
    middleware: 'auth',
})

const stateTitleTmp = storeTitleTmp();
stateTitleTmp.setTitlePage('Категории')

</script>

<template>
    <AdminCategories />
</template>
