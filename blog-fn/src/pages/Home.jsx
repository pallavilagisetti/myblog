import React, { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import { useAuth } from '../context/AuthContext';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  
  const fetchPosts = async () => {
    try {
      const res = await axios.get('/posts');
      setPosts(res.data);
    } catch (err) {
      console.error('Failed to fetch posts:', err);
    }
  };

 
  const handleDelete = async (id) => {
    try {
      const token = await user.getIdToken(); 
      await axios.delete(`/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts((prev) => prev.filter((post) => post._id !== id));
    } catch (err) {
      console.error('Failed to delete post:', err.response?.data || err.message);
    }
  };


  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  useEffect(() => {
    if (user) {
      fetchPosts();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="text-center mt-10">
        <p className="text-gray-400">Checking login status...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-xl text-gray-300">
          Please log in to view posts and create your own.
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 mt-8">
      <h2 className="text-3xl font-bold mb-6 text-white">Latest Posts</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.length === 0 ? (
          <p className="text-gray-400">No posts found.</p>
        ) : (
          posts.map((post) => (
            <PostCard
              key={post._id}
              title={post.title}
              description={post.description}
              author={post.author}
              currentUserName={user.displayName}
              onDelete={() => handleDelete(post._id)}
              onEdit={() => handleEdit(post._id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
