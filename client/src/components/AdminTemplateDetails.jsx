import React from 'react';
import { FaPlus } from 'react-icons/fa';
//
import axios from '../utils/session';
import TemplateClassDetails from './TemplateClassDetails';


export default function AdminTemplateDetails({ template }) {
  const [classes, setClasses] = React.useState(template.classes);
  const [newClassName, setNewClassName] = React.useState('');

  async function createClass(name) {
    try {
      const response = await axios.post(`/api/v1/templates/${template.id}/classes/`, { name });
      setClasses([...classes, response.data]);
      setNewClassName('');
    } catch (e) {
      console.error(e);
    }
  }

  async function deleteClass(id) {
    try {
      await axios.delete(`/api/v1/templates/${template.id}/classes/${id}/`);
      setClasses(classes.filter(c => c.id !== id));
    } catch (e) {
      console.error(e);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    createClass(newClassName);
  }

  return (
    <ul className='sm:col-count-2 lg:col-count-3 p-3'>
      {classes.map(c =>
        <TemplateClassDetails
          key={c.id}
          templateId={template.id}
          clas={c}
          deleteClass={deleteClass} />
      )}
      <form onSubmit={handleSubmit} className='mx-2 flex justify-between'>
        <label className='flex-auto'>
          <input
            type='text'
            value={newClassName}
            onChange={e => setNewClassName(e.target.value)}
            placeholder='Class name'
            className='p-1 border-b border-gray-300 w-full' />
        </label>
        <button type='submit' className='p-2 bg-gray-700 hover:bg-gray-900'><FaPlus className='text-gray-100' /></button>
      </form>
    </ul>
  )
}
