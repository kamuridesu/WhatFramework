
import { WAMessage, WAMessageKey, getAggregateVotesInPollMessage } from "@whiskeysockets/baileys";
import { PollVoteAggragation } from "../@types/pollData.js";
import { IBot } from "../@types/types.js";
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
    const message = await bot.getMessage(key);
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