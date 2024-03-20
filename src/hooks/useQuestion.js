import { getDoc, doc } from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { db } from '../utils/firebase';

/**
 * Fetch the given question from firestore.
 */
const useQuestion = (id) => {
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    const docRef = doc(db, 'questions', id);
    getDoc(docRef).then((docSnap) => {
        if (docSnap.exists()) {
            const parsedQuestion = docSnap.data();
            parsedQuestion.id = docSnap.id;
            setQuestion(parsedQuestion);
        }
    })
  }, [id]);

  return question;
};

export default useQuestion;