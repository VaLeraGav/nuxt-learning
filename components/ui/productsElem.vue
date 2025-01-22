<template>
    <div class="product-item">
        <img :src="product.thumbnail" :alt="product.title" class="product-image" />
        <div class="product-info">
            <strong>{{ product.title }}</strong>
            <NuxtLink :to="`/catalog/products/${product.id}`">Подробнее</NuxtLink>
            <p>{{ product.description }}</p>
            <p>Цена: ${{ product.price }}</p>
            <button @click="addToCart(product)" class="add-to-cart-button">
                Добавить в корзину
            </button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        product: {
            type: Object,
            required: true
        }
    },
    methods: {
        addToCart(product) {
            // используется для пользовательских событий. Он позволяет дочернему компоненту (например, ProductsElem)
            // отправить событие родительскому компоненту. Это способ коммуникации между компонентами,
            // когда дочерний компонент хочет сообщить родительскому компоненту о каком-то действии или изменении.
            this.$emit('add-to-cart', product);
        }
    }
};
</script>

<style scoped>
.product-item {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    padding: 10px;
    border-radius: 5px;
}

.product-item a {
    padding-left: 5px;
}

.product-image {
    width: 100px;
    height: 100px;
    object-fit: cover;
    margin-right: 20px;
    border-radius: 5px;
}

.product-info {
    flex: 1;
}

.add-to-cart-button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 3px;
    cursor: pointer;
}

.add-to-cart-button:hover {
    background-color: #0056b3;
}
</style>
