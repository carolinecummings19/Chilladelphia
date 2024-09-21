/** @format */

import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import config from "../../config.json";
import { withAuthInfo, useRedirectFunctions, useLogoutFunction } from '@propelauth/react'
import logo from "../assets/chilla_logo.png";

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
        className={`fixed top-0 left-0 w-full bg-[--champagne] text-[--black] border-b-[3px] border-gray h-24 flex flex-row items-center justify-between`}
    >
        <div className="flex items-center">
            <div onClick={home} className="px-4 cursor-pointer">
                <img src={logo} alt="Chilladelphia Logo" className="h-20 w-20" />
            </div>
            <div className="font-bold text-[24pt] mx-1 font-[Libre-Baskerville]" onClick={home}>
                    Chilladelphia
            </div>
        </div>
            {/* Right side - Buttons */}
        <div className="flex items-center space-x-4 mr-8">
            {props.isLoggedIn ? (
                <>
                    <button
                        onClick={() => redirectToAccountPage()}
                        className="px-6 py-3 w-1/2 rounded-md bg-[--cambridge-blue] hover:bg-[--khaki] outline-none w-4/5 font-bold text-white font-Lato"
                        type="button"
                    >
                        Account
                    </button>
                    <button
                        onClick={() => logoutFunction(true)}
                        className="px-6 py-3 w-1/2 rounded-md bg-[--cambridge-blue] hover:bg-[--khaki] outline-none w-4/5 font-bold text-white font-Lato"
                        type="button"
                    >
                        Logout
                    </button>
                </>
            ) : (
                <>
                    <button
                        onClick={() => redirectToLoginPage()}
                        className="px-6 py-3 w-1/2 rounded-md bg-[--cambridge-blue] hover:bg-[--khaki] outline-none w-4/5 font-bold text-white font-Lato"
                        type="button"
                    >
                        Login
                    </button>
                    <button
                        onClick={() => redirectToSignupPage()}
                        className="px-6 py-3 w-1/2 rounded-md bg-[--cambridge-blue] hover:bg-[--khaki] outline-none w-4/5 font-bold text-white font-Lato"
                        type="button"
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
