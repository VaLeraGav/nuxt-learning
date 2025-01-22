<script setup>

const error = useError();

const content = error.value?.statusCode === 404 ? '404 - Страница не найдена' : 'Ошибка - Что-то пошло не так';

useHead({
    title: content,
    meta: [
        { property: 'og:title', content: content }
    ]
});

</script>

<template>
    <div class="error-container">
        <h1 v-if="error.statusCode === 404">404 Страница не найдена</h1>
        <h1 v-else>Произошла ошибка</h1>
        <p>{{ error.message }}</p>
        <nuxt-link to="/">Вернуться на главную</nuxt-link>
    </div>
</template>

<style scoped>
.error-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
    font-family: Arial, sans-serif;
}

h1 {
    font-size: 2rem;
    margin-bottom: 1rem;
}

p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
}

a {
    color: #3498db;
    text-decoration: none;
    font-size: 1rem;
}

a:hover {
    text-decoration: underline;
}
</style>
