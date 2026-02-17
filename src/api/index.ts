import { Configuration } from "../dennysClient/configuration";
import {
  V1EventApi,
  V1EventGroupApi,
  V1EventGroupEventsApi,
  V1EventSeriesApi,
  V1EventTeamsApi,
  V1PlayerApi,
  V1PlayerAccountsApi,
  V1TeamApi,
  V1TeamPlayersApi,
  V1SeriesGamesApi,
  V1AccountApi,
} from "../dennysClient/api";

const config = new Configuration({
  basePath: import.meta.env.VITE_DENNYS_API_URL || "http://localhost:3000",
});

export const eventApi = new V1EventApi(config);
export const eventGroupApi = new V1EventGroupApi(config);
export const eventGroupEventsApi = new V1EventGroupEventsApi(config);
export const eventSeriesApi = new V1EventSeriesApi(config);
export const eventTeamsApi = new V1EventTeamsApi(config);
export const playerApi = new V1PlayerApi(config);
export const playerAccountsApi = new V1PlayerAccountsApi(config);
export const teamApi = new V1TeamApi(config);
export const teamPlayersApi = new V1TeamPlayersApi(config);
export const seriesGamesApi = new V1SeriesGamesApi(config);
export const accountApi = new V1AccountApi(config);
