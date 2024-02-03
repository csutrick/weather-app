import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Logo from "./logo";

const Navbar = () => {
  return (
    <nav className="fixed top-0 z-40 flex h-16 w-full flex-nowrap items-center justify-between bg-red-300 px-4">
      <Logo />
      <Link className="" to="/login">
        <p className="text-xl font-bold text-black">Login/Signup</p>
      </Link>
    </nav>
  );
};

export default Navbar;
