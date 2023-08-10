[@kamuridesu/whatframework](../README.md) / [Modules](../modules.md) / src/funcs/networking

# Module: src/funcs/networking

## Table of contents

### Functions

- [saveTempFile](src_funcs_networking.md#savetempfile)
- [sendRequest](src_funcs_networking.md#sendrequest)

## Functions

### saveTempFile

▸ **saveTempFile**(`content`, `extension?`): `Promise`<`string`\>

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `content` | `Buffer` \| `Transform` | `undefined` |
| `extension` | `string` | `""` |

#### Returns

`Promise`<`string`\>

#### Defined in

[src/funcs/networking.ts:28](https://github.com/kamuridesu/WhatFramework/blob/9d3db65/src/funcs/networking.ts#L28)

___

### sendRequest

▸ **sendRequest**(`url`, `options?`): `Promise`<`Buffer` \| { `error`: `any`  }\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `url` | `string` |
| `options` | `RequestOptions` |

#### Returns

`Promise`<`Buffer` \| { `error`: `any`  }\>

#### Defined in

[src/funcs/networking.ts:14](https://github.com/kamuridesu/WhatFramework/blob/9d3db65/src/funcs/networking.ts#L14)
