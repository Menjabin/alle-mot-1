import { doc, updateDoc } from "firebase/firestore";

import { db } from "./firebase";

/**
 * Update the currently active question.
 */
const updateActive = (questionId) => {
    const docRef = doc(db, 'active', 'question');
    updateDoc(docRef, { id: questionId });
};

export default updateActive;