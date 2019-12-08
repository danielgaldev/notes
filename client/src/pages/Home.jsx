import React from 'react';
import useAxios from 'axios-hooks';
//
import AddSemester from '../components/AddSemester';
import SemesterListItem from '../components/SemesterListItem';


function Home() {
  const [{ data }, update] = useAxios('/api/v1/semesters');
  React.useEffect(() => {
    update();
  }, [update]);

  return (
    <main className='p-4'>
      {data && <ul className='flex flex-row flex-wrap'>
        {data.map(s => <SemesterListItem key={s.id} semester={s} update={update} />)}
        <AddSemester update={update} />
      </ul>}
    </main>
  );
}

export default Home;
