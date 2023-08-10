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

▸ **checkChatMetaData**(`messageData`, `ctx`): [`IChatMetadata`](../interfaces/src_interfaces_chatMetadata.IChatMetadata.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `messageData` | [`IMessageData`](../interfaces/src_interfaces_messageData.IMessageData.md) |
| `ctx` | [`IBot`](../interfaces/src_interfaces_bot.IBot.md) |

#### Returns

[`IChatMetadata`](../interfaces/src_interfaces_chatMetadata.IChatMetadata.md)

#### Defined in

[src/funcs/messageParsers.ts:93](https://github.com/kamuridesu/WhatFramework/blob/2f7579d/src/funcs/messageParsers.ts#L93)

___

### checkGroupData

▸ **checkGroupData**(`messageData`, `chatMetadata`, `ctx`): `Promise`<[`IGroupData`](../interfaces/src_interfaces_groupData.IGroupData.md) \| `undefined`\>

This function has a caching mechanism that saves the group metadata into the bot instance and invalidates it after 10s

#### Parameters

| Name | Type |
| :------ | :------ |
| `messageData` | [`IMessageData`](../interfaces/src_interfaces_messageData.IMessageData.md) |
| `chatMetadata` | [`IChatMetadata`](../interfaces/src_interfaces_chatMetadata.IChatMetadata.md) |
| `ctx` | [`IBot`](../interfaces/src_interfaces_bot.IBot.md) |

#### Returns

`Promise`<[`IGroupData`](../interfaces/src_interfaces_groupData.IGroupData.md) \| `undefined`\>

#### Defined in

[src/funcs/messageParsers.ts:67](https://github.com/kamuridesu/WhatFramework/blob/2f7579d/src/funcs/messageParsers.ts#L67)

___

### checkMessageData

▸ **checkMessageData**(`message`, `bot`): [`IMessageData`](../interfaces/src_interfaces_messageData.IMessageData.md) \| `undefined`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `IWebMessageInfo` |
| `bot` | [`IBot`](../interfaces/src_interfaces_bot.IBot.md) |

#### Returns

[`IMessageData`](../interfaces/src_interfaces_messageData.IMessageData.md) \| `undefined`

#### Defined in

[src/funcs/messageParsers.ts:17](https://github.com/kamuridesu/WhatFramework/blob/2f7579d/src/funcs/messageParsers.ts#L17)

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

[src/funcs/messageParsers.ts:106](https://github.com/kamuridesu/WhatFramework/blob/2f7579d/src/funcs/messageParsers.ts#L106)
