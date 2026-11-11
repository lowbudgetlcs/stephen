# TournamentCodeDto

A tournament code issued by Riot for a series. A code may back zero games — it can be issued and never played — so codes are counted separately from games. 

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **number** |  | [default to undefined]
**shortcode** | **string** |  | [default to undefined]
**seriesId** | **number** |  | [default to undefined]
**blueTeamId** | **number** |  | [default to undefined]
**redTeamId** | **number** |  | [default to undefined]
**createdAt** | **string** |  | [default to undefined]

## Example

```typescript
import { TournamentCodeDto } from './api';

const instance: TournamentCodeDto = {
    id,
    shortcode,
    seriesId,
    blueTeamId,
    redTeamId,
    createdAt,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
