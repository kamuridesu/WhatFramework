[@kamuridesu/whatframework](../README.md) / [Modules](../modules.md) / [src/types/bot](../modules/src_types_bot.md) / MessageHandler

# Interface: MessageHandler

[src/types/bot](../modules/src_types_bot.md).MessageHandler

## Implemented by

- [`MessageHandler`](../classes/src_modules_messageHandler.MessageHandler.md)

## Table of contents

### Properties

- [handle](src_types_bot.MessageHandler.md#handle)
- [handleUpdate](src_types_bot.MessageHandler.md#handleupdate)

## Properties

### handle

• **handle**: (`message`: `IWebMessageInfo`, `bot`: [`Bot`](src_types_bot.Bot.md)) => `void`

#### Type declaration

▸ (`message`, `bot`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `message` | `IWebMessageInfo` |
| `bot` | [`Bot`](src_types_bot.Bot.md) |

##### Returns

`void`

#### Defined in

[src/types/bot.ts:48](https://github.com/kamuridesu/WhatFramework/blob/01ee173/src/types/bot.ts#L48)

___

### handleUpdate

• **handleUpdate**: (`key`: `IMessageKey`, `updates`: `Partial`<`IWebMessageInfo`\>, `ctx`: [`Bot`](src_types_bot.Bot.md)) => `void`

#### Type declaration

▸ (`key`, `updates`, `ctx`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `IMessageKey` |
| `updates` | `Partial`<`IWebMessageInfo`\> |
| `ctx` | [`Bot`](src_types_bot.Bot.md) |

##### Returns

`void`

#### Defined in

[src/types/bot.ts:49](https://github.com/kamuridesu/WhatFramework/blob/01ee173/src/types/bot.ts#L49)
