import React from "react";
import { Link } from "react-router-dom";

import Form from "../components/Login/form.js";

const Login = () => {
  return (
    <section className="mt-16 flex h-screen flex-col items-center justify-center bg-white">
      <div className="flex flex-col items-center justify-center rounded-xl border-8 border-black bg-white p-4">
        <h2 className="mb-8 text-6xl font-bold text-black">Login Page</h2>
        <Form />
        <p className="mt-4 text-black">Dont have an account?</p>
        <Link to="/signup">
          <p className="text-xl font-bold text-black">Signup Page</p>
        </Link>
      </div>
    </section>
  );
};

export default Login;
