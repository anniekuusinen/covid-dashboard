import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import MainView from './views/MainView.tsx';
import { CountryProvider } from './context/CountryContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CountryProvider>
      <MainView />
    </CountryProvider>
  </StrictMode>
);
