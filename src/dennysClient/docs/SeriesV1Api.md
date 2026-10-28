# SeriesV1Api

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**addSeriesToEvent**](#addseriestoevent) | **POST** /api/v1/event/{eventId}/series | Create a series for an event.|
|[**createGame**](#creategame) | **POST** /api/v1/series/{seriesId}/game | Issue a tournament code for a series|
|[**getSeries**](#getseries) | **GET** /api/v1/series/{seriesId} | Get a series with its tournament codes and games|
|[**getSeriesInEvent**](#getseriesinevent) | **GET** /api/v1/event/{eventId}/series | Get all the series of an event|
|[**patchSeries**](#patchseries) | **PATCH** /api/v1/series/{seriesId} | Set a series\&#39; status and result|
|[**refreshSeriesFromCode**](#refreshseriesfromcode) | **POST** /api/v1/series/{seriesId}/refresh | Re-check Riot for one tournament code|
|[**removeSeriesFromEvent**](#removeseriesfromevent) | **DELETE** /api/v1/event/{eventId}/series/{seriesId} | Remove a series from an event|
|[**reportSeriesResult**](#reportseriesresult) | **POST** /api/v1/series/{seriesId}/results | Report the result of a game|

# **addSeriesToEvent**
> SeriesDto addSeriesToEvent(createSeriesDto)


### Example

```typescript
import {
    SeriesV1Api,
    Configuration,
    CreateSeriesDto
} from './api';

const configuration = new Configuration();
const apiInstance = new SeriesV1Api(configuration);

let eventId: number; // (default to undefined)
let createSeriesDto: CreateSeriesDto; //

const { status, data } = await apiInstance.addSeriesToEvent(
    eventId,
    createSeriesDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createSeriesDto** | **CreateSeriesDto**|  | |
| **eventId** | [**number**] |  | defaults to undefined|


### Return type

**SeriesDto**

### Authorization

[cookieAuth](../README.md#cookieAuth), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Series created |  -  |
|**400** | The request body is not valid JSON. |  -  |
|**401** | No valid session cookie or bearer token was supplied. Applies to every operation under &#x60;/api/v1&#x60;.  |  -  |
|**404** | Event or team not found |  -  |
|**409** | Invalid resource state  Possible reasons: - One or more teams are not in this event.  Note that repeat series between the same two teams are supported — two teams may legitimately meet more than once inside one stage.  |  -  |
|**415** | The request carried a body without &#x60;Content-Type: application/json&#x60;.  |  -  |
|**422** | Validation failed.  Possible reasons: - &#x60;totalGames&#x60; is not greater than zero. - &#x60;stage&#x60; is not a valid &#x60;EventStage&#x60;.  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **createGame**
> TournamentCodeDto createGame(createGameDto)

Issues a Riot tournament code for the series\' current game.  Idempotent by default: if a code has already been issued since the most recent recorded game, that code is returned with `200` and Riot is not called, so two captains pressing at once share one code. Send `newCode: true` to issue another one deliberately, for example to replace a code that did not work.  A series may be issued at most **2 codes per game**, counted since the most recent recorded game. Recording a result ends the current game and grants a fresh 2 for the next; unused allowance does not roll over. The limit exists to bound calls to Riot, not to control play — a refused request never reaches Riot at all.  Being at the limit does not prevent anyone from playing. Report the result of the game that was played, or play a custom game and report the winner; either records a game, which resets the allowance. A codeless result from a custom game resets it just as a coded one does.  The first code issued moves a `NOT_STARTED` series to `IN_PROGRESS`. Issuance is still not blocked by the series being complete, and a replacement for a code that did not work is another call to this endpoint with `newCode: true`. There is no void step: a code with no result does not count towards the game number, though it does count towards the limit — so a replacement for a bum code spends the second of the two, and the next step after that is a custom game. 

### Example

```typescript
import {
    SeriesV1Api,
    Configuration,
    CreateGameDto
} from './api';

const configuration = new Configuration();
const apiInstance = new SeriesV1Api(configuration);

let seriesId: number; // (default to undefined)
let createGameDto: CreateGameDto; //

const { status, data } = await apiInstance.createGame(
    seriesId,
    createGameDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createGameDto** | **CreateGameDto**|  | |
| **seriesId** | [**number**] |  | defaults to undefined|


### Return type

**TournamentCodeDto**

### Authorization

[cookieAuth](../README.md#cookieAuth), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | A code was already issued since the most recent recorded game, and &#x60;newCode&#x60; was not set. That code is returned; Riot was not called.  |  -  |
|**201** | Tournament code issued.  Note this replaces the previous &#x60;GameDto&#x60; response. A freshly issued code has no game number, because no game has been played on it yet.  |  -  |
|**400** | Invalid input |  -  |
|**422** | Validation exception |  -  |
|**404** | Series or team not found |  -  |
|**409** | The series already holds the maximum of 2 tournament codes for the current game. Riot was not called. The body\&#39;s &#x60;reason&#x60; is &#x60;CODE_LIMIT&#x60;.  Record a result to reset the allowance — either report the game that was played, or play a custom game and report the winner.  |  -  |
|**502** | Riot rejected the request in a way that will not succeed on a retry, for example a bad or unauthorised API key. Do not retry; fall back to a custom game if a code is needed to play.  |  -  |
|**503** | Riot could not be reached, or rate-limited us (429 or 5xx). The request is worth retrying shortly.  |  -  |
|**401** | No valid session cookie or bearer token was supplied. Applies to every operation under &#x60;/api/v1&#x60;.  |  -  |
|**415** | The request carried a body without &#x60;Content-Type: application/json&#x60;.  |  -  |
|**500** | The series has no parent event, Riot returned an empty list of codes, or the code could not be persisted.  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getSeries**
> SeriesWithGamesDto getSeries()

The status view for a single series. Clients render their status line from this, and read `lastCodeIssuedAt` / `lastGameAt` to detect a game that was played but never reported. 

### Example

```typescript
import {
    SeriesV1Api,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SeriesV1Api(configuration);

let seriesId: number; // (default to undefined)

const { status, data } = await apiInstance.getSeries(
    seriesId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **seriesId** | [**number**] |  | defaults to undefined|


### Return type

**SeriesWithGamesDto**

### Authorization

[cookieAuth](../README.md#cookieAuth), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | The series, with its tournament codes and games |  -  |
|**404** | Series not found |  -  |
|**0** | Unexpected error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getSeriesInEvent**
> EventWithSeriesDto getSeriesInEvent()


### Example

```typescript
import {
    SeriesV1Api,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SeriesV1Api(configuration);

let eventId: number; //ID of the event (default to undefined)
let teamIds: Array<number>; //Filter only series with these teamIds (more than 2  teams guaruntees an empty array).  (optional) (default to undefined)
let stage: string; //Filter only series in this event stage. (optional) (default to undefined)
let status: SeriesStatus; //Filter on series status. Omitting the parameter returns series in every status.  (optional) (default to undefined)

const { status, data } = await apiInstance.getSeriesInEvent(
    eventId,
    teamIds,
    stage,
    status
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **eventId** | [**number**] | ID of the event | defaults to undefined|
| **teamIds** | **Array&lt;number&gt;** | Filter only series with these teamIds (more than 2  teams guaruntees an empty array).  | (optional) defaults to undefined|
| **stage** | [**string**] | Filter only series in this event stage. | (optional) defaults to undefined|
| **status** | **SeriesStatus** | Filter on series status. Omitting the parameter returns series in every status.  | (optional) defaults to undefined|


### Return type

**EventWithSeriesDto**

### Authorization

[cookieAuth](../README.md#cookieAuth), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | The event, with the series matching the filter |  -  |
|**404** | Event not found |  -  |
|**0** | Unexpected error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **patchSeries**
> SeriesDto patchSeries(patchSeriesDto)

Sets the status by hand, and for `COMPLETE` the result.  - A winner records the result. With no games played, that is a forfeit. - `doubleLoss: true` records a loss for both teams with no winner   (rulebook §5.5.2). A series can never have both. - `COMPLETE` with neither keeps any result already stored. - Any other status clears the stored result.  A complete series can be patched again to correct its result. 

### Example

```typescript
import {
    SeriesV1Api,
    Configuration,
    PatchSeriesDto
} from './api';

const configuration = new Configuration();
const apiInstance = new SeriesV1Api(configuration);

let seriesId: number; // (default to undefined)
let patchSeriesDto: PatchSeriesDto; //

const { status, data } = await apiInstance.patchSeries(
    seriesId,
    patchSeriesDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **patchSeriesDto** | **PatchSeriesDto**|  | |
| **seriesId** | [**number**] |  | defaults to undefined|


### Return type

**SeriesDto**

### Authorization

[cookieAuth](../README.md#cookieAuth), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Series updated |  -  |
|**401** | No valid session cookie or bearer token was supplied. Applies to every operation under &#x60;/api/v1&#x60;.  |  -  |
|**404** | Series not found |  -  |
|**415** | The request carried a body without &#x60;Content-Type: application/json&#x60;.  |  -  |
|**422** | Invalid combination of fields.  Possible reasons: - Both &#x60;winnerTeamId&#x60; and &#x60;doubleLoss: true&#x60; were given. - &#x60;winnerTeamId&#x60; or &#x60;doubleLoss&#x60; was given with a status other than &#x60;COMPLETE&#x60;. - &#x60;winnerTeamId&#x60; is not a participant in the series.  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **refreshSeriesFromCode**
> SeriesWithGamesDto refreshSeriesFromCode(refreshSeriesDto)

Asks Riot about a single tournament code and records the game if one is found, updating the series\' `games` array. Denny\'s already polls Riot for open codes every few minutes; use this to check one now instead of issuing a fresh code — a refresh costs nothing against the per-game code limit.  Exactly **one** of `tournamentCodeId` or `shortcode` must be given. Unlike `/results`, omitting both is rejected: this operation is defined by the code it targets.  A code that already has a game recorded is left alone and answers 200. That is deliberate — re-asking Riot would record a second game for the same match whenever the existing result was self-reported, because such a game carries no `riotMatchId` to recognise Riot\'s copy by.  Recording a game triggers the usual completion check. 

### Example

```typescript
import {
    SeriesV1Api,
    Configuration,
    RefreshSeriesDto
} from './api';

const configuration = new Configuration();
const apiInstance = new SeriesV1Api(configuration);

let seriesId: number; // (default to undefined)
let refreshSeriesDto: RefreshSeriesDto; //

const { status, data } = await apiInstance.refreshSeriesFromCode(
    seriesId,
    refreshSeriesDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **refreshSeriesDto** | **RefreshSeriesDto**|  | |
| **seriesId** | [**number**] |  | defaults to undefined|


### Return type

**SeriesWithGamesDto**

### Authorization

[cookieAuth](../README.md#cookieAuth), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Riot had a game and it was recorded. The returned series includes it in &#x60;games&#x60;.  |  -  |
|**200** | Nothing to add — **not** a failure. Either Riot has no game for this code yet, or the code already had a result recorded. The series is returned unchanged; do not retry on a timer without a reason to think the game has since finished.  |  -  |
|**401** | No valid session cookie or bearer token was supplied. Applies to every operation under &#x60;/api/v1&#x60;.  |  -  |
|**404** | Series not found, the tournament code was not found, or the code belongs to a different series.  |  -  |
|**415** | The request carried a body without &#x60;Content-Type: application/json&#x60;.  |  -  |
|**422** | Both &#x60;tournamentCodeId&#x60; and &#x60;shortcode&#x60; were given, or neither was. Exactly one is required.  |  -  |
|**503** | Riot could not be reached, so nothing could be confirmed. Distinct from 200: this one is worth retrying.  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **removeSeriesFromEvent**
> EventWithSeriesDto removeSeriesFromEvent()


### Example

```typescript
import {
    SeriesV1Api,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new SeriesV1Api(configuration);

let eventId: number; // (default to undefined)
let seriesId: number; // (default to undefined)

const { status, data } = await apiInstance.removeSeriesFromEvent(
    eventId,
    seriesId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **eventId** | [**number**] |  | defaults to undefined|
| **seriesId** | [**number**] |  | defaults to undefined|


### Return type

**EventWithSeriesDto**

### Authorization

[cookieAuth](../README.md#cookieAuth), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Series removed from event |  -  |
|**401** | No valid session cookie or bearer token was supplied. Applies to every operation under &#x60;/api/v1&#x60;.  |  -  |
|**404** | Event not found, series not found, or the series is not part of this event. A series may only be deleted through the event it belongs to.  |  -  |
|**409** | The series has tournament codes or games recorded against it and cannot be deleted. A tournament code is a real Riot artifact and may already have player stats keyed on its shortcode. Complete the series instead.  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **reportSeriesResult**
> GameDto reportSeriesResult(reportResultDto)

The single result-reporting entry point, used by both self-serve and staff. Records the reported winner; Riot is never called. Recording a result triggers the automatic completion check: if one team has more than `totalGames / 2` wins, the series is closed.  Idempotent per tournament code, including concurrent reports. If the targeted code already has a result, the existing game is returned and nothing is double-counted.  A report on a `COMPLETE` or `CANCELLED` series, including a double loss, records the game and leaves the series\' status and result alone. 

### Example

```typescript
import {
    SeriesV1Api,
    Configuration,
    ReportResultDto
} from './api';

const configuration = new Configuration();
const apiInstance = new SeriesV1Api(configuration);

let seriesId: number; // (default to undefined)
let reportResultDto: ReportResultDto; //

const { status, data } = await apiInstance.reportSeriesResult(
    seriesId,
    reportResultDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **reportResultDto** | **ReportResultDto**|  | |
| **seriesId** | [**number**] |  | defaults to undefined|


### Return type

**GameDto**

### Authorization

[cookieAuth](../README.md#cookieAuth), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Result recorded |  -  |
|**200** | The targeted code already had a result. The existing game is returned and nothing was written.  |  -  |
|**401** | No valid session cookie or bearer token was supplied. Applies to every operation under &#x60;/api/v1&#x60;.  |  -  |
|**404** | Series not found, the tournament code was not found, or the code belongs to a different series.  |  -  |
|**415** | The request carried a body without &#x60;Content-Type: application/json&#x60;.  |  -  |
|**422** | Invalid combination of fields.  Possible reasons: - Both &#x60;tournamentCodeId&#x60; and &#x60;shortcode&#x60; were given. - &#x60;winnerTeamId&#x60; is missing. - &#x60;winnerTeamId&#x60; is not a participant in the series. - &#x60;loserTeamId&#x60; contradicts &#x60;winnerTeamId&#x60;.  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

