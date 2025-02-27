import { gql } from 'apollo-server';

export const typeDefs = gql`
  type AuthResponse {
    accessToken: String!
    refreshToken: String!
  }

  type Mutation {
    authenticateWithGoogle(token: String!): AuthResponse!
  }
`; 