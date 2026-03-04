# PlayersV1Api

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**addPlayer**](#addplayer) | **POST** /api/v1/player | Create a new player|
|[**getPlayerById**](#getplayerbyid) | **GET** /api/v1/player/{playerId} | Get player by ID|
|[**getPlayers**](#getplayers) | **GET** /api/v1/player | Get all players|
|[**linkAccountToPlayer**](#linkaccounttoplayer) | **POST** /api/v1/player/{playerId}/accounts | Link a Riot account to a player|
|[**patchPlayer**](#patchplayer) | **PATCH** /api/v1/player/{playerId} | Patch a player\&#39;s data|
|[**removeAccountFromPlayer**](#removeaccountfromplayer) | **DELETE** /api/v1/player/{playerId}/accounts/{accountId} | Remove a Riot account from a player|

# **addPlayer**
> PlayerDto addPlayer(newPlayerDto)


### Example

```typescript
import {
    PlayersV1Api,
    Configuration,
    NewPlayerDto
} from './api';

const configuration = new Configuration();
const apiInstance = new PlayersV1Api(configuration);

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

[cookieAuth](../README.md#cookieAuth), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Player created |  -  |
|**400** | Name field is empty |  -  |
|**409** | Player name already exists |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getPlayerById**
> PlayerDto getPlayerById()


### Example

```typescript
import {
    PlayersV1Api,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PlayersV1Api(configuration);

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

[cookieAuth](../README.md#cookieAuth), [bearerAuth](../README.md#bearerAuth)

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
    PlayersV1Api,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PlayersV1Api(configuration);

const { status, data } = await apiInstance.getPlayers();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<PlayerDto>**

### Authorization

[cookieAuth](../README.md#cookieAuth), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | List of all players |  -  |
|**0** | Unexpected error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **linkAccountToPlayer**
> PlayerDto linkAccountToPlayer(accountLinkRequestDto)


### Example

```typescript
import {
    PlayersV1Api,
    Configuration,
    AccountLinkRequestDto
} from './api';

const configuration = new Configuration();
const apiInstance = new PlayersV1Api(configuration);

let playerId: number; //ID of the player (default to undefined)
let accountLinkRequestDto: AccountLinkRequestDto; //

const { status, data } = await apiInstance.linkAccountToPlayer(
    playerId,
    accountLinkRequestDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **accountLinkRequestDto** | **AccountLinkRequestDto**|  | |
| **playerId** | [**number**] | ID of the player | defaults to undefined|


### Return type

**PlayerDto**

### Authorization

[cookieAuth](../README.md#cookieAuth), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Riot account linked to player |  -  |
|**400** | Invalid input |  -  |
|**404** | Player or Riot account not found |  -  |
|**409** | Riot account already assigned to another player |  -  |
|**0** | Unexpected error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **patchPlayer**
> PlayerDto patchPlayer(patchPlayerDto)


### Example

```typescript
import {
    PlayersV1Api,
    Configuration,
    PatchPlayerDto
} from './api';

const configuration = new Configuration();
const apiInstance = new PlayersV1Api(configuration);

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

[cookieAuth](../README.md#cookieAuth), [bearerAuth](../README.md#bearerAuth)

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

# **removeAccountFromPlayer**
> PlayerDto removeAccountFromPlayer()


### Example

```typescript
import {
    PlayersV1Api,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new PlayersV1Api(configuration);

let playerId: number; //ID of the player (default to undefined)
let accountId: number; //ID of the Riot account to remove (default to undefined)

const { status, data } = await apiInstance.removeAccountFromPlayer(
    playerId,
    accountId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **playerId** | [**number**] | ID of the player | defaults to undefined|
| **accountId** | [**number**] | ID of the Riot account to remove | defaults to undefined|


### Return type

**PlayerDto**

### Authorization

[cookieAuth](../README.md#cookieAuth), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Riot account removed from player |  -  |
|**404** | Player or account not found |  -  |
|**0** | Unexpected error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

