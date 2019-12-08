import React from 'react';
import { Link } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';
//
import axios from '../utils/session';
import AdminTemplateWrapper from '../components/AdminTemplateWrapper';


export default function Admin() {
  const [data, setData] = React.useState([]);
  const [newTemplateName, setNewTemplateName] = React.useState('');
  React.useEffect(() => {
    (async function fetchTemplates() {
      const response = await axios.get('/api/v1/templates/');
      setData(response.data);
    })();
  }, []);
  async function deleteTemplate(id) {
    try {
      await axios.delete(`/api/v1/templates/${id}/`);
      setData(data.filter(template => template.id !== id));
    } catch (e) {
      console.error(e);
    }
  }
  async function createTemplate({ name }) {
    try {
      const response = await axios.post('/api/v1/templates/', { name });
      setData([...data, { ...response.data, classes: [] }]);
      setNewTemplateName('');
    } catch (e) {
      console.error(e);
    }
  }
  function onSubmit(e) {
    e.preventDefault();
    createTemplate({ name: newTemplateName });
  }
  return (
    <div>
      <nav className='w-full p-4 flex justify-between'>
        <Link to='/'>
          <span className='flex items-center'>
            <FaChevronLeft />
            <span className='ml-2 underline hover:no-underline'>Home</span>
          </span>
        </Link>
      </nav>
      {data && <ul className='p-3'>
        {data.map(template => <AdminTemplateWrapper
          key={template.id}
          template={template}
          deleteTemplate={deleteTemplate}
        />)}
        <form onSubmit={onSubmit} className='flex items-center max-w-4xl mt-3'>
          <label className='flex-auto'>
            <input
              type='text'
              placeholder='Template name'
              value={newTemplateName}
              onChange={e => setNewTemplateName(e.target.value)}
              className='p-3 border boder-solid border-gray-300 w-full'
            />
          </label>
          <button type='submit' className='p-3 bg-gray-700 hover:bg-gray-800 ml-3 text-gray-100' >Create</button>
        </form>
      </ul>}
    </div>
  );
}
