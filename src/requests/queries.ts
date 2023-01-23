import gql from 'graphql-tag';

export const GET_USERS = gql`
  query GetUsers {
    getUsers {
      email
      id
      isAdmin
      username
    }
  }
`;

export const GET_RISK_CATEGORIES = gql`
  query GetRiskCategories {
    getRiskCategories {
      id
      imgUrl
      name
      riskCategoryTypes {
        id
        imgUrl
        name
      }
    }
  }
`;
