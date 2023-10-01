const firestore = require('../utils/firestore');
const admin = require('firebase-admin');

const db = admin.firestore();
class Comment {
  static async getAllByAdId(adId) {
    // Adjusted to get all comments by category ID
    const commentsCollection = db.collection('comments');
    const query = commentsCollection.where('adId', '==', adId);
    const querySnapshot = await query.get();

    const comments = [];
    querySnapshot.forEach((doc) => {
      comments.push({ id: doc.id, ...doc.data() });
    });

    return comments;
  }

  static async getAll() {
    const comments = await firestore.getAll('comments');
    return comments;
  }

  static async get(id) {
    const comment = await firestore.get('comments', id);
    return comment;
  }

  static async create(data) {
    const comment = await firestore.create('comments', data);
    return comment;
  }

  static async update(id, data) {
    const comment = await firestore.update('comments', id, data);
    return comment;
  }

  static async delete(id) {
    const comment = await firestore.delete('comments', id);
    return comment;
  }
}

module.exports = Comment;
