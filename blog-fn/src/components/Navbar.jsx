import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, loginWithGoogle, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center">
      {}
      <div>
        <h1 className="text-2xl font-bold">BlogSite</h1>
        {user && (
          <p className="text-sm text-gray-300">Hello, {user.displayName}</p>
        )}
      </div>

      {}
      <ul className="flex gap-6 items-center">
        <li>
          <Link
            to="/"
            className="hover:text-blue-400 transition duration-200 transform hover:scale-110"
          >
            Home
          </Link>
        </li>

        {user && (
          <li>
            <Link
              to="/create"
              className="hover:text-blue-400 transition duration-200 transform hover:scale-110"
            >
              Create Post
            </Link>
          </li>
        )}

        <li>
          {!user ? (
            <button
              onClick={loginWithGoogle}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition duration-200 hover:scale-105"
            >
              Login with Google
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded transition duration-200 hover:scale-105"
            >
              Logout
            </button>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
