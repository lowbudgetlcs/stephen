<template>
    <aside class="sidebar">
        <div class="sidebar-header">
            <router-link to="/" class="brand">Stephen</router-link>
        </div>

        <nav class="sidebar-nav">
            <router-link to="/events" class="nav-item" active-class="active">
                Events
            </router-link>
            <router-link to="/players" class="nav-item" active-class="active">
                Players
            </router-link>
        </nav>

        <div class="sidebar-footer">
            <div v-if="username" class="user-info">
                <span class="user-icon">👤</span>
                <span class="user-name">{{ username }}</span>
            </div>
            <button
                class="logout-btn"
                @click="handleLogout"
                :disabled="loggingOut"
            >
                {{ loggingOut ? "Logging out…" : "Log Out" }}
            </button>
        </div>
    </aside>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { authApi } from "../api";
import { useAuth } from "../composables/useAuth";

const router = useRouter();
const { username, clearUser } = useAuth();
const loggingOut = ref(false);

async function handleLogout() {
    loggingOut.value = true;
    try {
        await authApi.logout();
    } catch {
        // Still redirect even if call fails
    } finally {
        clearUser();
        loggingOut.value = false;
        router.push("/login");
    }
}
</script>

<style scoped>
.sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 200px;
    height: 100vh;
    background: #1e293b;
    color: #cbd5e1;
    display: flex;
    flex-direction: column;
}

.sidebar-header {
    padding: 1.25rem 1rem;
    border-bottom: 1px solid #334155;
}

.brand {
    color: #ffffff;
    font-size: 1.2rem;
    font-weight: 700;
    text-decoration: none;
}

.sidebar-nav {
    display: flex;
    flex-direction: column;
    padding: 0.75rem 0;
    flex: 1;
}

.nav-item {
    padding: 0.65rem 1rem;
    color: #94a3b8;
    text-decoration: none;
    font-size: 0.95rem;
    transition:
        background 0.15s,
        color 0.15s;
}

.nav-item:hover {
    background: #334155;
    color: #f1f5f9;
}

.nav-item.active {
    background: #334155;
    color: #ffffff;
    border-left: 3px solid #3b82f6;
}

.sidebar-footer {
    padding: 1rem;
    border-top: 1px solid #334155;
}

.user-info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.75rem;
    padding: 0.5rem 0.25rem;
}

.user-icon {
    font-size: 1rem;
}

.user-name {
    color: #f1f5f9;
    font-size: 0.9rem;
    font-weight: 500;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.logout-btn {
    width: 100%;
    padding: 0.5rem;
    background: transparent;
    color: #94a3b8;
    border: 1px solid #475569;
    border-radius: 6px;
    font-size: 0.9rem;
    cursor: pointer;
    transition:
        background 0.15s,
        color 0.15s;
}

.logout-btn:hover {
    background: #334155;
    color: #f1f5f9;
}

.logout-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}
</style>
