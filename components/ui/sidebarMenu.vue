<template>
    <div class="wr-sidebar-menu">
        <ul class="sidebar-menu">
            <li v-for="(menuItem, menuIndex) in sidebarMenu" :key="menuIndex">
                <NuxtLink v-bind:to="menuItem.href" @click="toggleMenu(menuIndex)">
                    <span>
                        <i v-bind:class="menuItem.ico"></i>
                        {{ menuItem.name }}
                    </span>
                    <span v-if="menuItem.children.length > 0">
                        <i class="ico-arrow-right"></i>
                    </span>
                </NuxtLink>
                <ul v-if="menuItem.children.length > 0" class="sub-menu" :class="{ hide: !isSubMenuOpen(menuIndex) }">
                    <li v-for="(subMenuItem, subMenuIndex) in menuItem.children" :key="subMenuIndex">
                        <NuxtLink v-bind:to="subMenuItem.href">
                            <span>-</span>
                            <span>{{ subMenuItem.name }}</span>
                        </NuxtLink>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<style>
@import url("~/assets/scss/components/sidebar_menu.scss");
</style>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    sidebarMenu: {
        type: Array,
        required: true,
        default: () => []
    }
});

const openSubMenus = ref(new Set());

function toggleMenu(indexMenu) {
    if (openSubMenus.value.has(indexMenu)) {
        openSubMenus.value.delete(indexMenu);
    } else {
        openSubMenus.value.add(indexMenu);
    }
}

function isSubMenuOpen(indexMenu) {
    return openSubMenus.value.has(indexMenu);
}
</script>
