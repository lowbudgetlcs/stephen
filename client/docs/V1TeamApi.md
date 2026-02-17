# V1TeamApi

All URIs are relative to */api*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**addTeam**](#addteam) | **POST** /v1/team | Create a new team|
|[**getTeamById**](#getteambyid) | **GET** /v1/team/{teamId} | Get a team by ID|
|[**getTeams**](#getteams) | **GET** /v1/team | Get all teams|
|[**patchTeam**](#patchteam) | **PATCH** /v1/team/{teamId} | Patch a team\&#39;s data.|

# **addTeam**
> TeamDto addTeam(newTeamDto)


### Example

```typescript
import {
    V1TeamApi,
    Configuration,
    NewTeamDto
} from './api';

const configuration = new Configuration();
const apiInstance = new V1TeamApi(configuration);

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

No authorization required

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

# **getTeamById**
> TeamDto getTeamById()


### Example

```typescript
import {
    V1TeamApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new V1TeamApi(configuration);

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

No authorization required

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
    V1TeamApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new V1TeamApi(configuration);

const { status, data } = await apiInstance.getTeams();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<TeamDto>**

### Authorization

No authorization required

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
    V1TeamApi,
    Configuration,
    PatchTeamDto
} from './api';

const configuration = new Configuration();
const apiInstance = new V1TeamApi(configuration);

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

No authorization required

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

