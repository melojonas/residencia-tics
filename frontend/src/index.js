import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from './routing/Routes';
import { AuthProvider } from './context/auth';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </React.StrictMode>,
);
