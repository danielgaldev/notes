import React from 'react';
import useAxios from 'axios-hooks';
import { FaPlus } from 'react-icons/fa';
//
import { onSuccess } from '../utils/helpers';


export default function AddSemester({ update }) {

  const [number, setNumber] = React.useState('');
  const [, execute] = useAxios({
    url: '/api/v1/semesters/',
    method: 'POST',
    data: { number },
    validateStatus: onSuccess(() => { setNumber(''); update(); })
  }, { manual: true });

  function handleSubmit(event) {
    event.preventDefault();
    execute();
  }

  return (
    <li className='w-full sm:w-64 m-3 border border-gray-300'>
      <form className='flex flex-row items-middle justify-between h-full' onSubmit={handleSubmit}>
        <input
          className='flex-auto pl-2'
          type='text'
          placeholder='Semester number'
          value={number}
          onChange={e => setNumber(e.target.value)} />
        <button type='submit' className='bg-purple-600 hover:bg-purple-800 p-2 flex flex-row items-center justify-center h-full'>
          <FaPlus className='text-gray-100' />
          <span className='pl-1 text-gray-100'>Add</span>
        </button>
      </form>
    </li>
  );
}
