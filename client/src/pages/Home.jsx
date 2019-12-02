import React from 'react';
import { connect } from 'react-redux';
import useAxios from 'axios-hooks';
import { FaGraduationCap, FaSignOutAlt } from 'react-icons/fa';
//
import { logout } from '../utils/actions';
import AddSemester from '../components/AddSemester';
import SemesterListItem from '../components/SemesterListItem';
import Header from '../components/Header';


function Home({ logout, username }) {
  const [{ data }, update] = useAxios('/api/v1/semesters');
  React.useEffect(() => {
    update();
  }, []);

  return (
    <main className='p-4'>
      {data && <ul className='flex flex-row flex-wrap'>
        {data.map(s => <SemesterListItem key={s.id} semester={s} update={update} />)}
        <AddSemester update={update} />
      </ul>}
    </main>
  );
}

export default connect(state => ({ username: state.auth.user.username }), { logout })(Home);
