# EventsV1Api

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**addEvent**](#addevent) | **POST** /api/v1/event | Create a new event.|
|[**addTeamToEvent**](#addteamtoevent) | **POST** /api/v1/event/{eventId}/teams | Link a team to an event|
|[**getEventById**](#geteventbyid) | **GET** /api/v1/event/{eventId} | Get an event by ID.|
|[**getEvents**](#getevents) | **GET** /api/v1/event | Get all events|
|[**getTeamsInEvent**](#getteamsinevent) | **GET** /api/v1/event/{eventId}/teams | Get an event with all teams included|
|[**patchEvent**](#patchevent) | **PATCH** /api/v1/event/{eventId} | Patch an event\&#39;s data|
|[**removeTeamFromEvent**](#removeteamfromevent) | **DELETE** /api/v1/event/{eventId}/teams/{teamId} | Remove a team from an event|

# **addEvent**
> EventDto addEvent(createEventDto)

Registers an event with Dennys, and optionally assign it to an event group 

### Example

```typescript
import {
    EventsV1Api,
    Configuration,
    CreateEventDto
} from './api';

const configuration = new Configuration();
const apiInstance = new EventsV1Api(configuration);

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

[cookieAuth](../README.md#cookieAuth), [bearerAuth](../README.md#bearerAuth)

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

# **addTeamToEvent**
> EventWithTeamsDto addTeamToEvent(eventAddTeamDto)


### Example

```typescript
import {
    EventsV1Api,
    Configuration,
    EventAddTeamDto
} from './api';

const configuration = new Configuration();
const apiInstance = new EventsV1Api(configuration);

let eventId: number; // (default to undefined)
let eventAddTeamDto: EventAddTeamDto; //

const { status, data } = await apiInstance.addTeamToEvent(
    eventId,
    eventAddTeamDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **eventAddTeamDto** | **EventAddTeamDto**|  | |
| **eventId** | [**number**] |  | defaults to undefined|


### Return type

**EventWithTeamsDto**

### Authorization

[cookieAuth](../README.md#cookieAuth), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Team added to event |  -  |
|**404** | Event or team not found |  -  |
|**409** | Invalid resource state  Possible reasons: - Team is already assigned to a different event - One or more players on this team are already assigned to a different team in this event  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getEventById**
> EventDto getEventById()

Returns a single event with the associated teams.

### Example

```typescript
import {
    EventsV1Api,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new EventsV1Api(configuration);

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

[cookieAuth](../README.md#cookieAuth), [bearerAuth](../README.md#bearerAuth)

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
    EventsV1Api,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new EventsV1Api(configuration);

let name: string; //Filter events matching this name. Partial completions are allowed. (optional) (default to undefined)
let status: EventStatus; //Filter only series in this event stage. (optional) (default to undefined)

const { status, data } = await apiInstance.getEvents(
    name,
    status
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **name** | [**string**] | Filter events matching this name. Partial completions are allowed. | (optional) defaults to undefined|
| **status** | **EventStatus** | Filter only series in this event stage. | (optional) defaults to undefined|


### Return type

**Array<EventDto>**

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

# **getTeamsInEvent**
> Array<EventWithTeamsDto> getTeamsInEvent()


### Example

```typescript
import {
    EventsV1Api,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new EventsV1Api(configuration);

let eventId: number; //ID of the event (default to undefined)

const { status, data } = await apiInstance.getTeamsInEvent(
    eventId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **eventId** | [**number**] | ID of the event | defaults to undefined|


### Return type

**Array<EventWithTeamsDto>**

### Authorization

[cookieAuth](../README.md#cookieAuth), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | List of teams in the event |  -  |
|**404** | Event not found |  -  |
|**0** | Unexpected error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **patchEvent**
> EventDto patchEvent(patchEventDto)


### Example

```typescript
import {
    EventsV1Api,
    Configuration,
    PatchEventDto
} from './api';

const configuration = new Configuration();
const apiInstance = new EventsV1Api(configuration);

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

[cookieAuth](../README.md#cookieAuth), [bearerAuth](../README.md#bearerAuth)

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

# **removeTeamFromEvent**
> EventWithTeamsDto removeTeamFromEvent()


### Example

```typescript
import {
    EventsV1Api,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new EventsV1Api(configuration);

let eventId: number; // (default to undefined)
let teamId: number; // (default to undefined)

const { status, data } = await apiInstance.removeTeamFromEvent(
    eventId,
    teamId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **eventId** | [**number**] |  | defaults to undefined|
| **teamId** | [**number**] |  | defaults to undefined|


### Return type

**EventWithTeamsDto**

### Authorization

[cookieAuth](../README.md#cookieAuth), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Team removed from event |  -  |
|**404** | Event or team not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

