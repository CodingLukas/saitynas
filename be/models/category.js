const firestore = require('../utils/firestore');

class Category {
  static async getAll() {
    const categories = await firestore.getAll('categories');
    return categories;
  }

  static async get(id) {
    const category = await firestore.get('categories', id);
    return category;
  }

  static async create(data) {
    const category = await firestore.create('categories', data);
    return category;
  }

  static async update(id, data) {
    const category = await firestore.update('categories', id, data);
    return category;
  }

  static async delete(id) {
    const category = await firestore.delete('categories', id);
    return category;
  }
}

module.exports = Category;
