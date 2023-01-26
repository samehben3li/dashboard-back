import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Login from './pages/Login';
import { getToken } from './utils/auth';
import IContext from './interfaces';
import serverURL from './utils/constants';

function App() {
  const httpLink = createHttpLink({
    uri: serverURL,
  });

  const authLink = setContext((_, { headers }: IContext): IContext => {
    // get the authentication token from local storage if it exists
    const token = getToken();
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="container">
          <div className="body">
            <Routes>
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
