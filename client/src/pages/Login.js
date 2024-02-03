import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <section className="mt-16 flex h-screen flex-col items-center justify-center bg-blue-300">
      <h2 className="text-6xl font-bold text-white">Login Page</h2>
      <Link className="mt-4" to="/signup">
        <p className="text-xl font-bold text-gray-300">Signup Page</p>
      </Link>
    </section>
  );
};

export default Login;
