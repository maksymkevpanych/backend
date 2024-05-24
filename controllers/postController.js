const Post = require('../models/Post');

exports.createPost = async (req, res) => {
    try {
        const newPost = new Post({
            user: req.user.id,
            content: req.body.content
        });

        const post = await newPost.save();
        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('user', ['username']);
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('user', ['username']);
        if (!post) {
            return res.status(404).json({ msg: 'Post not found' });
        }
        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
