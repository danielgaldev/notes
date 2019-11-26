import React from 'react';
import useAxios from 'axios-hooks';


export default function AddSemester({ update }) {

  const [number, setNumber] = React.useState('');

  function onSuccess(data) { setNumber(''); update(); return data; }

  const [, execute] = useAxios({
    url: '/api/v1/semesters/',
    method: 'POST',
    data: { number },
    transformResponse: onSuccess
  }, { manual: true });

  function handleSubmit(event) {
    event.preventDefault();
    execute();
  }
  return (
    <form onSubmit={handleSubmit}>
      <input type='text' placeholder='Semester number' value={number} onChange={e => setNumber(e.target.value)} />
      <button type='submit'>Add</button>
    </form>
  );
}
