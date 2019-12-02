import React from 'react';
import useAxios from 'axios-hooks';
import { FaPlus } from 'react-icons/fa';
//
import { onSuccess } from '../utils/helpers';


export default function AddClass({ semesterId, update }) {

  const [name, setName] = React.useState('');

  const [, execute] = useAxios({
    url: `/api/v1/semesters/${semesterId}/classes/`,
    method: 'POST',
    data: { name },
    validateStatus: onSuccess(() => { setName(''); update(); })
  }, { manual: true });

  function handleSubmit(event) {
    event.preventDefault();
    execute();
  }

  return (
    <li className='border border-solid border-gray-300 mb-5 h-10'>
      <form onSubmit={handleSubmit} className='flex justify-between h-full'>
        <input
          type='text'
          placeholder='Enter class name'
          value={name}
          onChange={e => setName(e.target.value)}
          className='z-10 p-3 flex-auto font-bold focus:border-purple-800 focus:border-2 focus:border-solid' />
        <button type='submit' className='bg-purple-600 hover:bg-purple-800 px-3 h-full'>
          <FaPlus className='text-gray-100' />
        </button>
      </form>
    </li>
  );
}
