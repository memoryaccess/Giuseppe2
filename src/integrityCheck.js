// Pros of using discord.js: It's very in depth and a lot is already done for me.
// Cons of using discord.js: Sometimes object properties refuse to exist, so I need to write a module to verify their structure.

const requiredMessageKeys = [
    'channel', 'deleted', 'id', 'type', 'content', 'author', 'member', 'pinned',
    'tts', 'nonce', 'system', 'embeds', 'attachments', 'createdTimestamp',
    'editedTimestamp', 'reactions', 'mentions', 'webhookID', 'hit', '_edits',
]

const requiredMemberKeys = [
    'guild', 'user', 'joinedTimestamp', '_roles', 'serverDeaf', 'serverMute',
    'selfMute', 'selfDeaf', 'voiceSessionID', 'voiceChannelID', 'speaking',
    'nickname', 'lastMessageID', 'lastMessage', 'deleted',
]

const requiredAuthorKeys = [
    'id', 'username', 'discriminator',
    'bot', 'lastMessageID', 'lastMessage',
]

const compareSchema = (arr, target, type, content) => {
    const extras = target.filter((v) => !arr.includes(v))
    if (extras.length > 0) {
        console.log({
            id: content.id,
            type: type,
            extras: extras,
            content: content
        })
        return false
    }
    return true
}

const checkMessageIntegrity = (msg, strict = true) => {
    if (!msg || !msg.id) {
        console.log({
            issue: 'A sent message does not contain an ID.',
            obj: msg
        })
        return false
    }
    if (strict && (!checkMemberIntegrity(msg.member) || !checkAuthorIntegrity(msg.author))) {
        return false
    }
    // Remove null & undefined values from message and compare it to the schema.
    return compareSchema(Object.keys(msg).filter((k) => !!k), requiredMessageKeys, 'message', msg)
}

const checkMemberIntegrity = (member) => {
    if (!member || !member.id) {
        console.log({
            issue: 'A member does not exist.',
            obj: member
        })
        return false
    }
    return compareSchema(Object.keys(member).filter((k) => !!k), requiredMemberKeys, 'member', member)
}

const checkAuthorIntegrity = (author) => {
    if (!author || !author.id) {
        console.log({
            issue: 'An author does not exist.',
            obj: author
        })
        return false
    }
    return compareSchema(Object.keys(author).filter((k) => !!k), requiredAuthorKeys, 'author', author)
}

module.exports = {
    compareSchema,
    checkMessageIntegrity,
    checkMemberIntegrity,
    checkAuthorIntegrity
}
