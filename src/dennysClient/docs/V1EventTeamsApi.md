# V1EventTeamsApi

All URIs are relative to */api*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**addTeamToEvent**](#addteamtoevent) | **POST** /v1/event/{eventId}/teams | Link a team to an event|
|[**getTeamsInEvent**](#getteamsinevent) | **GET** /v1/event/{eventId}/teams | Get an event with all teams included|
|[**removeTeamFromEvent**](#removeteamfromevent) | **DELETE** /v1/event/{eventId}/teams/{teamId} | Remove a team from an event|

# **addTeamToEvent**
> EventWithTeamsDto addTeamToEvent(eventAddTeamDto)


### Example

```typescript
import {
    V1EventTeamsApi,
    Configuration,
    EventAddTeamDto
} from './api';

const configuration = new Configuration();
const apiInstance = new V1EventTeamsApi(configuration);

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

No authorization required

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

# **getTeamsInEvent**
> Array<EventWithTeamsDto> getTeamsInEvent()


### Example

```typescript
import {
    V1EventTeamsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new V1EventTeamsApi(configuration);

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

No authorization required

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

# **removeTeamFromEvent**
> EventWithTeamsDto removeTeamFromEvent()


### Example

```typescript
import {
    V1EventTeamsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new V1EventTeamsApi(configuration);

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

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Team removed from event |  -  |
|**404** | Event or team not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

