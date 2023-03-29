class Entrypoint {
    async chatHandlers(bot, message, context, group, metadata) {
        if (message === "test") {
            bot.replyText(context, "YEEEEEEy");
        }
    }

    async commandHandlers(bot, message, context, group, metadata) {
        // In this case, message can be also command to diferentiate the methods.
        if (message === "test") {
            bot.replyText(context, "YEEEEEEy");
        }
    }
}

export {
    Entrypoint
};
