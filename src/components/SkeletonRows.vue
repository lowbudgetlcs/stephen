<template>
    <div class="skeleton" role="status" aria-label="Loading">
        <div v-for="n in rows" :key="n" class="skeleton-row"></div>
    </div>
</template>

<script setup lang="ts">
defineProps<{ rows: number }>();
</script>

<style scoped>
.skeleton {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.skeleton-row {
    height: 2.25rem;
    background: #f1f5f9;
    border-radius: 6px;
    animation: skeleton-pulse 1.2s ease-in-out infinite;
}

@keyframes skeleton-pulse {
    50% {
        opacity: 0.5;
    }
}

@media (prefers-reduced-motion: reduce) {
    .skeleton-row {
        animation: none;
    }
}
</style>
