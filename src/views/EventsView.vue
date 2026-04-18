<template>
    <div class="events-page">
        <!-- Top Bar -->
        <div class="top-bar">
            <div class="group-selector">
                <label for="event-group">Event Group</label>
                <select
                    id="event-group"
                    v-model="selectedGroupId"
                    @change="onGroupChange"
                >
                    <option value="all">All Events</option>
                    <option
                        v-for="group in eventGroups"
                        :key="group.id"
                        :value="group.id"
                    >
                        {{ group.name }}
                    </option>
                </select>
            </div>

            <button class="action-btn" @click="showCreateEvent = true">
                + New Event
            </button>
        </div>

        <p v-if="loading" class="status">Loading...</p>
        <p v-else-if="error" class="status error">{{ error }}</p>

        <template v-else-if="selectedGroupId">
            <!-- Event Tabs -->
            <div class="event-tabs">
                <button
                    v-for="event in events"
                    :key="event.id"
                    class="tab"
                    :class="{ active: selectedEventId === event.id }"
                    @click="selectEvent(event.id)"
                >
                    {{ event.name }}
                </button>
                <p v-if="!events.length" class="status">No events found.</p>
            </div>

            <!-- Event Content -->
            <div v-if="selectedEvent" class="event-content">
                <div class="left-col">
                    <!-- Details Panel -->
                    <section class="panel">
                        <div class="panel-header">
                            <h2>Event Details</h2>
                            <button
                                class="small-btn"
                                @click="showEditState = true"
                            >
                                Change Status
                            </button>
                        </div>
                        <div class="panel-body details-grid">
                            <div class="detail-item">
                                <span class="label">Name</span>
                                <span class="value">{{
                                    selectedEvent.name
                                }}</span>
                            </div>
                            <div class="detail-item">
                                <span class="label">Status</span>
                                <span class="value">{{
                                    selectedEvent.status ?? "-"
                                }}</span>
                            </div>
                            <div class="detail-item">
                                <span class="label">ID</span>
                                <span class="value">{{
                                    selectedEvent.id
                                }}</span>
                            </div>
                        </div>
                    </section>

                    <!-- Teams Panel -->
                    <section class="panel">
                        <div class="panel-header">
                            <h2>Teams</h2>
                            <button class="small-btn" @click="openAddTeamModal">
                                + Add Team
                            </button>
                        </div>
                        <div class="panel-body">
                            <div v-if="teams.length" class="team-list">
                                <div
                                    v-for="team in teams"
                                    :key="team.id"
                                    class="team-item clickable"
                                    @click="openTeamDetail(team)"
                                >
                                    <span>{{ team.name }}</span>
                                    <span class="team-id">#{{ team.id }}</span>
                                </div>
                            </div>
                            <p v-else class="empty">No teams yet.</p>
                        </div>
                    </section>
                </div>

                <div class="right-col">
                    <!-- Series Panel -->
                    <section class="panel full-height">
                        <div class="panel-header">
                            <h2>Series</h2>
                            <div class="header-actions">
                                <select
                                    v-model="seriesFilterTeamId"
                                    class="filter-select"
                                >
                                    <option :value="null">
                                        Filter by team
                                    </option>
                                    <option
                                        v-for="team in teams"
                                        :key="team.id"
                                        :value="team.id"
                                    >
                                        {{ team.name }}
                                    </option>
                                </select>
                                <button
                                    class="small-btn"
                                    @click="showCreateSeries = true"
                                >
                                    + New Series
                                </button>
                            </div>
                        </div>
                        <div class="panel-body">
                            <table v-if="filteredSeries.length">
                                <thead>
                                    <tr>
                                        <th>Matchup</th>
                                        <th>Games</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="s in filteredSeries" :key="s.id">
                                        <td>
                                            <span class="matchup">
                                                {{ teamName(s.team1Id) }} vs
                                                {{ teamName(s.team2Id) }}
                                            </span>
                                            <span class="series-id"
                                                >#{{ s.id }}</span
                                            >
                                        </td>
                                        <td>{{ s.totalGames ?? "-" }}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <p v-else class="empty">
                                {{
                                    seriesFilterTeamId
                                        ? "No series for this team."
                                        : "No series yet."
                                }}
                            </p>
                        </div>
                    </section>
                </div>
            </div>
        </template>

        <!-- ═══ Modals ═══ -->

        <!-- Create Event Modal -->
        <div
            v-if="showCreateEvent"
            class="modal-overlay"
            @click.self="showCreateEvent = false"
        >
            <div class="modal modal-wide">
                <h2>Create Event</h2>
                <form @submit.prevent="createEvent">
                    <div class="form-group">
                        <label>Name</label>
                        <input v-model="newEvent.name" required />
                    </div>
                    <div class="form-group">
                        <label>Description (optional)</label>
                        <input v-model="newEvent.description" />
                    </div>
                    <div class="form-group">
                        <label>Start Date</label>
                        <input
                            v-model="newEvent.startDate"
                            type="date"
                            required
                        />
                    </div>
                    <div class="form-group">
                        <label>End Date</label>
                        <input
                            v-model="newEvent.endDate"
                            type="date"
                            required
                        />
                    </div>
                    <div class="form-group">
                        <label>Status</label>
                        <select v-model="newEvent.status" required>
                            <option :value="EventStatus.NotStarted">
                                Not Started
                            </option>
                            <option :value="EventStatus.Active">Active</option>
                            <option :value="EventStatus.Paused">Paused</option>
                            <option :value="EventStatus.Completed">
                                Completed
                            </option>
                            <option :value="EventStatus.Canceled">
                                Canceled
                            </option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Event Stages</label>
                        <div class="checkbox-group">
                            <label class="checkbox-label">
                                <input
                                    type="checkbox"
                                    :value="EventStage.RegularSeason"
                                    v-model="newEvent.eventStages"
                                />
                                Regular Season
                            </label>
                            <label class="checkbox-label">
                                <input
                                    type="checkbox"
                                    :value="EventStage.Playoffs"
                                    v-model="newEvent.eventStages"
                                />
                                Playoffs
                            </label>
                            <label class="checkbox-label">
                                <input
                                    type="checkbox"
                                    :value="EventStage.PromotionRelegation"
                                    v-model="newEvent.eventStages"
                                />
                                Promotion / Relegation
                            </label>
                        </div>
                    </div>
                    <p v-if="modalError" class="error">{{ modalError }}</p>
                    <div class="modal-actions">
                        <button
                            type="button"
                            class="cancel-btn"
                            @click="showCreateEvent = false"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            class="submit-btn"
                            :disabled="
                                modalLoading || !newEvent.eventStages.length
                            "
                        >
                            {{ modalLoading ? "Creating..." : "Create" }}
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Change Event Status Modal -->
        <div
            v-if="showEditState"
            class="modal-overlay"
            @click.self="showEditState = false"
        >
            <div class="modal">
                <h2>Change Event Status</h2>
                <form @submit.prevent="changeEventState">
                    <div class="form-group">
                        <label>Status</label>
                        <select v-model="newStatus" required>
                            <option :value="EventStatus.NotStarted">
                                Not Started
                            </option>
                            <option :value="EventStatus.Active">Active</option>
                            <option :value="EventStatus.Paused">Paused</option>
                            <option :value="EventStatus.Completed">
                                Completed
                            </option>
                            <option :value="EventStatus.Canceled">
                                Canceled
                            </option>
                        </select>
                    </div>
                    <p v-if="modalError" class="error">{{ modalError }}</p>
                    <div class="modal-actions">
                        <button
                            type="button"
                            class="cancel-btn"
                            @click="showEditState = false"
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

        <!-- Add Team to Event Modal -->
        <div
            v-if="showAddTeam"
            class="modal-overlay"
            @click.self="showAddTeam = false"
        >
            <div class="modal">
                <h2>Add Team to Event</h2>

                <div class="tab-toggle">
                    <button
                        :class="{ active: addTeamMode === 'new' }"
                        @click="addTeamMode = 'new'"
                    >
                        Create New
                    </button>
                    <button
                        :class="{ active: addTeamMode === 'existing' }"
                        @click="addTeamMode = 'existing'"
                    >
                        Existing Team
                    </button>
                </div>

                <!-- Create New Team -->
                <form
                    v-if="addTeamMode === 'new'"
                    @submit.prevent="createAndAddTeam"
                >
                    <div class="form-group">
                        <label>Team Name</label>
                        <input v-model="newTeam.name" required />
                    </div>
                    <div class="form-group">
                        <label>Logo Name (optional)</label>
                        <input v-model="newTeam.logoName" />
                    </div>
                    <p v-if="modalError" class="error">{{ modalError }}</p>
                    <div class="modal-actions">
                        <button
                            type="button"
                            class="cancel-btn"
                            @click="showAddTeam = false"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            class="submit-btn"
                            :disabled="modalLoading"
                        >
                            {{ modalLoading ? "Creating..." : "Create & Add" }}
                        </button>
                    </div>
                </form>

                <!-- Add Existing Team -->
                <div v-else>
                    <div class="form-group">
                        <label>Search Teams</label>
                        <div class="autocomplete-wrapper">
                            <input
                                v-model="teamSearchQuery"
                                placeholder="Type to search..."
                                @focus="teamDropdownOpen = true"
                            />
                            <div
                                v-if="
                                    teamDropdownOpen && filteredAllTeams.length
                                "
                                class="autocomplete-dropdown"
                            >
                                <div
                                    v-for="team in filteredAllTeams"
                                    :key="team.id"
                                    class="autocomplete-item"
                                    @mousedown.prevent="
                                        selectExistingTeam(team)
                                    "
                                >
                                    <span>{{ team.name }}</span>
                                    <span class="team-id">#{{ team.id }}</span>
                                </div>
                            </div>
                            <p
                                v-if="
                                    teamDropdownOpen &&
                                    teamSearchQuery &&
                                    !filteredAllTeams.length
                                "
                                class="empty autocomplete-empty"
                            >
                                No teams found.
                            </p>
                        </div>
                    </div>

                    <!-- Selected Teams List -->
                    <div
                        v-if="selectedExistingTeams.length"
                        class="selected-teams-list"
                    >
                        <div
                            v-for="team in selectedExistingTeams"
                            :key="team.id"
                            class="selected-team-preview"
                        >
                            <span>{{ team.name }}</span>
                            <span class="team-id">#{{ team.id }}</span>
                            <button
                                class="remove-btn"
                                @click="removeExistingTeam(team.id)"
                            >
                                x
                            </button>
                        </div>
                    </div>

                    <p v-if="modalError" class="error">{{ modalError }}</p>
                    <div class="modal-actions">
                        <button
                            type="button"
                            class="cancel-btn"
                            @click="showAddTeam = false"
                        >
                            Cancel
                        </button>
                        <button
                            class="submit-btn"
                            :disabled="
                                modalLoading || !selectedExistingTeams.length
                            "
                            @click="addExistingTeamsToEvent"
                        >
                            {{
                                modalLoading
                                    ? "Adding..."
                                    : `Add ${selectedExistingTeams.length || ""} Team${selectedExistingTeams.length !== 1 ? "s" : ""}`
                            }}
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Create Series Modal -->
        <div
            v-if="showCreateSeries"
            class="modal-overlay"
            @click.self="showCreateSeries = false"
        >
            <div class="modal modal-wide">
                <h2>Create Series</h2>
                <form @submit.prevent="createSeries">
                    <!-- Team 1 Selection -->
                    <div class="form-group">
                        <label>Team 1</label>
                        <div class="autocomplete-wrapper">
                            <input
                                v-model="team1SearchQuery"
                                placeholder="Search teams..."
                                @focus="team1DropdownOpen = true"
                                @blur="team1DropdownOpen = false"
                            />
                            <div
                                v-if="
                                    team1DropdownOpen &&
                                    filteredTeamsForSeries(
                                        team1SearchQuery,
                                        null,
                                    ).length
                                "
                                class="autocomplete-dropdown"
                            >
                                <div
                                    v-for="team in filteredTeamsForSeries(
                                        team1SearchQuery,
                                        null,
                                    )"
                                    :key="team.id"
                                    class="autocomplete-item"
                                    @mousedown.prevent="selectTeam1(team)"
                                >
                                    <span>{{ team.name }}</span>
                                    <span class="team-id">#{{ team.id }}</span>
                                </div>
                            </div>
                        </div>
                        <div
                            v-if="newSeries.team1Id"
                            class="selected-team-preview"
                        >
                            <span>{{ teamName(newSeries.team1Id) }}</span>
                            <button
                                type="button"
                                class="remove-btn"
                                @click="newSeries.team1Id = 0"
                            >
                                x
                            </button>
                        </div>
                    </div>

                    <!-- Team 2 Selection -->
                    <div class="form-group">
                        <label>Team 2</label>
                        <div class="autocomplete-wrapper">
                            <input
                                v-model="team2SearchQuery"
                                placeholder="Search teams..."
                                @focus="team2DropdownOpen = true"
                                @blur="team2DropdownOpen = false"
                            />
                            <div
                                v-if="
                                    team2DropdownOpen &&
                                    filteredTeamsForSeries(
                                        team2SearchQuery,
                                        newSeries.team1Id,
                                    ).length
                                "
                                class="autocomplete-dropdown"
                            >
                                <div
                                    v-for="team in filteredTeamsForSeries(
                                        team2SearchQuery,
                                        newSeries.team1Id,
                                    )"
                                    :key="team.id"
                                    class="autocomplete-item"
                                    @mousedown.prevent="selectTeam2(team)"
                                >
                                    <span>{{ team.name }}</span>
                                    <span class="team-id">#{{ team.id }}</span>
                                </div>
                            </div>
                        </div>
                        <div
                            v-if="newSeries.team2Id"
                            class="selected-team-preview"
                        >
                            <span>{{ teamName(newSeries.team2Id) }}</span>
                            <button
                                type="button"
                                class="remove-btn"
                                @click="newSeries.team2Id = 0"
                            >
                                x
                            </button>
                        </div>
                    </div>

                    <!-- Stage -->
                    <div class="form-group">
                        <label>Stage</label>
                        <select v-model="newSeries.stage" required>
                            <option :value="EventStage.RegularSeason">
                                Regular Season
                            </option>
                            <option :value="EventStage.Playoffs">
                                Playoffs
                            </option>
                        </select>
                    </div>

                    <!-- Total Games -->
                    <div class="form-group">
                        <label>Total Games</label>
                        <input
                            v-model.number="newSeries.totalGames"
                            type="number"
                            min="1"
                            required
                        />
                    </div>

                    <p v-if="modalError" class="error">{{ modalError }}</p>
                    <div class="modal-actions">
                        <button
                            type="button"
                            class="cancel-btn"
                            @click="showCreateSeries = false"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            class="submit-btn"
                            :disabled="
                                modalLoading ||
                                !newSeries.team1Id ||
                                !newSeries.team2Id
                            "
                        >
                            {{ modalLoading ? "Creating..." : "Create" }}
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <!-- Team Detail Modal -->
        <div
            v-if="showTeamDetail"
            class="modal-overlay"
            @click.self="showTeamDetail = false"
        >
            <div class="modal modal-wide">
                <div class="modal-header-row">
                    <h2>{{ selectedTeam?.name }}</h2>
                    <span class="team-id-badge"
                        >ID: {{ selectedTeam?.id }}</span
                    >
                </div>

                <h3>Players</h3>
                <div v-if="teamPlayersLoading" class="status">
                    Loading players...
                </div>
                <template v-else>
                    <div v-if="teamPlayers.length" class="player-list">
                        <div
                            v-for="player in teamPlayers"
                            :key="player.id"
                            class="player-item"
                        >
                            <div class="player-info">
                                <span class="player-name">{{
                                    player.name
                                }}</span>
                                <span class="player-id">#{{ player.id }}</span>
                            </div>
                            <button
                                class="remove-player-btn"
                                :disabled="modalLoading"
                                @click="removePlayerFromTeam(player)"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                    <p v-else class="empty">No players on this team.</p>
                </template>

                <!-- Add Player to Team -->
                <h3>Add Player</h3>
                <div class="form-group">
                    <div class="autocomplete-wrapper">
                        <input
                            v-model="playerSearchQuery"
                            placeholder="Search players..."
                            @focus="playerDropdownOpen = true"
                        />
                        <div
                            v-if="
                                playerDropdownOpen &&
                                filteredAvailablePlayers.length
                            "
                            class="autocomplete-dropdown"
                        >
                            <div
                                v-for="player in filteredAvailablePlayers"
                                :key="player.id"
                                class="autocomplete-item"
                                @mousedown.prevent="addPlayerToTeam(player)"
                            >
                                <span>{{ player.name }}</span>
                                <span class="player-id">#{{ player.id }}</span>
                            </div>
                        </div>
                        <p
                            v-if="
                                playerDropdownOpen &&
                                playerSearchQuery &&
                                !filteredAvailablePlayers.length
                            "
                            class="empty autocomplete-empty"
                        >
                            No players found.
                        </p>
                    </div>
                </div>

                <p v-if="modalError" class="error">{{ modalError }}</p>
                <div class="modal-actions">
                    <button class="cancel-btn" @click="showTeamDetail = false">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import {
    eventApi,
    eventGroupEventsApi,
    eventSeriesApi,
    teamApi,
    playerApi,
} from "../api";
import { EventStatus, EventStage } from "../dennysClient/api";

