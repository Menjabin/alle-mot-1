import { query, collection, limit, getDocs, writeBatch } from "firebase/firestore";

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

export default deleteCollection;