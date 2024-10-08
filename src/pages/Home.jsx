/** @format */

import { useState, useEffect } from "react";
import axios from "axios";
import config from "../../config.json";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar.jsx";
import BottomBar from "../components/BottomBar.jsx";
import ChillMeter from "../components/ChillMeter.jsx";
      
export default function Home() {
  const rootURL = config.serverRootURL;

  const navigate = useNavigate();

  const phillyLocations = [
    { attraction: "Huntsman Hall", coordinates: { lat: 39.95335, long: -75.19819 } },
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
    <div className="w-screen h-full bg-[--light-taupe-grey] overflow flex justify-center items-center">
    <div className="rounded-md bg-[--champagne] p-20 space-y-2 w-auto h-full font-Lato my-4 flex flex-col items-center">
      <button onClick={() => navigate("/map")} className="px-6 py-3 rounded-md bg-[--cambridge-blue] hover:bg-[--khaki] outline-none w-3/5 font-bold text-3xl text-white font-Lato">
      Explore the Map!
      </button>
      <h2 className="font-bold font-Lato text-2xl pt-6">Featured Location: {randomLocation.attraction}</h2>
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex flex-row space-x-4"> 
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
            <h3 className="text-lg font-semibold mb-2">Our Analysis</h3>
            <img 
            src={`data:image/png;base64,${analyzedImage}`} 
            alt="Analyzed Map" 
            className="w-full h-auto rounded-md" 
            />
          </div>
          )}
        </div>
        <div className="mt-4">
            <p className="text-xl font-semibold my-2">
              Greenspace Percentage:
            </p>
            <ChillMeter greenspacePercentage={5.92} />
            <p className="text-xl font-semibold my-2">
                Chill score:  " Not chill ❌"
            </p>
        </div>
      </div>
    </div>
    </div>
    <BottomBar />
  </div>
  );
}
