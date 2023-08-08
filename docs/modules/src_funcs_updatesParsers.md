[@kamuridesu/whatframework](../README.md) / [Modules](../modules.md) / src/funcs/updatesParsers

# Module: src/funcs/updatesParsers

## Table of contents

### Functions

- [pollParser](src_funcs_updatesParsers.md#pollparser)

## Functions

### pollParser

▸ **pollParser**(`key`, `pollUpdates`, `bot`): `Promise`<[`PollVoteAggragation`](../interfaces/src_types_pollData.PollVoteAggragation.md) \| `undefined`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `IMessageKey` |
| `pollUpdates` | `Pick`<`IWebMessageInfo`, ``"message"`` \| ``"pollUpdates"``\> |
| `bot` | [`Bot`](../interfaces/src_types_bot.Bot.md) |

#### Returns

`Promise`<[`PollVoteAggragation`](../interfaces/src_types_pollData.PollVoteAggragation.md) \| `undefined`\>

#### Defined in

[src/funcs/updatesParsers.ts:10](https://github.com/kamuridesu/WhatFramework/blob/01ee173/src/funcs/updatesParsers.ts#L10)
