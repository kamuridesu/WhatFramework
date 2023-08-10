# WhatFramework

An extensible Framework for WhatsApp!

<img src="https://count.kamuridesu.com?username=whatframework" />

## Getting started

### Installing the framework

1. Create a new folder and start the project with `npm init`
2. Install WhatFramework: `npm install --save @kamuridesu/whatframework`

### Creating your EntryPoint file

WhatFramework needs modules to work. A module is made of a file called entrypoint.js file, which has a class `Entrypoint` that has some properties and methods used by the Framework to define how the bot will handle commands and messages.

#### Parameters

The following parameters are needed to start the framework:

1. `prefix`: the commands prefix for your bot;
2. `botName`: the name of the bot;
3. `botNumber`: the number of the bot;
4. `ownerNumber`: Number of the bot owner;

Optional parameters:

5. `language`: Language of the bot. Defaults to en-us;
6. `commandsFilename`: Name of the commands file. The reason for this will be explained later.

#### Methods

We need to define at least the two following methods in our Entrypoin class:

1. `chatHandlers`: Handles any message received by the bot, except those who start with the `prefix` property.
2. `commandHandlers`: Handles any message that starts with the `prefix` property.

Each method will have a different signature:


`chatHandlers` must have the following parameters:

- `bot`: a bot instance;
- `message`: a string with the message;
- `context`: a MessageData instance containing all the data for that message;
- `group`: a GroupData instance holding all the data for a group. If the chat is not a group, the value is `undefined`;
- `metadata`: a ChatMetadata instance containing some meta info for the chat.

`commandHandlers` must have the following parameters:

- `bot`: a bot instance;
- `command`: a string with the command;
- `args`: command arguments, if any;
- `context`: a MessageData instance containing all the data for that message;
- `group`: a GroupData instance holding all the data for a group. If the chat is not a group, the value is `undefined`;
- `metadata`: a ChatMetadata instance containing some meta info for the chat.

You can see an example in [examples](../examples/).

### Helpers

The framework have some libs to help the developer to build their bots.

Helper libs will be available in `whatframework/libs/`.

### Running

After installing WhatFramework and creating your module with the entrypoint, just run the following command:

```bash
npx whatframework
```

You'll be prompted to scan a QR code to login with a phone number. Scan the code and the bot will start.
