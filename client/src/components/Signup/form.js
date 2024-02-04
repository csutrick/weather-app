import React, { useState } from "react";
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
    <>
      <form
        className="flex w-72 flex-col items-start justify-center rounded-lg bg-red-300 p-4"
        onSubmit={handleFormSubmit}
      >
        {/* Username field */}
        <label
          className="mb-1 text-sm font-bold text-gray-700"
          htmlFor="username"
        >
          Username:
        </label>
        <input
          className="mb-2 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
          id="username"
          placeholder="Enter name"
          name="name"
          type="text"
          value={formState.name}
          onChange={handleChange}
        />
        {/* Email field */}
        <label
          className="mb-1 text-sm font-bold text-gray-700"
          htmlFor="username"
        >
          Email:
        </label>
        <input
          className="mb-2 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
          id="email"
          placeholder="Your email"
          name="email"
          type="email"
          value={formState.email}
          onChange={handleChange}
        />
        {/* Password field */}
        <label className="text-sm font-bold text-gray-700" htmlFor="password">
          Password:
        </label>
        <input
          className="mb-2 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
          id="password"
          placeholder="******"
          name="password"
          type="password"
          value={formState.password}
          onChange={handleChange}
        />
        {/* Login Button */}
        <div className="mt-8 flex w-full justify-center">
          <button
            className="rounded bg-white px-4 py-2 font-bold text-black hover:bg-red-300"
            type="submit"
          >
            Signup
          </button>
        </div>
      </form>
      {loading && (
        <div className="text-lg font-bold text-white">Loading...</div>
      )}
      {error && (
        <div className="text-lg font-bold text-white">{error.message}</div>
      )}
    </>
  );
};

export default SignUpForm;
