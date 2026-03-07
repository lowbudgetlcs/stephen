<template>
    <div class="events-page">
        <!-- Top Bar -->
        <div class="top-bar">
            <div class="group-selector">
                <label for="player-search">Search</label>
                <input
                    id="player-search"
                    v-model="searchQuery"
                    placeholder="Search by name..."
                    class="search-input"
                />
            </div>
            <button class="action-btn" @click="openCreatePlayer">
                + New Player
            </button>
        </div>

        <p v-if="loading" class="status">Loading...</p>
        <p v-else-if="error" class="status error">{{ error }}</p>

        <template v-else>
            <div class="players-layout">
                <section class="panel">
                    <div class="panel-header">
                        <h2>Players</h2>
                        <span class="player-count">
                            {{ filteredPlayers.length }} player{{
                                filteredPlayers.length !== 1 ? "s" : ""
                            }}
                        </span>
                    </div>
                    <div class="panel-body">
                        <table v-if="filteredPlayers.length">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr
                                    v-for="player in filteredPlayers"
                                    :key="player.id"
                                >
                                    <td>
                                        <span class="player-name">{{
                                            player.name
                                        }}</span>
                                        <span class="player-id"
                                            >#{{ player.id }}</span
                                        >
                                    </td>
                                    <td>
                                        <button
                                            class="small-btn"
                                            @click="openRenamePlayer(player)"
                                        >
                                            Rename
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <p v-else class="empty">
                            {{
                                searchQuery
                                    ? "No players match your search."
                                    : "No players yet."
                            }}
                        </p>
                    </div>
                </section>
            </div>
        </template>

        <!-- Create Player Modal -->
        <div
            v-if="showCreatePlayer"
            class="modal-overlay"
            @click.self="showCreatePlayer = false"
        >
            <div class="modal">
                <h2>Create Player</h2>
                <form @submit.prevent="createPlayer">
                    <div class="form-group">
                        <label>Name</label>
                        <input v-model="newPlayerName" required />
                    </div>
                    <p v-if="modalError" class="error">{{ modalError }}</p>
                    <div class="modal-actions">
                        <button
                            type="button"
                            class="cancel-btn"
                            @click="showCreatePlayer = false"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            class="submit-btn"
                            :disabled="modalLoading"
                        >
                            {{ modalLoading ? "Creating..." : "Create" }}
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Rename Player Modal -->
        <div
            v-if="showRenamePlayer"
            class="modal-overlay"
            @click.self="showRenamePlayer = false"
        >
            <div class="modal">
                <h2>Rename Player</h2>
                <form @submit.prevent="renamePlayer">
                    <div class="form-group">
                        <label>Current Name</label>
                        <input :value="selectedPlayer?.name" disabled />
                    </div>
                    <div class="form-group">
                        <label>New Name</label>
                        <input v-model="renameValue" required />
                    </div>
                    <p v-if="modalError" class="error">{{ modalError }}</p>
                    <div class="modal-actions">
                        <button
                            type="button"
                            class="cancel-btn"
                            @click="showRenamePlayer = false"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            class="submit-btn"
                            :disabled="modalLoading"
                        >
                            {{ modalLoading ? "Saving..." : "Save" }}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { playerApi } from "../api";

//  State
const players = ref<any[]>([]);
const searchQuery = ref("");
const loading = ref(false);
const error = ref("");

//  Modal State
const showCreatePlayer = ref(false);
const showRenamePlayer = ref(false);
const modalLoading = ref(false);
const modalError = ref("");

const newPlayerName = ref("");
const selectedPlayer = ref<any>(null);
const renameValue = ref("");

//  Filtered Players
const filteredPlayers = computed(() => {
    const q = searchQuery.value.toLowerCase().trim();
    if (!q) return players.value;
    return players.value.filter(
        (p) => p.name.toLowerCase().includes(q) || String(p.id).includes(q),
    );
});

//  Init
onMounted(async () => {
    await loadPlayers();
});

async function loadPlayers() {
    loading.value = true;
    error.value = "";
    try {
        const res = await playerApi.getPlayers();
        players.value = res.data;
    } catch {
        error.value = "Failed to load players.";
    } finally {
        loading.value = false;
    }
}

//  Create Player
function openCreatePlayer() {
    newPlayerName.value = "";
    modalError.value = "";
    showCreatePlayer.value = true;
}

