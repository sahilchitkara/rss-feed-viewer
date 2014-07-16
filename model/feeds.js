var mongoose = require('mongoose')

// Schema
var RssFeedSchema = mongoose.Schema({
    name: { type: String, required: true },
    link: {type: String}
}, { autoIndex: true, collection: 'feeds' });

// Export Model
module.exports = mongoose.model('Feed', RssFeedSchema);
