import { ref } from 'vue';

// Создаем реактивное состояние для корзины
const cart = ref([]);

// Функция для добавления продукта в корзину
const addToCart = (product) => {
    const existingProduct = cart.value.find((item) => item.id === product.id);
    if (existingProduct) {
        existingProduct.quantity += 1; // Увеличиваем количество, если продукт уже в корзине
    } else {
        cart.value.push({ ...product, quantity: 1 }); // Добавляем новый продукт
    }
};

// Функция для получения корзины
const getCart = () => {
    return cart.value;
};

// Экспортируем функции и состояние
export default function useCart() {
    return {
        cart,
        addToCart,
        getCart,
    };
}
