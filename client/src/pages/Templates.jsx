import React from 'react';
import useAxios from 'axios-hooks';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';

import TemplateWrapper from '../components/TemplateWrapper';

export default function Templates() {
  const [{ data }, update] = useAxios('/api/v1/templates');
  const { id } = useParams();
  React.useEffect(() => {
    update();
  }, [update]);
  return (
    <main>
      <div className='w-full p-4 flex justify-between'>
        <Link to={`/semesters/${id}`}>
          <span className='flex items-center'>
            <FaChevronLeft />
            <span className='ml-2 underline hover:no-underline'>Back to semester</span>
          </span>
        </Link>
      </div>
      <h1 className='text-4xl p-4 font-light'>Templates</h1>
      {data && <ul className='p-3 max-w-4xl'>
        {data.map(template => <TemplateWrapper key={template.id} template={template} semesterId={id} />)}
      </ul>}
    </main>
  )
}
