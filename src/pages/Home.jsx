/** @format */

import { useState, useEffect } from "react";
import axios from "axios";
import config from "../../config.json";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar.jsx";
import BottomBar from "../components/BottomBar.jsx";
      
export default function Home() {
  const rootURL = config.serverRootURL;

  const navigate = useNavigate();

  const phillyLocations = [
    { attraction: "Huntsman", coordinates: { lat: 39.95335, long: -75.19819 } },
  ];
  
  const randomLocation = phillyLocations[0];

  const [analyzedImage, setAnalyzedImage] = useState(null);
  const [originalImage, setOriginalImage] = useState(null);
  const [location] = useState({
  lat: randomLocation.coordinates.lat,
  long: randomLocation.coordinates.long,
  });

  useEffect(() => {
    console.log("Location:", location);
        if (location) {
            console.log("Location coordinates:", location.lat, location.long);
    
            axios.get(`${rootURL}/getImage`, {
                params: {
                    lat: location.lat,
                    long: location.long
                }
            })
            .then((response) => {
                console.log("Image URL response:", response.data);
                setAnalyzedImage(response.data.analyzed_image);
                setOriginalImage(response.data.original_image)
            })
            .catch((error) => {
                console.error("Error fetching image URL:", error);
            });
        } else {
            console.log("No addresses found for the inputted address.");
        }
  }, [location, rootURL]);

  return (
  <div className="flex flex-col">
    <NavBar />
    <div className="w-screen h-full bg-[--light-taupe-grey] overflow flex justify-center">
    <div className="w-screen h-full flex flex-col items-center my-10 text-lg font-Lato space-y-2">
      <h1 className="font-bold font-[Libre-Baskerville]">Chilladelphia</h1>
      <p>Here you can find the "coolest" spots in Philly with lots of tree coverage and how to make the city cooler.</p>
      <p>Check out our map to find urban heat spots!</p>
      <button onClick={() => navigate("/map")} className="px-6 py-3 rounded-md bg-[--cambridge-blue] hover:bg-[--khaki] outline-none w-1/5 font-bold text-white font-Lato">
      Explore the Map
      </button>
      <h2 className="font-bold font-Lato text-2xl pt-5">Featured Location: {randomLocation.attraction}</h2>
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex flex-row space-x-4 mt-4"> 
          {originalImage && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Original Image</h3>
            <img 
            src={`data:image/png;base64,${originalImage}`} 
            alt="Original Map" 
            className="w-full h-auto rounded-md" 
            />
          </div>
          )}
          {analyzedImage && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Analyzed Image</h3>
            <img 
            src={`data:image/png;base64,${analyzedImage}`} 
            alt="Analyzed Map" 
            className="w-full h-auto rounded-md" 
            />
          </div>
          )}
        </div>
      </div>
    </div>
    </div>
    <BottomBar />
  </div>
  );
}
