# V1SeriesGamesApi

All URIs are relative to */api*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createGame**](#creategame) | **POST** /v1/series/game | Create a game in a series|

# **createGame**
> GameDto createGame(createGameDto)


### Example

```typescript
import {
    V1SeriesGamesApi,
    Configuration,
    CreateGameDto
} from './api';

const configuration = new Configuration();
const apiInstance = new V1SeriesGamesApi(configuration);

let createGameDto: CreateGameDto; //

const { status, data } = await apiInstance.createGame(
    createGameDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createGameDto** | **CreateGameDto**|  | |


### Return type

**GameDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Game created |  -  |
|**400** | Invalid input |  -  |
|**422** | Validation exception |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

