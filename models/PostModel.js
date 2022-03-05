const {Schema, model} = require('mongoose');

//title, body, author, tags, thumbnails, readTime, likes, dislikes, comments
const profile = require('./ProfileModel');
const comment = require('./CommentModel');
const user = require('./UserModel');

const PostSchema = new Schema({
    title: {
        type: String,
        trim: true,
        maxlength: 500,
        required: true,
    },
    body: {
        type: String,
        trim: true,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: profile,
        required: true,
    },
    tags: {
        type: [String],
        required: true,
        trim: true,
    },
    thumbnails: String,
    readTime: {
        type: Number,   
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: user,
    }],
    dislike: [{
        type: Schema.Types.ObjectId,
        ref: user,
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: comment,
    }]
},{
    timestamps: true,
});

const postModel = model('post', PostSchema);

module.exports = postModel;