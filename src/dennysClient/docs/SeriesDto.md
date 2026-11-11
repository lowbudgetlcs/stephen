# SeriesDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **number** |  | [default to undefined]
**eventId** | **number** |  | [optional] [default to undefined]
**teamIds** | **Array&lt;number&gt;** |  | [default to undefined]
**totalGames** | **number** |  | [default to undefined]
**eventStage** | [**EventStage**](EventStage.md) | The stage of the event this series belongs to. | [default to undefined]
**status** | [**SeriesStatus**](SeriesStatus.md) | Denny\&#39;s moves a &#x60;NOT_STARTED&#x60; or &#x60;IN_PROGRESS&#x60; series to &#x60;COMPLETE&#x60; when recorded results give one team more than &#x60;totalGames / 2&#x60; wins. It never auto-completes a series in any other status. The first code issued or game recorded moves a &#x60;NOT_STARTED&#x60; series to &#x60;IN_PROGRESS&#x60;. Status does not gate code generation.  | [default to undefined]
**winnerTeamId** | **number** | The winner, when a result is recorded. Null on a double loss. | [optional] [default to undefined]
**doubleLoss** | **boolean** | A loss for both teams with no winner (rulebook §5.5.2). | [optional] [default to undefined]

## Example

```typescript
import { SeriesDto } from './api';

const instance: SeriesDto = {
    id,
    eventId,
    teamIds,
    totalGames,
    eventStage,
    status,
    winnerTeamId,
    doubleLoss,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
