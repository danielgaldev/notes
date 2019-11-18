import React from 'react';

import axios from '../utils/session';


export default function ItemList() {
  const [items, setItems] = React.useState([])
  React.useEffect(() => {
    async function getItems() {
      const response = await axios.get('/api/v1/items/');
      setItems(response.data);
    }
    getItems();
  }, []);
  return (
    <div>
      <ul>
        {items.map((item, key) => (
          <li key={key}>{item.text}</li>
        ))}
      </ul>
    </div>
  );
}
