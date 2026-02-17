# EventDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **number** |  | [default to undefined]
**name** | **string** | Event name | [default to undefined]
**description** | **string** |  | [default to undefined]
**createdAt** | **string** |  | [default to undefined]
**startDate** | **string** |  | [default to undefined]
**endDate** | **string** |  | [default to undefined]
**status** | [**EventStatus**](EventStatus.md) | The current event status. | [default to undefined]
**eventGroupId** | **number** |  | [default to undefined]

## Example

```typescript
import { EventDto } from './api';

const instance: EventDto = {
    id,
    name,
    description,
    createdAt,
    startDate,
    endDate,
    status,
    eventGroupId,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
