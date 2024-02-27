import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { ADD_PROFILE } from "../../utils/mutations";

import Auth from "../../utils/auth";

const SignUpForm = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [addProfile, { error, loading }] = useMutation(ADD_PROFILE);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addProfile({
        variables: { ...formState },
      });

      Auth.login(data.addProfile.token);
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex w-3/4 flex-col items-center justify-center rounded-2xl bg-blue-300 p-4 drop-shadow-lg">
      <h2 className="mb-6 whitespace-nowrap drop-shadow-md border-b-4 border-white px-6 pb-1 text-4xl font-bold tracking-wider text-white sm:text-3xl md:text-4xl">
        Signup Page
      </h2>
      <form
        className="flex-col items-start justify-center"
        onSubmit={handleFormSubmit}
      >
        {/* Username field */}
        <label
          className="mb-1 text-sm font-bold text-gray-700 drop-shadow-md"
          htmlFor="username"
        >
          Username:
        </label>
        <input
          className="mb-2 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none drop-shadow-md"
          id="username"
          placeholder="Enter name"
          name="name"
          type="text"
          value={formState.name}
          onChange={handleChange}
        />
        {/* Email field */}
        <label
          className="mb-1 text-sm font-bold text-gray-700 drop-shadow-md"
          htmlFor="username"
        >
          Email:
        </label>
        <input
          className="mb-2 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none drop-shadow-md"
          id="email"
          placeholder="Your email"
          name="email"
          type="email"
          value={formState.email}
          onChange={handleChange}
        />
        {/* Password field */}
        <label className="text-sm font-bold text-gray-700 drop-shadow-md" htmlFor="password">
          Password:
        </label>
        <input
          className="mb-2 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none drop-shadow-md"
          id="password"
          placeholder="******"
          name="password"
          type="password"
          value={formState.password}
          onChange={handleChange}
        />
        {/* Signup Button */}
        <div className="mt-8 flex w-full justify-center">
          <button
            className="rounded-lg bg-white px-8 py-2 text-lg font-bold text-black hover:bg-gray-300 hover:scale-105 drop-shadow-md hover:drop-shadow-lg transition-all duration-100 ease-in"
            type="submit"
          >
            Signup
          </button>
        </div>
      </form>
      {loading && (
        <div className="text-lg font-bold tracking-wider text-white drop-shadow-md">
          Loading...
        </div>
      )}
      {error && (
        <div className="text-lg font-bold tracking-wider text-red-400">
          {error.message}
        </div>
      )}
      <div className="mt-4 flex w-full flex-col items-center justify-center">
        <p className="text-white drop-shadow-md">Already have an account?</p>
        <Link
          to="/login"
          className="w-min text-xl font-bold text-white drop-shadow-md transition-all duration-100 ease-in-out 
              hover:scale-110 hover:text-gray-200 hover:drop-shadow-lg active:scale-125 active:text-gray-300 active:drop-shadow-xl"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default SignUpForm;
