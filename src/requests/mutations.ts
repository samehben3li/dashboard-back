import { gql } from '@apollo/client';

const LOGIN = gql`
  mutation ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      accessToken
      user {
        id
        email
        username
        isAdmin
      }
    }
  }
`;

export default LOGIN;
