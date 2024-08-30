import React from 'react';
import ReactDOM from 'react-dom/client'; // Import createRoot from react-dom/client
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App';

// Get the root DOM element
const container = document.getElementById('root');

// Create a root using createRoot
const root = ReactDOM.createRoot(container);

// Render your app with the root
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);