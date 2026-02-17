<template>
    <div class="app-layout">
        <SideBar />
        <main class="main-content">
            <router-view />
        </main>
    </div>
</template>

<script setup lang="ts">
import SideBar from "./components/SideBar.vue";
</script>

<style>
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
    margin-left: 200px;
    padding: 2rem;
    min-height: 100vh;
}
</style>
