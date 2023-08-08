[@kamuridesu/whatframework](../README.md) / [Modules](../modules.md) / [src/types/bot](../modules/src_types_bot.md) / EntryPoint

# Interface: EntryPoint

[src/types/bot](../modules/src_types_bot.md).EntryPoint

## Table of contents

### Properties

- [botName](src_types_bot.EntryPoint.md#botname)
- [botNumber](src_types_bot.EntryPoint.md#botnumber)
- [chatHandlers](src_types_bot.EntryPoint.md#chathandlers)
- [commandHandlers](src_types_bot.EntryPoint.md#commandhandlers)
- [commandsFilename](src_types_bot.EntryPoint.md#commandsfilename)
- [language](src_types_bot.EntryPoint.md#language)
- [ownerNumber](src_types_bot.EntryPoint.md#ownernumber)
- [prefix](src_types_bot.EntryPoint.md#prefix)

## Properties

### botName

• **botName**: `string`

#### Defined in

[src/types/bot.ts:24](https://github.com/kamuridesu/WhatFramework/blob/01ee173/src/types/bot.ts#L24)

___

### botNumber

• **botNumber**: `string`

#### Defined in

[src/types/bot.ts:26](https://github.com/kamuridesu/WhatFramework/blob/01ee173/src/types/bot.ts#L26)

___

### chatHandlers

• **chatHandlers**: (`ctx`: [`Bot`](src_types_bot.Bot.md), `messageBody`: `string`, `messageData`: [`MessageData`](../classes/src_types_messageData.MessageData.md), `groupData`: `undefined` \| [`GroupData`](../classes/src_types_groupData.GroupData.md), `chatMetadata`: [`ChatMetadata`](../classes/src_types_chatMetadata.ChatMetadata.md)) => `void`

#### Type declaration

▸ (`ctx`, `messageBody`, `messageData`, `groupData`, `chatMetadata`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`Bot`](src_types_bot.Bot.md) |
| `messageBody` | `string` |
| `messageData` | [`MessageData`](../classes/src_types_messageData.MessageData.md) |
| `groupData` | `undefined` \| [`GroupData`](../classes/src_types_groupData.GroupData.md) |
| `chatMetadata` | [`ChatMetadata`](../classes/src_types_chatMetadata.ChatMetadata.md) |

##### Returns

`void`

#### Defined in

[src/types/bot.ts:36](https://github.com/kamuridesu/WhatFramework/blob/01ee173/src/types/bot.ts#L36)

___

### commandHandlers

• **commandHandlers**: (`ctx`: [`Bot`](src_types_bot.Bot.md), `command`: `string`, `args`: `string`[], `messageData`: [`MessageData`](../classes/src_types_messageData.MessageData.md), `groupData`: `undefined` \| [`GroupData`](../classes/src_types_groupData.GroupData.md), `chatMetadata`: [`ChatMetadata`](../classes/src_types_chatMetadata.ChatMetadata.md)) => `void`

#### Type declaration

▸ (`ctx`, `command`, `args`, `messageData`, `groupData`, `chatMetadata`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`Bot`](src_types_bot.Bot.md) |
| `command` | `string` |
| `args` | `string`[] |
| `messageData` | [`MessageData`](../classes/src_types_messageData.MessageData.md) |
| `groupData` | `undefined` \| [`GroupData`](../classes/src_types_groupData.GroupData.md) |
| `chatMetadata` | [`ChatMetadata`](../classes/src_types_chatMetadata.ChatMetadata.md) |

##### Returns

`void`

#### Defined in

[src/types/bot.ts:30](https://github.com/kamuridesu/WhatFramework/blob/01ee173/src/types/bot.ts#L30)

___

### commandsFilename

• **commandsFilename**: `undefined` \| `string`

#### Defined in

[src/types/bot.ts:29](https://github.com/kamuridesu/WhatFramework/blob/01ee173/src/types/bot.ts#L29)

___

### language

• **language**: `undefined` \| `string`

#### Defined in

[src/types/bot.ts:28](https://github.com/kamuridesu/WhatFramework/blob/01ee173/src/types/bot.ts#L28)

___

### ownerNumber

• **ownerNumber**: `string`

#### Defined in

[src/types/bot.ts:27](https://github.com/kamuridesu/WhatFramework/blob/01ee173/src/types/bot.ts#L27)

___

### prefix

• **prefix**: `string`

#### Defined in

[src/types/bot.ts:25](https://github.com/kamuridesu/WhatFramework/blob/01ee173/src/types/bot.ts#L25)
