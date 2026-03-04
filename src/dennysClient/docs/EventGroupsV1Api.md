# EventGroupsV1Api

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**addEventToEventGroup**](#addeventtoeventgroup) | **POST** /api/v1/eventGroup/{eventGroupId}/events | Add an event to an event group|
|[**createEventGroup**](#createeventgroup) | **POST** /api/v1/eventGroup | Create a new event group|
|[**getEventGroupById**](#geteventgroupbyid) | **GET** /api/v1/eventGroup/{eventGroupId} | Get an event group by ID|
|[**getEventGroups**](#geteventgroups) | **GET** /api/v1/eventGroup | Get all event groups|
|[**getEventsInEventGroup**](#geteventsineventgroup) | **GET** /api/v1/eventGroup/{eventGroupId}/events | Get an event group with all events included|
|[**patchEventGroup**](#patcheventgroup) | **PATCH** /api/v1/eventGroup/{eventGroupId} | Patch an event group\&#39;s data|
|[**removeEventFromEventGroup**](#removeeventfromeventgroup) | **DELETE** /api/v1/eventGroup/{eventGroupId}/events/{eventId} | Remove an event from an event group|

# **addEventToEventGroup**
> EventGroupWithEventsDto addEventToEventGroup(eventGroupAddEventDto)


### Example

```typescript
import {
    EventGroupsV1Api,
    Configuration,
    EventGroupAddEventDto
} from './api';

const configuration = new Configuration();
const apiInstance = new EventGroupsV1Api(configuration);

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

[cookieAuth](../README.md#cookieAuth), [bearerAuth](../README.md#bearerAuth)

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

# **createEventGroup**
> EventGroupDto createEventGroup(createEventGroupDto)


### Example

```typescript
import {
    EventGroupsV1Api,
    Configuration,
    CreateEventGroupDto
} from './api';

const configuration = new Configuration();
const apiInstance = new EventGroupsV1Api(configuration);

let createEventGroupDto: CreateEventGroupDto; //Event group specification

const { status, data } = await apiInstance.createEventGroup(
    createEventGroupDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createEventGroupDto** | **CreateEventGroupDto**| Event group specification | |


### Return type

**EventGroupDto**

### Authorization

[cookieAuth](../README.md#cookieAuth), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful operation |  -  |
|**400** | Invalid input |  -  |
|**409** | Invalid resource state  Possible reasons: - One of the events in eventIds is already in another event group.  |  -  |
|**422** | Validation exception |  -  |
|**0** | Unexpected error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getEventGroupById**
> EventGroupDto getEventGroupById()


### Example

```typescript
import {
    EventGroupsV1Api,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new EventGroupsV1Api(configuration);

let eventGroupId: number; //ID of the event group to retrieve (default to undefined)

const { status, data } = await apiInstance.getEventGroupById(
    eventGroupId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **eventGroupId** | [**number**] | ID of the event group to retrieve | defaults to undefined|


### Return type

**EventGroupDto**

### Authorization

[cookieAuth](../README.md#cookieAuth), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Event group found |  -  |
|**404** | Event group not found |  -  |
|**0** | Unexpected error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getEventGroups**
> Array<EventGroupDto> getEventGroups()


### Example

```typescript
import {
    EventGroupsV1Api,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new EventGroupsV1Api(configuration);

const { status, data } = await apiInstance.getEventGroups();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<EventGroupDto>**

### Authorization

[cookieAuth](../README.md#cookieAuth), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful operation |  -  |
|**0** | Unexpected error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getEventsInEventGroup**
> Array<EventGroupWithEventsDto> getEventsInEventGroup()


### Example

```typescript
import {
    EventGroupsV1Api,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new EventGroupsV1Api(configuration);

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

[cookieAuth](../README.md#cookieAuth), [bearerAuth](../README.md#bearerAuth)

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

# **patchEventGroup**
> EventGroupDto patchEventGroup(patchEventGroupDto)


### Example

```typescript
import {
    EventGroupsV1Api,
    Configuration,
    PatchEventGroupDto
} from './api';

const configuration = new Configuration();
const apiInstance = new EventGroupsV1Api(configuration);

let eventGroupId: number; //ID of the event group to update (default to undefined)
let patchEventGroupDto: PatchEventGroupDto; //Fields to update on the event group

const { status, data } = await apiInstance.patchEventGroup(
    eventGroupId,
    patchEventGroupDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **patchEventGroupDto** | **PatchEventGroupDto**| Fields to update on the event group | |
| **eventGroupId** | [**number**] | ID of the event group to update | defaults to undefined|


### Return type

**EventGroupDto**

### Authorization

[cookieAuth](../README.md#cookieAuth), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Event group updated |  -  |
|**400** | Invalid input |  -  |
|**404** | Event group not found |  -  |
|**0** | Unexpected error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **removeEventFromEventGroup**
> EventGroupWithEventsDto removeEventFromEventGroup()


### Example

```typescript
import {
    EventGroupsV1Api,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new EventGroupsV1Api(configuration);

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

[cookieAuth](../README.md#cookieAuth), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Event removed from event group |  -  |
|**404** | Event or team not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

