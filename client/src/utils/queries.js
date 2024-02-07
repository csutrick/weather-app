import { gql } from "@apollo/client";

export const QUERY_PROFILES = gql`
  query allProfiles {
    profiles {
      _id
      name
      favorites
    }
  }
`;

export const QUERY_SINGLE_PROFILE = gql`
  query singleProfile($profileId: ID!) {
    profile(profileId: $profileId) {
      _id
      name
      favorites
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      name
      favorites
    }
  }
`;

export const QUERY_WEATHER_FORECAST = gql`
  query getWeatherForecast($city: String!) {
    getWeatherForecast(city: $city) {
      city
      forecast
    }
  }
`;