//  State
const eventGroups = ref<any[]>([]);
const events = ref<any[]>([]);
const teams = ref<any[]>([]);
const series = ref<any[]>([]);

const selectedGroupId = ref<string | number>("all");
const selectedEventId = ref<number | null>(null);
const selectedEvent = ref<any | null>(null);

const loading = ref(false);
const error = ref("");

//  All Teams (prefetch for autocomplete)
const allTeams = ref<any[]>([]);

//  All Players (prefetch for autocomplete)
const allPlayers = ref<any[]>([]);

//  Player search in Team Detail Modal
const playerSearchQuery = ref("");
const playerDropdownOpen = ref(false);

//  Modal State
const showCreateEvent = ref(false);
const showEditState = ref(false);
const showAddTeam = ref(false);
const showCreateSeries = ref(false);
const showTeamDetail = ref(false);
const modalLoading = ref(false);
const modalError = ref("");

const newEvent = ref({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    status: EventStatus.NotStarted,
    eventStages: [] as EventStage[],
});
const newStatus = ref<EventStatus>(EventStatus.Active);
const addTeamMode = ref<"new" | "existing">("new");
const newTeam = ref({ name: "", logoName: "" });

//  Existing Team Search
const teamSearchQuery = ref("");
const teamDropdownOpen = ref(false);
const selectedExistingTeams = ref<any[]>([]);

