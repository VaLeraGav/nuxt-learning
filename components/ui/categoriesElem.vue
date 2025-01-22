<template>
    <div class="category-item-check">
        <input type="checkbox" />
    </div>
    <div class="category-item-id">{{ id }}</div>
    <div class="category-item-status">
        <i :class="['status-icon', status === 'Y' ? 'status-green' : 'status-red']"></i>
    </div>
    <div class="category-item-name">{{ name }}</div>
    <div class="category-item-create-at">{{ formatDate(create_at) }}</div>
    <div class="category-item-update-at">{{ formatDate(update_at) }}</div>
</template>

<script setup>
import { defineProps } from 'vue';
import { format } from 'date-fns';

const props = defineProps({
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    create_at: {
        type: String,
        required: true,
    },
    update_at: {
        type: String,
        required: true,
    },
});

const formatDate = (dateString) => {
    return format(new Date(dateString), 'dd MMM.'); // Форматируем дату
};
</script>
