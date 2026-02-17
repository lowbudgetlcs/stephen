# V1EventGroupApi

All URIs are relative to */api*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createEventGroup**](#createeventgroup) | **POST** /v1/eventGroup | Create a new event group|
|[**getEventGroupById**](#geteventgroupbyid) | **GET** /v1/eventGroup/{eventGroupId} | Get an event group by ID|
|[**getEventGroups**](#geteventgroups) | **GET** /v1/eventGroup | Get all event groups|
|[**patchEventGroup**](#patcheventgroup) | **PATCH** /v1/eventGroup/{eventGroupId} | Patch an event group\&#39;s data|

# **createEventGroup**
> EventGroupDto createEventGroup(createEventGroupDto)


### Example

```typescript
import {
    V1EventGroupApi,
    Configuration,
    CreateEventGroupDto
} from './api';

const configuration = new Configuration();
const apiInstance = new V1EventGroupApi(configuration);

let createEventGroupDto: CreateEventGroupDto; //Event group specification

const { status, data } = await apiInstance.createEventGroup(
    createEventGroupDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createEventGroupDto** | **CreateEventGroupDto**| Event group specification | |


### Return type

**EventGroupDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful operation |  -  |
|**400** | Invalid input |  -  |
|**409** | Invalid resource state  Possible reasons: - One of the events in eventIds is already in another event group.  |  -  |
|**422** | Validation exception |  -  |
|**0** | Unexpected error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getEventGroupById**
> EventGroupDto getEventGroupById()


### Example

```typescript
import {
    V1EventGroupApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new V1EventGroupApi(configuration);

let eventGroupId: number; //ID of the event group to retrieve (default to undefined)

const { status, data } = await apiInstance.getEventGroupById(
    eventGroupId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **eventGroupId** | [**number**] | ID of the event group to retrieve | defaults to undefined|


### Return type

**EventGroupDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Event group found |  -  |
|**404** | Event group not found |  -  |
|**0** | Unexpected error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getEventGroups**
> Array<EventGroupDto> getEventGroups()


### Example

```typescript
import {
    V1EventGroupApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new V1EventGroupApi(configuration);

const { status, data } = await apiInstance.getEventGroups();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Array<EventGroupDto>**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful operation |  -  |
|**0** | Unexpected error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **patchEventGroup**
> EventGroupDto patchEventGroup(patchEventGroupDto)


### Example

```typescript
import {
    V1EventGroupApi,
    Configuration,
    PatchEventGroupDto
} from './api';

const configuration = new Configuration();
const apiInstance = new V1EventGroupApi(configuration);

let eventGroupId: number; //ID of the event group to update (default to undefined)
let patchEventGroupDto: PatchEventGroupDto; //Fields to update on the event group

const { status, data } = await apiInstance.patchEventGroup(
    eventGroupId,
    patchEventGroupDto
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **patchEventGroupDto** | **PatchEventGroupDto**| Fields to update on the event group | |
| **eventGroupId** | [**number**] | ID of the event group to update | defaults to undefined|


### Return type

**EventGroupDto**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Event group updated |  -  |
|**400** | Invalid input |  -  |
|**404** | Event group not found |  -  |
|**0** | Unexpected error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

