import React from 'react';
import { useHistory } from 'react-router-dom';
import useAxios from 'axios-hooks';

import TemplateDetails from './TemplateDetails';
import { onSuccess } from '../utils/helpers';


export default function TemplateWrapper({ template, semesterId }) {
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [, execute] = useAxios({
    url: `/api/v1/semesters/${semesterId}/classes/from/`,
    method: 'POST',
    data: { templateId: template.id },
    validateStatus: onSuccess(() => { history.push(`/semesters/${semesterId}`) })
  }, { manual: true });

  return (
    <li className='border border-solid border-grey-300 p-2'>
      <div className='w-full flex justify-between items-center'>
        <span className='text-2xl ml-2'>{template.name}</span>
        <div>
          <button
            onClick={() => setOpen(!open)}
            className='p-2 bg-purple-600 mx-2 hover:bg-purple-800 text-gray-100'>
            {open ? 'Hide' : 'View'}
          </button>
          <button onClick={execute}
            className='p-2 bg-purple-600 mx-2 hover:bg-purple-800 text-gray-100'>
            Import
            </button>
        </div>
      </div>
      {open && <TemplateDetails template={template} />}
    </li>
  )
}
