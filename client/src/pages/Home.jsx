import React from 'react';
import { connect } from 'react-redux';
import useAxios from 'axios-hooks';
//
import { logout } from '../utils/actions';
import AddSemester from '../components/AddSemester';


function Home({ logout }) {
  const [{ data }, update] = useAxios('/api/v1/semesters');

  return (
    <div>
      <h1>Home</h1>
      <button onClick={logout}>Logout</button><br /><br />
      <AddSemester update={update} />
      {data && <ul>
        {data.map(s => <li key={s.id}>{s.number}</li>)}
      </ul>}
    </div>
  );
}

export default connect(null, { logout })(Home);
