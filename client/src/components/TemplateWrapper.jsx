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
    <li>
      <div>
        <span>{template.name}</span>
        <button onClick={() => setOpen(!open)}>View / Hide</button>
        <button onClick={execute}>Import</button>
      </div>
      {open && <TemplateDetails template={template} />}
    </li>
  )
}
