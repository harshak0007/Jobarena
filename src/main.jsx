import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import i18n from './i18n.jsx'; // Import your i18n configuration
import { I18nextProvider } from 'react-i18next'; // Import I18nextProvider
import { Toaster } from 'react-hot-toast';
import { NavbarContextProvider } from './context/NavbarContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <React.Suspense fallback="loading...">
      <I18nextProvider i18n={i18n}>
        <Provider store={store}>
          <BrowserRouter>
            <NavbarContextProvider>
              <Toaster toastOptions={{ duration: 4000 }} />
              <App />
            </NavbarContextProvider>
          </BrowserRouter>
        </Provider>
      </I18nextProvider>
    </React.Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);