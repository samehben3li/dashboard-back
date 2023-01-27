import { createHttpLink, ApolloClient, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { IContext } from '../interfaces';
import { getToken } from './auth';
import { serverURL } from './constants';

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

export default client;
