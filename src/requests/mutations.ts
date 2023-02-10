import { gql } from '@apollo/client';

export const LOGIN = gql`
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

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;

export const ADD_USER = gql`
  mutation CreateUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      email
      id
      isAdmin
      username
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser(
    $id: ID!
    $username: String
    $email: String
    $password: String
  ) {
    updateUser(
      id: $id
      username: $username
      email: $email
      password: $password
    ) {
      email
      id
      isAdmin
      username
    }
  }
`;

export const DELETE_RISK_CATEGORY = gql`
  mutation Mutation($id: ID!) {
    deleteRiskCategory(id: $id)
  }
`;

export const CREATE_RISK_CATEGORY = gql`
  mutation CreateRiskCategory(
    $name: String!
    $imgUrl: String!
    $riskCategoryTypes: [InputOption!]!
  ) {
    createRiskCategory(
      name: $name
      imgUrl: $imgUrl
      riskCategoryTypes: $riskCategoryTypes
    ) {
      id
      name
      imgUrl
      riskCategoryTypes {
        id
        name
        imgUrl
      }
    }
  }
`;

export const UPDATE_RISK_CATEGORY = gql`
  mutation UpdateRiskCategory($id: ID!, $name: String!, $imgUrl: String!) {
    updateRiskCategory(id: $id, name: $name, imgUrl: $imgUrl) {
      id
      name
      imgUrl
      riskCategoryTypes {
        id
        name
        imgUrl
      }
    }
  }
`;

export const DELETE_RISK_CATEGORY_TYPE = gql`
  mutation DeleteRiskCategoryType(
    $riskCategoryTypeId: ID!
    $riskCategoryId: ID!
  ) {
    deleteRiskCategoryType(
      riskCategoryTypeId: $riskCategoryTypeId
      riskCategoryId: $riskCategoryId
    )
  }
`;

export const ADD_RISK_CATEGORY_TYPE = gql`
  mutation AddRiskCategoryType($id: ID!, $name: String!, $imgUrl: String!) {
    addRiskCategoryType(id: $id, name: $name, imgUrl: $imgUrl) {
      id
      imgUrl
      name
    }
  }
`;

export const UPDATE_RISK_CATEGORY_TYPE = gql`
  mutation UpdateRiskCategoryType(
    $riskCategoryId: ID!
    $riskCategoryTypeId: ID!
    $riskCategoryType: InputOption
  ) {
    updateRiskCategoryType(
      riskCategoryId: $riskCategoryId
      riskCategoryTypeId: $riskCategoryTypeId
      riskCategoryType: $riskCategoryType
    ) {
      id
      imgUrl
      name
    }
  }
`;

export const GENERATE_UPLOAD_URL = gql`
  mutation GenerateUploadURL($imgName: String!) {
    getUploadURL(imgName: $imgName)
  }
`;
