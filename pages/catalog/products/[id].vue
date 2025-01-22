<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

// const { id } = useRoute().params;
// productId =  $route.params.catalog_id

const route = useRoute();

const product = ref({});
const error = ref(null);

onMounted(async () => {
    const productId = route.params.id;
    try {
        const response = await fetch(`https://dummyjson.com/products/${productId}`);
        if (!response.ok) {
            throw new Error(`Ошибка загрузки данных: ${response.statusText}`);
        }
        const data = await response.json();
        product.value = data;

        useSeoMeta({
            title: product.value.title,
            description: product.value.description,
            ogTitle: product.value.title,
            ogDescription: product.value.description,
            ogImage: product.value.thumbnail,
            twitterCard: 'summary_large_image',
        });
    } catch (err) {
        error.value = err.message;
    }
});

</script>


<template>
    <div v-if="error" class="error-message">
        {{ error }}
    </div>
    <div v-else>
        <div class="product-detail">
            <div class="product-header">
                <h1>{{ product.title }}</h1>
                <img :src="product.thumbnail" :alt="product.title" class="product-thumbnail" />
            </div>

            <!-- Основная информация -->
            <div class="product-info">
                <p><strong>Описание:</strong> {{ product.description }}</p>
                <p><strong>Категория:</strong> {{ product.category }}</p>
                <p><strong>Бренд:</strong> {{ product.brand }}</p>
                <p><strong>Цена:</strong> ${{ product.price }}</p>
                <p><strong>Скидка:</strong> {{ product.discountPercentage }}%</p>
                <p><strong>Рейтинг:</strong> {{ product.rating }} / 5</p>
                <p><strong>Остаток на складе:</strong> {{ product.stock }}</p>
                <p><strong>Статус:</strong> {{ product.availabilityStatus }}</p>
            </div>

            <div class="product-gallery">
                <h2>Галерея</h2>
                <div class="gallery-images">
                    <img v-for="(image, index) in product.images" :key="index" :src="image"
                        :alt="`Изображение ${index + 1}`" class="gallery-image" />
                </div>
            </div>

            <div class="product-specs">
                <h2>Характеристики</h2>
                <p><strong>SKU:</strong> {{ product.sku }}</p>
                <p><strong>Вес:</strong> {{ product.weight }} кг</p>
                <p><strong>Габариты:</strong>
                    {{ product.dimensions?.width }} x {{ product.dimensions?.height }} x {{ product.dimensions?.depth }}
                    см
                </p>
                <p><strong>Гарантия:</strong> {{ product.warrantyInformation }}</p>
                <p><strong>Доставка:</strong> {{ product.shippingInformation }}</p>
                <p><strong>Минимальный заказ:</strong> {{ product.minimumOrderQuantity }} шт</p>
                <p><strong>Политика возврата:</strong> {{ product.returnPolicy }}</p>
            </div>

            <div class="product-reviews">
                <h2>Отзывы ({{ product.reviews?.length }})</h2>
                <div v-for="review in product.reviews" :key="review.date" class="review">
                    <p><strong>{{ review.reviewerName }}</strong> ({{ review.rating }} / 5)</p>
                    <p>{{ review.comment }}</p>
                    <p><small>{{ new Date(review.date).toLocaleDateString() }}</small></p>
                </div>
            </div>

            <div class="product-meta">
                <h2>Метаданные</h2>
                <p><strong>Дата создания:</strong> {{ new Date(product.meta?.createdAt).toLocaleDateString() }}</p>
                <p><strong>Дата обновления:</strong> {{ new Date(product.meta?.updatedAt).toLocaleDateString() }}</p>
                <p><strong>Штрих-код:</strong> {{ product.meta?.barcode }}</p>
                <img :src="product.meta?.qrCode" alt="QR-код" class="qr-code" />
            </div>

        </div>
    </div>
</template>

<style scoped>
.error-message {
    color: red;
    font-weight: bold;
}

.product-detail {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
}

.product-header {
    text-align: center;
    margin-bottom: 20px;
}

.product-thumbnail {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
}

.product-info,
.product-specs,
.product-reviews,
.product-meta {
    background: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.product-gallery {
    margin-bottom: 20px;
}

.gallery-images {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
}

.gallery-image {
    max-width: 100%;
    height: 100px;
    border-radius: 8px;
}

.review {
    background: white;
    padding: 10px;
    border-radius: 4px;
    margin-bottom: 10px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.qr-code {
    max-width: 150px;
    height: auto;
    margin-top: 10px;
}
</style>
