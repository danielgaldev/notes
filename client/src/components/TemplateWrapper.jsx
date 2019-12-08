import React from 'react';
import TemplateDetails from './TemplateDetails';

export default function TemplateWrapper({ template }) {
  const [open, setOpen] = React.useState(false);
  return (
    <li>
      <div>
        <span>{template.name}</span>
        <button onClick={() => setOpen(!open)}>View / Hide</button>
      </div>
      {open && <TemplateDetails template={template} />}
    </li>
  )
}
