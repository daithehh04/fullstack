import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import './assets/scss/main.scss'
import { Provider } from 'react-redux';
import { store } from './stores/store.js';
import { ChakraProvider } from '@chakra-ui/react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider>
      <Provider store={store}>
        <App />
      </Provider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
