# V1EventApi

All URIs are relative to */api*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**addEvent**](#addevent) | **POST** /v1/event | Create a new event.|
|[**getEventById**](#geteventbyid) | **GET** /v1/event/{eventId} | Get an event by ID.|
|[**getEvents**](#getevents) | **GET** /v1/event | Get all events|
|[**patchEvent**](#patchevent) | **PATCH** /v1/event/{eventId} | Patch an event\&#39;s data|

# **addEvent**
> EventDto addEvent(createEventDto)

Registers an event with Dennys, and optionally assign it to an event group 

### Example

```typescript
import {
    V1EventApi,
    Configuration,
    CreateEventDto
} from './api';

const configuration = new Configuration();
const apiInstance = new V1EventApi(configuration);

let createEventDto: CreateEventDto; //Event specification

const { status, data } = await apiInstance.addEvent(
    createEventDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createEventDto** | **CreateEventDto**| Event specification | |


### Return type

**EventDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful operation |  -  |
|**400** | Invalid input |  -  |
|**422** | Validation exception |  -  |
|**0** | Unexpected error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getEventById**
> EventDto getEventById()

Returns a single event with the associated teams.

### Example

```typescript
import {
    V1EventApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new V1EventApi(configuration);

let eventId: number; //ID of event to return (default to undefined)

const { status, data } = await apiInstance.getEventById(
    eventId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **eventId** | [**number**] | ID of event to return | defaults to undefined|


### Return type

**EventDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | successful operation |  -  |
|**400** | Missing or malformed id |  -  |
|**404** | Event not found |  -  |
|**0** | Unexpected error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getEvents**
> Array<EventDto> getEvents()

Fetch a list of all events.

### Example

```typescript
import {
    V1EventApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new V1EventApi(configuration);

const { status, data } = await apiInstance.getEvents();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<EventDto>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful operation |  -  |
|**0** | Unexpected error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **patchEvent**
> EventDto patchEvent(patchEventDto)


### Example

```typescript
import {
    V1EventApi,
    Configuration,
    PatchEventDto
} from './api';

const configuration = new Configuration();
const apiInstance = new V1EventApi(configuration);

let eventId: number; //ID of event to update (default to undefined)
let patchEventDto: PatchEventDto; //Patch existing event.

const { status, data } = await apiInstance.patchEvent(
    eventId,
    patchEventDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **patchEventDto** | **PatchEventDto**| Patch existing event. | |
| **eventId** | [**number**] | ID of event to update | defaults to undefined|


### Return type

**EventDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful operation |  -  |
|**400** | Invalid input |  -  |
|**422** | Validation exception |  -  |
|**0** | Unexpected error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

