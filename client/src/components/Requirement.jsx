import React from 'react';
import useAxios from 'axios-hooks';
//
import { onSuccess } from '../utils/helpers';


export default function Requirement({ requirement, classId, semesterId, update }) {
  const [done, setDone] = React.useState(requirement.done);
  const [, executeDelete] = useAxios({
    url: `/api/v1/semesters/${semesterId}/classes/${classId}/requirements/${requirement.id}/`,
    method: 'DELETE',
    validateStatus: onSuccess(() => update())
  }, { manual: true });

  function handleChange(e) {
    console.log(`PATCH /api/v1/semesters/${semesterId}/classes/${classId}/requirements/${requirement.id}/ { done: ${!done} }`);
    setDone(!done);
  };

  return (
    <li>
      <label>
        <input type='checkbox' checked={done} onChange={handleChange} />
        {requirement.text}
        <button onClick={executeDelete}>Delete</button>
      </label>
    </li>
  )
}