//  Filtered players (exclude those already on team)
const filteredAvailablePlayers = computed(() => {
    const q = playerSearchQuery.value.toLowerCase().trim();
    const currentPlayerIds = teamPlayers.value.map((p: any) => p.id);
    return allPlayers.value.filter(
        (p) =>
            !currentPlayerIds.includes(p.id) &&
            (p.name.toLowerCase().includes(q) || String(p.id).includes(q)),
    );
});

const filteredAllTeams = computed(() => {
    const q = teamSearchQuery.value.toLowerCase().trim();
    const selectedIds = selectedExistingTeams.value.map((t) => t.id);
    const eventTeamIds = teams.value.map((t: any) => t.id);
    return allTeams.value.filter(
        (t) =>
            !selectedIds.includes(t.id) &&
            !eventTeamIds.includes(t.id) &&
            (t.name.toLowerCase().includes(q) || String(t.id).includes(q)),
    );
});

//  Team Detail State
const selectedTeam = ref<any>(null);
const teamPlayers = ref<any[]>([]);
const teamPlayersLoading = ref(false);

const seriesFilterTeamId = ref<number | null>(null);

const filteredSeries = computed(() => {
    if (!seriesFilterTeamId.value) return series.value;
    return series.value.filter(
        (s: any) =>
            s.team1Id === seriesFilterTeamId.value ||
            s.team2Id === seriesFilterTeamId.value,
    );
});

