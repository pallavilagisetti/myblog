import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PostForm from '../components/PostForm';
import axios from '../api/axios';
import { auth } from '../firebase/firebase';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/posts/${id}`);
        setInitialData(res.data);
      } catch (err) {
        console.error('Error fetching post:', err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleUpdate = async ({ title, description }) => {
    try {
      const token = await auth.currentUser.getIdToken();
      await axios.put(`/posts/${id}`, { title, description }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate('/');
    } catch (err) {
      console.error('Error updating post:', err.response?.data || err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-400 text-lg">Loading post...</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10">
      {initialData ? (
        <>
          <h2 className="text-2xl font-bold mb-4 text-white">Edit Post</h2>
          <PostForm
            initialData={initialData}
            onSubmit={handleUpdate}
          />
        </>
      ) : (
        <p className="text-center text-red-400">Post not found.</p>
      )}
    </div>
  );
};

export default EditPost;
