import { getDoc, doc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { db } from '../utils/firebase';

/**
 * Fetch the currently active question from firestore.
 */
const useActive = (id) => {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const docRef = doc(db, 'active', 'question');
    getDoc(docRef).then((docSnap) => {
        if (docSnap.exists())
            setActive(docSnap.data());
    })
  }, [id]);

  return active;
};

export default useActive;