const {Schema, model} = require('mongoose');
const user = require('./UserModel');
const post = require('./PostModel');

const CommentSchema = new Schema({
    post: {
        type: Schema.Types.ObjectId,
        ref: post,
        required: true,
    },
    body: {
        type: String,
        require: true,
        trim: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: user,
        required: true,
    },
    //repliers_id, comment_id, body, likes, dislike,
    replies: [{
        id: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        body: {
            type: String,
            trim: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        }
    }]
},{
    timestamps: true,
});

const commentModel = model('comment', CommentSchema);

module.exports = commentModel;