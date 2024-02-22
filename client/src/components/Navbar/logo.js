import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="bg-green-300">
      <Link className="" to="/">
        <p className="text-4xl font-bold tracking-wider whitespace-nowrap">Weather App</p>
      </Link>
    </div>
  );
};

export default Logo;
