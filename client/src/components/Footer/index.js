import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Auth from "../../utils/auth";

import { FaGithub, FaFileCode } from "react-icons/fa";

const Footer = () => {
  const navigate = useNavigate();

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
    navigate("/login");
  };

  return (
    <footer className="flex w-full bg-blue-400 p-8 pb-16">
      <div className="flex h-72 w-full flex-col items-start justify-end rounded-2xl bg-gray-600 p-8 drop-shadow-md md:h-96 md:flex-row md:items-end md:justify-between">
        <ul className="flex w-full flex-col items-center justify-center md:items-start">
          {Auth.loggedIn() ? (
            <Link
              onClick={logout}
              to="/login"
              className="w-min text-xl font-bold text-white drop-shadow-md transition-all duration-150 ease-in-out 
            hover:tracking-widest hover:text-gray-200 hover:drop-shadow-lg active:scale-105 active:text-gray-300 active:drop-shadow-xl"
            >
              Logout
            </Link>
          ) : (
            <div className="flex w-full flex-row flex-nowrap items-center justify-center space-x-2 md:flex-col md:items-start md:space-x-0">
              <Link
                to="/login"
                className="w-min text-xl font-bold text-white drop-shadow-md transition-all duration-100 ease-in-out
              hover:scale-110 hover:text-gray-200 hover:drop-shadow-lg active:scale-125 active:text-gray-300 active:drop-shadow-xl"
              >
                Login
              </Link>
              <p className="text-xs font-bold text-white drop-shadow-md">or</p>
              <Link
                to="/signup"
                className="w-min text-xl font-bold text-white drop-shadow-md transition-all duration-100 ease-in-out 
              hover:scale-110 hover:text-gray-200 hover:drop-shadow-lg active:scale-125 active:text-gray-300 active:drop-shadow-xl"
              >
                Signup
              </Link>
            </div>
          )}
          <li className="mt-2 text-4xl font-bold tracking-wider text-white drop-shadow-lg">
            Weather-App
          </li>
        </ul>
        <div className="flex w-full flex-row items-center justify-center md:justify-end">
          <div className="mr-4 flex flex-col items-center">
            <label className="mb-1 whitespace-nowrap font-bold text-white drop-shadow-md">
              View Project Code
            </label>
            <a
              href="https://github.com/csutrick/weather-app"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-[100%] justify-center rounded-lg bg-white px-10 py-1 text-4xl drop-shadow-md transition-all duration-150
              ease-in-out hover:scale-105 hover:bg-blue-400 hover:text-white hover:drop-shadow-lg active:scale-110 active:bg-blue-300 active:text-gray-100 active:drop-shadow-xl"
            >
              <FaFileCode className="text-gray-600" />
            </a>
          </div>
          <div className="flex flex-col items-center">
            <label className="mb-1 whitespace-nowrap font-bold text-white drop-shadow-md">
              View Github
            </label>
            <a
              href="https://github.com/csutrick"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-[100%] justify-center rounded-lg bg-white px-10 py-1 text-4xl drop-shadow-md transition-all duration-150
              ease-in-out hover:scale-105 hover:bg-green-400 hover:text-white hover:drop-shadow-lg active:scale-110 active:bg-green-300 active:text-gray-100 active:drop-shadow-xl"
            >
              <FaGithub className="text-gray-600" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
