import React from 'react';
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
    <ul>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type='text'
            value={newClassName}
            onChange={e => setNewClassName(e.target.value)}
            placeholder='Enter new class name' />
        </label>
        <button type='submit'>Add</button>
      </form>
      {classes.map(c =>
        <TemplateClassDetails
          key={c.id}
          templateId={template.id}
          clas={c}
          deleteClass={deleteClass} />
      )}
    </ul>
  )
}
