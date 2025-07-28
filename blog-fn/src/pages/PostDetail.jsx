import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axios';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        console.error('Error fetching post:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <p className="text-center text-gray-400 mt-10">Loading post...</p>;
  }

  if (!post) {
    return (
      <p className="text-center text-red-400 mt-10">
        Post not found or an error occurred.
      </p>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-gray-800 p-6 rounded-lg shadow-md text-white">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 bg-gray-700 hover:bg-gray-600 text-sm text-white px-4 py-2 rounded transition"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold mb-4 break-words">{post.title}</h1>
      <p className="text-sm text-gray-400 mb-6">Author: {post.author}</p>
      <p className="text-lg whitespace-pre-wrap break-words">{post.description}</p>
    </div>
  );
};

export default PostDetail;
