const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    authorId: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        trim: true,
        default: ''
    },
    comments: [
        {      
            author: {
                type: String,
                required: true
            },
            comment: {
                type: String,
                trim: true,
                required: true
            },
            date: {
                type: Date,
                default: Date.now()
            }
        }
    ],
    likes: {
        type: Array,
        default: []
    },
    post_img: {
        type: String,
        default: ''
    }
}, {
    timestamps: true
})

const Post = mongoose.model('Post', postSchema);

module.exports = Post;