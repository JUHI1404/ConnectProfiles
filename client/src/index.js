import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Toaster } from 'react-hot-toast';
import { AuthContextProvider } from "./context/AuthContext";
import { SearchProvider } from './context/SearchContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <SearchProvider>
    <Toaster />
   <App />
   </SearchProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

reportWebVitals();
