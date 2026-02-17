<template>
    <div>
        <div class="page-header">
            <h1>Event Management</h1>
        </div>

        <p v-if="loading">Loading events…</p>
        <p v-else-if="error" class="error">{{ error }}</p>

        <div v-else class="event-list">
            <router-link
                v-for="event in events"
                :key="event.id"
                :to="`/events/${event.id}`"
                class="event-card"
            >
                <h3>{{ event.name }}</h3>
                <span class="event-status">{{
                    event.status ?? "Unknown"
                }}</span>
            </router-link>

            <p v-if="!events.length">No events found.</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { eventApi } from "../api";
import type { EventDto } from "../dennysClient/api";

const events = ref<EventDto[]>([]);
const loading = ref(true);
const error = ref("");

onMounted(async () => {
    try {
        const response = await eventApi.getEvents();
        events.value = response.data;
    } catch {
        error.value = "Failed to load events.";
    } finally {
        loading.value = false;
    }
});
</script>

<style scoped>
.page-header {
    margin-bottom: 1.5rem;
}

.event-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1rem;
}

.event-card {
    display: block;
    padding: 1.25rem;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    text-decoration: none;
    color: inherit;
    transition: box-shadow 0.15s;
}

.event-card:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.event-card h3 {
    margin-bottom: 0.35rem;
}
.event-status {
    font-size: 0.85rem;
    color: #64748b;
}
.error {
    color: #e74c3c;
}
</style>
