/** @format */

import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import config from "../../config.json";
import { Menu, House } from "lucide-react";
import { withAuthInfo, useRedirectFunctions, useLogoutFunction } from '@propelauth/react'

const NavBar = withAuthInfo((props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const logoutFunction = useLogoutFunction();
  const { redirectToLoginPage, redirectToSignupPage, redirectToAccountPage } = useRedirectFunctions();


  const rootURL = config.serverRootURL;

  const isActive = (pathname) => {
    return location.pathname === pathname;
  };

  const home = () => {
    navigate("/");
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full bg-[--champagne] text-[--black] border-b-[3px] border-gray h-16 flex flex-row items-center justify-between`}
    >
      <div className="flex items-center">
        <div onClick={home} className="px-4 cursor-pointer">
          <Menu size={30} />
        </div>
        <div className="font-bold text-xl mx-4" onClick={home}>
            Chilladelphia
        </div>
      </div>
        {/* Right side - Buttons */}
      <div className="flex items-center space-x-4">
        {props.isLoggedIn ? (
          <>
            <button
              onClick={() => redirectToAccountPage()}
              className="px-4 py-2 bg-[--highlight] text-black rounded-md"
            >
              Account
            </button>
            <button
              onClick={() => logoutFunction(true)}
              className="px-4 py-2 bg-[--highlight] text-black rounded-md"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => redirectToLoginPage()}
              className="px-4 py-2 bg-[--highlight] text-black rounded-md"
            >
              Login
            </button>
            <button
              onClick={() => redirectToSignupPage()}
              className="px-4 py-2 bg-[--highlight] text-black rounded-md"
            >
              Signup
            </button>
          </>
        )}
      </div>
      </div>
  );
});

export default NavBar;
