import Help from 'whatframework/libs/help.js'


async function start(context, bot) {
    return await bot.replyText(context, "Hey! I'm" + bot.botName + "!\nNice to meet you");
}


async function help(data, bot, args) {
    const helper = new Help(bot);
    if (args.length >= 1) {
        const command_name = args[0];
        const command_data = await helper.getHelp(command_name);
        if (!command_data) return await bot.replyText(data, "This command does not exists or the description is empty!");
        return await bot.replyText(data, command_data);
    }
    return await bot.replyText(data, await helper.getCommandsByCategory());
}

export {
    start, help
};
