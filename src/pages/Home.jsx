/** @format */

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import config from "../../config.json";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar.jsx";
import BottomBar from "../components/BottomBar.jsx";
import heatMap from "../assets/heat_map_home.png";


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
    <div className="flex flex-col">
      <NavBar />
      <div className="w-screen h-full bg-[--light-taupe-grey] overflow flex justify-center">
        <div className="w-screen h-full flex flex-col items-center my-10 text-lg font-Lato space-y-4">
         <h1 className="font-bold font-[Libre-Baskerville]">Welcome to Chilladelphia!</h1>
          <p>Here you can find the hottest spots in Philly and how to make the city cooler.</p>
          <p>Check out our map to find urban heat spots!</p>
          <button onClick={() => navigate("/map")} className="px-6 py-3 rounded-md bg-[--cambridge-blue] hover:bg-[--khaki] outline-none w-1/5 font-bold text-white font-Lato">
            Explore the Map
          </button>
          <img src={heatMap} alt="Heat Map Image" className="w-3/4 p-2" />
        </div>
      </div>
      <BottomBar />
    </div>
  );
}
