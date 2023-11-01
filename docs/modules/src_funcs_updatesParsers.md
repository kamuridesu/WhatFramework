[@kamuridesu/whatframework](../README.md) / [Modules](../modules.md) / src/funcs/updatesParsers

# Module: src/funcs/updatesParsers

## Table of contents

### Functions

- [pollParser](src_funcs_updatesParsers.md#pollparser)

## Functions

### pollParser

▸ **pollParser**(`key`, `pollUpdates`, `bot`): `Promise`<[`PollVoteAggragation`](../interfaces/src__types_pollData.PollVoteAggragation.md) \| `undefined`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `IMessageKey` |
| `pollUpdates` | `Pick`<`IWebMessageInfo`, ``"message"`` \| ``"pollUpdates"``\> |
| `bot` | [`IBot`](../interfaces/src__types_bot.IBot.md) |

#### Returns

`Promise`<[`PollVoteAggragation`](../interfaces/src__types_pollData.PollVoteAggragation.md) \| `undefined`\>

#### Defined in

[src/funcs/updatesParsers.ts:9](https://github.com/kamuridesu/WhatFramework/blob/9b80f30/src/funcs/updatesParsers.ts#L9)
