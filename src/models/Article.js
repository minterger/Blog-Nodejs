const {Schema, model} = require('mongoose');

const articleSchema = new Schema({
    title: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    descriptionMd: {type: String, required: true},
    author: {type: String, required: true},
    comments: [{ 
        name: {type: String, required: true},
        comment: {type: String, required: true},
        date: {type: Date, default: Date.now}
    }]
}, {
    timestamps: true
});

module.exports = model('Article', articleSchema);