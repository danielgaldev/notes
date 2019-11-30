import React from 'react';
import { connect } from 'react-redux';
import useAxios from 'axios-hooks';
//
import { logout } from '../utils/actions';
import AddSemester from '../components/AddSemester';
import SemesterListItem from '../components/SemesterListItem';


function Home({ logout }) {
  const [{ data }, update] = useAxios('/api/v1/semesters');
  React.useEffect(() => {
    update();
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <button onClick={logout}>Logout</button><br /><br />
      <AddSemester update={update} />
      {data && <ul>
        {data.map(s => <SemesterListItem key={s.id} semester={s} update={update} />)}
      </ul>}
    </div>
  );
}

export default connect(null, { logout })(Home);
