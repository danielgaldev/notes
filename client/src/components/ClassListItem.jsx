import React from 'react';
import useAxios from 'axios-hooks';
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
    <li>
      <span>{clas.name}</span>
      <button onClick={execute}>Delete</button>
      <AddRequirement classId={clas.id} semesterId={semesterId} update={update} />
      {clas.requirements && <ul>
        {clas.requirements.map(r => <Requirement key={r.id} requirement={r} />)}
      </ul>}
    </li>
  );
}
