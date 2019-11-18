import React from 'react';
import axios from 'axios';


function App() {
  const [items, setItems] = React.useState([]);
  React.useEffect(() => {
    axios.get('/api/v1/items/')
      .then(result => {
        setItems(result.data);
      })
      .catch(e => console.log(e));
  }, []);
  return (
    <div>
      Hello world
      <ul>
        {items.map(item => {
          return <li key={item.id}>{item.text}</li>;
        })}
      </ul>
    </div>
  );
}

export default App;
