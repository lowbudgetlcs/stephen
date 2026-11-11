# CreateGameDto


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**blueTeamId** | **number** |  | [default to undefined]
**redTeamId** | **number** |  | [default to undefined]
**newCode** | **boolean** | Issue a new code even if one is already open for the current game. Still subject to the per-game limit.  | [optional] [default to false]

## Example

```typescript
import { CreateGameDto } from './api';

const instance: CreateGameDto = {
    blueTeamId,
    redTeamId,
    newCode,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
