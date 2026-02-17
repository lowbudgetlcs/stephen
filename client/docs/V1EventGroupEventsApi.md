# V1EventGroupEventsApi

All URIs are relative to */api*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**addEventToEventGroup**](#addeventtoeventgroup) | **POST** /v1/eventGroup/{eventGroupId}/events | Add an event to an event group|
|[**getEventsInEventGroup**](#geteventsineventgroup) | **GET** /v1/eventGroup/{eventGroupId}/events | Get an event group with all events included|
|[**removeEventFromEventGroup**](#removeeventfromeventgroup) | **DELETE** /v1/eventGroup/{eventGroupId}/events/{eventId} | Remove an event from an event group|

# **addEventToEventGroup**
> EventGroupWithEventsDto addEventToEventGroup(eventGroupAddEventDto)


### Example

```typescript
import {
    V1EventGroupEventsApi,
    Configuration,
    EventGroupAddEventDto
} from './api';

const configuration = new Configuration();
const apiInstance = new V1EventGroupEventsApi(configuration);

let eventGroupId: number; // (default to undefined)
let eventGroupAddEventDto: EventGroupAddEventDto; //

const { status, data } = await apiInstance.addEventToEventGroup(
    eventGroupId,
    eventGroupAddEventDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **eventGroupAddEventDto** | **EventGroupAddEventDto**|  | |
| **eventGroupId** | [**number**] |  | defaults to undefined|


### Return type

**EventGroupWithEventsDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Event added to event group |  -  |
|**400** | Invalid input |  -  |
|**404** | Event group or event not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getEventsInEventGroup**
> Array<EventGroupWithEventsDto> getEventsInEventGroup()


### Example

```typescript
import {
    V1EventGroupEventsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new V1EventGroupEventsApi(configuration);

let eventGroupId: number; //ID of the event group (default to undefined)

const { status, data } = await apiInstance.getEventsInEventGroup(
    eventGroupId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **eventGroupId** | [**number**] | ID of the event group | defaults to undefined|


### Return type

**Array<EventGroupWithEventsDto>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | List of events in the event group |  -  |
|**404** | Event group not found |  -  |
|**0** | Unexpected error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **removeEventFromEventGroup**
> EventGroupWithEventsDto removeEventFromEventGroup()


### Example

```typescript
import {
    V1EventGroupEventsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new V1EventGroupEventsApi(configuration);

let eventGroupId: number; // (default to undefined)
let eventId: number; // (default to undefined)

const { status, data } = await apiInstance.removeEventFromEventGroup(
    eventGroupId,
    eventId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **eventGroupId** | [**number**] |  | defaults to undefined|
| **eventId** | [**number**] |  | defaults to undefined|


### Return type

**EventGroupWithEventsDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Event removed from event group |  -  |
|**404** | Event or team not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

