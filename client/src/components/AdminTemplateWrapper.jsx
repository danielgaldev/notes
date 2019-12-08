import React from 'react';
//
import AdminTemplateDetails from './AdminTemplateDetails';


export default function AdminTemplateWrapper({ template, deleteTemplate }) {
  const [open, setOpen] = React.useState(false);
  return (
    <li className='border border-solid border-grey-300 p-2 mt-3'>
      <div className='w-full flex justify-between items-center'>
        <span className='text-2xl ml-2'>{template.name}</span>
        <div>
          <button
            onClick={() => setOpen(!open)}
            className='p-2 underline hover:no-underline'>
            {open ? 'Hide' : 'View'}
          </button>
          <button
            onClick={() => deleteTemplate(template.id)}
            className='p-2 underline hover:no-underline'>
            Delete
          </button>
        </div>
      </div>
      {open && <AdminTemplateDetails template={template} />}
    </li>
  )
}
