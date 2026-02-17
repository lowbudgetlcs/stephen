<template>
    <aside class="sidebar">
        <div class="sidebar-header">
            <router-link to="/" class="brand">☆ LBLCS</router-link>
        </div>

        <nav class="sidebar-nav">
            <router-link to="/events" class="nav-item" active-class="active">
                Events
            </router-link>
            <router-link to="/players" class="nav-item" active-class="active">
                Players
            </router-link>
        </nav>
    </aside>
</template>

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
</style>
