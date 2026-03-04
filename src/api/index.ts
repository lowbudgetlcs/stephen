import { Configuration } from "../dennysClient/configuration";
import axios from "axios";

import {
  AuthenticationApi,
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
export const axiosInstance = axios.create({
  withCredentials: true,
});

// Logging (dev only)
if (import.meta.env.DEV) {
  axiosInstance.interceptors.request.use((req) => {
    console.log(
      `➡️ ${req.method?.toUpperCase()} ${req.baseURL ?? ""}${req.url}`,
    );
    return req;
  });

  axiosInstance.interceptors.response.use(
    (res) => {
      console.log(`✅ ${res.status}`, res.data);
      return res;
    },
    (err) => {
      console.error(`❌ ${err.response?.status}`, err.response?.data);
      return Promise.reject(err);
    },
  );
}

export const authApi = new AuthenticationApi(config, basePath, axiosInstance);
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
