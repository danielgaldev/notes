import React from 'react';
import useAxios from 'axios-hooks';
import { FaBeer } from 'react-icons/fa';
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
    <form onSubmit={handleSubmit}>
      <input type='text' placeholder='Semester number' value={number} onChange={e => setNumber(e.target.value)} />
      <button type='submit' className='bg-purple-500 hover:bg-purple-600 p-2'>Add <FaBeer className='text-white text-4xl' /></button>
    </form>
      );
    }
