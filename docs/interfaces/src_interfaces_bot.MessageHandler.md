[@kamuridesu/whatframework](../README.md) / [Modules](../modules.md) / [src/interfaces/bot](../modules/src_interfaces_bot.md) / MessageHandler

# Interface: MessageHandler

[src/interfaces/bot](../modules/src_interfaces_bot.md).MessageHandler

## Implemented by

- [`MessageHandler`](../classes/src_modules_messageHandler.MessageHandler.md)

## Table of contents

### Properties

- [handle](src_interfaces_bot.MessageHandler.md#handle)
- [handleUpdate](src_interfaces_bot.MessageHandler.md#handleupdate)

## Properties

### handle

• **handle**: (`message`: `IWebMessageInfo`, `bot`: [`IBot`](src_interfaces_bot.IBot.md)) => `void`

#### Type declaration

▸ (`message`, `bot`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `IWebMessageInfo` |
| `bot` | [`IBot`](src_interfaces_bot.IBot.md) |

##### Returns

`void`

#### Defined in

[src/interfaces/bot.ts:48](https://github.com/kamuridesu/WhatFramework/blob/2f7579d/src/interfaces/bot.ts#L48)

___

### handleUpdate

• **handleUpdate**: (`key`: `IMessageKey`, `updates`: `Partial`<`IWebMessageInfo`\>, `ctx`: [`IBot`](src_interfaces_bot.IBot.md)) => `void`

#### Type declaration

▸ (`key`, `updates`, `ctx`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `IMessageKey` |
| `updates` | `Partial`<`IWebMessageInfo`\> |
| `ctx` | [`IBot`](src_interfaces_bot.IBot.md) |

##### Returns

`void`

#### Defined in

[src/interfaces/bot.ts:49](https://github.com/kamuridesu/WhatFramework/blob/2f7579d/src/interfaces/bot.ts#L49)
