# V1TeamPlayersApi

All URIs are relative to */api*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**addPlayerToTeam**](#addplayertoteam) | **POST** /v1/team/{teamId}/players | Add a player to a team|
|[**getPlayersOnTeam**](#getplayersonteam) | **GET** /v1/team/{teamId}/players | Get a team with all the players included|
|[**removePlayerFromTeam**](#removeplayerfromteam) | **DELETE** /v1/team/{teamId}/players/{playerId} | Remove a player from a team|

# **addPlayerToTeam**
> TeamWithPlayersDto addPlayerToTeam(teamPlayerLinkRequestDto)


### Example

```typescript
import {
    V1TeamPlayersApi,
    Configuration,
    TeamPlayerLinkRequestDto
} from './api';

const configuration = new Configuration();
const apiInstance = new V1TeamPlayersApi(configuration);

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

No authorization required

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

# **getPlayersOnTeam**
> Array<TeamWithPlayersDto> getPlayersOnTeam()


### Example

```typescript
import {
    V1TeamPlayersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new V1TeamPlayersApi(configuration);

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

No authorization required

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

# **removePlayerFromTeam**
> TeamWithPlayersDto removePlayerFromTeam()


### Example

```typescript
import {
    V1TeamPlayersApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new V1TeamPlayersApi(configuration);

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

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Player removed |  -  |
|**404** | Team or player not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