// Init
onMounted(async () => {
    loading.value = true;
    try {
        const [groupsRes, teamsRes, playersRes] = await Promise.all([
            eventGroupEventsApi.getEventGroups(),
            teamApi.getTeams(),
            playerApi.getPlayers(),
        ]);
        eventGroups.value = groupsRes.data;
        allTeams.value = teamsRes.data;
        allPlayers.value = playersRes.data;
        await onGroupChange();
    } catch {
        error.value = "Failed to load initial data.";
    } finally {
        loading.value = false;
    }
});

function teamName(teamId: number): string {
    const team =
        teams.value.find((t: any) => t.id === teamId) ??
        allTeams.value.find((t: any) => t.id === teamId);
    return team?.name ?? `Team ${teamId}`;
}

//  Group Changed
async function onGroupChange() {
    if (!selectedGroupId.value) return;

    events.value = [];
    selectedEventId.value = null;
    selectedEvent.value = null;
    teams.value = [];
    series.value = [];
    loading.value = true;
    error.value = "";

    try {
        if (selectedGroupId.value === "all") {
            const res = await eventApi.getEvents();
            events.value = res.data;
        } else {
            const res = await eventGroupEventsApi.getEventsInEventGroup(
                selectedGroupId.value as number,
            );
            events.value = res.data;
        }

        if (events.value.length > 0) {
            await selectEvent(events.value[0].id);
        }
    } catch {
        error.value = "Failed to load events.";
    } finally {
        loading.value = false;
    }
}

