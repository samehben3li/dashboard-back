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

export const GET_RISK_CATEGORY = gql`
  query GetRiskCategory($id: ID!) {
    getRiskCategory(id: $id) {
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

export const GET_ALL_FLAGS = gql`
  query GetAllFlags {
    getAllFlags {
      createdAt
      id
      location {
        left
        right
      }
      plantPart {
        name
        imgUrl
      }
      riskCategory {
        name
        imgUrl
      }
      riskCategoryType {
        name
        imgUrl
      }
      userId
    }
  }
`;
