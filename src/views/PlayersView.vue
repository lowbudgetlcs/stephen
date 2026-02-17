<template>
    <div>
        <h1>Players</h1>

        <p v-if="loading">Loading players…</p>
        <p v-else-if="error" class="error">{{ error }}</p>

        <table v-else-if="players.length">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="player in players" :key="player.id">
                    <td>{{ player.id }}</td>
                    <td>{{ player.primaryRiotAccount ?? "—" }}</td>
                </tr>
            </tbody>
        </table>
        <p v-else>No players found.</p>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { playerApi } from "../api";
import type { PlayerDto } from "../dennysClient/api";

const players = ref<PlayerDto[]>([]);
const loading = ref(true);
const error = ref("");

onMounted(async () => {
    try {
        const response = await playerApi.getPlayers();
        players.value = response.data;
    } catch {
        error.value = "Failed to load players.";
    } finally {
        loading.value = false;
    }
});
</script>

<style scoped>
table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
}
th,
td {
    text-align: left;
    padding: 0.6rem 0.5rem;
    border-bottom: 1px solid #e2e8f0;
}
th {
    color: #64748b;
    font-size: 0.8rem;
    text-transform: uppercase;
}
.error {
    color: #e74c3c;
}
</style>
