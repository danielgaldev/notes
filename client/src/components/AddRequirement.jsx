import React from 'react';
import useAxios from 'axios-hooks';
import { FaPlus } from 'react-icons/fa';
//
import { onSuccess } from '../utils/helpers';


export default function AddRequirement({ semesterId, classId, update }) {

  const [text, setText] = React.useState('');

  const [, execute] = useAxios({
    url: `/api/v1/semesters/${semesterId}/classes/${classId}/requirements/`,
    method: 'POST',
    data: { text },
    validateStatus: onSuccess(() => { setText(''); update(); })
  }, { manual: true });

  function handleSubmit(event) {
    event.preventDefault();
    execute();
  }
  return (
    <li className='border border-solid border-gray-300 mt-2 h-8'>
      <form onSubmit={handleSubmit} className='flex justify-between h-full'>
        <input type='text' placeholder='Requirement text'
          value={text} onChange={e => setText(e.target.value)}
          className='p-1 flex-auto' />
        <button type='submit' className='h-full bg-purple-600 hover:bg-purple-800 p-1'>
          <FaPlus className='text-gray-100' />
        </button>
      </form>
    </li>
  );
}
