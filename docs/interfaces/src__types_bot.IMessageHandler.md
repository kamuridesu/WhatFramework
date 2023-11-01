[@kamuridesu/whatframework](../README.md) / [Modules](../modules.md) / [src/@types/bot](../modules/src__types_bot.md) / IMessageHandler

# Interface: IMessageHandler

[src/@types/bot](../modules/src__types_bot.md).IMessageHandler

## Implemented by

- [`MessageHandler`](../classes/src_modules_messageHandler.MessageHandler.md)

## Table of contents

### Properties

- [handle](src__types_bot.IMessageHandler.md#handle)
- [handleUpdate](src__types_bot.IMessageHandler.md#handleupdate)

## Properties

### handle

• **handle**: (`message`: `IWebMessageInfo`, `bot`: [`IBot`](src__types_bot.IBot.md)) => `void`

#### Type declaration

▸ (`message`, `bot`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `IWebMessageInfo` |
| `bot` | [`IBot`](src__types_bot.IBot.md) |

##### Returns

`void`

#### Defined in

[src/@types/bot.d.ts:48](https://github.com/kamuridesu/WhatFramework/blob/9b80f30/src/@types/bot.d.ts#L48)

___

### handleUpdate

• **handleUpdate**: (`key`: `IMessageKey`, `updates`: `Partial`<`IWebMessageInfo`\>, `ctx`: [`IBot`](src__types_bot.IBot.md)) => `void`

#### Type declaration

▸ (`key`, `updates`, `ctx`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `IMessageKey` |
| `updates` | `Partial`<`IWebMessageInfo`\> |
| `ctx` | [`IBot`](src__types_bot.IBot.md) |

##### Returns

`void`

#### Defined in

[src/@types/bot.d.ts:49](https://github.com/kamuridesu/WhatFramework/blob/9b80f30/src/@types/bot.d.ts#L49)
