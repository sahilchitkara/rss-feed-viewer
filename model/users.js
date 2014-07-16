var mongoose = require('mongoose')

// Schema
var UserSchema = mongoose.Schema({
    email: { type: String, required: true, index: { unique: true }},
    password: {type: String, required: true},
    feeds: { type: Array, default: []}
}, { autoIndex: true, collection: 'users' });

// Export Model
module.exports = mongoose.model('User', UserSchema);