//  Select Event Tab
async function selectEvent(eventId: number) {
    selectedEventId.value = eventId;
    selectedEvent.value = null;
    teams.value = [];
    series.value = [];
    error.value = "";

    try {
        const eventRes = await eventApi.getEventById(eventId);
        selectedEvent.value = eventRes.data;
    } catch (e) {
        console.error("Event details failed:", e);
        error.value = "Failed to load event details.";
        return;
    }

    try {
        const teamsRes = await eventApi.getTeamsInEvent(eventId);
        teams.value = (teamsRes.data as any).teams ?? [];
    } catch (e) {
        console.error("Teams failed:", e);
    }

    try {
        const seriesRes = await eventSeriesApi.getSeriesInEvent(eventId);
        series.value = (seriesRes.data as any).series ?? [];
    } catch (e) {
        console.error("Series failed:", e);
    }
}

//  Reload current event
async function reloadCurrentEvent() {
    if (selectedEventId.value) {
        await selectEvent(selectedEventId.value);
    }
}

//  Create Event
async function createEvent() {
    modalLoading.value = true;
    modalError.value = "";
    try {
        await eventApi.addEvent({
            name: newEvent.value.name,
            description: newEvent.value.description || undefined,
            startDate: new Date(newEvent.value.startDate).toISOString(),
            endDate: new Date(newEvent.value.endDate).toISOString(),
            status: newEvent.value.status,
            eventStages: newEvent.value.eventStages,
        } as any);
        showCreateEvent.value = false;
        newEvent.value = {
            name: "",
            description: "",
            startDate: "",
            endDate: "",
            status: EventStatus.NotStarted,
            eventStages: [],
        };
        await onGroupChange();
    } catch {
        modalError.value = "Failed to create event.";
    } finally {
        modalLoading.value = false;
    }
}

