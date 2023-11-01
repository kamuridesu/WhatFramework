[@kamuridesu/whatframework](../README.md) / [Modules](../modules.md) / [src/modules/messageHandler](../modules/src_modules_messageHandler.md) / MessageHandler

# Class: MessageHandler

[src/modules/messageHandler](../modules/src_modules_messageHandler.md).MessageHandler

## Implements

- [`IMessageHandler`](../interfaces/src__types_bot.IMessageHandler.md)

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
| `entrypoint?` | [`EntryPoint`](../interfaces/src__types_bot.EntryPoint.md) |

#### Defined in

[src/modules/messageHandler.ts:23](https://github.com/kamuridesu/WhatFramework/blob/9b80f30/src/modules/messageHandler.ts#L23)

## Properties

### chatHandlers

• `Private` `Optional` **chatHandlers**: (`ctx`: [`IBot`](../interfaces/src__types_bot.IBot.md), `messageBody`: `string`, `messageData`: [`IMessageData`](../interfaces/src__types_messageData.IMessageData.md), `groupData`: `undefined` \| [`IGroupData`](../interfaces/src__types_groupData.IGroupData.md), `chatMetadata`: [`IChatMetadata`](../interfaces/src__types_chatMetadata.IChatMetadata.md)) => `void`

#### Type declaration

▸ (`ctx`, `messageBody`, `messageData`, `groupData`, `chatMetadata`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`IBot`](../interfaces/src__types_bot.IBot.md) |
| `messageBody` | `string` |
| `messageData` | [`IMessageData`](../interfaces/src__types_messageData.IMessageData.md) |
| `groupData` | `undefined` \| [`IGroupData`](../interfaces/src__types_groupData.IGroupData.md) |
| `chatMetadata` | [`IChatMetadata`](../interfaces/src__types_chatMetadata.IChatMetadata.md) |

##### Returns

`void`

#### Defined in

[src/modules/messageHandler.ts:17](https://github.com/kamuridesu/WhatFramework/blob/9b80f30/src/modules/messageHandler.ts#L17)

___

### commandHandlers

• `Private` `Optional` **commandHandlers**: (`ctx`: [`IBot`](../interfaces/src__types_bot.IBot.md), `command`: `string`, `args`: `string`[], `messageData`: [`IMessageData`](../interfaces/src__types_messageData.IMessageData.md), `groupData`: `undefined` \| [`IGroupData`](../interfaces/src__types_groupData.IGroupData.md), `chatMetadata`: [`IChatMetadata`](../interfaces/src__types_chatMetadata.IChatMetadata.md)) => `void`

#### Type declaration

▸ (`ctx`, `command`, `args`, `messageData`, `groupData`, `chatMetadata`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`IBot`](../interfaces/src__types_bot.IBot.md) |
| `command` | `string` |
| `args` | `string`[] |
| `messageData` | [`IMessageData`](../interfaces/src__types_messageData.IMessageData.md) |
| `groupData` | `undefined` \| [`IGroupData`](../interfaces/src__types_groupData.IGroupData.md) |
| `chatMetadata` | [`IChatMetadata`](../interfaces/src__types_chatMetadata.IChatMetadata.md) |

##### Returns

`void`

#### Defined in

[src/modules/messageHandler.ts:11](https://github.com/kamuridesu/WhatFramework/blob/9b80f30/src/modules/messageHandler.ts#L11)

___

### isModule

• `Private` **isModule**: `boolean`

#### Defined in

[src/modules/messageHandler.ts:10](https://github.com/kamuridesu/WhatFramework/blob/9b80f30/src/modules/messageHandler.ts#L10)

## Methods

### handle

▸ **handle**(`message`, `bot`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `IWebMessageInfo` |
| `bot` | [`IBot`](../interfaces/src__types_bot.IBot.md) |

#### Returns

`Promise`<`void`\>

#### Implementation of

[IMessageHandler](../interfaces/src__types_bot.IMessageHandler.md).[handle](../interfaces/src__types_bot.IMessageHandler.md#handle)

#### Defined in

[src/modules/messageHandler.ts:31](https://github.com/kamuridesu/WhatFramework/blob/9b80f30/src/modules/messageHandler.ts#L31)

___

### handleUpdate

▸ **handleUpdate**(`key`, `updates`, `bot`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `IMessageKey` |
| `updates` | `Partial`<`IWebMessageInfo`\> |
| `bot` | [`IBot`](../interfaces/src__types_bot.IBot.md) |

#### Returns

`Promise`<`void`\>

#### Implementation of

[IMessageHandler](../interfaces/src__types_bot.IMessageHandler.md).[handleUpdate](../interfaces/src__types_bot.IMessageHandler.md#handleupdate)

#### Defined in

[src/modules/messageHandler.ts:67](https://github.com/kamuridesu/WhatFramework/blob/9b80f30/src/modules/messageHandler.ts#L67)
