# SeriesV1Api

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**addSeriesToEvent**](#addseriestoevent) | **POST** /api/v1/event/{eventId}/series | Create a series for an event.|
|[**createGame**](#creategame) | **POST** /api/v1/series/{seriesId}/game | Create a game in a series|
|[**getSeriesInEvent**](#getseriesinevent) | **GET** /api/v1/event/{eventId}/series | Get all the series of an event|
|[**removeSeriesFromEvent**](#removeseriesfromevent) | **DELETE** /api/v1/event/{eventId}/series/{seriesId} | Remove a series from an event|

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
|**200** | Team added to event |  -  |
|**400** | Request body is invalid. |  -  |
|**404** | Event or team not found |  -  |
|**409** | Invalid resource state  Possible reasons: - One or more teams are not in this event. - Series already exists between these teams.  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **createGame**
> GameDto createGame(createGameDto)


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

**GameDto**

### Authorization

[cookieAuth](../README.md#cookieAuth), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Game created |  -  |
|**400** | Invalid input |  -  |
|**422** | Validation exception |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getSeriesInEvent**
> Array<EventWithSeriesDto> getSeriesInEvent()


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

const { status, data } = await apiInstance.getSeriesInEvent(
    eventId,
    teamIds,
    stage
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **eventId** | [**number**] | ID of the event | defaults to undefined|
| **teamIds** | **Array&lt;number&gt;** | Filter only series with these teamIds (more than 2  teams guaruntees an empty array).  | (optional) defaults to undefined|
| **stage** | [**string**] | Filter only series in this event stage. | (optional) defaults to undefined|


### Return type

**Array<EventWithSeriesDto>**

### Authorization

[cookieAuth](../README.md#cookieAuth), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | List of series in the event |  -  |
|**404** | Event not found |  -  |
|**0** | Unexpected error |  -  |

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
|**404** | Event or series not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