//  Change Event Status
async function changeEventState() {
    if (!selectedEventId.value) return;
    modalLoading.value = true;
    modalError.value = "";
    try {
        await eventApi.patchEvent(selectedEventId.value, {
            status: newStatus.value,
        });
        showEditState.value = false;
        await reloadCurrentEvent();
    } catch {
        modalError.value = "Failed to update event status.";
    } finally {
        modalLoading.value = false;
    }
}

// Add Team Modal
function openAddTeamModal() {
    addTeamMode.value = "new";
    newTeam.value = { name: "", logoName: "" };
    teamSearchQuery.value = "";
    teamDropdownOpen.value = false;
    selectedExistingTeams.value = [];
    modalError.value = "";
    showAddTeam.value = true;
}

//  Create New Team & Add to Event
async function createAndAddTeam() {
    if (!selectedEventId.value) return;
    modalLoading.value = true;
    modalError.value = "";
    try {
        const res = await teamApi.addTeam({
            name: newTeam.value.name,
            logoName: newTeam.value.logoName || null,
        });
        const createdTeam = res.data;
        await eventApi.addTeamToEvent(selectedEventId.value, {
            teamId: createdTeam.id,
        });
        // Refresh the allTeams list
        const allRes = await teamApi.getTeams();
        allTeams.value = allRes.data;
        showAddTeam.value = false;
        newTeam.value = { name: "", logoName: "" };
        await reloadCurrentEvent();
    } catch {
        modalError.value = "Failed to create and add team.";
    } finally {
        modalLoading.value = false;
    }
}

function selectExistingTeam(team: any) {
    selectedExistingTeams.value.push(team);
    teamSearchQuery.value = "";
    teamDropdownOpen.value = false;
}

function removeExistingTeam(teamId: number) {
    selectedExistingTeams.value = selectedExistingTeams.value.filter(
        (t) => t.id !== teamId,
    );
}

//  Add all selected teams to event
async function addExistingTeamsToEvent() {
    if (!selectedEventId.value || !selectedExistingTeams.value.length) return;
    modalLoading.value = true;
    modalError.value = "";
    try {
        for (const team of selectedExistingTeams.value) {
            await eventApi.addTeamToEvent(selectedEventId.value, {
                teamId: team.id,
            });
        }
        showAddTeam.value = false;
        selectedExistingTeams.value = [];
        await reloadCurrentEvent();
    } catch {
        modalError.value = "Failed to add team(s) to event.";
    } finally {
        modalLoading.value = false;
    }
}

//  Team Detail Modal
async function openTeamDetail(team: any) {
    selectedTeam.value = team;
    teamPlayers.value = [];
    playerSearchQuery.value = "";
    playerDropdownOpen.value = false;
    modalError.value = "";
    teamPlayersLoading.value = true;
    showTeamDetail.value = true;
    try {
        const res = await teamApi.getPlayersOnTeam(team.id);
        teamPlayers.value = res.data;
    } catch {
        teamPlayers.value = [];
    } finally {
        teamPlayersLoading.value = false;
    }
}

