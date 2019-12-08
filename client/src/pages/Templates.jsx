import React from 'react';
import useAxios from 'axios-hooks';
import TemplateWrapper from '../components/TemplateWrapper';

export default function Templates() {
  const [{ data }, update] = useAxios('/api/v1/templates');
  React.useEffect(() => {
    update();
  }, [update]);
  return (
    <main>
      <h1>Templates</h1>
      {data && <ul>
        {data.map(template => <TemplateWrapper key={template.id} template={template} />)}
      </ul>}
    </main>
  )
}
