# AccountsV1Api

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createRiotAccountDto**](#createriotaccountdto) | **POST** /api/v1/account | Create a new Riot account|
|[**getAllRiotAccounts**](#getallriotaccounts) | **GET** /api/v1/account | Get all Riot accounts|
|[**getRiotAccountDtoById**](#getriotaccountdtobyid) | **GET** /api/v1/account/{accountId} | Get Riot account by ID|

# **createRiotAccountDto**
> RiotAccountDto createRiotAccountDto(newRiotAccountDto)


### Example

```typescript
import {
    AccountsV1Api,
    Configuration,
    NewRiotAccountDto
} from './api';

const configuration = new Configuration();
const apiInstance = new AccountsV1Api(configuration);

let newRiotAccountDto: NewRiotAccountDto; //

const { status, data } = await apiInstance.createRiotAccountDto(
    newRiotAccountDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **newRiotAccountDto** | **NewRiotAccountDto**|  | |


### Return type

**RiotAccountDto**

### Authorization

[cookieAuth](../README.md#cookieAuth), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Riot account created |  -  |
|**400** | Invalid PUUID format |  -  |
|**404** | Riot account not found from Riot API |  -  |
|**409** | Riot account already exists |  -  |
|**0** | Unexpected error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getAllRiotAccounts**
> Array<RiotAccountDto> getAllRiotAccounts()


### Example

```typescript
import {
    AccountsV1Api,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AccountsV1Api(configuration);

const { status, data } = await apiInstance.getAllRiotAccounts();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<RiotAccountDto>**

### Authorization

[cookieAuth](../README.md#cookieAuth), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | List of all Riot accounts |  -  |
|**0** | Unexpected error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getRiotAccountDtoById**
> RiotAccountDto getRiotAccountDtoById()


### Example

```typescript
import {
    AccountsV1Api,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AccountsV1Api(configuration);

let accountId: number; //Internal database ID of the Riot account (default to undefined)

const { status, data } = await apiInstance.getRiotAccountDtoById(
    accountId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **accountId** | [**number**] | Internal database ID of the Riot account | defaults to undefined|


### Return type

**RiotAccountDto**

### Authorization

[cookieAuth](../README.md#cookieAuth), [bearerAuth](../README.md#bearerAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Riot account found |  -  |
|**404** | Riot account not found |  -  |
|**0** | Unexpected error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

