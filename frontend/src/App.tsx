import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Item = {
  id: number;
  name: string;
  description: string;
};

const App: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [newItem, setNewItem] = useState({ name: '', description: '' });

  const API_URL = 'http://localhost:8082/items';

  const fetchItems = async () => {
    const response = await axios.get(API_URL);
    setItems(response.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const addItem = async () => {
    await axios.post(API_URL, newItem);
    fetchItems();
    setNewItem({ name: '', description: '' });
  };

  const deleteItem = async (id: number) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchItems();
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Item Manager</h1>
      <div>
        <input
          placeholder="Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        />
        <input
          placeholder="Description"
          value={newItem.description}
          onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
        />
        <button onClick={addItem}>Add Item</button>
      </div>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <strong>{item.name}:</strong> {item.description}
            <button onClick={() => deleteItem(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
