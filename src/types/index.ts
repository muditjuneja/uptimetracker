export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Endpoint {
  id: string;
  name: string;
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  interval: number;
  status: 'healthy' | 'error' | 'pending';
  responseTime: number;
  lastChecked: string;
}
