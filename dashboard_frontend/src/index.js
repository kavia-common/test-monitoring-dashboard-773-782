import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css';
import { AppRouter } from './router';
import { ThemeProvider } from './components/common/ThemeProvider';
import { StoreProvider } from './state/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StoreProvider>
      <ThemeProvider>
        <AppRouter />
      </ThemeProvider>
    </StoreProvider>
  </React.StrictMode>
);
