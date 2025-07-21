import React from 'react';
import PostForm from '../components/PostForm';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const CreatePost = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async ({ title, description }) => {
    try {
      const token = await user.getIdToken(); 

      await axios.post(
        '/posts',
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      navigate('/'); 
    } catch (err) {
      console.error('Failed to create post:', err.response?.data || err.message);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4 text-white">Create New Post</h2>
      <PostForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreatePost;
