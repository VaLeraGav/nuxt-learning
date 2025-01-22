<script setup>

definePageMeta({
    // layout: 'admin',
    middleware: 'auth',
});

useSeoMeta({
    title: 'Работа с пользователями',
});

const stateTitleTmp = storeTitleTmp();
stateTitleTmp.setTitlePage('Работа с пользователями');

const { $localStorage } = useNuxtApp();

const users = ref([]);
const currentUser = ref({ id: '', name: '', age: '' });
const isLoading = ref(false);

const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36);
};

const saveData = () => {
    isLoading.value = true;

    setTimeout(() => {
        const index = users.value.findIndex(user => user.id === currentUser.value.id);
        if (index !== -1) {
            users.value[index] = { ...currentUser.value };
        } else {
            users.value.push({ ...currentUser.value, id: generateId() });
        }

        $localStorage.setItem('users', users.value);
        resetCurrentUser();
        isLoading.value = false;

    }, 1000); // Задержка в 1 секунду
};

const loadData = () => {
    const data = $localStorage.getItem('users');
    if (data) {
        users.value = data;
    }
};

onMounted(() => {
    loadData();
});

const deleteUser = (userId) => {
    users.value = users.value.filter(user => user.id !== userId);
    $localStorage.setItem('users', users.value);
};

const handleNameInput = () => {
    const existingUser = users.value.find(user => user.name.toLowerCase() === currentUser.value.name.toLowerCase());
    if (existingUser) {
        currentUser.value = { ...existingUser };
    } else {
        // Если пользователь не найден, сбросьте данные текущего пользователя
        currentUser.value.id = '';
        currentUser.value.age = '';
    }
};

const resetCurrentUser = () => {
    currentUser.value = { id: '', name: '', age: '' }; // Сброс формы
};

</script>

<template>
    <div class="user-management">
        <div class="user-form">
            <h2>{{ currentUser.id ? 'Изменить user' : 'Добавить нового user' }}</h2>
            <div class="form-group">
                <label for="name">Name:</label>
                <input id="name" v-model="currentUser.name" type="text" class="form-input" @input="handleNameInput" />
            </div>
            <div class="form-group">
                <label for="age">Age:</label>
                <input id="age" v-model="currentUser.age" type="number" class="form-input" />
            </div>
            <button @click="saveData" :disabled="isLoading" class="save-button">
                {{ isLoading ? 'Saving...' : (currentUser.id ? 'Update' : 'Add') }} User
            </button>
        </div>

        <div v-if="isLoading" class="loading-indicator">Loading...</div>

        <div v-if="users.length > 0" class="user-list">
            <h3>Все Users:</h3>
            <ul>
                <li v-for="user in users" :key="user.id" class="user-item">
                    <span class="user-info">{{ user.name }} ({{ user.age }})</span>
                    <div class="user-actions">
                        <button @click="currentUser = { ...user }" class="edit-button">Edit</button>
                        <button @click="deleteUser(user.id)" class="delete-button">Delete</button>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>


<style scoped>
.user-management {
    max-width: 800px;
    padding: 20px;
    font-family: Arial, sans-serif;
}

.user-form {
    background: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
}

.form-group {
    margin-bottom: 15px;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

.form-input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
}

.save-button {
    background-color: #42b983;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
}

.save-button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

.loading-indicator {
    text-align: center;
    padding: 10px;
    color: #42b983;
    font-weight: bold;
}

.user-list {
    background: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.user-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #eee;
}

.user-item:last-child {
    border-bottom: none;
}

.user-info {
    font-size: 16px;
}

.user-actions button {
    margin-left: 10px;
    padding: 5px 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
}

.edit-button {
    background-color: #ffc107;
    color: white;
}

.delete-button {
    background-color: #dc3545;
    color: white;
}
</style>
