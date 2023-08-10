[@kamuridesu/whatframework](../README.md) / [Modules](../modules.md) / [src/interfaces/bot](../modules/src_interfaces_bot.md) / EntryPoint

# Interface: EntryPoint

[src/interfaces/bot](../modules/src_interfaces_bot.md).EntryPoint

## Table of contents

### Properties

- [botName](src_interfaces_bot.EntryPoint.md#botname)
- [botNumber](src_interfaces_bot.EntryPoint.md#botnumber)
- [chatHandlers](src_interfaces_bot.EntryPoint.md#chathandlers)
- [commandHandlers](src_interfaces_bot.EntryPoint.md#commandhandlers)
- [commandsFilename](src_interfaces_bot.EntryPoint.md#commandsfilename)
- [language](src_interfaces_bot.EntryPoint.md#language)
- [ownerNumber](src_interfaces_bot.EntryPoint.md#ownernumber)
- [prefix](src_interfaces_bot.EntryPoint.md#prefix)

## Properties

### botName

• **botName**: `string`

#### Defined in

[src/interfaces/bot.ts:24](https://github.com/kamuridesu/WhatFramework/blob/2f7579d/src/interfaces/bot.ts#L24)

___

### botNumber

• **botNumber**: `string`

#### Defined in

[src/interfaces/bot.ts:26](https://github.com/kamuridesu/WhatFramework/blob/2f7579d/src/interfaces/bot.ts#L26)

___

### chatHandlers

• **chatHandlers**: (`ctx`: [`IBot`](src_interfaces_bot.IBot.md), `messageBody`: `string`, `messageData`: [`IMessageData`](src_interfaces_messageData.IMessageData.md), `groupData`: `undefined` \| [`GroupData`](../classes/src_data_groupData.GroupData.md), `chatMetadata`: [`ChatMetadata`](../classes/src_data_chatMetadata.ChatMetadata.md)) => `void`

#### Type declaration

▸ (`ctx`, `messageBody`, `messageData`, `groupData`, `chatMetadata`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`IBot`](src_interfaces_bot.IBot.md) |
| `messageBody` | `string` |
| `messageData` | [`IMessageData`](src_interfaces_messageData.IMessageData.md) |
| `groupData` | `undefined` \| [`GroupData`](../classes/src_data_groupData.GroupData.md) |
| `chatMetadata` | [`ChatMetadata`](../classes/src_data_chatMetadata.ChatMetadata.md) |

##### Returns

`void`

#### Defined in

[src/interfaces/bot.ts:36](https://github.com/kamuridesu/WhatFramework/blob/2f7579d/src/interfaces/bot.ts#L36)

___

### commandHandlers

• **commandHandlers**: (`ctx`: [`IBot`](src_interfaces_bot.IBot.md), `command`: `string`, `args`: `string`[], `messageData`: [`IMessageData`](src_interfaces_messageData.IMessageData.md), `groupData`: `undefined` \| [`GroupData`](../classes/src_data_groupData.GroupData.md), `chatMetadata`: [`ChatMetadata`](../classes/src_data_chatMetadata.ChatMetadata.md)) => `void`

#### Type declaration

▸ (`ctx`, `command`, `args`, `messageData`, `groupData`, `chatMetadata`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`IBot`](src_interfaces_bot.IBot.md) |
| `command` | `string` |
| `args` | `string`[] |
| `messageData` | [`IMessageData`](src_interfaces_messageData.IMessageData.md) |
| `groupData` | `undefined` \| [`GroupData`](../classes/src_data_groupData.GroupData.md) |
| `chatMetadata` | [`ChatMetadata`](../classes/src_data_chatMetadata.ChatMetadata.md) |

##### Returns

`void`

#### Defined in

[src/interfaces/bot.ts:30](https://github.com/kamuridesu/WhatFramework/blob/2f7579d/src/interfaces/bot.ts#L30)

___

### commandsFilename

• **commandsFilename**: `undefined` \| `string`

#### Defined in

[src/interfaces/bot.ts:29](https://github.com/kamuridesu/WhatFramework/blob/2f7579d/src/interfaces/bot.ts#L29)

___

### language

• **language**: `undefined` \| `string`

#### Defined in

[src/interfaces/bot.ts:28](https://github.com/kamuridesu/WhatFramework/blob/2f7579d/src/interfaces/bot.ts#L28)

___

### ownerNumber

• **ownerNumber**: `string`

#### Defined in

[src/interfaces/bot.ts:27](https://github.com/kamuridesu/WhatFramework/blob/2f7579d/src/interfaces/bot.ts#L27)

___

### prefix

• **prefix**: `string`

#### Defined in

[src/interfaces/bot.ts:25](https://github.com/kamuridesu/WhatFramework/blob/2f7579d/src/interfaces/bot.ts#L25)
