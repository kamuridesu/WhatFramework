[@kamuridesu/whatframework](../README.md) / [Modules](../modules.md) / [src/types/messageData](../modules/src_types_messageData.md) / MessageData

# Class: MessageData

[src/types/messageData](../modules/src_types_messageData.md).MessageData

## Table of contents

### Constructors

- [constructor](src_types_messageData.MessageData.md#constructor)

### Properties

- [body](src_types_messageData.MessageData.md#body)
- [bot](src_types_messageData.MessageData.md#bot)
- [hasQuotedMessage](src_types_messageData.MessageData.md#hasquotedmessage)
- [isMedia](src_types_messageData.MessageData.md#ismedia)
- [isReactionMessage](src_types_messageData.MessageData.md#isreactionmessage)
- [mentionedUsers](src_types_messageData.MessageData.md#mentionedusers)
- [origin](src_types_messageData.MessageData.md#origin)
- [originalMessage](src_types_messageData.MessageData.md#originalmessage)
- [quotedMessage](src_types_messageData.MessageData.md#quotedmessage)
- [quotedMessageType](src_types_messageData.MessageData.md#quotedmessagetype)
- [reactionMessage](src_types_messageData.MessageData.md#reactionmessage)
- [type](src_types_messageData.MessageData.md#type)

### Methods

- [replyMedia](src_types_messageData.MessageData.md#replymedia)
- [replyText](src_types_messageData.MessageData.md#replytext)

## Constructors

### constructor

• **new MessageData**(`bot`, `originalMessage`, `type`, `body`, `mentionedUsers`, `origin`, `isMedia`, `hasQuotedMessage`, `quotedMessageType`, `quotedMessage`, `isReactionMessage`, `reactionMessage`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `bot` | [`Bot`](../interfaces/src_types_bot.Bot.md) |
| `originalMessage` | `IWebMessageInfo` |
| `type` | `string` |
| `body` | `string` |
| `mentionedUsers` | `string`[] |
| `origin` | `string` |
| `isMedia` | `boolean` |
| `hasQuotedMessage` | `boolean` |
| `quotedMessageType` | `any` |
| `quotedMessage` | `any` |
| `isReactionMessage` | `boolean` |
| `reactionMessage` | `any` |

#### Defined in

[src/types/messageData.ts:5](https://github.com/kamuridesu/WhatFramework/blob/01ee173/src/types/messageData.ts#L5)

## Properties

### body

• **body**: `string`

#### Defined in

[src/types/messageData.ts:9](https://github.com/kamuridesu/WhatFramework/blob/01ee173/src/types/messageData.ts#L9)

___

### bot

• `Private` **bot**: [`Bot`](../interfaces/src_types_bot.Bot.md)

#### Defined in

[src/types/messageData.ts:6](https://github.com/kamuridesu/WhatFramework/blob/01ee173/src/types/messageData.ts#L6)

___

### hasQuotedMessage

• **hasQuotedMessage**: `boolean`

#### Defined in

[src/types/messageData.ts:13](https://github.com/kamuridesu/WhatFramework/blob/01ee173/src/types/messageData.ts#L13)

___

### isMedia

• **isMedia**: `boolean`

#### Defined in

[src/types/messageData.ts:12](https://github.com/kamuridesu/WhatFramework/blob/01ee173/src/types/messageData.ts#L12)

___

### isReactionMessage

• **isReactionMessage**: `boolean`

#### Defined in

[src/types/messageData.ts:16](https://github.com/kamuridesu/WhatFramework/blob/01ee173/src/types/messageData.ts#L16)

___

### mentionedUsers

• **mentionedUsers**: `string`[]

#### Defined in

[src/types/messageData.ts:10](https://github.com/kamuridesu/WhatFramework/blob/01ee173/src/types/messageData.ts#L10)

___

### origin

• **origin**: `string`

#### Defined in

[src/types/messageData.ts:11](https://github.com/kamuridesu/WhatFramework/blob/01ee173/src/types/messageData.ts#L11)

___

### originalMessage

• **originalMessage**: `IWebMessageInfo`

#### Defined in

[src/types/messageData.ts:7](https://github.com/kamuridesu/WhatFramework/blob/01ee173/src/types/messageData.ts#L7)

___

### quotedMessage

• **quotedMessage**: `any`

#### Defined in

[src/types/messageData.ts:15](https://github.com/kamuridesu/WhatFramework/blob/01ee173/src/types/messageData.ts#L15)

___

### quotedMessageType

• **quotedMessageType**: `any`

#### Defined in

[src/types/messageData.ts:14](https://github.com/kamuridesu/WhatFramework/blob/01ee173/src/types/messageData.ts#L14)

___

### reactionMessage

• **reactionMessage**: `any`

#### Defined in

[src/types/messageData.ts:17](https://github.com/kamuridesu/WhatFramework/blob/01ee173/src/types/messageData.ts#L17)

___

### type

• **type**: `string`

#### Defined in

[src/types/messageData.ts:8](https://github.com/kamuridesu/WhatFramework/blob/01ee173/src/types/messageData.ts#L8)

## Methods

### replyMedia

▸ **replyMedia**(`media`, `messageType`, `mimeType?`, `mediaCaption?`, `options?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `media` | `string` \| [`Media`](../interfaces/src_types_bot.Media.md) |
| `messageType` | `string` |
| `mimeType?` | `string` |
| `mediaCaption?` | `string` |
| `options?` | `any` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/types/messageData.ts:37](https://github.com/kamuridesu/WhatFramework/blob/01ee173/src/types/messageData.ts#L37)

___

### replyText

▸ **replyText**(`text`, `options`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `text` | `string` |
| `options` | `Object` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/types/messageData.ts:33](https://github.com/kamuridesu/WhatFramework/blob/01ee173/src/types/messageData.ts#L33)