//  Add Player to Team
async function addPlayerToTeam(player: any) {
    if (!selectedTeam.value) return;
    playerSearchQuery.value = "";
    playerDropdownOpen.value = false;
    modalLoading.value = true;
    modalError.value = "";
    try {
        await teamApi.addPlayerToTeam(selectedTeam.value.id, {
            playerId: player.id,
        } as any);
        teamPlayers.value.push(player);
    } catch {
        modalError.value = "Failed to add player to team.";
    } finally {
        modalLoading.value = false;
    }
}

//  Remove Player from Team
async function removePlayerFromTeam(player: any) {
    if (!selectedTeam.value) return;
    modalLoading.value = true;
    modalError.value = "";
    try {
        await teamApi.removePlayerFromTeam(selectedTeam.value.id, player.id);
        teamPlayers.value = teamPlayers.value.filter(
            (p: any) => p.id !== player.id,
        );
    } catch {
        modalError.value = "Failed to remove player from team.";
    } finally {
        modalLoading.value = false;
    }
}

//  Create Series State
const newSeries = ref({
    team1Id: 0,
    team2Id: 0,
    totalGames: 3,
    stage: EventStage.RegularSeason,
});

const team1SearchQuery = ref("");
const team1DropdownOpen = ref(false);
const team2SearchQuery = ref("");
const team2DropdownOpen = ref(false);

// Filter teams for series creation (exclude already selected team)
function filteredTeamsForSeries(
    query: string,
    excludeTeamId: number | null,
): any[] {
    const q = query.toLowerCase().trim();
    return teams.value.filter(
        (t) =>
            t.id !== excludeTeamId &&
            (t.name?.toLowerCase().includes(q) || String(t.id).includes(q)),
    );
}

function selectTeam1(team: any) {
    newSeries.value.team1Id = team.id;
    team1SearchQuery.value = "";
    team1DropdownOpen.value = false;
}

function selectTeam2(team: any) {
    newSeries.value.team2Id = team.id;
    team2SearchQuery.value = "";
    team2DropdownOpen.value = false;
}

