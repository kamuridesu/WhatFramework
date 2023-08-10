[@kamuridesu/whatframework](../README.md) / [Modules](../modules.md) / src/funcs/updatesParsers

# Module: src/funcs/updatesParsers

## Table of contents

### Functions

- [pollParser](src_funcs_updatesParsers.md#pollparser)

## Functions

### pollParser

▸ **pollParser**(`key`, `pollUpdates`, `bot`): `Promise`<[`PollVoteAggragation`](../interfaces/src_interfaces_pollData.PollVoteAggragation.md) \| `undefined`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `IMessageKey` |
| `pollUpdates` | `Pick`<`IWebMessageInfo`, ``"message"`` \| ``"pollUpdates"``\> |
| `bot` | [`IBot`](../interfaces/src_interfaces_bot.IBot.md) |

#### Returns

`Promise`<[`PollVoteAggragation`](../interfaces/src_interfaces_pollData.PollVoteAggragation.md) \| `undefined`\>

#### Defined in

[src/funcs/updatesParsers.ts:10](https://github.com/kamuridesu/WhatFramework/blob/2f7579d/src/funcs/updatesParsers.ts#L10)
