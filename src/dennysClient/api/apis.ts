export * from './v1AccountApi';
import { V1AccountApi } from './v1AccountApi';
export * from './v1EventApi';
import { V1EventApi } from './v1EventApi';
export * from './v1EventGroupApi';
import { V1EventGroupApi } from './v1EventGroupApi';
export * from './v1EventGroupEventsApi';
import { V1EventGroupEventsApi } from './v1EventGroupEventsApi';
export * from './v1EventSeriesApi';
import { V1EventSeriesApi } from './v1EventSeriesApi';
export * from './v1EventTeamsApi';
import { V1EventTeamsApi } from './v1EventTeamsApi';
export * from './v1PlayerApi';
import { V1PlayerApi } from './v1PlayerApi';
export * from './v1PlayerAccountsApi';
import { V1PlayerAccountsApi } from './v1PlayerAccountsApi';
export * from './v1SeriesGamesApi';
import { V1SeriesGamesApi } from './v1SeriesGamesApi';
export * from './v1TeamApi';
import { V1TeamApi } from './v1TeamApi';
export * from './v1TeamPlayersApi';
import { V1TeamPlayersApi } from './v1TeamPlayersApi';
import * as http from 'http';

export class HttpError extends Error {
    constructor (public response: http.IncomingMessage, public body: any, public statusCode?: number) {
        super('HTTP request failed');
        this.name = 'HttpError';
    }
}

export { RequestFile } from '../model/models';

export const APIS = [V1AccountApi, V1EventApi, V1EventGroupApi, V1EventGroupEventsApi, V1EventSeriesApi, V1EventTeamsApi, V1PlayerApi, V1PlayerAccountsApi, V1SeriesGamesApi, V1TeamApi, V1TeamPlayersApi];
