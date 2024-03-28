import { collection, doc, getDoc, getDocs, setDoc, updateDoc, query, limit, writeBatch } from "firebase/firestore";

import { db } from "./firebase";

/**
 * Get the currently active question.
 */
export const getActiveQuestion = async () => {
  const docRef = doc(db, 'active', 'question');
  const docSnap = await getDoc(docRef);
  if (docSnap.exists())
    return docSnap.data();
};

/**
 * Update the currently active question.
 * All question data except the answer is copied over.
 */
export const setActiveQuestion = async (question) => {
  const docRef = doc(db, 'active', 'question');
  updateDoc(docRef, { id: question.id, answer: question.answer, question: question.question, lower: question.lower, upper: question.upper });
}

/**
 * Update the given question in firebase with its new attributes.
 */
export const updateQuestion = async (question) => {
  const docRef = doc(db, 'questions', question.id);
  updateDoc(docRef, { question: question.question, answer: question.answer, lower: question.lower, upper: question.upper });
}

/**
 * Get all questions.
 */
export const getQuestions = async () => {
  const querySnapshot = await getDocs(collection(db, 'questions'));
  const questions = [];
  querySnapshot.forEach((doc) => {
    questions.push({ id: doc.id, ...doc.data() });
  });
  return questions;
};

/**
 * Retrieve all answers from the database.
 */
export const getAnswers = async () => {
  const querySnapshot = await getDocs(collection(db, 'answers'));
  const answers = [];
  querySnapshot.forEach((doc) => {
    answers.push({ id: doc.id, ...doc.data() });
  });
  return answers;
}

/**
 * Submit an answer for the active question.
 */
export const setAnswer = async (id, value) => {
  const docRef = doc(db, 'answers', id);
  setDoc(docRef, { answer: value }, { merge: true });
}

/**
 * Get the contestant answer for the active question.
 */
export const getContestantAnswer = async () => {
  const docRef = doc(db, 'contestant', 'answer');
  const docSnap = await getDoc(docRef);
  if (docSnap.exists())
    return docSnap.data();
}

/**
 * Submit a contestant answer for the active question.
 */
export const setContestantAnswer = async (value) => {
  const docRef = doc(db, 'contestant', 'answer');
  updateDoc(docRef, { answer: value });
}

/**
 * Delete all answers. Done whenever the active question changes.
 */
export const deleteAnswers = async () => {
  deleteCollection(db, "answers", 10);
}

/**
 * Delete all documents in a firestore collection by deleting them in batches.
 */
const deleteCollection = async (db, collectionPath, batchSize) => {
  const collectionRef = collection(db, collectionPath);
  const q = query(collectionRef, limit(batchSize));;
  
  return new Promise((resolve, reject) => {
      deleteQueryBatch(db, q, resolve).catch(reject);
  });
};

const deleteQueryBatch = async (db, q, resolve) => {
  const snapshot = await getDocs(q);

  const batchSize = snapshot.size;
  if (batchSize === 0) {
      resolve();
      return;
  }

  const batch = writeBatch(db);
  snapshot.docs.forEach(doc => {
      batch.delete(doc.ref);
  });
  await batch.commit();

  deleteQueryBatch(db, q, resolve);
}