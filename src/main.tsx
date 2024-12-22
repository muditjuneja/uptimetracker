import { StrictMode } from 'react';
    import { createRoot } from 'react-dom/client';
    import App from './App.tsx';
    import './index.css';
    import { AuthProvider } from './context/AuthContext';
    import { ApiProvider } from './context/ApiContext';

    createRoot(document.getElementById('root')!).render(
      <StrictMode>
        <AuthProvider>
          <ApiProvider>
            <App />
          </ApiProvider>
        </AuthProvider>
      </StrictMode>
    );
