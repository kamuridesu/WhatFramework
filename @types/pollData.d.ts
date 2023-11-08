interface VoteAggregation {
    name: string
    voters: Array<string>
}

interface PollVoteAggragation {
    pollName: string | null | undefined
    votes: VoteAggregation[]
}

export {
    VoteAggregation,
    PollVoteAggragation
}