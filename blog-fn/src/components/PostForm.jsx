import React, { useState, useEffect } from 'react';

const PostForm = ({ onSubmit, initialData = {} }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

 
  useEffect(() => {
    if (initialData.title || initialData.description) {
      setTitle(initialData.title || '');
      setDescription(initialData.description || '');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description });
  };

  return (
    <div className="flex justify-center mt-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-lg w-full max-w-md shadow-md"
      >
        <h2 className="text-xl font-semibold mb-4 text-white">
          {initialData._id ? 'Edit Post' : 'Create a Post'}
        </h2>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-4 px-4 py-2 bg-black text-white border border-gray-600 rounded"
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mb-4 px-4 py-2 bg-black text-white border border-gray-600 rounded h-32"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition duration-200 transform hover:scale-105 shadow-md"
        >
          {initialData._id ? 'Update Post' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default PostForm;
