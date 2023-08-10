
import { WAMessage, WAMessageKey, getAggregateVotesInPollMessage } from "@whiskeysockets/baileys";
import { PollVoteAggragation } from "../interfaces/pollData.js";
import { IBot } from "../interfaces/types.js";
import { getMessage } from "../modules/bot.js";
import { MessageData } from "../data/messageData.js";



async function pollParser(key: WAMessageKey, pollUpdates: Pick<WAMessage, 'pollUpdates' | 'message'>, bot: IBot): Promise<PollVoteAggragation | undefined> {
    if (!key) {
        return;
    }
    const originalMessage = await bot.loadMessage(key);
    if (originalMessage instanceof MessageData || typeof originalMessage == "undefined") {
        return undefined;
    }
    // console.log(originalMessage?.pollUpdates);
    const message = await getMessage(key);
    // const votes = getAggregateVotesInPollMessage({
    //     message: message,
    //     pollUpdates: pollUpdates
    // });
    // const poll = {
    //     pollName: message.pollCreationMessage?.name,
    //     votes: votes
    // }
    // return poll;
}

export {
    pollParser
}