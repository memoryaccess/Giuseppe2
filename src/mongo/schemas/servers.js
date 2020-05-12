let mongoose = require('mongoose')
let Schema = mongoose.Schema

let serversSchema = new Schema({
    serverId: String,
    logs: {
        type: Array,
        default: {
            type: String,
            action: String,
            issue: String,
            timestamp: {
                type: Date,
                default: new Date()
            },
            data: Object,
        }
    }
})

module.exports = serversSchema