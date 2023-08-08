[@kamuridesu/whatframework](../README.md) / [Modules](../modules.md) / [src/modules/messageHandler](../modules/src_modules_messageHandler.md) / MessageHandler

# Class: MessageHandler

[src/modules/messageHandler](../modules/src_modules_messageHandler.md).MessageHandler

## Implements

- [`MessageHandler`](../interfaces/src_types_bot.MessageHandler.md)

## Table of contents

### Constructors

- [constructor](src_modules_messageHandler.MessageHandler.md#constructor)

### Properties

- [chatHandlers](src_modules_messageHandler.MessageHandler.md#chathandlers)
- [commandHandlers](src_modules_messageHandler.MessageHandler.md#commandhandlers)
- [isModule](src_modules_messageHandler.MessageHandler.md#ismodule)

### Methods

- [handle](src_modules_messageHandler.MessageHandler.md#handle)
- [handleUpdate](src_modules_messageHandler.MessageHandler.md#handleupdate)

## Constructors

### constructor

• **new MessageHandler**(`entrypoint?`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `entrypoint?` | [`EntryPoint`](../interfaces/src_types_bot.EntryPoint.md) |

#### Defined in

[src/modules/messageHandler.ts:26](https://github.com/kamuridesu/WhatFramework/blob/9d3db65/src/modules/messageHandler.ts#L26)

## Properties

### chatHandlers

• `Private` `Optional` **chatHandlers**: (`ctx`: [`Bot`](src_modules_bot.Bot.md), `messageBody`: `string`, `messageData`: [`MessageData`](src_types_messageData.MessageData.md), `groupData`: `undefined` \| [`GroupData`](src_types_groupData.GroupData.md), `chatMetadata`: [`ChatMetadata`](src_types_chatMetadata.ChatMetadata.md)) => `void`

#### Type declaration

▸ (`ctx`, `messageBody`, `messageData`, `groupData`, `chatMetadata`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`Bot`](src_modules_bot.Bot.md) |
| `messageBody` | `string` |
| `messageData` | [`MessageData`](src_types_messageData.MessageData.md) |
| `groupData` | `undefined` \| [`GroupData`](src_types_groupData.GroupData.md) |
| `chatMetadata` | [`ChatMetadata`](src_types_chatMetadata.ChatMetadata.md) |

##### Returns

`void`

#### Defined in

[src/modules/messageHandler.ts:20](https://github.com/kamuridesu/WhatFramework/blob/9d3db65/src/modules/messageHandler.ts#L20)

___

### commandHandlers

• `Private` `Optional` **commandHandlers**: (`ctx`: [`Bot`](src_modules_bot.Bot.md), `command`: `string`, `args`: `string`[], `messageData`: [`MessageData`](src_types_messageData.MessageData.md), `groupData`: `undefined` \| [`GroupData`](src_types_groupData.GroupData.md), `chatMetadata`: [`ChatMetadata`](src_types_chatMetadata.ChatMetadata.md)) => `void`

#### Type declaration

▸ (`ctx`, `command`, `args`, `messageData`, `groupData`, `chatMetadata`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`Bot`](src_modules_bot.Bot.md) |
| `command` | `string` |
| `args` | `string`[] |
| `messageData` | [`MessageData`](src_types_messageData.MessageData.md) |
| `groupData` | `undefined` \| [`GroupData`](src_types_groupData.GroupData.md) |
| `chatMetadata` | [`ChatMetadata`](src_types_chatMetadata.ChatMetadata.md) |

##### Returns

`void`

#### Defined in

[src/modules/messageHandler.ts:14](https://github.com/kamuridesu/WhatFramework/blob/9d3db65/src/modules/messageHandler.ts#L14)

___

### isModule

• `Private` **isModule**: `boolean`

#### Defined in

[src/modules/messageHandler.ts:13](https://github.com/kamuridesu/WhatFramework/blob/9d3db65/src/modules/messageHandler.ts#L13)

## Methods

### handle

▸ **handle**(`message`, `ctx`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `IWebMessageInfo` |
| `ctx` | [`Bot`](src_modules_bot.Bot.md) |

#### Returns

`Promise`<`void`\>

#### Implementation of

[MessageHandler](../interfaces/src_types_bot.MessageHandler.md).[handle](../interfaces/src_types_bot.MessageHandler.md#handle)

#### Defined in

[src/modules/messageHandler.ts:34](https://github.com/kamuridesu/WhatFramework/blob/9d3db65/src/modules/messageHandler.ts#L34)

___

### handleUpdate

▸ **handleUpdate**(`key`, `updates`, `ctx`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `IMessageKey` |
| `updates` | `Partial`<`IWebMessageInfo`\> |
| `ctx` | [`Bot`](src_modules_bot.Bot.md) |

#### Returns

`Promise`<`void`\>

#### Implementation of

[MessageHandler](../interfaces/src_types_bot.MessageHandler.md).[handleUpdate](../interfaces/src_types_bot.MessageHandler.md#handleupdate)

#### Defined in

[src/modules/messageHandler.ts:70](https://github.com/kamuridesu/WhatFramework/blob/9d3db65/src/modules/messageHandler.ts#L70)
