const Discord = require('discord.js') // eslint-disable-line no-unused-vars
// const mongo = require('../../mongo/connect')
const integrityCheck = require('../../integrityCheck')

const badWords = ['braed', 'no hugs', 'exploit', 'crack', 'nigger', 'faggot', 'nigga', 'fag ', 'synapse', 'nig ', 'discord.gg/', 'discord.com/invite/', 'discordapp.com/invite/', 'phantom', 'ph4ntom']
const sworeFilter = new RegExp(badWords.join('|'), 'gi')

const hasBadWord = (message) => {
    //TODO: Better permissions system configurable per-server.
    if (message.member.hasPermission('KICK_MEMBERS')) return false
    return sworeFilter.test(message.content)
}

/**
 * @param {Discord.Client} client bot client
 * @param {Discord.Message} message received message
 */
module.exports = (client, message) => {

    if (!integrityCheck.checkMessageIntegrity(message)) return
    if (message.author.bot) return

    if(hasBadWord(message)){
        //TODO: Log the message the deleted/edited channel, but replace the swores with [deleted]
        return message.delete()
    }

    // commands below :^))))

    if (message.content.indexOf(client.secrets.discord.prefix) !== 0) return

    const args = message.content.slice(client.secrets.discord.prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase()

    const cmd = client.commands.get(command)

    if (!cmd) return

    cmd.run(client, message, args)

}
