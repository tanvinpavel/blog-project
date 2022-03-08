const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        trim: true,
        maxlength: 15,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        maxlength: 40,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    profile: {
        type: Schema.Types.ObjectId,
        ref: 'Profile'
    }
},{
    timestamps: true,
});

module.exports = model('user', UserSchema);

