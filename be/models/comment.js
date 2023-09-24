const firestore = require('../utils/firestore');

class Comment {
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
