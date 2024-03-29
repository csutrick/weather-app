const { AuthenticationError } = require("apollo-server-express");
const { Profile } = require("../models");
const { signToken } = require("../utils/auth");
const axios = require("axios");

const resolvers = {
  Query: {
    profiles: async () => {
      return Profile.find();
    },

    profile: async (parent, { profileId }) => {
      return Profile.findOne({ _id: profileId });
    },

    me: async (parent, args, context) => {
      if (context.user) {
        return Profile.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    // Gets the weather for the city passed in
    getWeatherForecast: async (_, { city }) => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast`,
          {
            params: {
              q: city,
              appid: process.env.WEATHER_API_KEY,
              units: "imperial",
            },
          },
        );

        const weatherData = response.data;

        return {
          city: city,
          forecast: weatherData,
        };
      } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch weather data");
      }
    },
  },

  Mutation: {
    addProfile: async (parent, { name, email, password }) => {
      const profile = await Profile.create({ name, email, password });
      const token = signToken(profile);

      return { token, profile };
    },
    login: async (parent, { email, password }) => {
      const profile = await Profile.findOne({ email });

      if (!profile) {
        throw new AuthenticationError("No profile with this email found!");
      }

      const correctPw = await profile.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }

      const token = signToken(profile);
      return { token, profile };
    },

    addFavorite: async (parent, { profileId, favorite }, context) => {
      if (context.user) {
        return Profile.findOneAndUpdate(
          { _id: profileId },
          {
            $addToSet: { favorites: favorite },
          },
          {
            new: true,
            runValidators: true,
          },
        );
      }

      throw new AuthenticationError("You need to be logged in!");
    },

    removeProfile: async (parent, args, context) => {
      if (context.user) {
        return Profile.findOneAndDelete({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    removeFavorite: async (parent, { favorite }, context) => {
      if (context.user) {
        return Profile.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { favorites: favorite } },
          { new: true },
        );
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
