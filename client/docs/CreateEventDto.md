# CreateEventDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**name** | **string** |  | [default to undefined]
**description** | **string** | Describe the event! | [optional] [default to undefined]
**startDate** | **string** |  | [default to undefined]
**endDate** | **string** |  | [default to undefined]
**status** | [**EventStatus**](EventStatus.md) | The intended starting status of the event. | [default to undefined]

## Example

```typescript
import { CreateEventDto } from './api';

const instance: CreateEventDto = {
    name,
    description,
    startDate,
    endDate,
    status,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
