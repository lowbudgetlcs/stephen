import { Configuration } from "../dennysClient/configuration";
import axios from "axios";

import {
  EventsV1Api,
  EventGroupsV1Api,
  SeriesV1Api,
  TeamsV1Api,
  PlayersV1Api,
  AccountsV1Api,
} from "../dennysClient/api";

const basePath = import.meta.env.VITE_DENNYS_API_URL || "http://localhost:3000";

const config = new Configuration({
  basePath: basePath,
});

// Shared Axios instance with logging
const axiosInstance = axios.create();

// Log every request
axiosInstance.interceptors.request.use((req) => {
  console.log(`➡️ ${req.method?.toUpperCase()} ${req.baseURL ?? ""}${req.url}`);
  return req;
});

// Log every response (and errors)
axiosInstance.interceptors.response.use(
  (res) => {
    console.log(
      `✅ ${res.status} ${res.config.method?.toUpperCase()} ${res.config.url}`,
      res.data,
    );
    return res;
  },
  (err) => {
    console.error(
      `❌ ${err.response?.status ?? "NETWORK"} ${err.config?.method?.toUpperCase()} ${err.config?.url}`,
      err.response?.data,
    );
    return Promise.reject(err);
  },
);

export const eventApi = new EventsV1Api(config, basePath, axiosInstance);
export const eventGroupEventsApi = new EventGroupsV1Api(
  config,
  basePath,
  axiosInstance,
);
export const eventSeriesApi = new SeriesV1Api(config, basePath, axiosInstance);
export const playerApi = new PlayersV1Api(config, basePath, axiosInstance);
export const teamApi = new TeamsV1Api(config, basePath, axiosInstance);
export const accountApi = new AccountsV1Api(config, basePath, axiosInstance);
