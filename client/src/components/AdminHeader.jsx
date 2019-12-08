import React from 'react';
import { connect } from 'react-redux';
import { FaGraduationCap, FaSignOutAlt } from 'react-icons/fa';
//
import { logout } from '../utils/actions';


function AdminHeader({ username, logout }) {
  return (
    <header className='w-full h-12 flex flex-row items-center justify-between pl-2 bg-gray-700 text-gray-100'>
      <div className='flex flex-row items-center'>
        <FaGraduationCap className='text-gray-100 text-2xl mx-3' />
        <h1 className='text-2xl font-semibold'>SemestR</h1>
      </div>
      <div className='h-full'>
        <span className='hidden sm:inline'>Logged in as {username}.</span>
        <span className='inline sm:hidden'>{username}</span>
        <button
          className='h-full px-4 underline hover:no-underline focus:no-underline focus:outline-none'
          onClick={logout}>
          <span className='hidden sm:inline'>Logout</span>
          <FaSignOutAlt className='inline sm:hidden' />
        </button>
      </div>
    </header>
  );
}

export default connect(state => ({ username: state.auth.user.username }), { logout })(AdminHeader);
