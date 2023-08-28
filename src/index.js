import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'
import './styleSheets/animation.css'
import './styleSheets/responsive.css'
import './styleSheets/index.css'
import './styleSheets/main.css'
import { ChakraProvider } from '@chakra-ui/react';
// import 'bootstrap/dist/js/bootstrap.bundle.js';
import UserContextProvider from './contexts/userContext';
import TradeContextProvider from './contexts/tradeContext';

ReactDOM.render(
  <ChakraProvider>
    <UserContextProvider>
      <TradeContextProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </TradeContextProvider>
    </UserContextProvider>
  </ChakraProvider>,
  document.getElementById('root')
);

//Ayohyrics@gmail.com