import React from 'react';
import { FaTrashAlt, FaTimes, FaPlus } from 'react-icons/fa';
//
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
      await axios.delete(`/api/v1/templates/${templateId}/classes/${clas.id}/requirements/${id}/`);
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
    <li className='bi-avoid mb-4 mx-2 bg-gray-200 p-3'>
      <div className='flex justify-between mb-2'>
        <h3 className='font-bold'>{clas.name}</h3>
        <button onClick={() => deleteClass(clas.id)}><FaTrashAlt /></button>
      </div>
      <ul>
        {reqs.map(r => (
          <li key={r.id} className='flex items-center mb-2'>
            <button onClick={() => deleteRequirement(r.id)}><FaTimes /></button>
            <span className='ml-2'>{r.text}</span>
          </li>
        ))}
        <form onSubmit={handleSubmit} className='flex items-center justify-between' >
          <label className='flex-auto'>
            <input
              type='text'
              value={newReqText}
              onChange={e => setNewReqText(e.target.value)}
              placeholder='Requriement name'
              className='bg-gray-200 border-b border-solid border-gray-500 p-1 w-full' />
          </label>
          <button type='submit' className='p-2'><FaPlus /></button>
        </form>
      </ul>
    </li>
  )
}
