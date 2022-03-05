const {Schema, model} = require('mongoose');

const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    name: {
        type: String,
        trim: true,
        required: true,
    },
    title: {
        type: String,
        trim: true,
        maxlength: 300,
    },
    bio: {
        type: String,
        trim: true,
        maxlength: 600
    },
    profilePic: {
        type: String,
        trim: true
    },
    links: {
        website: String,
        facebook: String,
        twitter: String,
        github: String,
    },
    post: [{
        type: Schema.Types.ObjectId,
        ref: 'post',
    }],
    bookmark: [{
        type: Schema.Types.ObjectId,
        ref: 'post',
    }]
},{
    timestamps: true,
});

const profileModel = model('profile', ProfileSchema);

module.exports = profileModel;