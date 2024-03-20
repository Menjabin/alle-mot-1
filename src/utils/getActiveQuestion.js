import { doc, getDoc } from "firebase/firestore";

import { db } from "./firebase";

/**
 * Get the currently active question.
 */
const getActiveQuestion = () => {
    const docRef = doc(db, 'active', 'question');
    return getDoc(docRef).then((docSnap) => {
        if (docSnap.exists()) {
            return docSnap.data();
        }
    });
};

export default getActiveQuestion;