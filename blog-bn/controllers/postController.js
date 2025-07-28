import Post from '../models/Post.js';


export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};


export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving post', error: err.message });
  }
};


export const createPost = async (req, res) => {
  const { title, description } = req.body;
  const author = req.user?.name || 'Anonymous';

  try {
    const newPost = new Post({
      title,
      description,
      author,
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create post', error: err.message });
  }
};


export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (post.author !== req.user?.name) {
      return res.status(403).json({ message: 'Not authorized to update this post' });
    }

    post.title = title;
    post.description = description;

    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update post', error: err.message });
  }
};


export const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (post.author !== req.user?.name) {
      return res.status(403).json({ message: 'Not authorized to delete this post' });
    }

    await post.deleteOne();
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete post', error: err.message });
  }
};

