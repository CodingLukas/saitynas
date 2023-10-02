const admin = require('firebase-admin');

// const serviceAccount = require('../admin-key.json');
// const encodedCredentials = Buffer.from(JSON.stringify(serviceAccount)).toString(
//   'base64'
// );
// console.log(encodedCredentials);
const encodedCredentials2 = process.env.ENCODED_CREDENTIALS;
const decodedCredentials = JSON.parse(
  Buffer.from(encodedCredentials2, 'base64').toString('utf8')
);

// console.log(decodedCredentials);
admin.initializeApp({
  credential: admin.credential.cert(decodedCredentials),
});

const db = admin.firestore();

exports.getAll = async (collection) => {
  const snapshot = await db.collection(collection).get();
  const documents = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return documents;
};

exports.get = async (collection, id) => {
  try {
    const doc = await db.collection(collection).doc(id).get();

    if (!doc.exists) {
      return null;
    }

    return { id: doc.id, ...doc.data() };
  } catch (error) {
    console.error('Error getting document:', error);
    throw error;
  }
};

exports.create = async (collection, data) => {
  const docRef = await db.collection(collection).add(data);
  const doc = await docRef.get();
  return { id: doc.id, ...doc.data() };
};

exports.update = async (collection, id, data) => {
  const docRef = db.collection(collection).doc(id);
  await docRef.update(data);
  const doc = await docRef.get();
  if (!doc.exists) {
    return null;
  }
  return { id: doc.id, ...doc.data() };
};

exports.delete = async (collection, id) => {
  const docRef = db.collection(collection).doc(id);
  const doc = await docRef.get();
  if (!doc.exists) {
    return null;
  }
  await docRef.delete();
  return { id: doc.id, ...doc.data() };
};
