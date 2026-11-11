# PatchSeriesDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**status** | [**SeriesStatus**](SeriesStatus.md) |  | [default to undefined]
**winnerTeamId** | **number** | Only with &#x60;status&#x60; &#x60;COMPLETE&#x60;. The loser is derived. | [optional] [default to undefined]
**doubleLoss** | **boolean** | Only with &#x60;status&#x60; &#x60;COMPLETE&#x60;, and never with &#x60;winnerTeamId&#x60;. | [optional] [default to false]

## Example

```typescript
import { PatchSeriesDto } from './api';

const instance: PatchSeriesDto = {
    status,
    winnerTeamId,
    doubleLoss,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
