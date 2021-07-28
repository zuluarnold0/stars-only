const express = require('express');
const router = new express.Router();

const Post = require('../models/post');
const auth = require('../middleware/auth');

//0. create comment
router.post('/posts/comment/:id', auth, async (req, res) => {
    try {
        if (!req.body.comment) {
            return res.status(400).json({ message: 'Text is required' });
        }
        const post = await Post.findOne({ _id: req.params.id });
        
        if (!post)
            return res.status(404).json({ message: 'Post not found' });
        
        const newComment = {
            author: req.user._id,
            comment: req.body.comment
        }
        post.comments.unshift(newComment);

        const savedPost = await post.save();
        res.status(200).json({ 
            post: { 
                ...savedPost,
                firstname: req.user.firstname, 
                lastname: req.user.lastname,
                profile_pic: req.user.profile_pic
            }
        });
    }
    catch(e) {
        res.status(500).json({ message: 'Server error' });
    }
});

// 1. fetch posts
router.get('/posts', auth, async (req, res) => {
    try {
        const postUsers = req.user.followings.map(async(id) => {
            return await User.findOne({ _id: id })
        });

        const allPostUsers = [...postUsers, req.user];

        const allPosts = allPostUsers.map(async(user) => {
            const posts = await Post.find({ authorId: user._id });
            const post = posts.map((post) => {
                return {
                    ...post,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    profile_pic: user.profile_pic
                }
            })
            return post;
        })
            
        if (!allPosts.length)
            return res.status(404).json({ message: 'No posts found' });

        const posts = allPosts.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));

        res.status(200).json({ posts });
    }
    catch(e) {
        return res.status(500).json({ message: 'Server error'});
    }
});

// 3.create post
router.post('/posts', auth, async (req, res) => {
    try {
        const img = !req.body.post_img  ? '' : req.body.post_img;
        const post = new Post({
            authorId: req.user._id,
            content: req.body.content,
            post_img: img
        });
        await post.save();

        //same logic as get posts
        
        const postUsers = req.user.followings.map(async(id) => {
            return await User.findOne({ _id: id }); //////////
        }); 

        //
        const allPostUsers = [...postUsers, req.user];

        const allPosts = allPostUsers.map(async(user) => {
            const posts = await Post.find({ authorId: user._id }); ///////
            const post = posts.map((post) => {
                return {
                    ...post,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    profile_pic: user.profile_pic
                }
            })
            return post;
        })
            
        if (!allPosts.length)
            return res.status(404).json({ message: 'No posts found' });
        //sort posts
        const posts = allPosts.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));

        res.status(200).json({ posts });
    }
    catch(e) {
        res.status(500).json({ message: 'Server error' });
    }
})


//4. fetch my posts
router.get('/posts/current/userposts',/*auth*/ async (req, res) => {
    try {
        const posts = await Post.find({ authorId: req.user._id }).sort({ date: -1 });
        if (!posts) {
            return res.status(404).json({ message: 'No posts found' });
        }

        const myPosts = posts.map((post) => {
            return {
                ...post,
                firstname: req.user.firstname,
                lastname: req.user.lastname,
                profile_pic: req.user.profile_pic
            }
        })
        res.status(200).json({ posts: myPosts });
    }
    catch(e) {
        return res.status(500).json({ message: 'Server error'});
    }
});

//5. get a single post
router.get('/posts/:id', auth, async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.id });
        if (!post)
            return res.status(404).json({ message: 'Post not found!' });
        
        const postAuth = await User.findOne({ _id: post.authorId });

        const commentingUsers = post.comments.map(async(comment) => {
            const user = await User.findOne({ _id: comment.author });
            return {
                ...comment,
                commentUserFirstname: user.firstname,
                commentUserProfile_pic: user.profile_pic
            }
        });
            
        post.comments = commentingUsers;

        const userPost = {
            ...post,
            firstname: postAuth.firstname,
            lastname: postAuth.lastname,
            profile_pic: postAuth.profile_pic
        }
        res.status(200).json({ post: userPost });
    }
    catch(e) {
        return res.status(500).json({ message: 'Server error'});
    }
});


//6. delete post 
router.delete('/posts/:id', auth, async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.id });
        
        if (!post)
            return res.status(404).json({ message: 'Post not found!' });

        if (post.authorId !== req.user._id)
            return res.status(400).json({ message: 'User not authorized' });
        
        await post.remove();

        //code from fetch posts
        const postUsers = req.user.followings.map(async(id) => await User.find({ _id: id }));

        const allPostUsers = [...postUsers, req.user];

        const allPosts = allPostUsers.map(async(user) => {
            const posts = await Post.find({ authorId: user._id });
            const post = posts.map((post) => {
                return {
                    ...post,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    profile_pic: user.profile_pic
                }
            })
            return post;
        })
            
        if (!allPosts.length)
            return res.status(404).json({ message: 'No posts found' });

        const posts = allPosts.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));

        res.status(200).json({ posts, message: 'Post deleted successfully' });
    }
    catch(e) {
        res.status(500).json({ message: 'Server error'});
    }
});


//7. like post 
router.put('/posts/:id/like', auth, async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.id });
        
        if (!post)
            return res.status(404).json({ message: 'Post not found!' });

        const liked = post.likes.filter((id) => id === req.user._id);
        
        if (liked.length > 0) {
            const removeIndex = post.likes.map((id) => id).indexOf(req.user._id);
            post.likes.splice(removeIndex, 1);
        } else {
            post.likes.unshift(req.user._id);
        }
        await post.save();
        res.status(200).json({ post });
    }
    catch(e) {
        res.status(500).json({ message: 'Server error'});
    }
});

module.exports = router;