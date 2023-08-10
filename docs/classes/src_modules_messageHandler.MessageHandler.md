[@kamuridesu/whatframework](../README.md) / [Modules](../modules.md) / [src/modules/messageHandler](../modules/src_modules_messageHandler.md) / MessageHandler

# Class: MessageHandler

[src/modules/messageHandler](../modules/src_modules_messageHandler.md).MessageHandler

## Implements

- [`MessageHandler`](../interfaces/src_interfaces_bot.MessageHandler.md)

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
| `entrypoint?` | [`EntryPoint`](../interfaces/src_interfaces_bot.EntryPoint.md) |

#### Defined in

[src/modules/messageHandler.ts:23](https://github.com/kamuridesu/WhatFramework/blob/2f7579d/src/modules/messageHandler.ts#L23)

## Properties

### chatHandlers

• `Private` `Optional` **chatHandlers**: (`ctx`: [`Bot`](src_modules_bot.Bot.md), `messageBody`: `string`, `messageData`: [`IMessageData`](../interfaces/src_interfaces_messageData.IMessageData.md), `groupData`: `undefined` \| [`IGroupData`](../interfaces/src_interfaces_groupData.IGroupData.md), `chatMetadata`: [`IChatMetadata`](../interfaces/src_interfaces_chatMetadata.IChatMetadata.md)) => `void`

#### Type declaration

▸ (`ctx`, `messageBody`, `messageData`, `groupData`, `chatMetadata`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`Bot`](src_modules_bot.Bot.md) |
| `messageBody` | `string` |
| `messageData` | [`IMessageData`](../interfaces/src_interfaces_messageData.IMessageData.md) |
| `groupData` | `undefined` \| [`IGroupData`](../interfaces/src_interfaces_groupData.IGroupData.md) |
| `chatMetadata` | [`IChatMetadata`](../interfaces/src_interfaces_chatMetadata.IChatMetadata.md) |

##### Returns

`void`

#### Defined in

[src/modules/messageHandler.ts:17](https://github.com/kamuridesu/WhatFramework/blob/2f7579d/src/modules/messageHandler.ts#L17)

___

### commandHandlers

• `Private` `Optional` **commandHandlers**: (`ctx`: [`Bot`](src_modules_bot.Bot.md), `command`: `string`, `args`: `string`[], `messageData`: [`IMessageData`](../interfaces/src_interfaces_messageData.IMessageData.md), `groupData`: `undefined` \| [`IGroupData`](../interfaces/src_interfaces_groupData.IGroupData.md), `chatMetadata`: [`IChatMetadata`](../interfaces/src_interfaces_chatMetadata.IChatMetadata.md)) => `void`

#### Type declaration

▸ (`ctx`, `command`, `args`, `messageData`, `groupData`, `chatMetadata`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`Bot`](src_modules_bot.Bot.md) |
| `command` | `string` |
| `args` | `string`[] |
| `messageData` | [`IMessageData`](../interfaces/src_interfaces_messageData.IMessageData.md) |
| `groupData` | `undefined` \| [`IGroupData`](../interfaces/src_interfaces_groupData.IGroupData.md) |
| `chatMetadata` | [`IChatMetadata`](../interfaces/src_interfaces_chatMetadata.IChatMetadata.md) |

##### Returns

`void`

#### Defined in

[src/modules/messageHandler.ts:11](https://github.com/kamuridesu/WhatFramework/blob/2f7579d/src/modules/messageHandler.ts#L11)

___

### isModule

• `Private` **isModule**: `boolean`

#### Defined in

[src/modules/messageHandler.ts:10](https://github.com/kamuridesu/WhatFramework/blob/2f7579d/src/modules/messageHandler.ts#L10)

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

[MessageHandler](../interfaces/src_interfaces_bot.MessageHandler.md).[handle](../interfaces/src_interfaces_bot.MessageHandler.md#handle)

#### Defined in

[src/modules/messageHandler.ts:31](https://github.com/kamuridesu/WhatFramework/blob/2f7579d/src/modules/messageHandler.ts#L31)

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

[MessageHandler](../interfaces/src_interfaces_bot.MessageHandler.md).[handleUpdate](../interfaces/src_interfaces_bot.MessageHandler.md#handleupdate)

#### Defined in

[src/modules/messageHandler.ts:67](https://github.com/kamuridesu/WhatFramework/blob/2f7579d/src/modules/messageHandler.ts#L67)
