import React from 'react';
import useAxios from 'axios-hooks';
import { FaTimes } from 'react-icons/fa';
//
import { onSuccess } from '../utils/helpers';


export default function Requirement({ requirement, classId, semesterId, update }) {
  const [, executeDelete] = useAxios({
    url: `/api/v1/semesters/${semesterId}/classes/${classId}/requirements/${requirement.id}/`,
    method: 'DELETE',
    validateStatus: onSuccess(() => update())
  }, { manual: true });
  const [, executePatch] = useAxios({
    url: `/api/v1/semesters/${semesterId}/classes/${classId}/requirements/${requirement.id}/`,
    method: 'PATCH',
    validateStatus: onSuccess(() => update())
  }, { manual: true });

  function handleChange(e) {
    executePatch();
  }

  return (
    <li className='flex justify-between items-center h-8'>
      <label className='flex items-center flex-auto cursor-pointer'>
        <input type='checkbox' checked={requirement.done} onChange={handleChange} className='form-checkbox text-purple-600' />
        <span className='ml-2'>{requirement.text}</span>
      </label>
      <button onClick={executeDelete}><FaTimes className='text-gray-600 hover:text-red-800 h-full' /></button>
    </li>
  );
}
