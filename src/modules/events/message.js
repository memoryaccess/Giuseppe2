const Discord = require('discord.js') // eslint-disable-line no-unused-vars

/**
 * @param {Discord.Client} client bot client
 * @param {Discord.Message} message received message
 */
module.exports = (client, message) => {

    if (message.author.bot) return
    if (message.content.indexOf(client.secrets.discord.prefix) !== 0) return

    const args = message.content.slice(client.secrets.discord.prefix.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase()

    const cmd = client.commands.get(command)

    if (!cmd) return

    cmd.run(client, message, args)

}
