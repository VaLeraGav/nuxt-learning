<script setup>
import { ref, watch } from 'vue';
import useCart from '~/composables/useCart'; // Импортируем наш composable
import { useApi } from '~/composables/useApi'; // Импортируем нашу композицию

const searchQuery = ref('');

// кастомная прослойка, чтобы каждый раз не писать https://dummyjson.com
const { data: allProducts, isFetching: isFetchingAll, status: statusAll } = useApi(
    '/products',
    {
        immediate: true, // Загружаем данные сразу при монтировании
    }
);

const { data, isFetching, status, error } = useFetch(
    () => `https://dummyjson.com/products/search?q=${searchQuery.value}`,
    {
        immediate: false,
    }
);

const { addToCart } = useCart();

watch(searchQuery, (newQuery) => {
    if (newQuery.trim()) {
        data.value = null; // Очищаем предыдущие данные
        error.value = null; // Очищаем предыдущие ошибки
    }
});

</script>
<template>
    <div>
        <input
            v-model="searchQuery"
            type="text"
            placeholder="Введите название продукта..."
            class="search-input"
        />

        <div v-if="!searchQuery.trim() && statusAll === 'success'">
            <h3>Все товары:</h3>
            <ul class="product-list">
                <li v-for="product in allProducts.products" :key="product.id">
                    <UiProductsElem :product="product" @add-to-cart="addToCart" />
                </li>
            </ul>
        </div>

        <div v-else-if="!searchQuery.trim() && statusAll === 'idle'">
            Введите название продукта для поиска.
        </div>

        <div v-else-if="isFetching">
            Загрузка...
        </div>

        <div v-else-if="status === 'error' && error?.response?.status === 404">
            Продукт не найден (404)
        </div>

        <div v-else-if="status === 'error'">
            Произошла ошибка: {{ error?.message }}
        </div>

        <div v-else-if="data && data.products.length > 0">
            <h3>Результаты поиска:</h3>
            <ul class="product-list">
                <li v-for="product in data.products" :key="product.id" class="product-item">
                    <UiProductsElem :product="product" @add-to-cart="addToCart" />
                </li>
            </ul>
        </div>

        <div v-else-if="data && data.products.length === 0">
            По вашему запросу ничего не найдено.
        </div>
    </div>
</template>


<style scoped>
.search-input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-bottom: 20px;
}

.product-list {
    list-style: none;
    padding: 0;
}

.product-item {
    background: #f9f9f9;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.product-info {
    font-size: 14px;
}

.product-info strong {
    font-size: 16px;
    color: #333;
}

.product-info p {
    margin: 5px 0;
    color: #666;
}

.product-info a {
    margin: 5px 0;
}
</style>