async function createPlayer() {
    modalLoading.value = true;
    modalError.value = "";
    try {
        await playerApi.addPlayer({ name: newPlayerName.value });
        showCreatePlayer.value = false;
        await loadPlayers();
    } catch {
        modalError.value = "Failed to create player.";
    } finally {
        modalLoading.value = false;
    }
}

//  Rename Player
function openRenamePlayer(player: any) {
    selectedPlayer.value = player;
    renameValue.value = player.name;
    modalError.value = "";
    showRenamePlayer.value = true;
}

async function renamePlayer() {
    if (!selectedPlayer.value) return;
    modalLoading.value = true;
    modalError.value = "";
    try {
        await playerApi.patchPlayer(selectedPlayer.value.id, {
            name: renameValue.value,
        });
        showRenamePlayer.value = false;
        await loadPlayers();
    } catch {
        modalError.value = "Failed to rename player.";
    } finally {
        modalLoading.value = false;
    }
}
</script>

<style scoped>
.events-page {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.top-bar {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
}

.group-selector {
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.group-selector label {
    font-size: 0.8rem;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.03em;
}

.search-input {
    padding: 0.5rem 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    background: #ffffff;
    font-size: 0.95rem;
    color: #1e293b;
    min-width: 280px;
}

.search-input:focus {
    outline: none;
    border-color: #3b82f6;
}

.action-btn {
    padding: 0.5rem 1rem;
    background: #3b82f6;
    color: #ffffff;
    border: none;
    border-radius: 6px;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.15s;
}

.action-btn:hover {
    background: #2563eb;
}

.players-layout {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
}

.panel {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    overflow: hidden;
}

.panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.85rem 1.25rem;
    border-bottom: 1px solid #e2e8f0;
    background: #f8fafc;
}

.panel-header h2 {
    font-size: 0.95rem;
    margin: 0;
}

.player-count {
    font-size: 0.8rem;
    color: #94a3b8;
}

.panel-body {
    padding: 1rem 1.25rem;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    text-align: left;
    padding: 0.6rem 0.5rem;
    border-bottom: 1px solid #f1f5f9;
}

th {
    color: #64748b;
    font-size: 0.75rem;
    text-transform: uppercase;
}

.player-name {
    font-weight: 600;
    margin-right: 0.4rem;
}

.player-id {
    font-size: 0.75rem;
    font-style: italic;
    color: #94a3b8;
}

.small-btn {
    padding: 0.3rem 0.7rem;
    background: #e2e8f0;
    color: #1e293b;
    border: none;
    border-radius: 4px;
    font-size: 0.8rem;
    cursor: pointer;
    transition: background 0.15s;
    white-space: nowrap;
}

.small-btn:hover {
    background: #cbd5e1;
}

.status {
    color: #64748b;
    font-size: 0.9rem;
    text-align: center;
    padding: 2rem 0;
}

.status.error {
    color: #e74c3c;
}

.empty {
    color: #94a3b8;
    font-size: 0.9rem;
}

.error {
    color: #e74c3c;
    font-size: 0.85rem;
}

/*  Modals  */
.modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
}

.modal {
    background: #ffffff;
    border-radius: 12px;
    padding: 2rem;
    width: 100%;
    max-width: 420px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
}

.modal h2 {
    margin-bottom: 1.25rem;
    font-size: 1.1rem;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
    margin-bottom: 1rem;
}

.form-group label {
    font-size: 0.8rem;
    color: #64748b;
    text-transform: uppercase;
}

.form-group input {
    padding: 0.6rem 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    font-size: 0.95rem;
    color: #1e293b;
    background: #f8fafc;
}

.form-group input:focus {
    outline: none;
    border-color: #3b82f6;
    background: #ffffff;
}

.form-group input:disabled {
    background: #f1f5f9;
    color: #94a3b8;
}

.modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.75rem;
    margin-top: 1.25rem;
}

.cancel-btn {
    padding: 0.5rem 1rem;
    background: transparent;
    color: #64748b;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    cursor: pointer;
}

.cancel-btn:hover {
    background: #f1f5f9;
}

.submit-btn {
    padding: 0.5rem 1rem;
    background: #3b82f6;
    color: #ffffff;
    border: none;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
}

.submit-btn:hover {
    background: #2563eb;
}

.submit-btn:disabled {
    background: #94a3b8;
    cursor: not-allowed;
}

.events-page {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    max-width: 900px;
}
</style>
