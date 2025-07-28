import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PostCard = ({ _id, title, description, author, onEdit, onDelete, currentUserName }) => {
  const isAuthor = currentUserName === author;
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const MAX_CHARS = 80;

  const toggleExpanded = (e) => {
    e.stopPropagation(); // prevent card click
    setExpanded((prev) => !prev);
  };

  const renderDescription = () => {
    if (description.length <= MAX_CHARS) return description;

    return expanded ? (
      <>
        {description}
        <button onClick={toggleExpanded} className="text-blue-400 ml-2 text-sm underline">
          Show Less
        </button>
      </>
    ) : (
      <>
        {description.slice(0, MAX_CHARS)}...
        <button onClick={toggleExpanded} className="text-blue-400 ml-2 text-sm underline">
          Read More
        </button>
      </>
    );
  };

  const handleCardClick = () => {
    navigate(`/post/${_id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-gray-800 text-white p-4 rounded shadow-md border border-gray-700 cursor-pointer hover:shadow-lg transition"
    >
      <h3 className="text-xl font-semibold mb-2 break-words">{title}</h3>
      <p className="mb-2 break-words">{renderDescription()}</p>
      <p className="text-sm text-gray-400 mb-2">Author: {author}</p>

      {isAuthor && (
        <div className="flex justify-between mt-4" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={onEdit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-full text-sm shadow-sm transition duration-200"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-full text-sm shadow-sm transition duration-200"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default PostCard;
