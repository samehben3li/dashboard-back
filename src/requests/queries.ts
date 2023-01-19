import gql from 'graphql-tag';

const GET_USERS = gql`
  query GetUsers {
    getUsers {
      email
      id
      isAdmin
      username
    }
  }
`;

export default GET_USERS;
