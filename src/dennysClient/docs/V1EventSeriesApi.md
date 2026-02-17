# V1EventSeriesApi

All URIs are relative to */api*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**addSeriesToEvent**](#addseriestoevent) | **POST** /v1/event/{eventId}/series | Create a series for an event.|
|[**getSeriesInEvent**](#getseriesinevent) | **GET** /v1/event/{eventId}/series | Get all the series of an event|
|[**removeSeriesFromEvent**](#removeseriesfromevent) | **DELETE** /v1/event/{eventId}/series/{seriesId} | Remove a series from an event|

# **addSeriesToEvent**
> SeriesDto addSeriesToEvent(eventCreateSeriesDto)


### Example

```typescript
import {
    V1EventSeriesApi,
    Configuration,
    EventCreateSeriesDto
} from './api';

const configuration = new Configuration();
const apiInstance = new V1EventSeriesApi(configuration);

let eventId: number; // (default to undefined)
let eventCreateSeriesDto: EventCreateSeriesDto; //

const { status, data } = await apiInstance.addSeriesToEvent(
    eventId,
    eventCreateSeriesDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **eventCreateSeriesDto** | **EventCreateSeriesDto**|  | |
| **eventId** | [**number**] |  | defaults to undefined|


### Return type

**SeriesDto**

### Authorization

No authorization required

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

# **getSeriesInEvent**
> Array<EventWithSeriesDto> getSeriesInEvent()


### Example

```typescript
import {
    V1EventSeriesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new V1EventSeriesApi(configuration);

let eventId: number; //ID of the event (default to undefined)

const { status, data } = await apiInstance.getSeriesInEvent(
    eventId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **eventId** | [**number**] | ID of the event | defaults to undefined|


### Return type

**Array<EventWithSeriesDto>**

### Authorization

No authorization required

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
    V1EventSeriesApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new V1EventSeriesApi(configuration);

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

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Series removed from event |  -  |
|**404** | Event or series not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

