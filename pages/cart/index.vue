<script setup>

useSeoMeta({
    title: 'Корзина',
});

const stateTitleTmp = storeTitleTmp();
stateTitleTmp.setTitlePage('Корзина');

</script>

<template>
    <div>
        <UiCart />
    </div>
</template>
