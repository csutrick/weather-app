import React from "react";

import Form from "../components/Login/form.js";

const Login = () => {
  return (
    <section className="flex h-screen w-full flex-row flex-nowrap items-center justify-center pt-16">
      <div className="flex h-full w-full items-center justify-center sm:w-1/2">
        <Form />
      </div>
      <div className="invisible flex h-full w-0 items-center justify-center bg-blue-200 sm:visible sm:w-1/2">
        <p className="font-bold tracking-widest text-gray-400">Image Here</p>
      </div>
    </section>
  );
};

export default Login;
