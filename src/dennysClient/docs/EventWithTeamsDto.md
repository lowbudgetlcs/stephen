# EventWithTeamsDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **number** |  | [default to undefined]
**name** | **string** |  | [default to undefined]
**description** | **string** |  | [default to undefined]
**createdAt** | **string** |  | [default to undefined]
**startDate** | **string** |  | [default to undefined]
**endDate** | **string** |  | [default to undefined]
**status** | [**EventStatus**](EventStatus.md) | The current event status. | [default to undefined]
**eventGroupId** | **number** |  | [default to undefined]
**teams** | [**Array&lt;TeamDto&gt;**](TeamDto.md) |  | [default to undefined]

## Example

```typescript
import { EventWithTeamsDto } from './api';

const instance: EventWithTeamsDto = {
    id,
    name,
    description,
    createdAt,
    startDate,
    endDate,
    status,
    eventGroupId,
    teams,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
