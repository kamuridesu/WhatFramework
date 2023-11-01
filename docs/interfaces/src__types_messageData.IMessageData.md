[@kamuridesu/whatframework](../README.md) / [Modules](../modules.md) / [src/@types/messageData](../modules/src__types_messageData.md) / IMessageData

# Interface: IMessageData

[src/@types/messageData](../modules/src__types_messageData.md).IMessageData

## Implemented by

- [`MessageData`](../classes/src_data_messageData.MessageData.md)

## Table of contents

### Properties

- [body](src__types_messageData.IMessageData.md#body)
- [bot](src__types_messageData.IMessageData.md#bot)
- [hasQuotedMessage](src__types_messageData.IMessageData.md#hasquotedmessage)
- [isMedia](src__types_messageData.IMessageData.md#ismedia)
- [isReactionMessage](src__types_messageData.IMessageData.md#isreactionmessage)
- [mentionedUsers](src__types_messageData.IMessageData.md#mentionedusers)
- [origin](src__types_messageData.IMessageData.md#origin)
- [originalMessage](src__types_messageData.IMessageData.md#originalmessage)
- [quotedMessage](src__types_messageData.IMessageData.md#quotedmessage)
- [quotedMessageType](src__types_messageData.IMessageData.md#quotedmessagetype)
- [reactionMessage](src__types_messageData.IMessageData.md#reactionmessage)
- [type](src__types_messageData.IMessageData.md#type)

### Methods

- [replyMedia](src__types_messageData.IMessageData.md#replymedia)
- [replyText](src__types_messageData.IMessageData.md#replytext)

## Properties

### body

• **body**: `string`

#### Defined in

[src/@types/messageData.d.ts:8](https://github.com/kamuridesu/WhatFramework/blob/9b80f30/src/@types/messageData.d.ts#L8)

___

### bot

• **bot**: [`IBot`](src__types_bot.IBot.md)

#### Defined in

[src/@types/messageData.d.ts:5](https://github.com/kamuridesu/WhatFramework/blob/9b80f30/src/@types/messageData.d.ts#L5)

___

### hasQuotedMessage

• **hasQuotedMessage**: `boolean`

#### Defined in

[src/@types/messageData.d.ts:12](https://github.com/kamuridesu/WhatFramework/blob/9b80f30/src/@types/messageData.d.ts#L12)

___

### isMedia

• **isMedia**: `boolean`

#### Defined in

[src/@types/messageData.d.ts:11](https://github.com/kamuridesu/WhatFramework/blob/9b80f30/src/@types/messageData.d.ts#L11)

___

### isReactionMessage

• **isReactionMessage**: `boolean`

#### Defined in

[src/@types/messageData.d.ts:15](https://github.com/kamuridesu/WhatFramework/blob/9b80f30/src/@types/messageData.d.ts#L15)

___

### mentionedUsers

• **mentionedUsers**: `string`[]

#### Defined in

[src/@types/messageData.d.ts:9](https://github.com/kamuridesu/WhatFramework/blob/9b80f30/src/@types/messageData.d.ts#L9)

___

### origin

• **origin**: `string`

#### Defined in

[src/@types/messageData.d.ts:10](https://github.com/kamuridesu/WhatFramework/blob/9b80f30/src/@types/messageData.d.ts#L10)

___

### originalMessage

• **originalMessage**: `IWebMessageInfo`

#### Defined in

[src/@types/messageData.d.ts:6](https://github.com/kamuridesu/WhatFramework/blob/9b80f30/src/@types/messageData.d.ts#L6)

___

### quotedMessage

• **quotedMessage**: `any`

#### Defined in

[src/@types/messageData.d.ts:14](https://github.com/kamuridesu/WhatFramework/blob/9b80f30/src/@types/messageData.d.ts#L14)

___

### quotedMessageType

• **quotedMessageType**: `any`

#### Defined in

[src/@types/messageData.d.ts:13](https://github.com/kamuridesu/WhatFramework/blob/9b80f30/src/@types/messageData.d.ts#L13)

___

### reactionMessage

• **reactionMessage**: `any`

#### Defined in

[src/@types/messageData.d.ts:16](https://github.com/kamuridesu/WhatFramework/blob/9b80f30/src/@types/messageData.d.ts#L16)

___

### type

• **type**: `string`

#### Defined in

[src/@types/messageData.d.ts:7](https://github.com/kamuridesu/WhatFramework/blob/9b80f30/src/@types/messageData.d.ts#L7)

## Methods

### replyMedia

▸ **replyMedia**(`media`, `messageType`, `mimeType?`, `mediaCaption?`, `options?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `media` | `string` \| [`Media`](src__types_bot.Media.md) |
| `messageType` | `string` |
| `mimeType?` | `string` |
| `mediaCaption?` | `string` |
| `options?` | `any` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/@types/messageData.d.ts:20](https://github.com/kamuridesu/WhatFramework/blob/9b80f30/src/@types/messageData.d.ts#L20)

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

[src/@types/messageData.d.ts:18](https://github.com/kamuridesu/WhatFramework/blob/9b80f30/src/@types/messageData.d.ts#L18)
