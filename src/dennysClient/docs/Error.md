# ModelError


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**code** | **number** |  | [default to undefined]
**message** | **string** |  | [default to undefined]
**reason** | **string** | Identifies which conflict a &#x60;409&#x60; is, where a client needs to tell them apart. &#x60;CODE_LIMIT&#x60;: the per-game tournament code limit.  | [optional] [default to undefined]

## Example

```typescript
import { ModelError } from './api';

const instance: ModelError = {
    code,
    message,
    reason,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
