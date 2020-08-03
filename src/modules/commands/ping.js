exports.run = (client, message, args) => { // eslint-disable-line no-unused-vars
    message.channel.send('pong!').catch(console.error);
};
