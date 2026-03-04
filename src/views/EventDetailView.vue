<template>
    <div>
        <div class="page-header">
            <h1>Event Management</h1>
            <div class="breadcrumb">
                <router-link to="/events" class="crumb">Events</router-link>
                <span class="separator">/</span>
                <span class="crumb current">{{
                    event?.name ?? "Loading…"
                }}</span>
            </div>
        </div>

        <p v-if="loading">Loading event…</p>
        <p v-else-if="error" class="error">{{ error }}</p>

        <template v-else-if="event">
            <section class="details-section">
                <h2>Details</h2>
                <div class="details-grid">
                    <div class="detail-item">
                        <span class="label">Name</span>
                        <span class="value">{{ event.name }}</span>
                    </div>
                    <div class="detail-item">
                        <span class="label">Status</span>
                        <span class="value">{{ event.status ?? "—" }}</span>
                    </div>
                </div>
            </section>

            <div class="two-col">
                <section class="panel">
                    <h2>Teams</h2>
                    <div class="panel-body">
                        <div v-if="teams.length" class="team-list">
                            <div
                                v-for="team in teams"
                                :key="team.id"
                                class="team-item"
                            >
                                {{ team.name }}
                            </div>
                        </div>
                        <p v-else class="empty">No teams yet.</p>
                    </div>
                </section>

                <section class="panel">
                    <h2>Series</h2>
                    <div class="panel-body">
                        <table v-if="series.length">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="s in series" :key="s.id">
                                    <td>{{ s.id }}</td>
                                    <td>{{ s.status ?? "—" }}</td>
                                </tr>
                            </tbody>
                        </table>
                        <p v-else class="empty">No series yet.</p>
                    </div>
                </section>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { eventApi, eventSeriesApi } from "../api";
import type {
    EventDto,
    TeamDto,
    EventWithSeriesDto,
} from "../dennysClient/api";

const props = defineProps<{
    eventId: string;
}>();

const event = ref<EventDto | null>(null);
const teams = ref<TeamDto[]>([]);
const series = ref<EventWithSeriesDto[]>([]);
const loading = ref(true);
const error = ref("");

onMounted(async () => {
    const id = Number(props.eventId);
    try {
        const [eventRes, teamsRes, seriesRes] = await Promise.all([
            eventApi.getEventById(id),
            eventApi.getTeamsInEvent(id),
            eventSeriesApi.getSeriesInEvent(id),
        ]);
        event.value = eventRes.data;
        teams.value = teamsRes.data;
        series.value = seriesRes.data;
    } catch {
        error.value = "Failed to load event data.";
    } finally {
        loading.value = false;
    }
});
</script>

<style scoped>
.page-header {
    margin-bottom: 1.5rem;
}

.breadcrumb {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.5rem;
    font-size: 0.9rem;
}

.crumb {
    color: #3b82f6;
    text-decoration: none;
    padding: 0.25rem 0.6rem;
    border-radius: 4px;
    background: #e0ecff;
}

.crumb:hover {
    background: #c7dbff;
}
.crumb.current {
    background: #1e293b;
    color: #ffffff;
}
.separator {
    color: #94a3b8;
}

.details-section {
    margin-bottom: 2rem;
}
.details-section h2 {
    margin-bottom: 0.75rem;
}

.details-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
    background: #ffffff;
    padding: 1.25rem;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
}

.detail-item {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
}
.label {
    font-size: 0.8rem;
    color: #64748b;
    text-transform: uppercase;
}
.value {
    font-size: 1rem;
    color: #1e293b;
}

.two-col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
}

.panel {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    overflow: hidden;
}

.panel h2 {
    padding: 1rem 1.25rem;
    font-size: 1rem;
    border-bottom: 1px solid #e2e8f0;
    margin: 0;
}

.panel-body {
    padding: 1rem 1.25rem;
}
.team-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.team-item {
    padding: 0.5rem 0.75rem;
    background: #f1f5f9;
    border-radius: 6px;
}

table {
    width: 100%;
    border-collapse: collapse;
}
th,
td {
    text-align: left;
    padding: 0.5rem 0;
    border-bottom: 1px solid #f1f5f9;
}
th {
    color: #64748b;
    font-size: 0.8rem;
    text-transform: uppercase;
}

.empty {
    color: #94a3b8;
    font-size: 0.9rem;
}
.error {
    color: #e74c3c;
}
</style>
