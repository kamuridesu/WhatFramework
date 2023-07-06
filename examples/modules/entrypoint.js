import { commandsHandler } from "./commands.js";


class Entrypoint {
    prefix = "!"
    botNumber = "55YYXXXXXXXX";
    ownerNumber = "55YYXXXXXXXX";
    botName = "ExampleBot";
    language = "en-us";
    commandsFilename = "./commands.js";
 
    async chatHandlers(bot, message, context, group, metadata) {
        if (message === "test") {
            bot.replyText(context, "YEEEEEEy");
        }
    }

    async commandHandlers(bot, message, context, group, metadata) {
        // In this case, message can be also command to diferentiate the methods.
        commandsHandler(bot, message, context, group, metadata);
    }
}

export {
    Entrypoint
};
