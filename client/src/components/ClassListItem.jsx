import React from 'react';
import useAxios from 'axios-hooks';
import { FaTrashAlt } from 'react-icons/fa';
//
import AddRequirement from './AddRequirement';
import Requirement from './Requirement';


export default function ClassListItem({ semesterId, clas, update }) {
  function validateStatus(status) {
    if (status >= 200 && status < 300) {
      update();
      return true;
    } else {
      return false;
    }
  }

  const [, execute] = useAxios({
    url: `/api/v1/semesters/${semesterId}/classes/${clas.id}/`,
    method: 'DELETE',
    validateStatus
  }, { manual: true });

  return (
    <li className='w-full sm:w-64 border border-solid border-gray-300 p-3 m-3'>
      <div className='flex justify-between'>
        <h3 className='text-xl font-bold'>{clas.name}</h3>
        <button onClick={execute}><FaTrashAlt className='text-gray-800 hover:text-red-800' /></button>
      </div>
      <hr className='my-2' />
      {clas.requirements && <ul className='flex flex-col'>
        {clas.requirements.map(r => (
          <Requirement key={r.id} requirement={r} classId={clas.id} semesterId={semesterId} update={update} />
        ))}
        <AddRequirement classId={clas.id} semesterId={semesterId} update={update} />
      </ul>}
    </li>
  );
}
