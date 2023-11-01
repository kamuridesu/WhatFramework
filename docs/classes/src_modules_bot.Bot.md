[@kamuridesu/whatframework](../README.md) / [Modules](../modules.md) / [src/modules/bot](../modules/src_modules_bot.md) / Bot

# Class: Bot

[src/modules/bot](../modules/src_modules_bot.md).Bot

## Implements

- [`IBot`](../interfaces/src__types_bot.IBot.md)

## Table of contents

### Constructors

- [constructor](src_modules_bot.Bot.md#constructor)

### Properties

- [botNumber](src_modules_bot.Bot.md#botnumber)
- [commandsFilename](src_modules_bot.Bot.md#commandsfilename)
- [connection](src_modules_bot.Bot.md#connection)
- [groupsData](src_modules_bot.Bot.md#groupsdata)
- [lang](src_modules_bot.Bot.md#lang)
- [language](src_modules_bot.Bot.md#language)
- [name](src_modules_bot.Bot.md#name)
- [ownerNumber](src_modules_bot.Bot.md#ownernumber)
- [prefix](src_modules_bot.Bot.md#prefix)
- [reconnectOnClose](src_modules_bot.Bot.md#reconnectonclose)

### Methods

- [createPoll](src_modules_bot.Bot.md#createpoll)
- [getMessage](src_modules_bot.Bot.md#getmessage)
- [init](src_modules_bot.Bot.md#init)
- [loadMessage](src_modules_bot.Bot.md#loadmessage)
- [replyMedia](src_modules_bot.Bot.md#replymedia)
- [replyText](src_modules_bot.Bot.md#replytext)
- [sendTextMessage](src_modules_bot.Bot.md#sendtextmessage)

## Constructors

### constructor

• **new Bot**(`name?`, `prefix?`, `botNumber?`, `ownerNumber?`, `commandsFilename?`, `language?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `name` | `string` | `'bot'` |
| `prefix` | `string` | `'!'` |
| `botNumber` | `string` | `''` |
| `ownerNumber` | `string` | `''` |
| `commandsFilename` | `string` | `''` |
| `language` | `string` | `''` |

#### Defined in

[src/modules/bot.ts:54](https://github.com/kamuridesu/WhatFramework/blob/9b80f30/src/modules/bot.ts#L54)

## Properties

### botNumber

• `Readonly` **botNumber**: `string`

#### Implementation of

[IBot](../interfaces/src__types_bot.IBot.md).[botNumber](../interfaces/src__types_bot.IBot.md#botnumber)

#### Defined in

[src/modules/bot.ts:47](https://github.com/kamuridesu/WhatFramework/blob/9b80f30/src/modules/bot.ts#L47)

___

### commandsFilename

• `Readonly` **commandsFilename**: `string`

#### Implementation of

[IBot](../interfaces/src__types_bot.IBot.md).[commandsFilename](../interfaces/src__types_bot.IBot.md#commandsfilename)

#### Defined in

[src/modules/bot.ts:49](https://github.com/kamuridesu/WhatFramework/blob/9b80f30/src/modules/bot.ts#L49)

___

### connection

• `Optional` **connection**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `addChatLabel` | (`jid`: `string`, `labelId`: `string`) => `Promise`<`void`\> |
| `addMessageLabel` | (`jid`: `string`, `messageId`: `string`, `labelId`: `string`) => `Promise`<`void`\> |
| `appPatch` | (`patchCreate`: `WAPatchCreate`) => `Promise`<`void`\> |
| `assertSessions` | (`jids`: `string`[], `force`: `boolean`) => `Promise`<`boolean`\> |
| `authState` | { `creds`: `AuthenticationCreds` ; `keys`: `SignalKeyStoreWithTransaction`  } |
| `authState.creds` | `AuthenticationCreds` |
| `authState.keys` | `SignalKeyStoreWithTransaction` |
| `chatModify` | (`mod`: `ChatModification`, `jid`: `string`) => `Promise`<`void`\> |
| `cleanDirtyBits` | (`type`: ``"groups"`` \| ``"account_sync"``, `fromTimestamp?`: `string` \| `number`) => `Promise`<`void`\> |
| `end` | (`error`: `undefined` \| `Error`) => `void` |
| `ev` | `BaileysEventEmitter` & { `buffer`: () => `void` ; `createBufferedFunction`: <A, T_1\>(`work`: (...`args`: `A`) => `Promise`<`T_1`\>) => (...`args`: `A`) => `Promise`<`T_1`\> ; `flush`: (`force?`: `boolean`) => `boolean` ; `isBuffering`: () => `boolean` ; `process`: (`handler`: (`events`: `Partial`<`BaileysEventMap`\>) => `void` \| `Promise`<`void`\>) => () => `void`  } |
| `fetchBlocklist` | () => `Promise`<`string`[]\> |
| `fetchPrivacySettings` | (`force?`: `boolean`) => `Promise`<{ `[_: string]`: `string`;  }\> |
| `fetchStatus` | (`jid`: `string`) => `Promise`<`undefined` \| { `setAt`: `Date` ; `status`: `undefined` \| `string`  }\> |
| `generateMessageTag` | () => `string` |
| `getBusinessProfile` | (`jid`: `string`) => `Promise`<`void` \| `WABusinessProfile`\> |
| `getCatalog` | (`__namedParameters`: `GetCatalogOptions`) => `Promise`<{ `nextPageCursor`: `undefined` \| `string` ; `products`: `Product`[]  }\> |
| `getCollections` | (`jid?`: `string`, `limit?`: `number`) => `Promise`<{ `collections`: `CatalogCollection`[]  }\> |
| `getOrderDetails` | (`orderId`: `string`, `tokenBase64`: `string`) => `Promise`<`OrderDetails`\> |
| `getPrivacyTokens` | (`jids`: `string`[]) => `Promise`<`BinaryNode`\> |
| `groupAcceptInvite` | (`code`: `string`) => `Promise`<`undefined` \| `string`\> |
| `groupAcceptInviteV4` | (`key`: `string` \| `IMessageKey`, `inviteMessage`: `IGroupInviteMessage`) => `Promise`<`string`\> |
| `groupCreate` | (`subject`: `string`, `participants`: `string`[]) => `Promise`<`GroupMetadata`\> |
| `groupFetchAllParticipating` | () => `Promise`<{ `[_: string]`: `GroupMetadata`;  }\> |
| `groupGetInviteInfo` | (`code`: `string`) => `Promise`<`GroupMetadata`\> |
| `groupInviteCode` | (`jid`: `string`) => `Promise`<`undefined` \| `string`\> |
| `groupLeave` | (`id`: `string`) => `Promise`<`void`\> |
| `groupMetadata` | (`jid`: `string`) => `Promise`<`GroupMetadata`\> |
| `groupParticipantsUpdate` | (`jid`: `string`, `participants`: `string`[], `action`: `ParticipantAction`) => `Promise`<{ `content`: `BinaryNode` ; `jid`: `string` ; `status`: `string`  }[]\> |
| `groupRequestParticipantsList` | (`jid`: `string`) => `Promise`<{ `[key: string]`: `string`;  }[]\> |
| `groupRequestParticipantsUpdate` | (`jid`: `string`, `participants`: `string`[], `action`: ``"reject"`` \| ``"approve"``) => `Promise`<{ `jid`: `string` ; `status`: `string`  }[]\> |
| `groupRevokeInvite` | (`jid`: `string`) => `Promise`<`undefined` \| `string`\> |
| `groupSettingUpdate` | (`jid`: `string`, `setting`: ``"announcement"`` \| ``"locked"`` \| ``"not_announcement"`` \| ``"unlocked"``) => `Promise`<`void`\> |
| `groupToggleEphemeral` | (`jid`: `string`, `ephemeralExpiration`: `number`) => `Promise`<`void`\> |
| `groupUpdateDescription` | (`jid`: `string`, `description?`: `string`) => `Promise`<`void`\> |
| `groupUpdateSubject` | (`jid`: `string`, `subject`: `string`) => `Promise`<`void`\> |
| `logout` | (`msg?`: `string`) => `Promise`<`void`\> |
| `onUnexpectedError` | (`err`: `Error` \| `Boom`<`any`\>, `msg`: `string`) => `void` |
| `onWhatsApp` | (...`jids`: `string`[]) => `Promise`<{ `exists`: `boolean` ; `jid`: `string`  }[]\> |
| `presenceSubscribe` | (`toJid`: `string`, `tcToken?`: `Buffer`) => `Promise`<`void`\> |
| `processingMutex` | { `mutex`: <T\>(`code`: () => `T` \| `Promise`<`T`\>) => `Promise`<`T`\>  } |
| `processingMutex.mutex` | [object Object] |
| `productCreate` | (`create`: `ProductCreate`) => `Promise`<`Product`\> |
| `productDelete` | (`productIds`: `string`[]) => `Promise`<{ `deleted`: `number`  }\> |
| `productUpdate` | (`productId`: `string`, `update`: `ProductUpdate`) => `Promise`<`Product`\> |
| `profilePictureUrl` | (`jid`: `string`, `type?`: ``"image"`` \| ``"preview"``, `timeoutMs?`: `number`) => `Promise`<`undefined` \| `string`\> |
| `query` | (`node`: `BinaryNode`, `timeoutMs?`: `number`) => `Promise`<`BinaryNode`\> |
| `readMessages` | (`keys`: `IMessageKey`[]) => `Promise`<`void`\> |
| `refreshMediaConn` | (`forceGet?`: `boolean`) => `Promise`<`MediaConnInfo`\> |
| `register` | (`code`: `string`) => `Promise`<`ExistsResponse`\> |
| `rejectCall` | (`callId`: `string`, `callFrom`: `string`) => `Promise`<`void`\> |
| `relayMessage` | (`jid`: `string`, `message`: `IMessage`, `__namedParameters`: `MessageRelayOptions`) => `Promise`<`string`\> |
| `removeChatLabel` | (`jid`: `string`, `labelId`: `string`) => `Promise`<`void`\> |
| `removeMessageLabel` | (`jid`: `string`, `messageId`: `string`, `labelId`: `string`) => `Promise`<`void`\> |
| `removeProfilePicture` | (`jid`: `string`) => `Promise`<`void`\> |
| `requestPairingCode` | (`phoneNumber`: `string`) => `Promise`<`string`\> |
| `requestRegistrationCode` | (`registrationOptions?`: `RegistrationOptions`) => `Promise`<`ExistsResponse`\> |
| `resyncAppState` | (`collections`: readonly (``"critical_block"`` \| ``"critical_unblock_low"`` \| ``"regular_high"`` \| ``"regular_low"`` \| ``"regular"``)[], `isInitialSync`: `boolean`) => `Promise`<`void`\> |
| `sendMessage` | (`jid`: `string`, `content`: `AnyMessageContent`, `options?`: `MiscMessageGenerationOptions`) => `Promise`<`undefined` \| `WebMessageInfo`\> |
| `sendMessageAck` | (`__namedParameters`: `BinaryNode`) => `Promise`<`void`\> |
| `sendNode` | (`frame`: `BinaryNode`) => `Promise`<`void`\> |
| `sendPresenceUpdate` | (`type`: `WAPresence`, `toJid?`: `string`) => `Promise`<`void`\> |
| `sendRawMessage` | (`data`: `Uint8Array` \| `Buffer`) => `Promise`<`void`\> |
| `sendReceipt` | (`jid`: `string`, `participant`: `undefined` \| `string`, `messageIds`: `string`[], `type`: `MessageReceiptType`) => `Promise`<`void`\> |
| `sendReceipts` | (`keys`: `IMessageKey`[], `type`: `MessageReceiptType`) => `Promise`<`void`\> |
| `sendRetryRequest` | (`node`: `BinaryNode`, `forceIncludeKeys?`: `boolean`) => `Promise`<`void`\> |
| `signalRepository` | `SignalRepository` |
| `type` | ``"md"`` |
| `updateBlockStatus` | (`jid`: `string`, `action`: ``"block"`` \| ``"unblock"``) => `Promise`<`void`\> |
| `updateDefaultDisappearingMode` | (`duration`: `number`) => `Promise`<`void`\> |
| `updateGroupsAddPrivacy` | (`value`: `WAPrivacyValue`) => `Promise`<`void`\> |
| `updateLastSeenPrivacy` | (`value`: `WAPrivacyValue`) => `Promise`<`void`\> |
| `updateMediaMessage` | (`message`: `IWebMessageInfo`) => `Promise`<`IWebMessageInfo`\> |
| `updateOnlinePrivacy` | (`value`: `WAPrivacyOnlineValue`) => `Promise`<`void`\> |
| `updateProfileName` | (`name`: `string`) => `Promise`<`void`\> |
| `updateProfilePicture` | (`jid`: `string`, `content`: `WAMediaUpload`) => `Promise`<`void`\> |
| `updateProfilePicturePrivacy` | (`value`: `WAPrivacyValue`) => `Promise`<`void`\> |
| `updateProfileStatus` | (`status`: `string`) => `Promise`<`void`\> |
| `updateReadReceiptsPrivacy` | (`value`: `WAReadReceiptsValue`) => `Promise`<`void`\> |
| `updateStatusPrivacy` | (`value`: `WAPrivacyValue`) => `Promise`<`void`\> |
| `uploadPreKeys` | (`count?`: `number`) => `Promise`<`void`\> |
| `uploadPreKeysToServerIfRequired` | () => `Promise`<`void`\> |
| `upsertMessage` | (`msg`: `IWebMessageInfo`, `type`: `MessageUpsertType`) => `Promise`<`void`\> |
| `user` | `undefined` \| `Contact` |
| `waUploadToServer` | `WAMediaUploadFunction` |
| `waitForConnectionUpdate` | (`check`: (`u`: `Partial`<`ConnectionState`\>) => `undefined` \| `boolean`, `timeoutMs?`: `number`) => `Promise`<`void`\> |
| `waitForMessage` | <T_2\>(`msgId`: `string`, `timeoutMs?`: `number`) => `Promise`<`T_2`\> |
| `waitForSocketOpen` | () => `Promise`<`void`\> |
| `ws` | `any` |

#### Implementation of

[IBot](../interfaces/src__types_bot.IBot.md).[connection](../interfaces/src__types_bot.IBot.md#connection)

#### Defined in

[src/modules/bot.ts:42](https://github.com/kamuridesu/WhatFramework/blob/9b80f30/src/modules/bot.ts#L42)

___

### groupsData

• **groupsData**: [`GroupsData`](../interfaces/src__types_bot.GroupsData.md)

#### Implementation of

[IBot](../interfaces/src__types_bot.IBot.md).[groupsData](../interfaces/src__types_bot.IBot.md#groupsdata)

#### Defined in

[src/modules/bot.ts:52](https://github.com/kamuridesu/WhatFramework/blob/9b80f30/src/modules/bot.ts#L52)

___

### lang

• `Readonly` **lang**: [`Language`](libs_lang_language.Language.md)

#### Implementation of

[IBot](../interfaces/src__types_bot.IBot.md).[lang](../interfaces/src__types_bot.IBot.md#lang)

#### Defined in

[src/modules/bot.ts:51](https://github.com/kamuridesu/WhatFramework/blob/9b80f30/src/modules/bot.ts#L51)

___

### language

• `Readonly` **language**: `string`

#### Implementation of

[IBot](../interfaces/src__types_bot.IBot.md).[language](../interfaces/src__types_bot.IBot.md#language)

#### Defined in

[src/modules/bot.ts:50](https://github.com/kamuridesu/WhatFramework/blob/9b80f30/src/modules/bot.ts#L50)

___

### name

• `Readonly` **name**: `string`

#### Implementation of

[IBot](../interfaces/src__types_bot.IBot.md).[name](../interfaces/src__types_bot.IBot.md#name)

#### Defined in

[src/modules/bot.ts:45](https://github.com/kamuridesu/WhatFramework/blob/9b80f30/src/modules/bot.ts#L45)

___

### ownerNumber

• `Readonly` **ownerNumber**: `string`

#### Implementation of

[IBot](../interfaces/src__types_bot.IBot.md).[ownerNumber](../interfaces/src__types_bot.IBot.md#ownernumber)

#### Defined in

[src/modules/bot.ts:48](https://github.com/kamuridesu/WhatFramework/blob/9b80f30/src/modules/bot.ts#L48)

___

### prefix

• `Readonly` **prefix**: `string`

#### Implementation of

[IBot](../interfaces/src__types_bot.IBot.md).[prefix](../interfaces/src__types_bot.IBot.md#prefix)

#### Defined in

[src/modules/bot.ts:46](https://github.com/kamuridesu/WhatFramework/blob/9b80f30/src/modules/bot.ts#L46)

___

### reconnectOnClose

• **reconnectOnClose**: `boolean`

#### Implementation of

[IBot](../interfaces/src__types_bot.IBot.md).[reconnectOnClose](../interfaces/src__types_bot.IBot.md#reconnectonclose)

#### Defined in

[src/modules/bot.ts:43](https://github.com/kamuridesu/WhatFramework/blob/9b80f30/src/modules/bot.ts#L43)

## Methods

### createPoll

▸ **createPoll**(`ctx`, `pollName`, `options`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`IMessageData`](../interfaces/src__types_messageData.IMessageData.md) |
| `pollName` | `string` |
| `options` | `string`[] |

#### Returns

`Promise`<`boolean`\>

#### Implementation of

[IBot](../interfaces/src__types_bot.IBot.md).[createPoll](../interfaces/src__types_bot.IBot.md#createpoll)

#### Defined in

[src/modules/bot.ts:180](https://github.com/kamuridesu/WhatFramework/blob/9b80f30/src/modules/bot.ts#L180)

___

### getMessage

▸ **getMessage**(`key`): `Promise`<`undefined` \| `IMessage`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `key` | `IMessageKey` |

#### Returns

`Promise`<`undefined` \| `IMessage`\>

#### Implementation of

[IBot](../interfaces/src__types_bot.IBot.md).[getMessage](../interfaces/src__types_bot.IBot.md#getmessage)

#### Defined in

[src/modules/bot.ts:74](https://github.com/kamuridesu/WhatFramework/blob/9b80f30/src/modules/bot.ts#L74)

___

### init

▸ **init**(`messageHandler`): `Promise`<`void`\>

Initiates the bot and starts to handle connections

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `messageHandler` | [`IMessageHandler`](../interfaces/src__types_bot.IMessageHandler.md) | function to handle incoming messages |

#### Returns

`Promise`<`void`\>

#### Implementation of

[IBot](../interfaces/src__types_bot.IBot.md).[init](../interfaces/src__types_bot.IBot.md#init)

#### Defined in

[src/modules/bot.ts:89](https://github.com/kamuridesu/WhatFramework/blob/9b80f30/src/modules/bot.ts#L89)

___

### loadMessage

▸ **loadMessage**(`ctx`): `Promise`<`undefined` \| `IWebMessageInfo` \| [`IMessageData`](../interfaces/src__types_messageData.IMessageData.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `IMessageKey` \| [`MessageData`](src_data_messageData.MessageData.md) |

#### Returns

`Promise`<`undefined` \| `IWebMessageInfo` \| [`IMessageData`](../interfaces/src__types_messageData.IMessageData.md)\>

#### Implementation of

[IBot](../interfaces/src__types_bot.IBot.md).[loadMessage](../interfaces/src__types_bot.IBot.md#loadmessage)

#### Defined in

[src/modules/bot.ts:200](https://github.com/kamuridesu/WhatFramework/blob/9b80f30/src/modules/bot.ts#L200)

___

### replyMedia

▸ **replyMedia**(`ctx`, `media`, `messageType`, `mimeType?`, `mediaCaption?`, `options?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`IMessageData`](../interfaces/src__types_messageData.IMessageData.md) |
| `media` | `string` \| `Buffer` \| [`Media`](../interfaces/src__types_bot.Media.md) |
| `messageType` | `string` |
| `mimeType?` | `string` |
| `mediaCaption?` | `string` |
| `options` | `any` |

#### Returns

`Promise`<`void`\>

#### Implementation of

[IBot](../interfaces/src__types_bot.IBot.md).[replyMedia](../interfaces/src__types_bot.IBot.md#replymedia)

#### Defined in

[src/modules/bot.ts:131](https://github.com/kamuridesu/WhatFramework/blob/9b80f30/src/modules/bot.ts#L131)

___

### replyText

▸ **replyText**(`ctx`, `text`, `options?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`IMessageData`](../interfaces/src__types_messageData.IMessageData.md) |
| `text` | `string` |
| `options` | `any` |

#### Returns

`Promise`<`void`\>

#### Implementation of

[IBot](../interfaces/src__types_bot.IBot.md).[replyText](../interfaces/src__types_bot.IBot.md#replytext)

#### Defined in

[src/modules/bot.ts:126](https://github.com/kamuridesu/WhatFramework/blob/9b80f30/src/modules/bot.ts#L126)

___

### sendTextMessage

▸ **sendTextMessage**(`ctx`, `text`, `options`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `string` \| [`IMessageData`](../interfaces/src__types_messageData.IMessageData.md) |
| `text` | `string` |
| `options` | `any` |

#### Returns

`Promise`<`void`\>

#### Implementation of

[IBot](../interfaces/src__types_bot.IBot.md).[sendTextMessage](../interfaces/src__types_bot.IBot.md#sendtextmessage)

#### Defined in

[src/modules/bot.ts:155](https://github.com/kamuridesu/WhatFramework/blob/9b80f30/src/modules/bot.ts#L155)
