[@kamuridesu/whatframework](../README.md) / [Modules](../modules.md) / [src/@types/bot](../modules/src__types_bot.md) / EntryPoint

# Interface: EntryPoint

[src/@types/bot](../modules/src__types_bot.md).EntryPoint

## Table of contents

### Properties

- [botNumber](src__types_bot.EntryPoint.md#botnumber)
- [chatHandlers](src__types_bot.EntryPoint.md#chathandlers)
- [commandHandlers](src__types_bot.EntryPoint.md#commandhandlers)
- [commandsFilename](src__types_bot.EntryPoint.md#commandsfilename)
- [language](src__types_bot.EntryPoint.md#language)
- [name](src__types_bot.EntryPoint.md#name)
- [ownerNumber](src__types_bot.EntryPoint.md#ownernumber)
- [prefix](src__types_bot.EntryPoint.md#prefix)

## Properties

### botNumber

• **botNumber**: `string`

#### Defined in

[src/@types/bot.d.ts:26](https://github.com/kamuridesu/WhatFramework/blob/9b80f30/src/@types/bot.d.ts#L26)

___

### chatHandlers

• **chatHandlers**: (`ctx`: [`IBot`](src__types_bot.IBot.md), `messageBody`: `string`, `messageData`: [`IMessageData`](src__types_messageData.IMessageData.md), `groupData`: `undefined` \| [`GroupData`](../classes/src_data_groupData.GroupData.md), `chatMetadata`: [`ChatMetadata`](../classes/src_data_chatMetadata.ChatMetadata.md)) => `void`

#### Type declaration

▸ (`ctx`, `messageBody`, `messageData`, `groupData`, `chatMetadata`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`IBot`](src__types_bot.IBot.md) |
| `messageBody` | `string` |
| `messageData` | [`IMessageData`](src__types_messageData.IMessageData.md) |
| `groupData` | `undefined` \| [`GroupData`](../classes/src_data_groupData.GroupData.md) |
| `chatMetadata` | [`ChatMetadata`](../classes/src_data_chatMetadata.ChatMetadata.md) |

##### Returns

`void`

#### Defined in

[src/@types/bot.d.ts:36](https://github.com/kamuridesu/WhatFramework/blob/9b80f30/src/@types/bot.d.ts#L36)

___

### commandHandlers

• **commandHandlers**: (`ctx`: [`IBot`](src__types_bot.IBot.md), `command`: `string`, `args`: `string`[], `messageData`: [`IMessageData`](src__types_messageData.IMessageData.md), `groupData`: `undefined` \| [`GroupData`](../classes/src_data_groupData.GroupData.md), `chatMetadata`: [`ChatMetadata`](../classes/src_data_chatMetadata.ChatMetadata.md)) => `void`

#### Type declaration

▸ (`ctx`, `command`, `args`, `messageData`, `groupData`, `chatMetadata`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`IBot`](src__types_bot.IBot.md) |
| `command` | `string` |
| `args` | `string`[] |
| `messageData` | [`IMessageData`](src__types_messageData.IMessageData.md) |
| `groupData` | `undefined` \| [`GroupData`](../classes/src_data_groupData.GroupData.md) |
| `chatMetadata` | [`ChatMetadata`](../classes/src_data_chatMetadata.ChatMetadata.md) |

##### Returns

`void`

#### Defined in

[src/@types/bot.d.ts:30](https://github.com/kamuridesu/WhatFramework/blob/9b80f30/src/@types/bot.d.ts#L30)

___

### commandsFilename

• **commandsFilename**: `undefined` \| `string`

#### Defined in

[src/@types/bot.d.ts:29](https://github.com/kamuridesu/WhatFramework/blob/9b80f30/src/@types/bot.d.ts#L29)

___

### language

• **language**: `undefined` \| `string`

#### Defined in

[src/@types/bot.d.ts:28](https://github.com/kamuridesu/WhatFramework/blob/9b80f30/src/@types/bot.d.ts#L28)

___

### name

• **name**: `string`

#### Defined in

[src/@types/bot.d.ts:24](https://github.com/kamuridesu/WhatFramework/blob/9b80f30/src/@types/bot.d.ts#L24)

___

### ownerNumber

• **ownerNumber**: `string`

#### Defined in

[src/@types/bot.d.ts:27](https://github.com/kamuridesu/WhatFramework/blob/9b80f30/src/@types/bot.d.ts#L27)

___

### prefix

• **prefix**: `string`

#### Defined in

[src/@types/bot.d.ts:25](https://github.com/kamuridesu/WhatFramework/blob/9b80f30/src/@types/bot.d.ts#L25)
