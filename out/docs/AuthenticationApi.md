# AuthenticationApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createToken**](#createtoken) | **POST** /createToken | |
|[**login**](#login) | **POST** /login | Start a session with username/password.|
|[**logout**](#logout) | **POST** /logout | |

# **createToken**
> string createToken()

Create an API token for the currently logged-in user.

### Example

```typescript
import {
    AuthenticationApi,
    Configuration,
    CreateTokenDto
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthenticationApi(configuration);

let createTokenDto: CreateTokenDto; //Token parameters. (optional)

const { status, data } = await apiInstance.createToken(
    createTokenDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createTokenDto** | **CreateTokenDto**| Token parameters. | |


### Return type

**string**

### Authorization

[cookieAuth](../README.md#cookieAuth)

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: text/plain, application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Successfully created token. |  -  |
|**401** | Failed to authenticate. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **login**
> login()


### Example

```typescript
import {
    AuthenticationApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthenticationApi(configuration);

let username: string; // (default to undefined)
let password: string; // (default to undefined)

const { status, data } = await apiInstance.login(
    username,
    password
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **username** | [**string**] |  | defaults to undefined|
| **password** | [**string**] |  | defaults to undefined|


### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/x-www-form-urlencoded
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Successfully authenticated. The session identifier is returned in a cookie named &#x60;user-session&#x60;. This cookie must be included in subsequent requests.  |  * Set-Cookie -  <br>  |
|**401** | Failed to authenticate |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **logout**
> logout()

Removes the currently active session.

### Example

```typescript
import {
    AuthenticationApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthenticationApi(configuration);

const { status, data } = await apiInstance.logout();
```

### Parameters
This endpoint does not have any parameters.


### Return type

void (empty response body)

### Authorization

[cookieAuth](../README.md#cookieAuth)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successfully deleted active session. |  -  |
|**401** | Failed to authenticate, no active session found. |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

