const Discord = require('discord.js') // eslint-disable-line no-unused-vars
const mongo = require('../../mongo/connect')

/**
 * @param {Discord.Client} client bot client
 */
module.exports = (client) => {

    mongo.connect()
    console.log(`Connected. ${client.user.tag}!`)

}
