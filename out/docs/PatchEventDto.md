# PatchEventDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **string** | Event name | [optional] [default to undefined]
**description** | **string** |  | [optional] [default to undefined]
**startDate** | **string** |  | [optional] [default to undefined]
**endDate** | **string** |  | [optional] [default to undefined]
**status** | [**EventStatus**](EventStatus.md) | The new event status. | [optional] [default to undefined]

## Example

```typescript
import { PatchEventDto } from './api';

const instance: PatchEventDto = {
    name,
    description,
    startDate,
    endDate,
    status,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
