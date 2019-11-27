import React from 'react';
import useAxios from 'axios-hooks';


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
    <li>
      <span>{clas.name}</span>
      <button onClick={execute}>Delete</button>
    </li>
  );
}
