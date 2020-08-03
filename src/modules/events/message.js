// eslint-disable-next-line no-unused-vars
const Discord = require('discord.js');
// const mongo = require('../../mongo/connect')
const integrityCheck = require('../../integrityCheck');

/**
 * @param {Discord.Client} client bot client
 * @param {Discord.Message} message received message
 */
module.exports = (client, message) => {

    if (message.author.bot) return;

    const serverID = message.guild.id || 'general';

    if (!integrityCheck.checkMessageIntegrity(message, serverID)) return;


    if (message.content.indexOf(client.secrets.discord.prefix) !== 0) return;

    const args = message.content.slice(client.secrets.discord.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command);

    if (!cmd) return;

    cmd.run(client, message, args);

};
