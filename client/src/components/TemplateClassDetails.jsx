import React from 'react';
import axios from '../utils/session';

export default function TemplateClassDetails({ clas, templateId, deleteClass }) {
  const [newReqText, setNewReqText] = React.useState('');
  const [reqs, setReqs] = React.useState(clas.requirements);

  async function createRequirement(text) {
    try {
      const response = await axios.post(`/api/v1/templates/${templateId}/classes/${clas.id}/requirements/`, { text });
      setReqs([...reqs, response.data]);
      setNewReqText('');
    } catch (e) {
      console.error(e);
    }
  }

  async function deleteRequirement(id) {
    try {
      await axios.post(`/api/v1/templates/${templateId}/classes/${clas.id}/requirements/`);
      setReqs(reqs.filter(r => r.id !== id));
    } catch (e) {
      console.error(e);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    createRequirement(newReqText);
  }

  return (
    <div>
      <div>
        <span>{clas.name}</span>
        <button onClick={() => deleteClass(clas.id)}>Delete</button>
      </div>
      <ul>
        {reqs.map(r => (
          <li className='ml-5' key={r.id}>
            <span>{r.text}</span>
            <button onClick={() => deleteRequirement(r.id)}>Delete</button>
          </li>
        ))}
        <form onSubmit={handleSubmit}>
          <label>
            <input
              type='text'
              value={newReqText}
              onChange={e => setNewReqText(e.target.value)}
              placeholder='Requriement name' />
          </label>
          <button type='submit'>Add</button>
        </form>
      </ul>
    </div>
  )
}
