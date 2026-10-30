# GameDto

A game that was actually played. `tournamentCodeId` and `riotMatchId` are null for a custom game played without a code — Riot cannot serve custom match data, so those are recorded from a self-reported result. `number` is derived as one past the highest number in the series, so a code that is never played does not consume a game number. 

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **number** |  | [default to undefined]
**seriesId** | **number** |  | [default to undefined]
**tournamentCodeId** | **number** | Null when the game was played without a tournament code. | [optional] [default to undefined]
**riotMatchId** | **string** | &#x60;{platformId}_{gameId}&#x60;. Null when there is no Riot record. | [optional] [default to undefined]
**number** | **number** | Position within the series. | [default to undefined]
**createdAt** | **string** |  | [default to undefined]
**result** | [**GameResultDto**](GameResultDto.md) | Null until a result has been recorded. | [optional] [default to undefined]

## Example

```typescript
import { GameDto } from './api';

const instance: GameDto = {
    id,
    seriesId,
    tournamentCodeId,
    riotMatchId,
    number,
    createdAt,
    result,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
