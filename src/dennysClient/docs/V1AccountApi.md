# V1AccountApi

All URIs are relative to */api*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createRiotAccountDto**](#createriotaccountdto) | **POST** /v1/account | Create a new Riot account|
|[**getAllRiotAccounts**](#getallriotaccounts) | **GET** /v1/account | Get all Riot accounts|
|[**getRiotAccountDtoById**](#getriotaccountdtobyid) | **GET** /v1/account/{accountId} | Get Riot account by ID|

# **createRiotAccountDto**
> RiotAccountDto createRiotAccountDto(newRiotAccountDto)


### Example

```typescript
import {
    V1AccountApi,
    Configuration,
    NewRiotAccountDto
} from './api';

const configuration = new Configuration();
const apiInstance = new V1AccountApi(configuration);

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

No authorization required

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
    V1AccountApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new V1AccountApi(configuration);

const { status, data } = await apiInstance.getAllRiotAccounts();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<RiotAccountDto>**

### Authorization

No authorization required

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
    V1AccountApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new V1AccountApi(configuration);

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

No authorization required

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

