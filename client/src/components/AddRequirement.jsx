import React from 'react';
import useAxios from 'axios-hooks';


export default function AddRequirement({ semesterId, classId, update }) {

  const [text, setText] = React.useState('');

  function validateStatus(status) {
    if (status >= 200 && status < 300) {
      setText('');
      update();
      return true;
    } else {
      return false;
    }
  }

  const [, execute] = useAxios({
    url: `/api/v1/semesters/${semesterId}/classes/${classId}/requirements/`,
    method: 'POST',
    data: { text },
    validateStatus
  }, { manual: true });

  function handleSubmit(event) {
    event.preventDefault();
    execute();
  }
  return (
    <form onSubmit={handleSubmit}>
      <input type='text' placeholder='Requirement text' value={text} onChange={e => setText(e.target.value)} />
      <button type='submit'>Add</button>
    </form>
  );
}
