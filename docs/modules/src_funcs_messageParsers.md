[@kamuridesu/whatframework](../README.md) / [Modules](../modules.md) / src/funcs/messageParsers

# Module: src/funcs/messageParsers

## Table of contents

### Functions

- [checkChatMetaData](src_funcs_messageParsers.md#checkchatmetadata)
- [checkGroupData](src_funcs_messageParsers.md#checkgroupdata)
- [checkMessageData](src_funcs_messageParsers.md#checkmessagedata)
- [convertNumberToMention](src_funcs_messageParsers.md#convertnumbertomention)

## Functions

### checkChatMetaData

▸ **checkChatMetaData**(`messageData`, `ctx`): [`ChatMetadata`](../classes/src_types_chatMetadata.ChatMetadata.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `messageData` | [`MessageData`](../classes/src_types_messageData.MessageData.md) |
| `ctx` | [`Bot`](../classes/src_modules_bot.Bot.md) |

#### Returns

[`ChatMetadata`](../classes/src_types_chatMetadata.ChatMetadata.md)

#### Defined in

[src/funcs/messageParsers.ts:93](https://github.com/kamuridesu/WhatFramework/blob/9d3db65/src/funcs/messageParsers.ts#L93)

___

### checkGroupData

▸ **checkGroupData**(`messageData`, `chatMetadata`, `ctx`): `Promise`<[`GroupData`](../classes/src_types_groupData.GroupData.md) \| `undefined`\>

This function has a caching mechanism that saves the group metadata into the bot instance and invalidates it after 10s

#### Parameters

| Name | Type |
| :------ | :------ |
| `messageData` | [`MessageData`](../classes/src_types_messageData.MessageData.md) |
| `chatMetadata` | [`ChatMetadata`](../classes/src_types_chatMetadata.ChatMetadata.md) |
| `ctx` | [`Bot`](../classes/src_modules_bot.Bot.md) |

#### Returns

`Promise`<[`GroupData`](../classes/src_types_groupData.GroupData.md) \| `undefined`\>

#### Defined in

[src/funcs/messageParsers.ts:67](https://github.com/kamuridesu/WhatFramework/blob/9d3db65/src/funcs/messageParsers.ts#L67)

___

### checkMessageData

▸ **checkMessageData**(`message`, `bot`): [`MessageData`](../classes/src_types_messageData.MessageData.md) \| `undefined`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `IWebMessageInfo` |
| `bot` | [`Bot`](../classes/src_modules_bot.Bot.md) |

#### Returns

[`MessageData`](../classes/src_types_messageData.MessageData.md) \| `undefined`

#### Defined in

[src/funcs/messageParsers.ts:17](https://github.com/kamuridesu/WhatFramework/blob/9d3db65/src/funcs/messageParsers.ts#L17)

___

### convertNumberToMention

▸ **convertNumberToMention**(`text`): `string`[] \| `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `text` | `string` |

#### Returns

`string`[] \| `string`

#### Defined in

[src/funcs/messageParsers.ts:106](https://github.com/kamuridesu/WhatFramework/blob/9d3db65/src/funcs/messageParsers.ts#L106)
