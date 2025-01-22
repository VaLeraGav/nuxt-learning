<template>
    <div>
        <ul class="categories list-elements">
            <li v-for="categoryItem in categoryList" :key="categoryItem.id" class="category-item">
                <UiCategoriesElem :id="categoryItem.id" :name="categoryItem.name" :status="categoryItem.status"
                    :create_at="categoryItem.create_at" :update_at="categoryItem.update_at" />
            </li>
        </ul>
    </div>
</template>

<script setup>
import UiCategoriesElem from '../ui/categoriesElem.vue';
import { ref } from 'vue';

const categoryList = ref([
    {
        id: 1,
        name: 'Кабель',
        status: 'Y',
        create_at: '2023-01-17',
        update_at: '2023-01-17',
    },
    {
        id: 2,
        name: 'Лампа накаливания',
        status: 'N',
        create_at: '2023-01-17',
        update_at: '2023-01-17',
    },
    {
        id: 3,
        name: 'Садовые инструменты',
        status: 'Y',
        create_at: '2023-01-13',
        update_at: '2023-01-19',
    },
]);
</script>

<style>
@import url("~/assets/scss/components/list.scss");
</style>
