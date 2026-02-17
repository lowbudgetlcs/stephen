# V1PlayerAccountsApi

All URIs are relative to */api*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**linkAccountToPlayer**](#linkaccounttoplayer) | **POST** /v1/player/{playerId}/accounts | Link a Riot account to a player|
|[**removeAccountFromPlayer**](#removeaccountfromplayer) | **DELETE** /v1/player/{playerId}/accounts/{accountId} | Remove a Riot account from a player|

# **linkAccountToPlayer**
> PlayerDto linkAccountToPlayer(accountLinkRequestDto)


### Example

```typescript
import {
    V1PlayerAccountsApi,
    Configuration,
    AccountLinkRequestDto
} from './api';

const configuration = new Configuration();
const apiInstance = new V1PlayerAccountsApi(configuration);

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

No authorization required

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

# **removeAccountFromPlayer**
> PlayerDto removeAccountFromPlayer()


### Example

```typescript
import {
    V1PlayerAccountsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new V1PlayerAccountsApi(configuration);

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

No authorization required

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

