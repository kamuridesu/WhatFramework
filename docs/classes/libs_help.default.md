[@kamuridesu/whatframework](../README.md) / [Modules](../modules.md) / [libs/help](../modules/libs_help.md) / default

# Class: default

[libs/help](../modules/libs_help.md).default

## Table of contents

### Constructors

- [constructor](libs_help.default.md#constructor)

### Properties

- [name](libs_help.default.md#name)
- [commandsFilename](libs_help.default.md#commandsfilename)
- [lang](libs_help.default.md#lang)

### Methods

- [getAllCommands](libs_help.default.md#getallcommands)
- [getCommandComment](libs_help.default.md#getcommandcomment)
- [getCommandsByCategory](libs_help.default.md#getcommandsbycategory)
- [getFileLines](libs_help.default.md#getfilelines)
- [getHelp](libs_help.default.md#gethelp)
- [processCategories](libs_help.default.md#processcategories)

## Constructors

### constructor

• **new default**(`bot`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `bot` | [`Bot`](src_modules_bot.Bot.md) |

#### Defined in

[libs/help.ts:11](https://github.com/kamuridesu/WhatFramework/blob/2f7579d/libs/help.ts#L11)

## Properties

### name

• **name**: `string`

#### Defined in

[libs/help.ts:8](https://github.com/kamuridesu/WhatFramework/blob/2f7579d/libs/help.ts#L8)

___

### commandsFilename

• **commandsFilename**: `string`

#### Defined in

[libs/help.ts:7](https://github.com/kamuridesu/WhatFramework/blob/2f7579d/libs/help.ts#L7)

___

### lang

• **lang**: [`Language`](libs_lang_language.Language.md)

#### Defined in

[libs/help.ts:9](https://github.com/kamuridesu/WhatFramework/blob/2f7579d/libs/help.ts#L9)

## Methods

### getAllCommands

▸ **getAllCommands**(): `Promise`<`string`\>

#### Returns

`Promise`<`string`\>

#### Defined in

[libs/help.ts:21](https://github.com/kamuridesu/WhatFramework/blob/2f7579d/libs/help.ts#L21)

___

### getCommandComment

▸ **getCommandComment**(): `Promise`<{ `[key: string]`: { `description`: `string`  };  }\>

#### Returns

`Promise`<{ `[key: string]`: { `description`: `string`  };  }\>

#### Defined in

[libs/help.ts:93](https://github.com/kamuridesu/WhatFramework/blob/2f7579d/libs/help.ts#L93)

___

### getCommandsByCategory

▸ **getCommandsByCategory**(): `Promise`<`string`\>

#### Returns

`Promise`<`string`\>

#### Defined in

[libs/help.ts:62](https://github.com/kamuridesu/WhatFramework/blob/2f7579d/libs/help.ts#L62)

___

### getFileLines

▸ **getFileLines**(): `Promise`<`string`[]\>

#### Returns

`Promise`<`string`[]\>

#### Defined in

[libs/help.ts:32](https://github.com/kamuridesu/WhatFramework/blob/2f7579d/libs/help.ts#L32)

___

### getHelp

▸ **getHelp**(`cmd_name`): `Promise`<`undefined` \| `string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `cmd_name` | `string` |

#### Returns

`Promise`<`undefined` \| `string`\>

#### Defined in

[libs/help.ts:118](https://github.com/kamuridesu/WhatFramework/blob/2f7579d/libs/help.ts#L118)

___

### processCategories

▸ **processCategories**(): `Promise`<[{ `end?`: `number` ; `name`: `string` ; `start`: `number`  }[], `number`[]]\>

#### Returns

`Promise`<[{ `end?`: `number` ; `name`: `string` ; `start`: `number`  }[], `number`[]]\>

#### Defined in

[libs/help.ts:38](https://github.com/kamuridesu/WhatFramework/blob/2f7579d/libs/help.ts#L38)
