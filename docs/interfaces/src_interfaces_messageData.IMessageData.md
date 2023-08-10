[@kamuridesu/whatframework](../README.md) / [Modules](../modules.md) / [src/interfaces/messageData](../modules/src_interfaces_messageData.md) / IMessageData

# Interface: IMessageData

[src/interfaces/messageData](../modules/src_interfaces_messageData.md).IMessageData

## Implemented by

- [`MessageData`](../classes/src_data_messageData.MessageData.md)

## Table of contents

### Properties

- [body](src_interfaces_messageData.IMessageData.md#body)
- [bot](src_interfaces_messageData.IMessageData.md#bot)
- [hasQuotedMessage](src_interfaces_messageData.IMessageData.md#hasquotedmessage)
- [isMedia](src_interfaces_messageData.IMessageData.md#ismedia)
- [isReactionMessage](src_interfaces_messageData.IMessageData.md#isreactionmessage)
- [mentionedUsers](src_interfaces_messageData.IMessageData.md#mentionedusers)
- [origin](src_interfaces_messageData.IMessageData.md#origin)
- [originalMessage](src_interfaces_messageData.IMessageData.md#originalmessage)
- [quotedMessage](src_interfaces_messageData.IMessageData.md#quotedmessage)
- [quotedMessageType](src_interfaces_messageData.IMessageData.md#quotedmessagetype)
- [reactionMessage](src_interfaces_messageData.IMessageData.md#reactionmessage)
- [type](src_interfaces_messageData.IMessageData.md#type)

### Methods

- [replyMedia](src_interfaces_messageData.IMessageData.md#replymedia)
- [replyText](src_interfaces_messageData.IMessageData.md#replytext)

## Properties

### body

• **body**: `string`

#### Defined in

[src/interfaces/messageData.ts:8](https://github.com/kamuridesu/WhatFramework/blob/2f7579d/src/interfaces/messageData.ts#L8)

___

### bot

• **bot**: [`IBot`](src_interfaces_bot.IBot.md)

#### Defined in

[src/interfaces/messageData.ts:5](https://github.com/kamuridesu/WhatFramework/blob/2f7579d/src/interfaces/messageData.ts#L5)

___

### hasQuotedMessage

• **hasQuotedMessage**: `boolean`

#### Defined in

[src/interfaces/messageData.ts:12](https://github.com/kamuridesu/WhatFramework/blob/2f7579d/src/interfaces/messageData.ts#L12)

___

### isMedia

• **isMedia**: `boolean`

#### Defined in

[src/interfaces/messageData.ts:11](https://github.com/kamuridesu/WhatFramework/blob/2f7579d/src/interfaces/messageData.ts#L11)

___

### isReactionMessage

• **isReactionMessage**: `boolean`

#### Defined in

[src/interfaces/messageData.ts:15](https://github.com/kamuridesu/WhatFramework/blob/2f7579d/src/interfaces/messageData.ts#L15)

___

### mentionedUsers

• **mentionedUsers**: `string`[]

#### Defined in

[src/interfaces/messageData.ts:9](https://github.com/kamuridesu/WhatFramework/blob/2f7579d/src/interfaces/messageData.ts#L9)

___

### origin

• **origin**: `string`

#### Defined in

[src/interfaces/messageData.ts:10](https://github.com/kamuridesu/WhatFramework/blob/2f7579d/src/interfaces/messageData.ts#L10)

___

### originalMessage

• **originalMessage**: `IWebMessageInfo`

#### Defined in

[src/interfaces/messageData.ts:6](https://github.com/kamuridesu/WhatFramework/blob/2f7579d/src/interfaces/messageData.ts#L6)

___

### quotedMessage

• **quotedMessage**: `any`

#### Defined in

[src/interfaces/messageData.ts:14](https://github.com/kamuridesu/WhatFramework/blob/2f7579d/src/interfaces/messageData.ts#L14)

___

### quotedMessageType

• **quotedMessageType**: `any`

#### Defined in

[src/interfaces/messageData.ts:13](https://github.com/kamuridesu/WhatFramework/blob/2f7579d/src/interfaces/messageData.ts#L13)

___

### reactionMessage

• **reactionMessage**: `any`

#### Defined in

[src/interfaces/messageData.ts:16](https://github.com/kamuridesu/WhatFramework/blob/2f7579d/src/interfaces/messageData.ts#L16)

___

### type

• **type**: `string`

#### Defined in

[src/interfaces/messageData.ts:7](https://github.com/kamuridesu/WhatFramework/blob/2f7579d/src/interfaces/messageData.ts#L7)

## Methods

### replyMedia

▸ **replyMedia**(`media`, `messageType`, `mimeType?`, `mediaCaption?`, `options?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `media` | `string` \| [`Media`](src_interfaces_bot.Media.md) |
| `messageType` | `string` |
| `mimeType?` | `string` |
| `mediaCaption?` | `string` |
| `options?` | `any` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/interfaces/messageData.ts:20](https://github.com/kamuridesu/WhatFramework/blob/2f7579d/src/interfaces/messageData.ts#L20)

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

[src/interfaces/messageData.ts:18](https://github.com/kamuridesu/WhatFramework/blob/2f7579d/src/interfaces/messageData.ts#L18)
