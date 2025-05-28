import {
  WAMessage,
  WAMessageKey,
  getAggregateVotesInPollMessage,
} from "baileys";
import { PollVoteAggragation } from "../../@types/poll.js";
import { IBot } from "../../@types/types.js";
import { Message } from "../data/message.js";

async function pollParser(
  key: WAMessageKey,
  pollUpdates: Pick<WAMessage, "pollUpdates" | "message">,
  bot: IBot,
): Promise<PollVoteAggragation | undefined> {
  if (!key) {
    return;
  }
  const originalMessage = await bot.loadMessage(key);
  if (
    originalMessage instanceof Message ||
    typeof originalMessage == "undefined"
  ) {
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

export { pollParser };

