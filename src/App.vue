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
    width: 100%;
    max-width: none;
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
    font-size: 15px;
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
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

/* The sidebar is position: fixed, so reserve its 200px here. */
.main-content:not(.no-sidebar) {
    padding-left: calc(200px + 2rem);
}

/* Matches the breakpoint where Sidebar.vue becomes a top bar. */
@media (max-width: 768px) {
    .main-content,
    .main-content:not(.no-sidebar) {
        padding: 1rem;
    }
}
</style>
