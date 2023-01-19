import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Login from './pages/login/Login';
import SideBar from './components/sidebar/Sidebar';
import { getToken, loggedIn } from './utils/auth';
import Users from './pages/users/Users';
import './app.css';

function App() {
  const httpLink = createHttpLink({
    uri: `${process.env.REACT_APP_SERVER}/`,
  });

  const authLink = setContext((_, { headers }) => {
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
        <div className="dashboard-container">
          {loggedIn() && <SideBar />}
          <div className="dashboard-body">
            <Routes>
              <Route path="/" element={loggedIn() ? <Users /> : <Login />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
