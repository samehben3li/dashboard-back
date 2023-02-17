import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './utils/client';
import { AppContextProvider } from './context/AppContext';
import RouterContainer from './components/RouterContainer';

function App() {
  return (
    <ApolloProvider client={client}>
      <AppContextProvider>
        <RouterContainer />
      </AppContextProvider>
    </ApolloProvider>
  );
}

export default App;
