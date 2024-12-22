import crypto from 'crypto';

// In-memory store for endpoints
const endpoints = new Map();

export class Endpoint {
  constructor({ id, name, url, method, interval, userId }) {
    this.id = id || crypto.randomUUID();
    this.name = name;
    this.url = url;
    this.method = method;
    this.interval = interval;
    this.userId = userId;
    this.status = 'pending';
    this.responseTime = 0;
    this.lastChecked = new Date().toISOString();
  }

  static async create(endpointData) {
    const endpoint = new Endpoint(endpointData);
    endpoints.set(endpoint.id, endpoint);
    return endpoint;
  }

  static async findById(id) {
    return endpoints.get(id);
  }

  static async findByUserId(userId) {
    return Array.from(endpoints.values()).filter(endpoint => endpoint.userId === userId);
  }

  static async update(id, data) {
    const endpoint = endpoints.get(id);
    if (!endpoint) return null;
    
    Object.assign(endpoint, data);
    endpoints.set(id, endpoint);
    return endpoint;
  }

  static async delete(id) {
    return endpoints.delete(id);
  }
}
