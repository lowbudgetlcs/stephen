<template>
    <div class="app-container">
        <Sidebar />
        <main
            :class="[
                'content',
                {
                    'sidebar-collapsed': isCollapsed,
                    'sidebar-mobile': isMobile,
                },
            ]"
        >
            <router-view />
        </main>
    </div>
</template>

<script setup>
import { computed } from "vue";
import { useSidebarStore } from "@/stores/sidebar";
import { storeToRefs } from "pinia";
import Sidebar from "./components/Sidebar.vue";

const sidebarStore = useSidebarStore();
const { isCollapsed, isMobile } = storeToRefs(sidebarStore);
</script>

<style>
body {
    margin: 0;
    min-height: 100vh;
    overflow-x: hidden;
}

.app-container {
    display: flex;
}

.content {
    flex: 1;
    padding: 20px;
    transition: margin-left 0.3s ease;
    margin-left: 250px;
}

.content.sidebar-collapsed {
    margin-left: 60px;
}

.content.sidebar-mobile {
    margin-left: 0;
    transition: none;
}

/* Mobile layout */
@media (max-width: 768px) {
    .content {
        margin-left: 0;
    }
}
</style>
