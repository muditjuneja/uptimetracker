import React, { createContext, useContext, useState, useEffect } from 'react';
    import axios from 'axios';
    import { Endpoint } from '../types';

    interface ApiContextType {
      endpoints: Endpoint[];
      fetchEndpoints: () => Promise<void>;
      addEndpoint: (endpoint: Endpoint) => Promise<void>;
      deleteEndpoint: (id: string) => Promise<void>;
    }

    const ApiContext = createContext<ApiContextType | null>(null);

    export const useApi = () => {
      const context = useContext(ApiContext);
      if (!context) {
        throw new Error('useApi must be used within an ApiProvider');
      }
      return context;
    };

    export const ApiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
      const [endpoints, setEndpoints] = useState<Endpoint[]>([]);

      const fetchEndpoints = async () => {
        try {
          const response = await axios.get('/endpoints');
          setEndpoints(response.data.data);
        } catch (error) {
          console.error('Error fetching endpoints:', error);
        }
      };

      const addEndpoint = async (endpoint: Endpoint) => {
        try {
          await axios.post('/endpoints', endpoint);
          fetchEndpoints(); // Refresh the list after adding
        } catch (error) {
          console.error('Error adding endpoint:', error);
        }
      };

      const deleteEndpoint = async (id: string) => {
        try {
          await axios.delete(`/endpoints/${id}`);
          fetchEndpoints(); // Refresh the list after deleting
        } catch (error) {
          console.error('Error deleting endpoint:', error);
        }
      };

      useEffect(() => {
        fetchEndpoints();
      }, []);

      return (
        <ApiContext.Provider value={{ endpoints, fetchEndpoints, addEndpoint, deleteEndpoint }}>
          {children}
        </ApiContext.Provider>
      );
    };
