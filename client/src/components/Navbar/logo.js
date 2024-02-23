import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="">
      <Link className="" to="/">
        <p className="whitespace-nowrap text-4xl font-bold tracking-wider text-white drop-shadow-md">
          Weather App
        </p>
      </Link>
    </div>
  );
};

export default Logo;
