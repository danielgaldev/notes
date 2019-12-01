import React from 'react';
import useAxios from 'axios-hooks';
import { Link } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';

export default function SemesterListItem({ semester, update }) {
  function validateStatus(status) {
    if (status >= 200 && status < 300) {
      update();
      return true;
    } else {
      return false;
    }
  }

  const [, execute] = useAxios({
    url: `/api/v1/semesters/${semester.id}/`,
    method: 'DELETE',
    validateStatus
  }, { manual: true });

  return (
    <li className='w-full sm:w-64 m-3 border border-gray-300 hover:border-purple-800 flex flex-row items-middle justify-between'>
      <Link className='flex items-center flex-auto' to={`/semesters/${semester.id}`}>
        <span className='flex items-center justify-center pl-3'>{semester.number}. semester</span>
      </Link>
      <button className='z-10 hover:bg-red-500 flex flex-row items-center p-2 h-full' onClick={execute}>
        <FaTrashAlt className='text-gray-800 text-sm' />
        <span className='pl-1 text-gray-800 text-sm'>Delete</span>
      </button>
    </li>
  );
}
