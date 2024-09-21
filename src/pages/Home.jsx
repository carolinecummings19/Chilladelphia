/** @format */

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import config from "../../config.json";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar.jsx";
import BottomBar from "../components/BottomBar.jsx";

export default function Home() {
  const rootURL = config.serverRootURL;

  const navigate = useNavigate();

//   const fetchData = async () => {
//     // fetch map and set appropriate state variables
//     try {
//       const responseMap = await axios.get(`${rootURL}/${username}/map`);
//       setPosts(responseMap.data.results);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

  return (
    <div className="w-screen h-screen bg-[--light-taupe-grey]">
      <NavBar></NavBar>
      <BottomBar></BottomBar>
    </div>
  );
}
