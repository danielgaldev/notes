import React from 'react';
import useAxios from 'axios-hooks';
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
    <form onSubmit={handleSubmit}>
      <input type='text' placeholder='Requirement text' value={text} onChange={e => setText(e.target.value)} />
      <button type='submit'>Add</button>
    </form>
  );
}
