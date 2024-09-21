/** @format */

import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import config from "../../config.json";
import { Menu, House } from "lucide-react";

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();

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
        {/* Add more nav items here if needed */}
      </div>
  );
}

export default NavBar;
