import React from 'react';
import useAxios from 'axios-hooks';


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
    <li>
      <span>{semester.number}</span>
      <button onClick={execute}>Delete</button>
    </li>
  );
}
