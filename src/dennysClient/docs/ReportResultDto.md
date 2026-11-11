# ReportResultDto

Report the result of a game. Target a specific tournament code with `tournamentCodeId` **or** `shortcode`, never both. When neither is given, the game is recorded as codeless, as for a custom game. 

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**winnerTeamId** | **number** |  | [default to undefined]
**loserTeamId** | **number** |  | [optional] [default to undefined]
**tournamentCodeId** | **number** | Denny\&#39;s id for the code. Mutually exclusive with &#x60;shortcode&#x60;. | [optional] [default to undefined]
**shortcode** | **string** | The Riot tournament code itself, as it appears in the game client. Mutually exclusive with &#x60;tournamentCodeId&#x60;. Exists because a human reporting a result has the code, not a database id.  | [optional] [default to undefined]

## Example

```typescript
import { ReportResultDto } from './api';

const instance: ReportResultDto = {
    winnerTeamId,
    loserTeamId,
    tournamentCodeId,
    shortcode,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
