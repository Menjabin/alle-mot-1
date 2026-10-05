import Form from '../components/form';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const Main = () => {
  const [id, setId] = useState('');

  useEffect(() => {
    // Get this player's id from local storage. If it doesn't exist, create it.
    let storedId = localStorage.getItem('id');
    if (!storedId) {
      storedId = uuidv4();
      localStorage.setItem('id', storedId);
    }
    setId(storedId);
  }, [setId]);

  return (
    <Form id={id} />
  );
};
