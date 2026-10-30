# TeamsV1Api

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**addPlayerToTeam**](#addplayertoteam) | **POST** /api/v1/team/{teamId}/players | Add a player to a team|
|[**addTeam**](#addteam) | **POST** /api/v1/team | Create a new team|
|[**getPlayersOnTeam**](#getplayersonteam) | **GET** /api/v1/team/{teamId}/players | Get a team with all the players included|
|[**getTeamById**](#getteambyid) | **GET** /api/v1/team/{teamId} | Get a team by ID|
|[**getTeams**](#getteams) | **GET** /api/v1/team | Get all teams|
|[**patchTeam**](#patchteam) | **PATCH** /api/v1/team/{teamId} | Patch a team\&#39;s data.|
|[**removePlayerFromTeam**](#removeplayerfromteam) | **DELETE** /api/v1/team/{teamId}/players/{playerId} | Remove a player from a team|

# **addPlayerToTeam**
> TeamWithPlayersDto addPlayerToTeam(teamPlayerLinkRequestDto)


### Example

```typescript
import {
    TeamsV1Api,
    Configuration,
    TeamPlayerLinkRequestDto
} from './api';

const configuration = new Configuration();
const apiInstance = new TeamsV1Api(configuration);

let teamId: number; // (default to undefined)
let teamPlayerLinkRequestDto: TeamPlayerLinkRequestDto; //

const { status, data } = await apiInstance.addPlayerToTeam(
    teamId,
    teamPlayerLinkRequestDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **teamPlayerLinkRequestDto** | **TeamPlayerLinkRequestDto**|  | |
| **teamId** | [**number**] |  | defaults to undefined|


### Return type

**TeamWithPlayersDto**

### Authorization

[cookieAuth](../README.md#cookieAuth), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Player added |  -  |
|**404** | Team or player not found |  -  |
|**409** | Invalid resource state  Possible reasons: - Player is already assigned to a different team in this event - Player is already assigned to this team  |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **addTeam**
> TeamDto addTeam(newTeamDto)


### Example

```typescript
import {
    TeamsV1Api,
    Configuration,
    NewTeamDto
} from './api';

const configuration = new Configuration();
const apiInstance = new TeamsV1Api(configuration);

let newTeamDto: NewTeamDto; //New team details

const { status, data } = await apiInstance.addTeam(
    newTeamDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **newTeamDto** | **NewTeamDto**| New team details | |


### Return type

**TeamDto**

### Authorization

[cookieAuth](../README.md#cookieAuth), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Team created |  -  |
|**400** | Invalid input |  -  |
|**422** | Validation exception |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getPlayersOnTeam**
> Array<TeamWithPlayersDto> getPlayersOnTeam()


### Example

```typescript
import {
    TeamsV1Api,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TeamsV1Api(configuration);

let teamId: number; //ID of the team (default to undefined)

const { status, data } = await apiInstance.getPlayersOnTeam(
    teamId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **teamId** | [**number**] | ID of the team | defaults to undefined|


### Return type

**Array<TeamWithPlayersDto>**

### Authorization

[cookieAuth](../README.md#cookieAuth), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Players on the team |  -  |
|**404** | Team not found |  -  |
|**0** | Unexpected error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getTeamById**
> TeamDto getTeamById()


### Example

```typescript
import {
    TeamsV1Api,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TeamsV1Api(configuration);

let teamId: number; //ID of the team (default to undefined)

const { status, data } = await apiInstance.getTeamById(
    teamId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **teamId** | [**number**] | ID of the team | defaults to undefined|


### Return type

**TeamDto**

### Authorization

[cookieAuth](../README.md#cookieAuth), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Team found |  -  |
|**404** | Team not found |  -  |
|**0** | Unexpected error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getTeams**
> Array<TeamDto> getTeams()


### Example

```typescript
import {
    TeamsV1Api,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TeamsV1Api(configuration);

const { status, data } = await apiInstance.getTeams();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<TeamDto>**

### Authorization

[cookieAuth](../README.md#cookieAuth), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | List of teams |  -  |
|**0** | Unexpected error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **patchTeam**
> TeamDto patchTeam(patchTeamDto)


### Example

```typescript
import {
    TeamsV1Api,
    Configuration,
    PatchTeamDto
} from './api';

const configuration = new Configuration();
const apiInstance = new TeamsV1Api(configuration);

let teamId: number; //ID of the team to update (default to undefined)
let patchTeamDto: PatchTeamDto; //Fields to update for the team

const { status, data } = await apiInstance.patchTeam(
    teamId,
    patchTeamDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **patchTeamDto** | **PatchTeamDto**| Fields to update for the team | |
| **teamId** | [**number**] | ID of the team to update | defaults to undefined|


### Return type

**TeamDto**

### Authorization

[cookieAuth](../README.md#cookieAuth), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Team updated |  -  |
|**400** | Invalid input |  -  |
|**404** | Team not found |  -  |
|**0** | Unexpected error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **removePlayerFromTeam**
> TeamWithPlayersDto removePlayerFromTeam()


### Example

```typescript
import {
    TeamsV1Api,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TeamsV1Api(configuration);

let teamId: number; // (default to undefined)
let playerId: number; // (default to undefined)

const { status, data } = await apiInstance.removePlayerFromTeam(
    teamId,
    playerId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **teamId** | [**number**] |  | defaults to undefined|
| **playerId** | [**number**] |  | defaults to undefined|


### Return type

**TeamWithPlayersDto**

### Authorization

[cookieAuth](../README.md#cookieAuth), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Player removed |  -  |
|**404** | Team or player not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

