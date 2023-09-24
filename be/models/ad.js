const firestore = require('../utils/firestore');
const admin = require('firebase-admin');

const db = admin.firestore();

class Ad {
  static async getAll() {
    const ads = await firestore.getAll('ads');
    return ads;
  }

  static async get(id) {
    const ad = await firestore.get('ads', id);

    const commentsRef = db.collection('comments');
    const query = commentsRef.where('adId', '==', ad.id);
    const snapshot = await query.get();
    const comments = [];

    snapshot.forEach((doc) => {
      comments.push(doc.data());
    });

    return { ...ad, comments };
  }

  static async create(data) {
    const ad = await firestore.create('ads', data);
    return ad;
  }

  static async update(id, data) {
    const ad = await firestore.update('ads', id, data);
    return ad;
  }

  static async delete(id) {
    const ad = await firestore.delete('ads', id);
    return ad;
  }
}

module.exports = Ad;
