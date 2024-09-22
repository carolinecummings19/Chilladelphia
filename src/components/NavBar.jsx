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

  const map = () => {
    navigate("/map");
  };

  const involvement = () => {
    navigate("/involvement");
  };

  const forum = () => {
    navigate("/forum");
  };

  const about = () => {
    navigate("/about");
  };

return (
    <div>
        <div
            className={`fixed top-0 left-0 w-full bg-[--champagne] text-[--black] border-b-[3px] border-gray h-24 flex flex-row items-center justify-between z-10`}
        >
            <div className="flex items-center">
                <div onClick={home} className="px-4 cursor-pointer flex items-center">
                    <img src={logo} alt="Chilladelphia Logo" className="h-20 w-20" />
                    <div className="font-bold text-[20pt] mx-1 h-full font-[snowfont]">
                        Chilladelphia
                    </div>
                </div>
                <div className="font-Lato space-x-8 flex ml-8 font-bold text-lg">
                    <div onClick={map} className="px-4 cursor-pointer">
                        Heat Map
                    </div>
                    <div onClick={involvement} className="px-4 cursor-pointer">
                        Get Involved
                    </div>
                    <div onClick={forum} className="px-4 cursor-pointer">
                        Connect with Others
                    </div>
                    <div onClick={about} className="px-4 cursor-pointer">
                        About Us
                    </div>
                </div>
            </div>
            {/* Right side - Buttons */}
            <div className="flex items-center space-x-4 mr-8">
                {props.isLoggedIn ? (
                    <>
                        <button
                            onClick={() => redirectToAccountPage()}
                            className="px-6 py-3 rounded-md bg-[--cambridge-blue] hover:bg-[--khaki] outline-none font-bold text-white font-Lato"
                            type="button"
                        >
                            Account
                        </button>
                        <button
                            onClick={() => logoutFunction(true)}
                            className="px-6 py-3 rounded-md bg-[--cambridge-blue] hover:bg-[--khaki] outline-none font-bold text-white font-Lato"
                            type="button"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={() => redirectToLoginPage()}
                            className="px-6 py-3 rounded-md bg-[--cambridge-blue] hover:bg-[--khaki] outline-none font-bold text-white font-Lato"
                            type="button"
                        >
                            Login
                        </button>
                        <button
                            onClick={() => redirectToSignupPage()}
                            className="px-6 py-3 rounded-md bg-[--cambridge-blue] hover:bg-[--khaki] outline-none font-bold text-white font-Lato"
                            type="button"
                        >
                            Signup
                        </button>
                    </>
                )}
            </div>
        </div>
        <div className="pt-24">
            {/* Your page content goes here */}
        </div>
    </div>
);
});

export default NavBar;
