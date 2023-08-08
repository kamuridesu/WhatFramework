[@kamuridesu/whatframework](../README.md) / [Modules](../modules.md) / [src/types/bot](../modules/src_types_bot.md) / Bot

# Interface: Bot

[src/types/bot](../modules/src_types_bot.md).Bot

## Implemented by

- [`Bot`](../classes/src_modules_bot.Bot.md)

## Table of contents

### Properties

- [botName](src_types_bot.Bot.md#botname)
- [botNumber](src_types_bot.Bot.md#botnumber)
- [commandsFilename](src_types_bot.Bot.md#commandsfilename)
- [connection](src_types_bot.Bot.md#connection)
- [groupsData](src_types_bot.Bot.md#groupsdata)
- [lang](src_types_bot.Bot.md#lang)
- [language](src_types_bot.Bot.md#language)
- [ownerNumber](src_types_bot.Bot.md#ownernumber)
- [prefix](src_types_bot.Bot.md#prefix)
- [reconnectOnClose](src_types_bot.Bot.md#reconnectonclose)

### Methods

- [createPoll](src_types_bot.Bot.md#createpoll)
- [init](src_types_bot.Bot.md#init)
- [loadMessage](src_types_bot.Bot.md#loadmessage)
- [replyMedia](src_types_bot.Bot.md#replymedia)
- [replyText](src_types_bot.Bot.md#replytext)
- [sendTextMessage](src_types_bot.Bot.md#sendtextmessage)

## Properties

### botName

• `Readonly` **botName**: `string`

#### Defined in

[src/types/bot.ts:55](https://github.com/kamuridesu/WhatFramework/blob/01ee173/src/types/bot.ts#L55)

___

### botNumber

• `Readonly` **botNumber**: `string`

#### Defined in

[src/types/bot.ts:57](https://github.com/kamuridesu/WhatFramework/blob/01ee173/src/types/bot.ts#L57)

___

### commandsFilename

• `Readonly` **commandsFilename**: `string`

#### Defined in

[src/types/bot.ts:59](https://github.com/kamuridesu/WhatFramework/blob/01ee173/src/types/bot.ts#L59)

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
| `ws` | `MobileSocketClient` \| `WebSocketClient` |

#### Defined in

[src/types/bot.ts:53](https://github.com/kamuridesu/WhatFramework/blob/01ee173/src/types/bot.ts#L53)

___

### groupsData

• **groupsData**: [`GroupsData`](src_types_bot.GroupsData.md)

#### Defined in

[src/types/bot.ts:63](https://github.com/kamuridesu/WhatFramework/blob/01ee173/src/types/bot.ts#L63)

___

### lang

• `Readonly` **lang**: [`Language`](../classes/libs_lang_language.Language.md)

#### Defined in

[src/types/bot.ts:61](https://github.com/kamuridesu/WhatFramework/blob/01ee173/src/types/bot.ts#L61)

___

### language

• `Readonly` **language**: `string`

#### Defined in

[src/types/bot.ts:60](https://github.com/kamuridesu/WhatFramework/blob/01ee173/src/types/bot.ts#L60)

___

### ownerNumber

• `Readonly` **ownerNumber**: `string`

#### Defined in

[src/types/bot.ts:58](https://github.com/kamuridesu/WhatFramework/blob/01ee173/src/types/bot.ts#L58)

___

### prefix

• `Readonly` **prefix**: `string`

#### Defined in

[src/types/bot.ts:56](https://github.com/kamuridesu/WhatFramework/blob/01ee173/src/types/bot.ts#L56)

___

### reconnectOnClose

• **reconnectOnClose**: `boolean`

#### Defined in

[src/types/bot.ts:62](https://github.com/kamuridesu/WhatFramework/blob/01ee173/src/types/bot.ts#L62)

## Methods

### createPoll

▸ **createPoll**(`ctx`, `poolName`, `options`): `Promise`<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`MessageData`](../classes/src_types_messageData.MessageData.md) |
| `poolName` | `string` |
| `options` | `string`[] |

#### Returns

`Promise`<`boolean`\>

#### Defined in

[src/types/bot.ts:80](https://github.com/kamuridesu/WhatFramework/blob/01ee173/src/types/bot.ts#L80)

___

### init

▸ **init**(`messageHandler`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `messageHandler` | [`MessageHandler`](src_types_bot.MessageHandler.md) |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/types/bot.ts:65](https://github.com/kamuridesu/WhatFramework/blob/01ee173/src/types/bot.ts#L65)

___

### loadMessage

▸ **loadMessage**(`ctx`): `Promise`<`undefined` \| `IWebMessageInfo` \| [`MessageData`](../classes/src_types_messageData.MessageData.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `IMessageKey` \| [`MessageData`](../classes/src_types_messageData.MessageData.md) |

#### Returns

`Promise`<`undefined` \| `IWebMessageInfo` \| [`MessageData`](../classes/src_types_messageData.MessageData.md)\>

#### Defined in

[src/types/bot.ts:79](https://github.com/kamuridesu/WhatFramework/blob/01ee173/src/types/bot.ts#L79)

___

### replyMedia

▸ **replyMedia**(`ctx`, `media`, `messageType`, `mimeType?`, `mediaCaption?`, `options?`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`MessageData`](../classes/src_types_messageData.MessageData.md) |
| `media` | `string` \| [`Media`](src_types_bot.Media.md) |
| `messageType` | `string` |
| `mimeType?` | `string` |
| `mediaCaption?` | `string` |
| `options?` | `any` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/types/bot.ts:68](https://github.com/kamuridesu/WhatFramework/blob/01ee173/src/types/bot.ts#L68)

___

### replyText

▸ **replyText**(`ctx`, `text`, `options`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | [`MessageData`](../classes/src_types_messageData.MessageData.md) |
| `text` | `string` |
| `options` | `any` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/types/bot.ts:67](https://github.com/kamuridesu/WhatFramework/blob/01ee173/src/types/bot.ts#L67)

___

### sendTextMessage

▸ **sendTextMessage**(`ctx`, `text`, `options`): `Promise`<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `ctx` | `string` \| [`MessageData`](../classes/src_types_messageData.MessageData.md) |
| `text` | `string` |
| `options` | `any` |

#### Returns

`Promise`<`void`\>

#### Defined in

[src/types/bot.ts:77](https://github.com/kamuridesu/WhatFramework/blob/01ee173/src/types/bot.ts#L77)
