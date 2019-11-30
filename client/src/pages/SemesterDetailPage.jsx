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
    <div>
      {data && <h2>{data.number}. semester</h2>}
      <AddClass semesterId={id} update={update} /><br />
      {data && <ul>
        {data.classes.map(c => <ClassListItem key={c.id} clas={c} semesterId={id} update={update} />)}
      </ul>}
    </div>
  )
}
