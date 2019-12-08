import React from 'react';
import useAxios from 'axios-hooks';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
//
import AddSemester from '../components/AddSemester';
import SemesterListItem from '../components/SemesterListItem';


function Home({ isAdmin }) {
  const [{ data }, update] = useAxios('/api/v1/semesters');
  React.useEffect(() => {
    update();
  }, [update]);

  return (
    <main>
      {isAdmin && <nav className='w-full p-4 flex justify-end'>
        <Link to='/admin'>
          <span className='flex items-center'>
            <span className='ml-2 underline hover:no-underline'>Admin page</span>
          </span>
        </Link>
      </nav>}

      {data && <ul className='flex flex-row flex-wrap mt-3'>
        {data.map(s => <SemesterListItem key={s.id} semester={s} update={update} />)}
        <AddSemester update={update} />
      </ul>}
    </main>
  );
}

export default connect(state => ({ isAdmin: state.auth.user.is_staff }))(Home);
