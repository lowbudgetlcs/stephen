# SeriesWithGamesDto

A series together with every tournament code issued for it and every game actually played. Codes issued is `tournamentCodes.length`; games played is `games.length`. The two differ whenever a code was issued but never played. 

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **number** |  | [default to undefined]
**eventId** | **number** |  | [optional] [default to undefined]
**teamIds** | **Array&lt;number&gt;** |  | [default to undefined]
**totalGames** | **number** |  | [default to undefined]
**eventStage** | [**EventStage**](EventStage.md) | The stage of the event this series belongs to. | [default to undefined]
**status** | [**SeriesStatus**](SeriesStatus.md) |  | [default to undefined]
**winnerTeamId** | **number** | The winner, when a result is recorded. Null on a double loss. | [optional] [default to undefined]
**doubleLoss** | **boolean** | A loss for both teams with no winner (rulebook §5.5.2). | [optional] [default to undefined]
**tournamentCodes** | [**Array&lt;TournamentCodeDto&gt;**](TournamentCodeDto.md) |  | [default to undefined]
**games** | [**Array&lt;GameDto&gt;**](GameDto.md) |  | [default to undefined]
**lastCodeIssuedAt** | **string** | Timestamp of the most recently issued tournament code. | [optional] [default to undefined]
**lastGameAt** | **string** | Timestamp of the most recently recorded game. Clients use this together with &#x60;lastCodeIssuedAt&#x60; to nag on an unreported game.  | [optional] [default to undefined]

## Example

```typescript
import { SeriesWithGamesDto } from './api';

const instance: SeriesWithGamesDto = {
    id,
    eventId,
    teamIds,
    totalGames,
    eventStage,
    status,
    winnerTeamId,
    doubleLoss,
    tournamentCodes,
    games,
    lastCodeIssuedAt,
    lastGameAt,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
