<script setup>
import { ref } from 'vue';
import { useAuthStore } from '~/stores/auth';
import { useRouter } from 'vue-router';

useSeoMeta({
    title: 'Login',
});

const stateTitleTmp = storeTitleTmp();
stateTitleTmp.setTitlePage('Login');

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const authStore = useAuthStore();
const router = useRouter(); // Получаем экземпляр маршрутизатора

const login = async () => {
    try {
        const response = await $fetch('/api/auth/login', {
            method: 'POST',
            body: { email: email.value, password: password.value },
        });

        authStore.setUser(response.user);
        authStore.setToken(response.token);

        // Перенаправление с перерендерингом
        await router.replace('/admin/'); // Используем replace для обновления маршрута
        await router.go(0); // Перезагрузка страницы
    } catch (error) {
        errorMessage.value = 'Invalid email or password';
    }
};
</script>

<template>
    <div class="login-page">
        <h1>Login</h1>
        <form @submit.prevent="login">
            <div class="form-group">
                <label for="email">Email:</label>
                <input id="email" v-model="email" type="text" placeholder="Enter your email" required />
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input id="password" v-model="password" type="password" placeholder="Enter your password" required />
            </div>
            <button type="submit">Login</button>
            <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        </form>
    </div>
</template>

<style scoped>
.login-page {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
}

input {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
}

button {
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}

.error-message {
    color: red;
    margin-top: 10px;
}
</style>
