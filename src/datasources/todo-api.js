const { RESTDataSource } = require('apollo-datasource-rest');

class TodoAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://jsonplaceholder.typicode.com/';
  }

  async getTodoAll() {
    return this.get('todos');
  }

  async getTodoByUser(userId) {
    return this.get(`todos?userId=${userId}`);
  }
}

module.exports = TodoAPI;
