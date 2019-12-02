import React from 'react';
import { useParams } from 'react-router-dom';
import useAxios from 'axios-hooks';
//
import AddClass from '../components/AddClass';
import ClassListItem from '../components/ClassListItem';
import NotFound from './NotFound';


export default function SemesterDetailPage() {
  const { id } = useParams();
  const [{ data, error }, update] = useAxios(`/api/v1/semesters/${id}/`);

  if (error && error.response.status === 404) {
    return <NotFound />;
  }

  return (
    <main>
      {data && <h2>{data.number}. semester</h2>}
      {data && <ul className='p-3 md:col-count-2 lg:col-count-3 xl:col-count-4 xl:max-w-8xl'>
        <AddClass semesterId={id} update={update} />
        {data.classes.map(c => <ClassListItem key={c.id} clas={c} semesterId={id} update={update} />)}
      </ul>}
    </main>
  )
}
