// Pros of using discord.js: It's very in depth and a lot is already done for me.
// Cons of using discord.js: Sometimes object properties refuse to exist, so I need to write a module to verify their structure.

const mongo = require('./mongo/connect');

const requiredMessageKeys = [
    'channel', 'deleted', 'id', 'type', 'content', 'author', 'member', 'pinned',
    'tts', 'nonce', 'system', 'embeds', 'attachments', 'createdTimestamp',
    'editedTimestamp', 'reactions', 'mentions', 'webhookID', 'hit', '_edits',
];

const requiredMemberKeys = [
    'guild', 'user', 'joinedTimestamp', '_roles', 'serverDeaf', 'serverMute',
    'selfMute', 'selfDeaf', 'voiceSessionID', 'voiceChannelID', 'speaking',
    'nickname', 'lastMessageID', 'lastMessage', 'deleted',
];

const requiredAuthorKeys = [
    'id', 'username', 'discriminator',
    'bot', 'lastMessageID', 'lastMessage',
];

const compareSchema = (arr, target, type, content, serverID) => {
    const extras = target.filter((v) => !arr.includes(v));
    if (extras.length > 0) {
        mongo.log(serverID, 'error', 'Failed to compare object schema.', type, {id: content.id, extras, content: content});
        return false;
    }
    return true;
};

const checkMessageIntegrity = (msg, strict = true, serverID) => {
    if (!msg || !msg.id) {
        mongo.log(serverID, 'error', 'Checking message integrity', 'Message object is not complete', {msg});
        return false;
    }
    if (strict && (!checkObjectIntegrity('member', msg.member, serverID) || !checkObjectIntegrity('author', msg.author, serverID))) {
        return false;
    }
    // Remove null & undefined values from message and compare it to the schema.
    return checkObjectIntegrity('message', msg, serverID);
};

const checkObjectIntegrity = (type, checkObject, serverID) => {
    if (!checkObject || !checkObject.id) {
        mongo.log(serverID, 'error', `Checking ${type} integrity`, `${type} object is not complete`, {checkObject});
        return false;
    }
    const keyType = type === 'member' ? requiredMemberKeys : (type === 'author' ? requiredAuthorKeys : requiredMessageKeys);
    return compareSchema(Object.keys(checkObject).filter((k) => !!k), keyType, type, checkObject, serverID);
};

module.exports = {
    checkMessageIntegrity
};
