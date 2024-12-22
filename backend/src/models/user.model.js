import crypto from 'crypto';

// In-memory store for users
const users = new Map();

export class User {
  constructor({ id, name, email, password }) {
    this.id = id || crypto.randomUUID();
    this.name = name;
    this.email = email;
    this.password = password;
  }

  static async findByEmail(email) {
    return Array.from(users.values()).find(user => user.email === email);
  }

  static async create(userData) {
    const user = new User(userData);
    users.set(user.id, user);
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  static async findById(id) {
    return users.get(id);
  }
}
