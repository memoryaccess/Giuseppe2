let mongoose = require('mongoose')
let Schema = mongoose.Schema

let actionLogSchema = new Schema({
    type: String,
    action: String,
    issue: String,
    timestamp: {
        type: Date,
        default: Date.now
    },
    data: Object,
})

module.exports = actionLogSchema
