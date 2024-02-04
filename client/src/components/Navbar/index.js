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

  useEffect(() => {
    try {
      const token = Auth.getProfile();
      let user = token.data.name;
      if (user.includes(" ")) {
        user = user.split(" ")[0];
      }
      setUsername(user);
    } catch {}
  }, []);

  return (
    <nav className="fixed top-0 z-40 flex h-16 w-full flex-nowrap items-center justify-between bg-red-300 px-4">
      <Logo />
      {Auth.loggedIn() ? (
        <div className="flex flex-nowrap">
          <p className="mr-4 border-r-4 border-black pr-4 text-xl text-black">
            Welcome, {username}
          </p>
          <button className="text-xl font-bold text-black" onClick={logout}>
            Logout
          </button>
        </div>
      ) : (
        <Link to="/login">
          <p className="text-xl font-bold text-black">Login/Signup</p>
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
