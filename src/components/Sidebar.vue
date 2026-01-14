<template>
    <div
        class="sidebar"
        :class="{
            collapsed: isCollapsed,
            'mobile-active': !isCollapsed && isMobile,
        }"
    >
        <button class="toggle-btn" @click="toggle">
            {{ isCollapsed ? "≡" : "«" }}
        </button>

        <div class="menu-items">
            <router-link to="/" class="sidebar-link">
                <div class="icon-container">
                    <RiHomeLine size="1.2rem" />
                </div>
                <span>Home</span>
            </router-link>
            <router-link to="/about" class="sidebar-link">
                <div class="icon-container">
                    <RiInformationLine size="1.2rem" />
                </div>
                <span>About</span>
            </router-link>
        </div>
    </div>
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";
import { useSidebarStore } from "@/stores/sidebar";
import { storeToRefs } from "pinia";
import { RiHomeLine, RiInformationLine } from "@remixicon/vue";

const sidebarStore = useSidebarStore();
const { isCollapsed, isMobile } = storeToRefs(sidebarStore);
const { toggle, checkMobile } = sidebarStore;

// Handle window resize
const handleResize = () => {
    checkMobile();
    if (isMobile.value && !isCollapsed.value) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "";
    }
};

onMounted(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
    window.removeEventListener("resize", handleResize);
});
</script>

<style scoped>
.sidebar {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    width: 250px;
    background: #2c3e50;
    color: white;
    transition: all 0.3s ease;
    z-index: 1000;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transform-style: preserve-3d; /* Prevents 3D rendering glitches */
    backface-visibility: hidden;
    perspective: 1000px;
    will-change: width, transform;
}

.icon-container {
    width: 30px;
    display: flex;
    justify-content: center;
    flex-shrink: 0;
    transition: opacity 0.2s ease;
}

.sidebar.collapsed {
    width: 60px;
}

.sidebar.mobile-active {
    transform: translateX(0);
}

.toggle-btn {
    padding: 12px;
    background: #34495e;
    border: none;
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
    text-align: center;
}

.menu-items {
    padding: 10px 0;
}

.sidebar-link {
    display: flex;
    align-items: center;
    padding: 12px 20px;
    color: #ecf0f1;
    text-decoration: none;
    transition: all 0.3s ease; /* Match sidebar transition timing */
    gap: 12px; /* Consistent spacing */
    position: relative;
    width: 100%; /* Ensures full width */
    box-sizing: border-box; /* Critical for width calculations */
}

.sidebar-link.router-link-active::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: #3498db;
    z-index: -1;
    border-radius: 0 4px 4px 0;
    transition: all 0.3s ease;
}

.sidebar-link:hover {
    background: #34495e;
}

.sidebar-link:hover::after {
    z-index: -1;
}

.sidebar-link.router-link-active {
    background: #3498db;
}
.sidebar.collapsed .sidebar-link.router-link-active::after {
    left: 0 !important;
    right: 0 !important;
    width: 100% !important;
    transform: translateX(-20px) !important;
    border-radius: 0 50% 50% 0;
}

.sidebar-link span:first-child {
    width: 30px;
    font-size: 1.1rem;
}

.sidebar.collapsed .sidebar-link span:last-child {
    opacity: 0;
    min-width: 0;
    padding: 0;
    overflow: hidden;
}

.sidebar.collapsed .menu-items {
    padding-right: 10px; /* Compensate for scrollbar disappearance */
}

.sidebar-link span:last-child {
    min-width: 120px; /* Fixed width prevents reflow */
    opacity: 1;
    transition:
        opacity 0.2s ease,
        min-width 0.3s ease;
}

.sidebar.collapsed .menu-items span:last-child {
    display: none;
}

/* Mobile specific styles */
@media (max-width: 768px) {
    .sidebar {
        transform: translateX(-100%);
        width: 250px;
    }

    .sidebar.mobile-active {
        transform: translateX(0);
        box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
    }

    .sidebar.mobile-active .sidebar-link.router-link-active::after {
        margin-left: 0;
        margin-right: 0;
    }

    .sidebar::before {
        content: "";
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.5);
        z-index: 999;
        display: none;
    }

    .sidebar.mobile-active::before {
        display: block;
    }
}
</style>