//  Create Series
async function createSeries() {
    if (!selectedEventId.value) return;
    if (!newSeries.value.team1Id || !newSeries.value.team2Id) {
        modalError.value = "Please select both teams.";
        return;
    }

    modalLoading.value = true;
    modalError.value = "";
    try {
        await eventSeriesApi.addSeriesToEvent(selectedEventId.value, {
            team1Id: newSeries.value.team1Id,
            team2Id: newSeries.value.team2Id,
            totalGames: newSeries.value.totalGames,
            stage: newSeries.value.stage,
        });
        showCreateSeries.value = false;
        newSeries.value = {
            team1Id: 0,
            team2Id: 0,
            totalGames: 3,
            stage: EventStage.RegularSeason,
        };
        await reloadCurrentEvent();
    } catch {
        modalError.value = "Failed to create series.";
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

/*  Top Bar  */
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

.group-selector select {
    padding: 0.5rem 2rem 0.5rem 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    background: #ffffff;
    font-size: 0.95rem;
    color: #1e293b;
    cursor: pointer;
}

.group-selector select:focus {
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

/*  Tabs  */
.event-tabs {
    display: flex;
    gap: 0;
    border-bottom: 2px solid #e2e8f0;
}

.tab {
    padding: 0.6rem 1.25rem;
    background: transparent;
    border: none;
    border-bottom: 2px solid transparent;
    margin-bottom: -2px;
    font-size: 0.95rem;
    color: #64748b;
    cursor: pointer;
    transition:
        color 0.15s,
        border-color 0.15s;
}

.tab:hover {
    color: #1e293b;
}

.tab.active {
    color: #1e293b;
    font-weight: 600;
    border-bottom-color: #3b82f6;
}

/*  Two-Column Layout  */
.event-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.25rem;
    align-items: start;
}

.left-col {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
}

.right-col {
    display: flex;
    flex-direction: column;
}

/*  Panels  */
.panel {
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    overflow: hidden;
}

.panel.full-height {
    height: 100%;
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

.panel-body {
    padding: 1rem 1.25rem;
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
    flex-shrink: 0;
}

.small-btn:hover {
    background: #cbd5e1;
}

/*  Details Grid  */
.details-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 1rem;
}

.detail-item {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
}

.label {
    font-size: 0.75rem;
    color: #64748b;
    text-transform: uppercase;
}

.value {
    font-size: 0.95rem;
    color: #1e293b;
}

/*  Teams  */
.team-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.team-item {
    padding: 0.5rem 0.75rem;
    background: #f1f5f9;
    border-radius: 6px;
    font-size: 0.9rem;
}

.team-item.clickable {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    transition: background 0.15s;
}

.team-item.clickable:hover {
    background: #e2e8f0;
}

.team-id {
    font-size: 0.8rem;
    color: #94a3b8;
}

/*  Table  */
table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    text-align: left;
    padding: 0.5rem 0.25rem;
    border-bottom: 1px solid #f1f5f9;
}

th {
    color: #64748b;
    font-size: 0.75rem;
    text-transform: uppercase;
}

/*  Utility  */
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

.matchup {
    font-weight: 600;
    margin-right: 0.5rem;
}

.series-id {
    font-size: 0.75rem;
    font-style: italic;
    color: #94a3b8;
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

.modal-wide {
    max-width: 520px;
}

.modal h2 {
    margin-bottom: 1.25rem;
    font-size: 1.1rem;
}

.modal-header-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.modal-header-row h2 {
    margin: 0;
}

.team-id-badge {
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
    margin-bottom: 0.75rem;
}

/*  Tab Toggle in Modal  */
.tab-toggle {
    display: flex;
    gap: 0;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    overflow: hidden;
    margin-bottom: 1.25rem;
}

.tab-toggle button {
    flex: 1;
    padding: 0.5rem;
    border: none;
    background: #f8fafc;
    color: #64748b;
    font-size: 0.9rem;
    cursor: pointer;
    transition:
        background 0.15s,
        color 0.15s;
}

.tab-toggle button.active {
    background: #3b82f6;
    color: #ffffff;
}

/*  Autocomplete  */
.autocomplete-wrapper {
    position: relative;
}

.autocomplete-dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    max-height: 200px;
    overflow-y: auto;
    background: #ffffff;
    border: 1px solid #e2e8f0;
    border-top: none;
    border-radius: 0 0 6px 6px;
    z-index: 10;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.autocomplete-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0.75rem;
    cursor: pointer;
    font-size: 0.9rem;
    transition: background 0.1s;
}

.autocomplete-item:hover {
    background: #f1f5f9;
}

.autocomplete-empty {
    padding: 0.5rem 0.75rem;
    margin: 0;
}

/*  Selected team preview chip  */
.selected-team-preview {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 0.75rem;
    background: #eff6ff;
    border: 1px solid #bfdbfe;
    border-radius: 6px;
    font-size: 0.9rem;
    margin-bottom: 1rem;
}

.remove-btn {
    margin-left: auto;
    background: none;
    border: none;
    color: #94a3b8;
    font-size: 1rem;
    cursor: pointer;
    padding: 0 0.25rem;
    line-height: 1;
}

.remove-btn:hover {
    color: #e74c3c;
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

.form-group input,
.form-group select {
    padding: 0.6rem 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    font-size: 0.95rem;
    color: #1e293b;
    background: #f8fafc;
}

.form-group input:focus,
.form-group select:focus {
    outline: none;
    border-color: #3b82f6;
    background: #ffffff;
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

.header-actions {
    display: flex;
    gap: 0.75rem;
    align-items: center;
    flex-shrink: 0;
}

.filter-select-wrapper {
    display: flex;
    align-items: center;
    gap: 0.4rem;
}

.filter-select-wrapper label {
    font-size: 0.7rem;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.03em;
}

.filter-select {
    padding: 0.25rem 1.25rem 0.25rem 0.5rem;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    background: #ffffff;
    font-size: 0.8rem;
    color: #1e293b;
    cursor: pointer;
}

.filter-select:focus {
    outline: none;
    border-color: #3b82f6;
}

.checkbox-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.checkbox-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    color: #1e293b;
    cursor: pointer;
    text-transform: none;
}

.checkbox-label input[type="checkbox"] {
    width: 1rem;
    height: 1rem;
    accent-color: #3b82f6;
    cursor: pointer;
}
.selected-teams-list {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    margin-bottom: 1rem;
}

.player-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1.25rem;
}

.player-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0.75rem;
    background: #f1f5f9;
    border-radius: 6px;
    font-size: 0.9rem;
}

.player-info {
    display: flex;
    align-items: center;
    gap: 0.4rem;
}

.player-name {
    font-weight: 600;
}

.player-id {
    font-size: 0.75rem;
    font-style: italic;
    color: #94a3b8;
}

.remove-player-btn {
    padding: 0.2rem 0.5rem;
    background: none;
    border: 1px solid #fca5a5;
    border-radius: 4px;
    color: #ef4444;
    font-size: 0.75rem;
    cursor: pointer;
    transition: background 0.15s;
}

.remove-player-btn:hover {
    background: #fef2f2;
}

.remove-player-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}
</style>
