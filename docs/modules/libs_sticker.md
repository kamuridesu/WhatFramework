[@kamuridesu/whatframework](../README.md) / [Modules](../modules.md) / libs/sticker

# Module: libs/sticker

## Table of contents

### Functions

- [createSticker](libs_sticker.md#createsticker)
- [createStickerFromMedia](libs_sticker.md#createstickerfrommedia)

## Functions

### createSticker

▸ **createSticker**(`context`, `bot`, `author`, `packname`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `context` | [`IMessageData`](../interfaces/src_interfaces_messageData.IMessageData.md) |
| `bot` | [`Bot`](../classes/src_modules_bot.Bot.md) |
| `author` | `string` |
| `packname` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[libs/sticker.ts:13](https://github.com/kamuridesu/WhatFramework/blob/2f7579d/libs/sticker.ts#L13)

___

### createStickerFromMedia

▸ **createStickerFromMedia**(`media`, `ctx`, `messageData`, `packName?`, `author?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `media` | `string` |
| `ctx` | [`Bot`](../classes/src_modules_bot.Bot.md) |
| `messageData` | [`IMessageData`](../interfaces/src_interfaces_messageData.IMessageData.md) |
| `packName?` | `string` |
| `author?` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[libs/sticker.ts:26](https://github.com/kamuridesu/WhatFramework/blob/2f7579d/libs/sticker.ts#L26)