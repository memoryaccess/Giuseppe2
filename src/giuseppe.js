const Discord = require('discord.js')
const Enmap = require('enmap')
const fs = require('fs')
const client = new Discord.Client()
const secrets = require('../secrets.json')

client.secrets = secrets

fs.readdir('./src/modules/events/', (err, files) => {
    if (err) return console.error(err)
    files.forEach(file => {
        if (!file.endsWith('.js')) return
        const event = require(`./modules/events/${file}`)
        let eventName = file.split('.')[0]
        client.on(eventName, event.bind(null, client))
        delete require.cache[require.resolve(`./modules/events/${file}`)]
    })
})

client.commands = new Enmap()
fs.readdir('./src/modules/commands/', (err, files) => {
    if (err) return console.error(err)
    files.forEach(file => {
        if (!file.endsWith('.js')) return
        let props = require(`./modules/commands/${file}`)
        let commandName = file.split('.')[0]
        client.commands.set(commandName, props)
    })
})

client.login(secrets.discord.token)
