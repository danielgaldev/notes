import React from 'react';
import useAxios from 'axios-hooks';


export default function AddClass({ semesterId, update }) {

  const [name, setName] = React.useState('');

  function validateStatus(status) {
    if (status >= 200 && status < 300) {
      setName('');
      update();
      return true;
    } else {
      return false;
    }
  }

  const [, execute] = useAxios({
    url: `/api/v1/semesters/${semesterId}/classes/`,
    method: 'POST',
    data: { name },
    validateStatus
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
