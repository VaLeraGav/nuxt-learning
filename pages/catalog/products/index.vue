<script setup>

useSeoMeta({
    title: 'Поиск продуктов',
    keywords: 'продукты, поиск, товары',
});


const stateTitleTmp = storeTitleTmp();
stateTitleTmp.setTitlePage('Продукты');

</script>

<template>
    <div>
        <UiCart />
        <UiSearchProducts/>
    </div>
</template>
