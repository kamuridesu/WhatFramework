[@kamuridesu/whatframework](../README.md) / [Modules](../modules.md) / [src/data/messageData](../modules/src_data_messageData.md) / MessageData

# Class: MessageData

[src/data/messageData](../modules/src_data_messageData.md).MessageData

## Implements

- [`IMessageData`](../interfaces/src__types_messageData.IMessageData.md)

## Table of contents

### Constructors

- [constructor](src_data_messageData.MessageData.md#constructor)

### Properties

- [body](src_data_messageData.MessageData.md#body)
- [bot](src_data_messageData.MessageData.md#bot)
- [hasQuotedMessage](src_data_messageData.MessageData.md#hasquotedmessage)
- [isMedia](src_data_messageData.MessageData.md#ismedia)
- [isReactionMessage](src_data_messageData.MessageData.md#isreactionmessage)
- [mentionedUsers](src_data_messageData.MessageData.md#mentionedusers)
- [origin](src_data_messageData.MessageData.md#origin)
- [originalMessage](src_data_messageData.MessageData.md#originalmessage)
- [quotedMessage](src_data_messageData.MessageData.md#quotedmessage)
- [quotedMessageType](src_data_messageData.MessageData.md#quotedmessagetype)
- [reactionMessage](src_data_messageData.MessageData.md#reactionmessage)
- [type](src_data_messageData.MessageData.md#type)

### Methods

- [replyMedia](src_data_messageData.MessageData.md#replymedia)
- [replyText](src_data_messageData.MessageData.md#replytext)

## Constructors

### constructor

• **new MessageData**(`bot`, `originalMessage`, `type`, `body`, `mentionedUsers`, `origin`, `isMedia`, `hasQuotedMessage`, `quotedMessageType`, `quotedMessage`, `isReactionMessage`, `reactionMessage`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `bot` | [`IBot`](../interfaces/src__types_bot.IBot.md) |
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

[src/data/messageData.ts:5](https://github.com/kamuridesu/WhatFramework/blob/9b80f30/src/data/messageData.ts#L5)

## Properties

### body

• **body**: `string`

#### Implementation of

[IMessageData](../interfaces/src__types_messageData.IMessageData.md).[body](../interfaces/src__types_messageData.IMessageData.md#body)

#### Defined in

[src/data/messageData.ts:9](https://github.com/kamuridesu/WhatFramework/blob/9b80f30/src/data/messageData.ts#L9)

___

### bot

• **bot**: [`IBot`](../interfaces/src__types_bot.IBot.md)

#### Implementation of

[IMessageData](../interfaces/src__types_messageData.IMessageData.md).[bot](../interfaces/src__types_messageData.IMessageData.md#bot)

#### Defined in

[src/data/messageData.ts:6](https://github.com/kamuridesu/WhatFramework/blob/9b80f30/src/data/messageData.ts#L6)

___

### hasQuotedMessage

• **hasQuotedMessage**: `boolean`

#### Implementation of

[IMessageData](../interfaces/src__types_messageData.IMessageData.md).[hasQuotedMessage](../interfaces/src__types_messageData.IMessageData.md#hasquotedmessage)

#### Defined in

[src/data/messageData.ts:13](https://github.com/kamuridesu/WhatFramework/blob/9b80f30/src/data/messageData.ts#L13)

___

### isMedia

• **isMedia**: `boolean`

#### Implementation of

[IMessageData](../interfaces/src__types_messageData.IMessageData.md).[isMedia](../interfaces/src__types_messageData.IMessageData.md#ismedia)

#### Defined in

[src/data/messageData.ts:12](https://github.com/kamuridesu/WhatFramework/blob/9b80f30/src/data/messageData.ts#L12)

___

### isReactionMessage

• **isReactionMessage**: `boolean`

#### Implementation of

[IMessageData](../interfaces/src__types_messageData.IMessageData.md).[isReactionMessage](../interfaces/src__types_messageData.IMessageData.md#isreactionmessage)

#### Defined in

[src/data/messageData.ts:16](https://github.com/kamuridesu/WhatFramework/blob/9b80f30/src/data/messageData.ts#L16)

___

### mentionedUsers

• **mentionedUsers**: `string`[]

#### Implementation of

[IMessageData](../interfaces/src__types_messageData.IMessageData.md).[mentionedUsers](../interfaces/src__types_messageData.IMessageData.md#mentionedusers)

#### Defined in

[src/data/messageData.ts:10](https://github.com/kamuridesu/WhatFramework/blob/9b80f30/src/data/messageData.ts#L10)

___

### origin

• **origin**: `string`

#### Implementation of

[IMessageData](../interfaces/src__types_messageData.IMessageData.md).[origin](../interfaces/src__types_messageData.IMessageData.md#origin)

#### Defined in

[src/data/messageData.ts:11](https://github.com/kamuridesu/WhatFramework/blob/9b80f30/src/data/messageData.ts#L11)

___

### originalMessage

• **originalMessage**: `IWebMessageInfo`

#### Implementation of

[IMessageData](../interfaces/src__types_messageData.IMessageData.md).[originalMessage](../interfaces/src__types_messageData.IMessageData.md#originalmessage)

#### Defined in

[src/data/messageData.ts:7](https://github.com/kamuridesu/WhatFramework/blob/9b80f30/src/data/messageData.ts#L7)

___

### quotedMessage

• **quotedMessage**: `any`

#### Implementation of

[IMessageData](../interfaces/src__types_messageData.IMessageData.md).[quotedMessage](../interfaces/src__types_messageData.IMessageData.md#quotedmessage)

#### Defined in

[src/data/messageData.ts:15](https://github.com/kamuridesu/WhatFramework/blob/9b80f30/src/data/messageData.ts#L15)

___

### quotedMessageType

• **quotedMessageType**: `any`

#### Implementation of

[IMessageData](../interfaces/src__types_messageData.IMessageData.md).[quotedMessageType](../interfaces/src__types_messageData.IMessageData.md#quotedmessagetype)

#### Defined in

[src/data/messageData.ts:14](https://github.com/kamuridesu/WhatFramework/blob/9b80f30/src/data/messageData.ts#L14)

___

### reactionMessage

• **reactionMessage**: `any`

#### Implementation of

[IMessageData](../interfaces/src__types_messageData.IMessageData.md).[reactionMessage](../interfaces/src__types_messageData.IMessageData.md#reactionmessage)

#### Defined in

[src/data/messageData.ts:17](https://github.com/kamuridesu/WhatFramework/blob/9b80f30/src/data/messageData.ts#L17)

___

### type

• **type**: `string`

#### Implementation of

[IMessageData](../interfaces/src__types_messageData.IMessageData.md).[type](../interfaces/src__types_messageData.IMessageData.md#type)

#### Defined in

[src/data/messageData.ts:8](https://github.com/kamuridesu/WhatFramework/blob/9b80f30/src/data/messageData.ts#L8)

## Methods

### replyMedia

▸ **replyMedia**(`media`, `messageType`, `mimeType?`, `mediaCaption?`, `options?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `media` | `string` \| [`Media`](../interfaces/src__types_bot.Media.md) |
| `messageType` | `string` |
| `mimeType?` | `string` |
| `mediaCaption?` | `string` |
| `options?` | `any` |

#### Returns

`Promise`<`void`\>

#### Implementation of

[IMessageData](../interfaces/src__types_messageData.IMessageData.md).[replyMedia](../interfaces/src__types_messageData.IMessageData.md#replymedia)

#### Defined in

[src/data/messageData.ts:37](https://github.com/kamuridesu/WhatFramework/blob/9b80f30/src/data/messageData.ts#L37)

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

#### Implementation of

[IMessageData](../interfaces/src__types_messageData.IMessageData.md).[replyText](../interfaces/src__types_messageData.IMessageData.md#replytext)

#### Defined in

[src/data/messageData.ts:33](https://github.com/kamuridesu/WhatFramework/blob/9b80f30/src/data/messageData.ts#L33)
