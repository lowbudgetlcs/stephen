# V1PlayerApi

All URIs are relative to */api*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**addPlayer**](#addplayer) | **POST** /v1/player | Create a new player|
|[**getPlayerById**](#getplayerbyid) | **GET** /v1/player/{playerId} | Get player by ID|
|[**getPlayers**](#getplayers) | **GET** /v1/player | Get all players|
|[**patchPlayer**](#patchplayer) | **PATCH** /v1/player/{playerId} | Patch a player\&#39;s data|

# **addPlayer**
> PlayerDto addPlayer(newPlayerDto)


### Example

```typescript
import {
    V1PlayerApi,
    Configuration,
    NewPlayerDto
} from './api';

const configuration = new Configuration();
const apiInstance = new V1PlayerApi(configuration);

let newPlayerDto: NewPlayerDto; //

const { status, data } = await apiInstance.addPlayer(
    newPlayerDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **newPlayerDto** | **NewPlayerDto**|  | |


### Return type

**PlayerDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Player created |  -  |
|**400** | Name field is empty |  -  |
|**409** | Player name already exists |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getPlayerById**
> PlayerDto getPlayerById()


### Example

```typescript
import {
    V1PlayerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new V1PlayerApi(configuration);

let playerId: number; //ID of the player to retrieve (default to undefined)

const { status, data } = await apiInstance.getPlayerById(
    playerId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **playerId** | [**number**] | ID of the player to retrieve | defaults to undefined|


### Return type

**PlayerDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Player found |  -  |
|**404** | Player not found |  -  |
|**0** | Unexpected error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getPlayers**
> Array<PlayerDto> getPlayers()


### Example

```typescript
import {
    V1PlayerApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new V1PlayerApi(configuration);

const { status, data } = await apiInstance.getPlayers();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<PlayerDto>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | List of all players |  -  |
|**0** | Unexpected error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **patchPlayer**
> PlayerDto patchPlayer(patchPlayerDto)


### Example

```typescript
import {
    V1PlayerApi,
    Configuration,
    PatchPlayerDto
} from './api';

const configuration = new Configuration();
const apiInstance = new V1PlayerApi(configuration);

let playerId: number; //ID of the player to rename (default to undefined)
let patchPlayerDto: PatchPlayerDto; //Updated player data

const { status, data } = await apiInstance.patchPlayer(
    playerId,
    patchPlayerDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **patchPlayerDto** | **PatchPlayerDto**| Updated player data | |
| **playerId** | [**number**] | ID of the player to rename | defaults to undefined|


### Return type

**PlayerDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Player renamed successfully |  -  |
|**400** | Invalid input |  -  |
|**404** | Player not found |  -  |
|**0** | Unexpected error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

