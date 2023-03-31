# WhatsApp Bot Framework

An extensible Framework for WhatsApp!

<img src="https://count.kamuridesu.com?username=whatframework" />

# Usage

## Install the framework:

```sh
npm install --save whatframework
```

## Create your entrypoint:

The framework requires you to create a `modules` folder and, inside that folder, an `entrypoint.js` file.

The class may hold the following informations:

- `botName`: name of the bot that will be presented sometimes;
- `prefix`: prefix for the bot commands;
- `botNumber`: number of the bot;
- `ownerNumber`: number of the owner;
- `commandsFilename`: path for your commands, check [examples](examples/modules/);
- `language`: language of the bot, supported are: pt-br, en-us, defaults to en-us.

The file must contain a class `Entrypoint` with two methods, `commandHandlers` and `chatHandlers`.

### `chatHandlers`

`chatHandlers` must have the following parameters:

- `bot`: a bot instance;
- `message`: a string with the message;
- `context`: a MessageData instance containing all the data for that message;
- `group`: a GroupData instance holding all the data for a group. If the chat is not a group, the value is `undefined`;
- `metadata`: a ChatMetadata instance containing some meta info for the chat.

### `commandHandlers`

`commandHandlers` must have the following parameters:

- `bot`: a bot instance;
- `command`: a string with the command;
- `args`: command arguments, if any;
- `context`: a MessageData instance containing all the data for that message;
- `group`: a GroupData instance holding all the data for a group. If the chat is not a group, the value is `undefined`;
- `metadata`: a ChatMetadata instance containing some meta info for the chat.

## Helpers

The bot will have some libs to help the developer to build their bots. The first is a function called `createSticker`, which creates a sticker from a media message, then sends it.

Helper libs will be available in `whatframework/libs/`

Documentation will be in [examples](examples/libs/).

## Running

You can run it with the following command:

```sh
npx whatframework
```
