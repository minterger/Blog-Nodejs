const { Schema, model } = require('mongooseose');
const { ObjectId } = Schema;

const commentSchema = new Schema({
    postId: { type: ObjectId, required: true },
    name: { type: String, required: true },
    gravatar: { type: String },
    email: { type: String, required: true },
    comment: { type: String, required: true }
}, {
    timestamps: true
});

module.exports = model('Comment', commentSchema);