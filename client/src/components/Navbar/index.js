import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Auth from "../../utils/auth";

import Logo from "./logo";

const Navbar = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 z-40 flex h-16 w-full flex-nowrap items-center justify-between bg-red-300 px-4">
      <Logo />
      {Auth.loggedIn() ? (
        <button className="text-xl font-bold text-black" onClick={logout}>
          Logout
        </button>
      ) : (
        <Link to="/login">
          <p className="text-xl font-bold text-black">Login/Signup</p>
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
