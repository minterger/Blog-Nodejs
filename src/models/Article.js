const { Schema, model } = require('mongoose');

const articleSchema = new Schema({
    title: { type: String, required: true, unique: true },
    titleUrl: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    contentMd: { type: String, required: true },
    category: { type: String, required: true },
    author: { type: String, required: true },
    comments: [{
        name: { type: String, },
        comment: { type: String, },
        date: { type: Date, default: Date.now }
    }]
}, {
    timestamps: true
});

module.exports = model('Article', articleSchema);