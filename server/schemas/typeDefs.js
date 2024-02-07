const { gql } = require("apollo-server-express");
const GraphQLJSON = require("graphql-type-json");

const typeDefs = gql`
  scalar JSON

  type Profile {
    _id: ID
    name: String
    email: String
    password: String
    favorites: [String]!
  }

  type Weather {
    city: String
    forecast: JSON
  }

  type Auth {
    token: ID!
    profile: Profile
  }

  type Query {
    profiles: [Profile]!
    profile(profileId: ID!): Profile

    me: Profile

    getWeatherForecast(city: String!): Weather
  }

  type Mutation {
    addProfile(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth

    addFavorite(profileId: ID!, favorite: String!): Profile
    removeProfile: Profile
    removeFavorite(favorite: String!): Profile
  }
`;

module.exports = typeDefs;
