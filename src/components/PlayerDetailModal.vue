<template>
    <div class="modal-overlay" @click.self="emit('close')">
        <div class="modal">
            <div class="modal-header-row">
                <h2>{{ player?.name ?? "Player" }}</h2>
                <span class="id-badge">ID: {{ playerId }}</span>
            </div>

            <p v-if="loading" class="status">Loading player...</p>
            <template v-else-if="player">
                <form class="rename-row" @submit.prevent="rename">
                    <input
                        v-model="nameDraft"
                        aria-label="Player name"
                        required
                    />
                    <button
                        type="submit"
                        class="small-btn"
                        :disabled="busy || nameDraft.trim() === player.name"
                    >
                        Save name
                    </button>
                </form>

                <h3>Teams</h3>
                <div v-if="teams.length" class="item-list">
                    <div v-for="team in teams" :key="team.id" class="item">
                        <span class="item-text">
                            <span class="item-name">{{ team.name }}</span>
                            <span class="muted">{{
                                eventName(team.eventId)
                            }}</span>
                        </span>
                        <button
                            class="remove-btn"
                            :disabled="busy"
                            @click="removeFromTeam(team)"
                        >
                            Remove
                        </button>
                    </div>
                </div>
                <p v-else class="empty">Not on any team.</p>

                <h3>Riot accounts</h3>
                <div v-if="player.accounts?.length" class="item-list">
                    <div
                        v-for="account in player.accounts"
                        :key="account.id"
                        class="item"
                    >
                        <code class="puuid" :title="account.riotPuuid">{{
                            account.riotPuuid
                        }}</code>
                        <button
                            class="remove-btn"
                            :disabled="busy"
                            @click="unlinkAccount(account)"
                        >
                            Unlink
                        </button>
                    </div>
                </div>
                <p v-else class="empty">No linked accounts.</p>
            </template>

            <p v-if="error" class="error">{{ error }}</p>
            <div class="modal-actions">
                <button class="cancel-btn" @click="emit('close')">Close</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { eventApi, playerApi, teamApi } from "../api";
import type {
    EventDto,
    PlayerDto,
    RiotAccountDto,
    TeamDto,
} from "../dennysClient/api";

const props = defineProps<{ playerId: number }>();
// `changed` fires after any edit so the opener can refresh its own list.
const emit = defineEmits<{ close: []; changed: [] }>();

const player = ref<PlayerDto | null>(null);
const teams = ref<TeamDto[]>([]);
const events = ref<EventDto[]>([]);
const nameDraft = ref("");
const loading = ref(true);
const busy = ref(false);
const error = ref("");

onMounted(load);

async function load() {
    loading.value = true;
    error.value = "";
    try {
        const [playerRes, teamsRes, eventsRes] = await Promise.all([
            playerApi.getPlayerById(props.playerId),
            playerApi.getPlayerByIdWithTeams(props.playerId),
            eventApi.getEvents(),
        ]);
        player.value = playerRes.data;
        nameDraft.value = playerRes.data.name;
        teams.value = teamsRes.data.teams ?? [];
        events.value = eventsRes.data;
    } catch {
        error.value = "Failed to load player.";
    } finally {
        loading.value = false;
    }
}

function eventName(eventId?: number | null): string {
    if (!eventId) return "No event";
    return events.value.find((e) => e.id === eventId)?.name ?? `Event ${eventId}`;
}

async function run(action: () => Promise<unknown>, failure: string) {
    busy.value = true;
    error.value = "";
    try {
        await action();
        emit("changed");
    } catch (e: any) {
        error.value = e?.response?.data?.message ?? failure;
    } finally {
        busy.value = false;
    }
}

function rename() {
    const name = nameDraft.value.trim();
    return run(async () => {
        const res = await playerApi.patchPlayer(props.playerId, { name });
        player.value = { ...res.data, accounts: player.value?.accounts };
    }, "Failed to rename player.");
}

function removeFromTeam(team: TeamDto) {
    if (!confirm(`Remove ${player.value?.name} from ${team.name}?`)) return;
    return run(async () => {
        await teamApi.removePlayerFromTeam(team.id, props.playerId);
        teams.value = teams.value.filter((t) => t.id !== team.id);
    }, "Failed to remove player from team.");
}

function unlinkAccount(account: RiotAccountDto) {
    if (!confirm(`Unlink this Riot account from ${player.value?.name}?`))
        return;
    return run(async () => {
        await playerApi.removeAccountFromPlayer(props.playerId, account.id);
        if (player.value) {
            player.value.accounts = player.value.accounts?.filter(
                (a) => a.id !== account.id,
            );
        }
    }, "Failed to unlink account.");
}
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    inset: 0;
    padding: 1rem;
    background: rgba(0, 0, 0, 0.4);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 110;
}

.modal {
    background: #ffffff;
    border-radius: 12px;
    padding: 2rem;
    width: 100%;
    max-width: 520px;
    max-height: 100%;
    overflow-y: auto;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
}

.modal-header-row {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
}

.modal-header-row h2 {
    font-size: 1.1rem;
    overflow-wrap: anywhere;
}

.id-badge {
    font-size: 0.8rem;
    color: #64748b;
    background: #f1f5f9;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
}

h3 {
    font-size: 0.85rem;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    margin: 1.25rem 0 0.75rem;
}

.rename-row {
    display: flex;
    gap: 0.5rem;
}

.rename-row input {
    flex: 1;
    min-width: 0;
    padding: 0.5rem 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    font-size: 0.95rem;
    color: #1e293b;
    background: #f8fafc;
}

.rename-row input:focus {
    outline: none;
    border-color: #3b82f6;
    background: #ffffff;
}

.item-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.75rem;
    padding: 0.5rem 0.75rem;
    background: #f1f5f9;
    border-radius: 6px;
    font-size: 0.9rem;
}

.item-text {
    display: flex;
    flex-direction: column;
    min-width: 0;
}

.item-name {
    font-weight: 600;
}

.muted {
    font-size: 0.8rem;
    color: #64748b;
}

.puuid {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 0.8rem;
    color: #475569;
}

.small-btn {
    padding: 0.3rem 0.7rem;
    background: #e2e8f0;
    color: #1e293b;
    border: none;
    border-radius: 4px;
    font-size: 0.8rem;
    cursor: pointer;
    white-space: nowrap;
}

.small-btn:hover:not(:disabled) {
    background: #cbd5e1;
}

.remove-btn {
    flex-shrink: 0;
    padding: 0.2rem 0.5rem;
    background: none;
    border: 1px solid #fca5a5;
    border-radius: 4px;
    color: #ef4444;
    font-size: 0.75rem;
    cursor: pointer;
}

.remove-btn:hover:not(:disabled) {
    background: #fef2f2;
}

button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.status,
.empty {
    color: #94a3b8;
    font-size: 0.9rem;
}

.error {
    color: #e74c3c;
    font-size: 0.85rem;
    margin-top: 1rem;
}

.modal-actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 1.5rem;
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

@media (max-width: 600px) {
    .modal {
        padding: 1.25rem;
    }
}
</style>
