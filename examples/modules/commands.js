import * as commands from './commandsImpl.js';

async function commandsHandler(bot, message, context, group, metadata) {
    const command = message.split('/')[1].split(" ")[0].toLowerCase(); // get the command
    if (command.length == 0) return; // if the command is empty, return
    const args = message.split(" ").slice(1); // get the arguments (if any) from the command
    // i want this processing to be done before handing control to Entrypoint.commandsHandlers

    switch (command) {

        /* %$INFO$% */

        case "start":
            // comment="retorna uma apresentação do bot"
            return await commands.start(context, bot);

        case "help":
            // comment="retorna um menu de comandos, envie um comando para saber mais sobre o mesmo, ex: /ajuda ajuda"
        case "menu":
          // comment="retorna um menu de comandos, envie um comando para saber mais sobre o mesmo, ex: /menu menu"
            return await commands.help(context, bot, args);

        /* %$ENDINFO$% */

    }
}

export { commandsHandler };
