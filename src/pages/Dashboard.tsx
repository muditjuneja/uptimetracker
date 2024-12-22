import { useState } from 'react';
    import { Navbar } from '../components/Navbar';
    import { Plus, RefreshCw } from 'lucide-react';
    import { Endpoint } from '../types';
    import toast from 'react-hot-toast';
    import { useApi } from '../context/ApiContext';

    export const Dashboard = () => {
      const { endpoints, addEndpoint } = useApi();
      const [showAddForm, setShowAddForm] = useState(false);
      const [newEndpoint, setNewEndpoint] = useState({
        name: '',
        url: '',
        method: 'GET',
        interval: 5,
      });

      const handleAddEndpoint = async (e: React.FormEvent) => {
        e.preventDefault();
        const endpoint: Endpoint = {
          id: Date.now().toString(),
          ...newEndpoint,
          status: 'pending',
          responseTime: 0,
          lastChecked: new Date().toISOString(),
        } as Endpoint;

        await addEndpoint(endpoint);
        setShowAddForm(false);
        setNewEndpoint({ name: '', url: '', method: 'GET', interval: 5 });
        toast.success('Endpoint added successfully!');
      };

      return (
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          
          <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold text-gray-900">Monitored Endpoints</h1>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Endpoint
                </button>
              </div>

              {showAddForm && (
                <div className="mb-6 bg-white shadow sm:rounded-lg p-6">
                  <form onSubmit={handleAddEndpoint}>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Endpoint Name
                        </label>
                        <input
                          type="text"
                          required
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          value={newEndpoint.name}
                          onChange={(e) => setNewEndpoint({ ...newEndpoint, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          URL
                        </label>
                        <input
                          type="url"
                          required
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          value={newEndpoint.url}
                          onChange={(e) => setNewEndpoint({ ...newEndpoint, url: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          HTTP Method
                        </label>
                        <select
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          value={newEndpoint.method}
                          onChange={(e) => setNewEndpoint({ ...newEndpoint, method: e.target.value as 'GET' | 'POST' | 'PUT' | 'DELETE' })}
                        >
                          <option value="GET">GET</option>
                          <option value="POST">POST</option>
                          <option value="PUT">PUT</option>
                          <option value="DELETE">DELETE</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Check Interval (minutes)
                        </label>
                        <input
                          type="number"
                          min="1"
                          required
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          value={newEndpoint.interval}
                          onChange={(e) => setNewEndpoint({ ...newEndpoint, interval: parseInt(e.target.value) })}
                        />
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end space-x-3">
                      <button
                        type="button"
                        onClick={() => setShowAddForm(false)}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                      >
                        Save Endpoint
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        URL
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Response Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Checked
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {endpoints.map((endpoint) => (
                      <tr key={endpoint.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {endpoint.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {endpoint.url}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            endpoint.status === 'healthy'
                              ? 'bg-green-100 text-green-800'
                              : endpoint.status === 'error'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {endpoint.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {endpoint.responseTime}ms
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(endpoint.lastChecked).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      );
    };
