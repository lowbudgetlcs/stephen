<template>
    <div class="app-layout">
        <SideBar v-if="showSidebar" />
        <main class="main-content" :class="{ 'no-sidebar': !showSidebar }">
            <router-view />
        </main>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import SideBar from "./components/Sidebar.vue";

const route = useRoute();

const showSidebar = computed(() => route.name !== "login");
</script>

<style>
#app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

*,
*::before,
*::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family:
        -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    background: #f8fafc;
    color: #1e293b;
}

.app-layout {
    min-height: 100vh;
}

.main-content {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 2rem;
}
</style>
