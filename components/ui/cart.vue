<script setup>
import useCart from '~/composables/useCart'; // Импортируем наш composable

const { cart, getCart } = useCart();
</script>

<template>
    <div class="cart">
        <h3>Корзина</h3>
        <ul v-if="cart.length > 0">
            <li v-for="item in cart" :key="item.id" class="cart-item">
                <div class="cart-item-info">
                    <strong>{{ item.title }}</strong>
                    <p>Количество: {{ item.quantity }}</p>
                    <p>Цена: ${{ item.price * item.quantity }}</p>
                </div>
            </li>
        </ul>
        <div v-else>
            Корзина пуста.
        </div>
    </div>
</template>

<style scoped>
.cart {
    background: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.cart-item {
    background: white;
    padding: 10px;
    border-radius: 4px;
    margin-bottom: 10px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.cart-item-info {
    font-size: 14px;
}

.cart-item-info strong {
    font-size: 16px;
    color: #333;
}

.cart-item-info p {
    margin: 5px 0;
    color: #666;
}
</style>
