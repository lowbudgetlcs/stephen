# RefreshSeriesDto

Identifies the one tournament code to re-check against Riot. Exactly one of these must be set — unlike `ReportResultDto`, omitting both is a 422 rather than a codeless game. 

## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**tournamentCodeId** | **number** | Denny\&#39;s id for the code. Mutually exclusive with &#x60;shortcode&#x60;. | [optional] [default to undefined]
**shortcode** | **string** | The Riot tournament code itself. Mutually exclusive with &#x60;tournamentCodeId&#x60;.  | [optional] [default to undefined]

## Example

```typescript
import { RefreshSeriesDto } from './api';

const instance: RefreshSeriesDto = {
    tournamentCodeId,
    shortcode,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
