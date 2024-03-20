import { collection, getDocs, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { db } from '../utils/firebase';

/**
 * Fetch all questions from firestore.
 */
const useQuestions = () => {
  const [questions, setQuestions] = useState(null);

  useEffect(() => {
    const fetchedQuestions = [];

    const q = query(collection(db, 'questions'));

    getDocs(q).then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const question = doc.data();
        question.id = doc.id;
        fetchedQuestions.push(question);
      });

      setQuestions(fetchedQuestions);
    });
  }, []);

  return questions;
};

export default useQuestions;