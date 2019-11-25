import React from 'react';
import { connect } from 'react-redux';
//
import axios from '../utils/session';
import { logout } from '../utils/actions';


function Home({ logout }) {
  const [semesters, setSemesters] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('/api/v1/semesters');
        setSemesters(response.data);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <button onClick={logout}>Logout</button><br /><br />
      <form>
        <input type='text' placeholder='Semester number' />
        <button type='submit'>Add</button>
      </form>
      <ul>
        {semesters.map(s => <li key={s.id}>{s.number}</li>)}
      </ul>
    </div>
  );
}

export default connect(null, { logout })(Home);
