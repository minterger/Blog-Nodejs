const { Schema, model } = require('mongoose');
const { ObjectId } = Schema.Types;

const commentSchema = new Schema({
    postId: { type: ObjectId, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    gravatar: { type: String },
    comment: { type: String, required: true }
}, {
    timestamps: true
});

module.exports = model('Comment', commentSchema);