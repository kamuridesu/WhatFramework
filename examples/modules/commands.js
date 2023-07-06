import * as commands from './commandsImpl.js';

async function commandsHandler(bot, command, args, context, group, metadata) {

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
