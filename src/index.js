import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react'; // Import ChakraProvider
import App from './components/App';
import { store } from './redux/store';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider> {/* Wrap App component with ChakraProvider */}
        <App />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);
