import React from 'react';
import useAxios from 'axios-hooks';
//
import { onSuccess } from '../utils/helpers';


export default function AddClass({ semesterId, update }) {

  const [name, setName] = React.useState('');

  const [, execute] = useAxios({
    url: `/api/v1/semesters/${semesterId}/classes/`,
    method: 'POST',
    data: { name },
    validateStatus: onSuccess(() => { setName(''); update(); })
  }, { manual: true });

  function handleSubmit(event) {
    event.preventDefault();
    execute();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type='text' placeholder='Class name' value={name} onChange={e => setName(e.target.value)} />
      <button type='submit'>Add</button>
    </form>
  );
}
