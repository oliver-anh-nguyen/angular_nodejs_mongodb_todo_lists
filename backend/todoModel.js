const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    title: String,
    description: String,
    timestamp: {type: Number, default: Date.now},
    completed: {type: Boolean, default: false}
})

module.exports = mongoose.model('Todo', Schema);