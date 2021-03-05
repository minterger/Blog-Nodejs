const { Schema, model } = require('mongoose');
const mongoosePagination = require('mongoose-paginate-v2')

const articleSchema = new Schema({
    title: { type: String, required: true, unique: true },
    titleUrl: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    contentMd: { type: String, required: true },
    category: { type: String, required: true },
    author: { type: String, required: true }
}, {
    timestamps: true
});

articleSchema.plugin(mongoosePagination);

module.exports = model('Article', articleSchema);