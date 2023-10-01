const firestore = require('../utils/firestore');
const admin = require('firebase-admin');

const db = admin.firestore();

class Ad {
  static async getAllByCategoryId(categoryId) {
    // Adjusted to get all ads by category ID
    const adsCollection = db.collection('ads');
    const query = adsCollection.where('categoryId', '==', categoryId);
    const querySnapshot = await query.get();

    const ads = [];
    querySnapshot.forEach((doc) => {
      ads.push({ id: doc.id, ...doc.data() });
    });

    return ads;
  }

  static async get(adId) {
    const ad = await firestore.get('ads', adId);

    const commentsRef = db.collection('comments');
    const query = commentsRef.where('adId', '==', ad.id);
    const snapshot = await query.get();
    // const comments = [];

    // snapshot.forEach((doc) => {
    //   comments.push(doc.data());
    // });

    return { ...ad }; // comments
  }

  static async create(data) {
    // Since category ID is now associated in the route, you may also want to include it in the ad's data in the database
    const ad = await firestore.create('ads', data);
    return ad;
  }

  static async update(adId, data) {
    const ad = await firestore.update('ads', adId, data);
    return ad;
  }

  static async delete(adId) {
    const ad = await firestore.delete('ads', adId);
    return ad;
  }
}

module.exports = Ad;
